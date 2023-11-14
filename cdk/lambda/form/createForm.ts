const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { FormInput } from "../types";
import { ProjectAttributesManager, ProjectFormManager } from "./ProjectFormManager";
require("dotenv").config({ path: ".env" });

const createForm = async (formInput: FormInput) => {
    const formId = ulid();

    const projectForm = new ProjectFormManager();
    const projectAttributes = new ProjectAttributesManager();

    const form = {
        formId,
        formName: formInput.formName,
        questions: formInput.questions,
        customAttributes: formInput.customAttributes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),        
    }

    if (formInput.questions) {
        formInput.questions.forEach((question, index) => {

            // Add the custom question to the form
            projectForm.addCustomQuestion(question);

            // Set the answer for the current question
            const { name, value } = formInput.customAttributes[index];
            projectAttributes.setAttributeWithPrefix('question_', index.toString(), value);
        })}
        
        const params = {
            RequestItems: {
                "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
                    {
                        PutRequest: {
                            Item: {
                                PK: `FORMS`,
                                SK: `FORM#${formId}`,
                                type: "form",
                                ...form,
                                ...projectAttributes.getAttributes()
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `FORM#${formInput.formName}`,
                            SK: `FORM#${formId}`,
                            type: "form",
                            ...form,
                            ...projectAttributes.getAttributes()
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `FORM#${formId}`,
                            SK: `FORM#${formId}`,
                            type: "form",
                            ...form,
                            ...projectAttributes.getAttributes()
                        },
                    },
                },
            ],
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    try {
        await docClient.batchWrite(params).promise();
        console.log(`Created form: ${JSON.stringify(projectForm, null, 2)}`);
        return projectForm;
    } catch (err) {
        console.error('Error creating form:', err);
        throw err;
    }

};

export default createForm;
