const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Bid, BidInput, Message, MessageInput } from "../types";
require("dotenv").config({ path: ".env" });

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
                        PutRequest: {
                            Item: {
                                PK: `MESSAGES`,
                                SK: `MESSAGE#${messageId}`,
                                type: "message",
                                ...message
                            },
                        },
                    },
                    {
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

        try {
        await docClient.batchWrite(params).promise();
        console.log(`Created message: ${JSON.stringify(message, null, 2)}`);
        return message;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createMessage;
