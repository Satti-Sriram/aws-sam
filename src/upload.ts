import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Parse } from 'parse-multipart';
const s3Client = new S3Client({ region: 'eu-central-1' }); // e.g., "us-east-1"
const BUCKET_NAME = 'samassignmentbucket';
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // Split the body by boundary
        //const file = JSON.parse(event.body);
        console.log('event details are', event);
        console.log('event body details are', event.body);
        console.log('event header is', event.headers['content-type']);
        const boundary = event.headers['Content-Type'].split('boundary=')[1];
        console.log('boundary is', boundary);
        const fileData = Buffer.from(event.body, 'base64');
        const parts = Parse(fileData, boundary);
        console.log('parse is', parts);
        // const parts = parse.Parse();
        // console.log('parts is', parts);
        let fileName;
        let fileContent;

        parts.forEach((part) => {
            if (part.filename) {
                // Assuming only one file is uploaded
                fileName = part.filename;
                fileContent = part.data;
            }
        });
        console.log('File Name:', fileName);
        console.log('File Content:', fileContent.toString());

        console.log('file data is', fileData);
        // const boundry = getBoundary(event.headers['content-type']);

        // const parts = Parse(fileData, boundry);
        // console.log('parts is', parts);
        // const boundary = event.headers['Content-Type'].split('boundary=')[1];
        // console.log('boundary is', boundary);
        // const parts = event.body.split(`--${boundary}`);
        // console.log('parts is', parts);
        const uploadParams = {
            Bucket: BUCKET_NAME,
            Key: 'myfile25.xlsx',
            Body: fileData,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Set correct Content-Type
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File uploaded successfully' }),
        };
    } catch (error) {
        console.error('Error uploading file:', error); // Log the error
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error uploading file',
            }),
        };
    }
};
