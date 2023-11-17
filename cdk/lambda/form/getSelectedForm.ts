import { ddbQueryPostsParams } from "../types";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

export const getSelectedForm = async () => {
  console.log(`getSelectedForm called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.CONTRACTORS_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition",
    FilterExpression: "#isSelected = :isSelected",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#isSelected": "isSelected",
    },
    ExpressionAttributeValues: {
      ":post_partition": `FORMS`,
      ":isSelected": true,
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

