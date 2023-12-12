import { ddbQueryPostsParams } from "../types";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getAllUnpublishedProjectsFromAllClients = async () => {
  console.log(`getAllUnpublishedProjectsFromAllClients called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.CONTRACTORS_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition", 
    FilterExpression: "#isPublished = :isPublished",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#isPublished": "isPublished",
    },
    ExpressionAttributeValues: {
      ":post_partition": `PROJECTS`,
      ":isPublished": false,
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

export default getAllUnpublishedProjectsFromAllClients;