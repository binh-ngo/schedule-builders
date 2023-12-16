const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import getProjectById from "../projects/getProjectById";
import { Bid, BidInput } from "../types";
require("dotenv").config({ path: ".env" });
const {SNSClient, PublishCommand} = require('@aws-sdk/client-sns');

const snsClient = new SNSClient({region: 'us-east-1'});

const createBid = async (bidInput: BidInput) => {
    const bidId = ulid();

    const bid: Bid = {
        bidId,
        projectId: bidInput.projectId,
        contractorName: bidInput.contractorName,
        contractorId: bidInput.contractorId,
        bidAmount: bidInput.bidAmount,
        createdAt: new Date().toISOString(),
        updatedAt: ''
    };

    const retrievedProject = await getProjectById(bid.projectId);

    if (!retrievedProject) {
        console.error(`Project with ID ${bid.projectId} not found.`);
    }

    const projectType = retrievedProject && retrievedProject.projectType ? retrievedProject.projectType : null;

    // Store Chef data in DynamoDB
        const params = {
            RequestItems: {
                "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
                    {
                        PutRequest: {
                            Item: {
                                PK: `BIDS`,
                                SK: `BID#${bidId}`,
                                type: "bid",
                                ...bid
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                PK: `BID#${bidId}`,
                                SK: `BID#${bidId}`,
                                type: 'bid',
                                ...bid,
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                PK: `PROJECT#${bidInput.projectId}`,
                                SK: `BID#${bidId}`,
                                type: 'bid',
                                ...bid,
                            },
                        },
                    },
                ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

        const snsParams = {
            Subject: `You receieved a bid on Project: ${projectType}-${bid.projectId}`,
            Message: `A contractor wants to work on your ${projectType} project! Log in and check it out: https://schedule.builders/projects/${bid.projectId}
            `, 
            TopicArn: process.env.DEFAULT_TOPIC_ARN + `ProjectBidNotifications-${bid.projectId}`
          };
          console.log(process.env.TOPIC_ARN)

        try {
            // create contractor's bid
        const createdBids = await docClient.batchWrite(params).promise();
        console.log(`Created bid: ${JSON.stringify(bid, null, 2)}`);
            //  if successful, send the sns email to project owner
        if (createdBids) {
            try {
                const snsResult = await snsClient.send(new PublishCommand(snsParams));
                console.log(`SNS Result: ${JSON.stringify(snsResult, null, 2)}`);
            } catch (err) {
                console.log(`SNS Error: ${JSON.stringify(err, null, 2)}`);
                throw err;
            }
        }
        return bid;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createBid;
