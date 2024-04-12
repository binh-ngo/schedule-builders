const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { SurveyForm, SurveyFormInput } from "../types";
import { ulid } from "ulid";
import getSurveyFormById from "./getSurveyFormById";

const updateSurveyform = async (
    jobId: string,
    surveyFormInput: SurveyFormInput
) => {

    if (!surveyFormInput || !jobId) {
        return { statusCode: 400, body: 'Invalid request, missing parameters' };
    }
    const retrievedSurveyForm = await getSurveyFormById(jobId);

    const surveyForm: SurveyForm = {
        jobId: retrievedSurveyForm.jobId,
        owner: retrievedSurveyForm.owner,
        date: retrievedSurveyForm.date,
        email: surveyFormInput.email ? surveyFormInput.email : retrievedSurveyForm.email,
        clientPhone: surveyFormInput.clientPhone ? surveyFormInput.clientPhone : retrievedSurveyForm.clientPhone,
        address: surveyFormInput.address ? surveyFormInput.address : retrievedSurveyForm.address,
        city: surveyFormInput.city ? surveyFormInput.city : retrievedSurveyForm.city,
        squareFootage: surveyFormInput.squareFootage ? surveyFormInput.squareFootage : retrievedSurveyForm.squareFootage,
        yearBuilt: surveyFormInput.yearBuilt ? surveyFormInput.yearBuilt : retrievedSurveyForm.yearBuilt,
        bathrooms: surveyFormInput.bathrooms ? surveyFormInput.bathrooms : retrievedSurveyForm.bathrooms,
        otherRoom: surveyFormInput.otherRoom ? surveyFormInput.otherRoom : retrievedSurveyForm.otherRoom,
        typeOfPiping: surveyFormInput.typeOfPiping ? surveyFormInput.typeOfPiping : retrievedSurveyForm.typeOfPiping,
        mainLine: surveyFormInput.mainLine ? surveyFormInput.mainLine : retrievedSurveyForm.mainLine,
        misc: surveyFormInput.misc ? surveyFormInput.misc : retrievedSurveyForm.misc,
        additionalNotes: surveyFormInput.additionalNotes ? surveyFormInput.additionalNotes : retrievedSurveyForm.additionalNotes,
        contractPrice: surveyFormInput.contractPrice ? surveyFormInput.contractPrice : retrievedSurveyForm.contractPrice,
        salesTax: surveyFormInput.salesTax ? surveyFormInput.salesTax : retrievedSurveyForm.salesTax,
        downPayment: surveyFormInput.downPayment ? surveyFormInput.downPayment : retrievedSurveyForm.downPayment,
        pipingInstalledPayment: surveyFormInput.pipingInstalledPayment ? surveyFormInput.pipingInstalledPayment : retrievedSurveyForm.pipingInstalledPayment,
        uponCompletionPayment: surveyFormInput.uponCompletionPayment ? surveyFormInput.uponCompletionPayment : retrievedSurveyForm.uponCompletionPayment,
        salesPerson: surveyFormInput.salesPerson ? surveyFormInput.salesPerson : retrievedSurveyForm.salesPerson,
        createdAt: retrievedSurveyForm.createdAt,
        updatedAt: new Date().toISOString(),
    };

        console.log(`UPDATE surveyform called with:` + JSON.stringify(`Surveyform ID: ${jobId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF surveyFormInput --------- ${typeof (surveyFormInput)}`);

        const params = {
            RequestItems: {
                "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB":
                    [
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
                    ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

        console.log(`params: ${JSON.stringify(params, null, 2)}`);
    try {

        await docClient.batchWrite(params).promise();

        console.log(`updatedSurveyform: ${JSON.stringify(surveyForm, null, 2)}`);

        return surveyForm;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateSurveyform;