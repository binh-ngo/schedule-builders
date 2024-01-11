import { ddbQueryPostsParams } from "../types";
const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const getMessagesInThread = async (projectId: string, authorName1: string, authorName2: string) => {
  console.log(`getMessagesInThread called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.CONTRACTORS_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition and begins_with(#SK, :sk_prefix)",
    FilterExpression: 'authorName = :author1 OR authorName = :author2',
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK",
    },
    ExpressionAttributeValues: {
      ":post_partition": `PROJECT#${projectId}`,
      ":sk_prefix": "THREAD#",
      ':author1': authorName1,
      ':author2': authorName2
    },
    ReturnConsumedCapacity: "TOTAL",
    ScanIndexForward: true, // Set this to true for ascending order
  };
 
  try {
    const data = await docClient.query(params).promise();

    console.log(`data: ${JSON.stringify(data, null, 2)}`);

    return data.Items;

  } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};

export default getMessagesInThread;
