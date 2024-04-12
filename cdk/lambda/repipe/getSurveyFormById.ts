const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const getSurveyFormById = async (jobId: string) => {
  console.log(`getSurveyFormById called with: (${jobId})`);

  if (!jobId) {
    return { statusCode: 400, body: `Error: You are missing the client ID` };
  }

  const params = {
    TableName: process.env.CONTRACTORS_TABLE,
    Key: {
      PK: `SURVEYFORM#${jobId}`,
      SK: `SURVEYFORM#${jobId}`,
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


export default getSurveyFormById;