import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
const s3Client = new S3Client({ region: 'eu-central-1' }); // e.g., "us-east-1"
const BUCKET_NAME = 's3://samassignmentbucket';
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        let body: any;

        // Check if the body is base64 encoded (common for API Gateway requests)
        if (event.isBase64Encoded) {
            // Decode the base64 encoded body
            const decodedBody = Buffer.from(event.body || '', 'base64').toString('utf-8');

            // Parse the decoded body as JSON
            body = JSON.parse(decodedBody);
        } else {
            // Parse the body as JSON directly
            body = JSON.parse(event.body || '');
        }

        // Print the parsed body
        console.log('Parsed body:', body);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Body parsed successfully' }),
        };
        // console.log('event details are', event);
        // console.log('event body are', event.body);
        // // Assuming your file is sent as "file" field in multipart/form-data
        // //const file = event.body['filename'];
        // const fileStream = Buffer.from(event.body['Content-Type'] || '', 'base64');
        // console.log('fileStream are', fileStream);
        // const uploadParams = {
        //     Bucket: BUCKET_NAME,
        //     Key: 'static-name', // Using the filename as the object key
        //     Body: fileStream,
        // };
        // console.log('uploadParams are', uploadParams);
        // const command = new PutObjectCommand(uploadParams);
        // await s3Client.send(command);
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify({ message: 'File uploaded successfully' }),
        // };
        // Your S3 upload logic here
        // Initialize S3 client
        // const s3 = new AWS.S3();

        // // Extract file data from the event body
        // const { fileData } = JSON.parse(event.body);
        // // Configure S3 upload parameters
        // const uploadParams = {
        //     Bucket: 's3://samassignmentbucket',
        //     Key: 'path/to/uploaded/file.txt', // Change this to the desired file path in S3
        //     Body: fileData,
        // };

        // // Upload file to S3
        // await s3.upload(uploadParams).promise();
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify({
        //         message: 'File uploaded successfully',
        //     }),
        // };
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
