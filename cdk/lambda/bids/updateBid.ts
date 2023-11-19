const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Bid, BidInput, Project } from "../types";
import getBidById from "./getBidById";

const updateBid = async (
    bidId: string,
    bidInput: BidInput
) => {

    if (!bidInput || !bidId) {
        return { statusCode: 400, body: 'Invalid request, missing parameters' };
    }

    const retrievedBid = await getBidById(bidId);

    const bid: Bid = {
        bidId: retrievedBid.bidId,
        projectId: bidInput.projectId ? bidInput.projectId : retrievedBid.projectId,
        contractorName: bidInput.contractorName ? bidInput.contractorName : retrievedBid.contractorName,
        contractorId: bidInput.contractorId ? bidInput.contractorId : retrievedBid.contractorId,
        bidAmount: bidInput.bidAmount ? bidInput.bidAmount : retrievedBid.bidAmount,
        createdAt: retrievedBid.createdAt,
        updatedAt: new Date().toISOString(),
    };
    try {
        console.log(`UPDATE project called with:` + JSON.stringify(`Bid ID: ${bidId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF bidInput --------- ${typeof (bidInput)}`);

        const params = {
            RequestItems: {
                "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": // batchWriteRequests
                    [
                        {
                            PutRequest: {
                                Item: {
                                    PK: `BIDS`,
                                    SK: `BID#${bid.bidId}`,
                                    type: "bid",
                                    ...bid
                                },
                            },
                        },
                        {
                            PutRequest: {
                                Item: {
                                    PK: `BID#${bid.bidId}`,
                                    SK: `BID#${bid.bidId}`,
                                    type: 'bid',
                                    ...bid,
                                },
                            },
                        },
                        {
                            PutRequest: {
                                Item: {
                                    PK: `PROJECT#${bid.projectId}`,
                                    SK: `BID#${bid.bidId}`,
                                    type: 'project',
                                    ...bid,
                                },
                            },
                        },
                    ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

        console.log(`params: ${JSON.stringify(params, null, 2)}`);

        await docClient.batchWrite(params).promise();

        console.log(`updatedProject: ${JSON.stringify(bid, null, 2)}`);

        return bid;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateBid;