const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { SurveyForm, SurveyFormInput } from "../types";

require("dotenv").config({ path: ".env" });


const createSurveyForm = async (surveyFormInput: SurveyFormInput) => {
    const jobId = ulid();

    const formattedName = surveyFormInput.owner ? surveyFormInput.owner.trim().replace(/\s+/g, "") : "";

    const surveyForm: SurveyForm = {
        jobId: jobId,
        owner: formattedName,
        date: surveyFormInput.date,
        clientPhone: surveyFormInput.clientPhone,
        email: surveyFormInput.email,
        address: surveyFormInput.address,
        city: surveyFormInput.city,
        squareFootage: surveyFormInput.squareFootage,
        yearBuilt: surveyFormInput.yearBuilt,
        bathrooms: surveyFormInput.bathrooms,
        otherRoom: surveyFormInput.otherRoom,
        typeOfPiping: surveyFormInput.typeOfPiping,
        mainLine: surveyFormInput.mainLine,
        misc: surveyFormInput.misc,
        additionalNotes: surveyFormInput.additionalNotes,
        contractPrice: surveyFormInput.contractPrice,
        salesTax: surveyFormInput.salesTax,
        downPayment: surveyFormInput.downPayment,
        pipingInstalledPayment: surveyFormInput.pipingInstalledPayment,
        uponCompletionPayment: surveyFormInput.uponCompletionPayment,
        salesPerson: surveyFormInput.salesPerson,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Store SurveyForm and Client data in DynamoDB
    const params = {
        RequestItems: {
            "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
                {
                    PutRequest: {
                        Item: {
                            PK: `SURVEYFORMS`,
                            SK: `SURVEYFORM#${jobId}`,
                            type: "surveyForm",
                            ...surveyForm
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `SURVEYFORM#${jobId}`,
                            SK: `SURVEYFORM#${jobId}`,
                            type: 'surveyForm',
                            ...surveyForm,
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `CLIENT#${surveyForm.owner}`,
                            SK: `SURVEYFORM#${jobId}`,
                            type: 'surveyForm',
                            ...surveyForm,
                        },
                    },
                },
                // {
                //     PutRequest: {
                //         Item: {
                //             PK: `CLIENTS`,
                //             SK: `CLIENT#${surveyForm.owner}`,
                //             type: 'client',
                //             ...client,
                //         },
                //     },
                // },
                // {
                //     PutRequest: {
                //         Item: {
                //             PK: `CLIENT#${surveyForm.owner}`,
                //             SK: `CLIENT#${clientId}`,
                //             type: 'client',
                //             ...client,
                //         },
                //     },
                // },
            ],
        },
        ReturnConsumedCapacity: "TOTAL",
    };
    
    try {
        const newSurveyForm = await docClient.batchWrite(params).promise();
        console.log(`Created surveyForm: ${JSON.stringify(surveyForm, null, 2)}`);
        console.log(`Created client: ${JSON.stringify(client, null, 2)}`);
        return surveyForm;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createSurveyForm;
