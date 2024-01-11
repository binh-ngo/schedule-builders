const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const getContractorById = async (contractorId: string) => {
  console.log(`getContractorById called with: (${contractorId})`);

  if (!contractorId) {
    return { statusCode: 400, body: `Error: You are missing the client ID` };
  }

  const params = {
    TableName: process.env.CONTRACTORS_TABLE,
    Key: {
      PK: `CONTRACTOR#${contractorId}`,
      SK: `CONTRACTOR#${contractorId}`,
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


export default getContractorById;