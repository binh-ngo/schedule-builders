const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteForm = async (formName: string, formId: string) => {
  console.log(
    `deleteForm invocation event: ${JSON.stringify(`Form Name: ${formName}, Form Id: ${formId}`, null, 2)}`
  );

  const batchWriteParams = {
    RequestItems: {
      "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
        {
          DeleteRequest: {
            Key: {
              PK: `FORMS`,
              SK: `FORM#${formId}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `FORM#${formName}`,
              SK: `FORM#${formId}`,
            },
          },
        },
      ],
    },
  };

  console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)

  try {
    await docClient.batchWrite(batchWriteParams).promise();
    
    return `Deleted formId: ${formId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteForm;