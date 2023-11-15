const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { FormInput, QuestionsInput } from "../types";
import { ProjectAttributesManager, ProjectFormManager } from "./ProjectFormManager";
require("dotenv").config({ path: ".env" });

const createForm = async (formInput: FormInput) => {
    const formId = ulid();

    const projectForm = new ProjectFormManager();
    const projectAttributes = new ProjectAttributesManager();

    const formattedName = formInput.formName ? formInput.formName.trim().replace(/\s+/g, "") : "";

        const formQuestions = formInput.questions.map((question:QuestionsInput, index) => {
            // Add the custom question to the form
            projectForm.addCustomQuestion(question.question);
    
            // Set the answer to null
            const { name } = question.attributes;
            projectAttributes.setAttributeWithPrefix(name, '');
    
            return {
                question: question.question,
                attributes: {
                    name,
                    value: ''
                }
            };
        });
        
        const form = {
            formId,
            formName: formattedName,
            questions: formQuestions,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),        
        }

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
                        },
                    },
                },
            ],
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    try {
        await docClient.batchWrite(params).promise();
        console.log(`Created form: ${JSON.stringify(form, null, 2)}`);
        return form;
    } catch (err) {
        console.error('Error creating form:', err);
        throw err;
    }

};

export default createForm;
