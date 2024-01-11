const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { MessageInput, Thread } from "../types";
require("dotenv").config({ path: ".env" });

const createThread = async (messageInput: MessageInput) => {
    const threadId = ulid();

        const thread: Thread = {
            threadId,
            projectId: messageInput.projectId,
            numMessages: 0,
            createdAt: new Date().toISOString(),
        };

        // Store Chef data in DynamoDB
        const params = {
            RequestItems: {
                "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
                    {
                        PutRequest: {
                            Item: {
                                PK: `PROJECT#${thread.projectId}}`,
                                SK: `THREAD#${threadId}`,
                                type: 'thread',
                                ...thread,
                            },
                        },
                    },
                ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

        try {
        const createdThread = await docClient.batchWrite(params).promise();
        console.log(`Created thread: ${JSON.stringify(thread, null, 2)}`);
        
        return thread;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createThread;
