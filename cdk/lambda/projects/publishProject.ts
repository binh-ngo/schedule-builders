const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const publishProject = async (
    postId: string,
    published: boolean
) => {
    const params = {
        TableName: process.env.POSTS_TABLE,
        Key: {
            PK: `PROJECTS`,
            SK: `PROJECT#${postId}`,
        },
        UpdateExpression:
            "set #isPublished = :isPublished, #publishDate = :publishDate",
        ExpressionAttributeNames: {
            "#isPublished": "isPublished",
            "#publishDate": "publishDate",
        },
        ExpressionAttributeValues: {
            ":isPublished": published,
            ":publishDate": published ? new Date().toISOString() : '',
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    try {
        const updatedPost = await docClient.update(params).promise();

        console.log(`updatedPublishProject: ${JSON.stringify(updatedPost, null, 2)}`);

        return updatedPost.Attributes;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default publishProject;