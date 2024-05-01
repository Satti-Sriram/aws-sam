import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWS from 'aws-sdk';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // Your S3 upload logic here
        // Initialize S3 client
        const s3 = new AWS.S3();

        // Extract file data from the event body
        const { fileData } = JSON.parse(event.body);
        // Configure S3 upload parameters
        const uploadParams = {
            Bucket: 's3://samassignmentbucket',
            Key: 'path/to/uploaded/file.txt', // Change this to the desired file path in S3
            Body: fileData,
        };

        // Upload file to S3
        await s3.upload(uploadParams).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'File uploaded successfully',
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error uploading file',
            }),
        };
    }
};
