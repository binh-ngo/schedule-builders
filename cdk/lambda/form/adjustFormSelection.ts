const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

export const adjustFormSelection = async (
    formId: string,
    isSelected: boolean
) => {

        const params = {
            TableName: process.env.CONTRACTORS_TABLE,
            Key: {
                PK: `FORMS`,
                SK: `FORM#${formId}`,
            },
            UpdateExpression:
                "set #isSelected = :isSelected",
            ExpressionAttributeNames: {
                "#isSelected": "isSelected",
            },
            ExpressionAttributeValues: {
                ":isSelected": isSelected,
            },
            ReturnValues: "ALL_NEW",
            ReturnConsumedCapacity: "TOTAL",
        };

        console.log(`params: ${JSON.stringify(params, null, 2)}`);

        try {
            const updatedForm = await docClient.update(params).promise();

            console.log(`updatedForm: ${JSON.stringify(updatedForm, null, 2)}`);

            return updatedForm.Attributes;
        } catch (err) {
            console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

            return null;
    }
};
