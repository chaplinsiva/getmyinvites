"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createClient } from "@/utils/supabase/server";

export async function getUploadUrl(fileName: string, fileType: string, templateSlug: string) {
  if (!fileName || !templateSlug) {
    throw new Error("Missing file data");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || "anonymous";

  const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY as string,
    },
  });

  const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const objectKey = `${userId}/${templateSlug}/${Date.now()}_${safeFileName}`;

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: objectKey,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${objectKey}`;

    return { success: true, signedUrl, publicUrl };
  } catch (err: any) {
    console.error("Presigner error:", err);
    return { success: false, error: err.message, signedUrl: null, publicUrl: null };
  }
}
