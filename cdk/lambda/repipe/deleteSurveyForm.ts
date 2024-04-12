const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteSurveyForm = async (owner: string, jobId: string) => {
  console.log(
    `deleteSurveyForm invocation event: ${JSON.stringify(`Job Id: ${jobId}`, null, 2)}`
  );

  const batchWriteParams = {
    RequestItems: {
      "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
        {
          DeleteRequest: {
            Key: {
              PK: `SURVEYFORMS`,
              SK: `SURVEYFORM#${jobId}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `SURVEYFORM#${jobId}`,
              SK: `SURVEYFORM#${jobId}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `CLIENT#${owner}`,
              SK: `SURVEYFORM#${jobId}`,
            },
          },
        },
      ],
    },
  };

  console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)

  try {
    await docClient.batchWrite(batchWriteParams).promise();
    
    return `Deleted jobId: ${jobId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteSurveyForm;