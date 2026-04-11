import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure all required env variables are present
const REQUIRED_ENV_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_R2_ACCESS_KEY_ID",
  "CLOUDFLARE_R2_SECRET_ACCESS_KEY",
  "CLOUDFLARE_R2_BUCKET_NAME",
];

for (const envVar of REQUIRED_ENV_VARS) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// 1. Initialize S3 Client for Cloudflare R2
const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

// 2. Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Function to get MIME type based on file extension
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

// Recursive function to get all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function uploadTemplateFolder(templateName, srcPath) {
  console.log(`\nProcessing template: ${templateName}...`);
  const allFiles = getAllFiles(srcPath);

  // Upload all files to R2
  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    
    // Explicitly skip PSD and PDF files
    if (ext === ".psd" || ext === ".pdf") {
      console.log(`Skipping old template file: ${filePath}`);
      continue;
    }

    const relativePath = path.relative(srcPath, filePath);
    // On Windows, fix backslashes for URL paths
    const objectKey = `templates/${templateName}/${relativePath.replace(/\\/g, "/")}`;
    const fileContent = fs.readFileSync(filePath);

    try {
      console.log(`Uploading -> ${objectKey}`);
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: objectKey,
          Body: fileContent,
          ContentType: getContentType(filePath),
        })
      );
    } catch (err) {
      console.error(`Failed to upload ${objectKey}:`, err);
    }
  }

  // Insert template metadata into Supabase
  let manifest = {};
  const manifestPath = path.join(srcPath, "manifest.json");
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  }

  const publicR2UrlBase = `https://pub-${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/templates`; // Assuming public R2 setup, modify if using custom domain.

  console.log(`Upserting ${templateName} template into Supabase...`);
  const { error } = await supabase.from("templates").upsert(
    {
      slug: templateName,
      name: manifest.name || templateName,
      description: manifest.description || `${templateName} template`,
      r2_path: `templates/${templateName}`,
      thumbnail_url: manifest.composite ? `${publicR2UrlBase}/${templateName}${manifest.composite.replace('/templates/'+templateName, '')}` : null,
      price: 0,
    },
    { onConflict: "slug" }
  );

  if (error) {
    console.error(`Failed to insert template ${templateName} into Supabase:`, error);
  } else {
    console.log(`Successfully registered ${templateName} in DB.`);
  }
}

async function main() {
  const templatesDir = path.join(__dirname, "..", "public", "templates");

  if (!fs.existsSync(templatesDir)) {
    console.error(`Templates directory not found: ${templatesDir}`);
    process.exit(1);
  }

  const templates = fs.readdirSync(templatesDir).filter((file) => {
    return fs.statSync(path.join(templatesDir, file)).isDirectory();
  });

  if (templates.length === 0) {
    console.log("No templates found in public/templates directory.");
    return;
  }

  for (const template of templates) {
    await uploadTemplateFolder(template, path.join(templatesDir, template));
  }

  console.log("\nAll templates processed successfully!");
}

main().catch(console.error);
