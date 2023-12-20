const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Bid, BidInput, Message, MessageInput } from "../types";
require("dotenv").config({ path: ".env" });
const {SNSClient, PublishCommand} = require('@aws-sdk/client-sns');

const snsClient = new SNSClient({region: 'us-east-1'});

const createMessage = async (messageInput: MessageInput) => {
    const messageId = ulid();

        const message: Message = {
            messageId,
            projectId: messageInput.projectId,
            body: messageInput.body,
            authorName: messageInput.authorName,
            authorId: messageInput.authorId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Store Chef data in DynamoDB
        const params = {
            RequestItems: {
                "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
                    {
                        // allows you to query for a single message
                        // May be unnecessary
                        PutRequest: {
                            Item: {
                                PK: `MESSAGE#${messageId}`,
                                SK: `MESSAGE#${messageId}`,
                                type: 'message',
                                ...message,
                            },
                        },
                    },
                    {
                        // allows you to query for all messages in a project
                        PutRequest: {
                            Item: {
                                PK: `PROJECT#${messageInput.projectId}`,
                                SK: `MESSAGE#${messageId}`,
                                type: 'message',
                                ...message,
                            },
                        },
                    },
                ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

        const snsParams = {
            Subject: `New message on Project-${message.projectId}`,
            Message: `You received a message from ${message.authorName}! Log in and check it out: https://schedule.builders/projects/${message.projectId}
            `, 
            TopicArn: process.env.DEFAULT_TOPIC_ARN + `ProjectBidNotifications-${message.projectId}`
          };

        try {
        const createdMessage = await docClient.batchWrite(params).promise();
        console.log(`Created message: ${JSON.stringify(message, null, 2)}`);
        
        if (createdMessage) {
            try {
                const snsResult = await snsClient.send(new PublishCommand(snsParams));
                console.log(`SNS Result: ${JSON.stringify(snsResult, null, 2)}`);
            } catch (err) {
                console.log(`SNS Error: ${JSON.stringify(err, null, 2)}`);
                throw err;
            }
        }
        return message;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createMessage;
