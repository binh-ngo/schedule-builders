const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Bid, BidInput } from "../types";
require("dotenv").config({ path: ".env" });

const createBid = async (bidInput: BidInput) => {
    const bidId = ulid();

        const bid: Bid = {
            bidId,
            projectId: bidInput.projectId,
            contractorName: bidInput.contractorName,
            contractorId: bidInput.contractorId,
            bidAmount: bidInput.bidAmount,
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

        try {
        await docClient.batchWrite(params).promise();
        console.log(`Created bid: ${JSON.stringify(bid, null, 2)}`);
        return bid;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createBid;
