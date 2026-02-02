import { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../utils/s3";
import crypto from "crypto";

export const getUploadUrl = async (req: Request, res: Response) => {
    const { contentType } = req.body;

    const key = `polls/${req.user!.userId}/${crypto.randomUUID()}`;

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
        expiresIn: 60,
    });

    return res.json({
        uploadUrl,
        key,
    });
};
