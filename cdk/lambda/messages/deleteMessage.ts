const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteMessage = async (messageId: string, projectId: string) => {
  console.log(
    `deleteMessage invocation event: ${JSON.stringify(`Project ID: ${projectId}, Message Id: ${messageId}`, null, 2)}`
  );

  const batchWriteParams = {
    RequestItems: {
      "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
        // {
        //   DeleteRequest: {
        //     Key: {
        //       PK: `MESSAGES`,
        //       SK: `MESSAGE#${messageId}`,
        //     },
        //   },
        // },
        {
          DeleteRequest: {
            Key: {
              PK: `MESSAGE#${messageId}`,
              SK: `MESSAGE#${messageId}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `PROJECT#${projectId}`,
              SK: `MESSAGE#${messageId}`,
            },
          },
        },
      ],
    },
  };

  console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)

  try {
    await docClient.batchWrite(batchWriteParams).promise();
    
    return `Deleted messageId: ${messageId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteMessage;