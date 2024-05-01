import { APIGatewayAuthorizerResult, APIGatewayRequestAuthorizerEvent } from 'aws-lambda';

// DEFINE THE STATIC TOKEN
const STATIC_TOKEN = '1234567890';

export const handler = async (event: APIGatewayRequestAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    try {
        console.log('event details are', event);
        console.log('headers are ', event.headers);
        // Extract the token from Authorization header
        const token = event.headers['Authorization'];
        console.log('token details are', token);
        // Validate the token
        if (token !== `Bearer ${STATIC_TOKEN}`) {
            throw new Error('Unauthorized');
        }

        // Generate the IAM policy
        const policy: APIGatewayAuthorizerResult = {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: event.methodArn,
                    },
                ],
            },
        };
        return policy;
    } catch (error) {
        throw new Error('Unauthorized');
    }
};
