import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// uploadFile
export const uploadFile = async ({Bucket, path, file, ACL = "private"}) => {
    const key = `${process.env.APPLICATION_NAME}/${path}/${file.originalname}`;
    
    const command = new PutObjectCommand({
        Bucket,
        ACL,
        Key: key,
        Body: file.buffer, 
        ContentType: file.mimetype
    });

    try {
        await s3.send(command);
        return key; 
    } catch (error) {
        throw new Error("Failed to upload file to S3");
    }
};

// getFile
// export const getFile = async ({ Bucket, Key }) => {
//     const command = new GetObjectCommand({ Bucket, Key });
//     try {
//         const response = await s3.send(command);
//         return response; 
//     } catch (error) {
//         throw new Error("Failed to get file");
//     }
// };

// deleteFile
export const deleteFile = async ({ Bucket, Key }) => {
    const command = new DeleteObjectCommand({ Bucket, Key });
    try {
        return await s3.send(command);
    } catch (error) {
        throw new Error("Failed to delete file");
    }
};
