const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteClient = async (clientName: string, clientId: string) => {
  console.log(
    `deleteClient invocation event: ${JSON.stringify(`Client Name: ${clientName}, client Id: ${clientId}`, null, 2)}`
  );

  const batchWriteParams = {
    RequestItems: {
      "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
        {
          DeleteRequest: {
            Key: {
              PK: `CLIENTS`,
              SK: `CLIENT#${clientName}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `CLIENT#${clientName}`,
              SK: `CLIENT#${clientId}`,
            },
          },
        },
      ],
    },
  };

  console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)

  try {
    await docClient.batchWrite(batchWriteParams).promise();

    // const chefPosts = await getAllPosts(name);

    // for(let i=0; i < chefPosts.length; i++ ) {
    //   await deletePost(name, chefPosts[i].postId);
    // }
    
    return `Deleted ClientId: ${clientId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteClient;