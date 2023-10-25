import { ddbQueryPostsParams } from "../types";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getAllProjectsWithEstimates = async () => {
  console.log(`getAllProjectsWithEstimates called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.CONTRACTORS_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition",
    // filter where estimates aren't equal to zero
    FilterExpression: "#estimate <> :zero",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#estimate": "estimate",
    },
    ExpressionAttributeValues: {
      ":post_partition": `PROJECTS`,
      ":zero": 0,
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

export default getAllProjectsWithEstimates;