// import { SQSEvent } from 'aws-lambda';
// import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
// import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
// import * as XLSX from 'xlsx';
// import { streamToBuffer } from '@smithy/util-stream';

// const s3Client = new S3Client({});
// const snsClient = new SNSClient({});

// export const handler = async (event: SQSEvent): Promise<void> => {
//     const record = event.Records[0];
//     const bucket = record.body;
//     const key = record.messageAttributes['Key'].stringValue;

//     const params = {
//         Bucket: bucket,
//         Key: key,
//     };

//     try {
//         const data = await s3Client.send(new GetObjectCommand(params));
//         const workbook = XLSX.read(data.Body as ArrayBuffer, { type: 'buffer' });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const mail = sheet.A1.v;
//         const name = sheet.A2.v;

//         const message = `Hello ${name},\n\nYour email is ${mail}.\n\nRegards`;

//         const snsParams = {
//             Message: message,
//             Subject: 'File Upload Notification',
//             TopicArn: process.env.SNS_TOPIC_ARN,
//         };

//         await snsClient.send(new PublishCommand(snsParams));
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// };
