"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@/utils/supabase/server";

export async function uploadMedia(formData: FormData) {
  const file = formData.get("file") as File;
  const templateSlug = formData.get("templateSlug") as string;

  if (!file || !templateSlug) {
    throw new Error("Missing file or templateSlug");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If the user isn't logged in, we can either throw or use a temporary ID. Let's use a temporary one for anonymous edits.
  const userId = user?.id || "anonymous";

  // Construct S3 Client
  const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY as string,
    },
  });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // Create object path: e.g. user_123/modern-serenity/16000000_image.png
  // Safely format the filename
  const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const objectKey = `${userId}/${templateSlug}/${Date.now()}_${safeFileName}`;

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: objectKey,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const publicUrl = `https://pub-${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${objectKey}`;
    return { success: true, url: publicUrl };
  } catch (error: any) {
    console.error("Upload error:", error);
    return { success: false, error: error.message };
  }
}
