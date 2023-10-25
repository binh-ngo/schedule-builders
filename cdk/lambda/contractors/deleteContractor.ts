const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteContractor = async (contractorName: string, contractorId: string) => {
  console.log(
    `deleteContractor invocation event: ${JSON.stringify(`Client Name: ${contractorName}, client Id: ${contractorId}`, null, 2)}`
  );

  const batchWriteParams = {
    RequestItems: {
      "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
        {
          DeleteRequest: {
            Key: {
              PK: `CONTRACTORS`,
              SK: `CONTRACTOR#${contractorName}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `CONTRACTOR#${contractorName}`,
              SK: `CONTRACTOR#${contractorId}`,
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
    
    return `Deleted contractorId: ${contractorId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteContractor;