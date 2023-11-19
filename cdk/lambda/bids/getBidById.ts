const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const getBidById = async (bidId: string) => {
  console.log(`getBidById called with: (${bidId})`);

  if (!bidId) {
    return { statusCode: 400, body: `Error: You are missing the client ID` };
  }

  const params = {
    TableName: process.env.CONTRACTORS_TABLE,
    Key: {
      PK: `FORM#${bidId}`,
      SK: `FORM#${bidId}`,
    },
    ReturnConsumedCapacity: "TOTAL",
  };
  
  try {
    const data = await docClient.get(params).promise();

    console.log(`data: ${JSON.stringify(data, null, 2)}`);
    return data.Item;

    } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};


export default getBidById;