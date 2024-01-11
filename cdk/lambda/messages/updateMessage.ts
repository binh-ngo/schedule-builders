const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Bid, Message, MessageInput, } from "../types";
import getMessageById from "./getMessageById";

const updateMessage = async (
    messageId: string,
    messageInput: MessageInput
) => {

    if (!messageInput || !messageId) {
        return { statusCode: 400, body: 'Invalid request, missing parameters' };
    }

    const retrievedMessage = await getMessageById(messageId);

    const message: Message = {
        projectId: messageInput.projectId ? messageInput.projectId : retrievedMessage.projectId,
        authorId: messageInput.authorId ? messageInput.authorId : retrievedMessage.authorId,
        authorName: messageInput.authorName ? messageInput.authorName : retrievedMessage.authorName,
        messageId: retrievedMessage.messageId,
        threadId: retrievedMessage.threadId,
        body: messageInput.body ? messageInput.body : retrievedMessage.body,
        createdAt: retrievedMessage.createdAt,
        updatedAt: new Date().toISOString(),
    };
    try {
        console.log(`UPDATE project called with:` + JSON.stringify(`Message ID: ${messageId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF messageInput --------- ${typeof (messageInput)}`);

        const params = {
            RequestItems: {
                "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": // batchWriteRequests
                    [
                        {
                            PutRequest: {
                                Item: {
                                    PK: `MESSAGE#${message.messageId}`,
                                    SK: `MESSAGE#${message.messageId}`,
                                    type: 'message',
                                    ...message,
                                },
                            },
                        },
                        {
                            PutRequest: {
                                Item: {
                                    PK: `PROJECT#${message.projectId}`,
                                    SK: `MESSAGE#${message.messageId}`,
                                    type: 'message',
                                    ...message,
                                },
                            },
                        },
                    ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

        console.log(`params: ${JSON.stringify(params, null, 2)}`);

        await docClient.batchWrite(params).promise();

        console.log(`updatedProject: ${JSON.stringify(message, null, 2)}`);

        return message;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateMessage;