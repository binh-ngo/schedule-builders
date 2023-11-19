const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteBid = async (projectId: string, bidId: string) => {
  console.log(
    `deleteBid invocation event: ${JSON.stringify(`ProjectId: ${projectId}, Form Id: ${bidId}`, null, 2)}`
  );

  const batchWriteParams = {
    RequestItems: {
      "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
        {
          DeleteRequest: {
            Key: {
              PK: `BIDS`,
              SK: `BID#${bidId}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `BID#${bidId}`,
              SK: `BID#${bidId}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `PROJECT#${projectId}`,
              SK: `BID#${bidId}`,
            },
          },
        },
      ],
    },
  };

  console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)

  try {
    await docClient.batchWrite(batchWriteParams).promise();
    
    return `Deleted bidId: ${bidId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteBid;