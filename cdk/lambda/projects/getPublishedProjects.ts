import { ddbQueryPostsParams } from "../types";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getPublishedProjects = async (clientName: string) => {
  console.log(`getPublishedProjects called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.CONTRACTORS_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition AND begins_with(#SK, :sk_prefix)", 
    FilterExpression: "#isPublished = :isPublished",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK",
      "#isPublished": "isPublished",
    },
    ExpressionAttributeValues: {
      ":post_partition": `CLIENT#${clientName}`,
      ":sk_prefix": "PROJECT#",
      ":isPublished": true,
    },
    ReturnConsumedCapacity: "TOTAL",
    ScanIndexForward: false,
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

export default getPublishedProjects;