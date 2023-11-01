import { ddbQueryPostsParams } from "../types";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getAllProjectsWithEstimatesAndContractors = async () => {
  console.log(`getAllProjectsWithEstimatesAndContractors called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.CONTRACTORS_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition",
    FilterExpression: "#estimate <> :zero AND #contractorName <> :empty AND #endDate = :empty",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#estimate": "estimate",
      "#contractorName": "contractorName",
      "#endDate": "endDate",
    },
    ExpressionAttributeValues: {
      ":post_partition": `PROJECTS`,
      ":zero": 0,
      ":empty": ''
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

export default getAllProjectsWithEstimatesAndContractors;