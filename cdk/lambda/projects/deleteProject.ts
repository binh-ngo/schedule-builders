const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteProject = async (clientName: string, projectId: string) => {
  console.log(
    `deleteProject invocation event: ${JSON.stringify(`Client Name: ${clientName}, client Id: ${projectId}`, null, 2)}`
  );

  const batchWriteParams = {
    RequestItems: {
      "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
        {
          DeleteRequest: {
            Key: {
              PK: `PROJECTS`,
              SK: `PROJECT#${projectId}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `PROJECT#${projectId}`,
              SK: `PROJECT#${projectId}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `CLIENT#${clientName}`,
              SK: `PROJECT#${projectId}`,
            },
          },
        },
      ],
    },
  };

  console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)

  try {
    await docClient.batchWrite(batchWriteParams).promise();
    
    return `Deleted projectId: ${projectId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteProject;