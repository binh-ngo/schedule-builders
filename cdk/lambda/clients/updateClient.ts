const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Client, ClientInput } from "../types";
import getClientById from "./getClientById";

const updateClient = async (
    clientName: string,
    clientId: string,
    clientInput: ClientInput
) => {

    if (!clientInput) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    };
    
    if (!clientName || !clientId) {
        return { statusCode: 400, body: 'invalid request, you are missing the pk or sk.' };
    }

    const retrievedClient = await getClientById(clientName, clientId);

        const client: Client = {
            clientId,
            clientName: clientInput.clientName,
            clientPhone: clientInput.phone,
            username: clientInput.username,
            address: clientInput.address,
            city: clientInput.city,
            email: clientInput.email,
            // imageUrl: clientInput.imageUrl,
            createdAt: retrievedClient.createdAt,
            updatedAt: new Date().toISOString(),
        };

        console.log(`UPDATE contractor called with:` + JSON.stringify(` UserPK: ${clientName} and UserSk: ${clientId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF CONTRACTORINPUT --------- ${typeof (clientInput)}`);
    
        const params = {
        TableName: process.env.CONTRACTORS_TABLE,
        Key: {
            PK: `CLIENT#${clientName}`,
            SK: `CLIENT#${clientId}`,
        },
        UpdateExpression:
            "set #clientName = :clientName, #clientPhone = :clientPhone,  #address = :address,  #email = :email,  #city = :city, #updatedAt = :updatedAt, #createdAt = :createdAt, #clientId = :clientId",
        ExpressionAttributeNames: {
            "#clientName": "clientName",
            "#clientPhone": "clientPhone",
            "#address": "address",
            "#email": "email",
            "#city": "city",
            "#updatedAt": "updatedAt",
            "#createdAt": "createdAt",
            "#clientId": "clientId",
        },
        ExpressionAttributeValues: {
            ":clientName": client.clientName,
            ":clientPhone": client.clientPhone,
            ":address": client.address,
            ":email": client.email,
            ":city": client.city,
            ":updatedAt": client.updatedAt,
            ":createdAt": client.createdAt,
            ":clientId": client.clientId,
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    const additionalParams = {
        TableName: process.env.CONTRACTORS_TABLE,
        Key: {
            PK: `CLIENTS`,
            SK: `CLIENT#${clientName}`,
        },
        UpdateExpression:
            "set #clientName = :clientName, #clientPhone = :clientPhone,  #address = :address,  #email = :email,  #city = :city, #updatedAt = :updatedAt, #createdAt = :createdAt, #clientId = :clientId",
            ExpressionAttributeNames: {
            "#clientId": "clientId",
            "#clientName": "clientName",
            "#clientPhone": "clientPhone",
            "#address": "address",
            "#email": "email",
            "#city": "city",
            "#updatedAt": "updatedAt",
            "#createdAt": "createdAt",
        },
        ExpressionAttributeValues: {
            ":clientId": client.clientId,
            ":clientName": client.clientName,
            ":clientPhone": client.clientPhone,
            ":address": client.address,
            ":email": client.email,
            ":city": client.city,
            ":updatedAt": client.updatedAt,
            ":createdAt": client.createdAt,
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`additionalParams: ${JSON.stringify(params, null, 2)}`);

    try {
        const updatedClient = await docClient.update(params).promise();

        console.log(`updatedClient: ${JSON.stringify(updatedClient, null, 2)}`);

        if(updatedClient) {
            await docClient.update(additionalParams).promise();
        }
        return updatedClient.Attributes;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateClient;