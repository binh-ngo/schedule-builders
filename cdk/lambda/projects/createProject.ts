const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Client, Project, ProjectInput } from "../types";
import { calculateProjectEstimate } from "./costEstimator";
const {SNSClient, PublishCommand} = require('@aws-sdk/client-sns');

const snsClient = new SNSClient({region: 'us-east-1'});

require("dotenv").config({ path: ".env" });

// TODO: as of right now, clients don't need to sign in, so they have to fill out the 
// form every time they want to do another project
const createProject = async (projectInput: ProjectInput) => {
    const projectId = ulid();
    const clientId = ulid();

    const formattedName = projectInput.clientName ? projectInput.clientName.trim().replace(/\s+/g, "") : "";

    function extractUsernameFromEmail(email: string) {
        const emailParts = email.split('@');
        if (emailParts.length !== 2) {
            console.error('Invalid email format');
            return null;
        }
    
        const username = emailParts[0];
        return username;
    }

    const client: Client = {
        clientId,
        clientName: formattedName,
        clientPhone: projectInput.clientPhone,
        username: extractUsernameFromEmail(projectInput.email)!,
        address: projectInput.address,
        city: projectInput.city,
        email: projectInput.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Patios 10-20 / sqft
    // https://www.bankrate.com/homeownership/how-much-does-it-cost-to-build-a-deck/#how-much-it-costs

    const project: Project = {
        clientId,
        clientName: formattedName,
        clientPhone: projectInput.clientPhone,
        email: projectInput.email,
        address: projectInput.address,
        city: projectInput.city,
        projectId,
        description: projectInput.description,
        imageUrls: projectInput.imageUrls,
        material: projectInput.material,
        projectSize: projectInput.projectSize,
        projectType: projectInput.projectType,
        propertyType: projectInput.propertyType,
        contractorName: '',
        contractorId: '',
        earlyEstimate: calculateProjectEstimate(projectInput.material, projectInput.projectType, projectInput.projectSize),
        estimate: 0,
        startDate: projectInput.startDate,
        endDate: projectInput.endDate,
        desiredCompletionTime: projectInput.desiredCompletionTime,
        clientCost: 0,
        customAttributes: projectInput.customAttributes,
        isCompleted: false,
        isPublished: false,
        publishDate: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Store Project and Client data in DynamoDB
    const params = {
        RequestItems: {
            "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
                {
                    PutRequest: {
                        Item: {
                            PK: `PROJECTS`,
                            SK: `PROJECT#${projectId}`,
                            type: "project",
                            ...project
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `PROJECT#${projectId}`,
                            SK: `PROJECT#${projectId}`,
                            type: 'project',
                            ...project,
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `CLIENT#${client.username}`,
                            SK: `PROJECT#${projectId}`,
                            type: 'project',
                            ...project,
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `CLIENTS`,
                            SK: `CLIENT#${client.username}`,
                            type: 'client',
                            ...client,
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `CLIENT#${client.username}`,
                            SK: `CLIENT#${clientId}`,
                            type: 'client',
                            ...client,
                        },
                    },
                },
            ],
        },
        ReturnConsumedCapacity: "TOTAL",
    };
    
    const snsParams = {
        Subject: "New Project Created",
        Message: `A new project in the ${client.city} area has entered the Workshop! Check it out: https://schedule.builders/pro/workshop
        `, 
        TopicArn: process.env.TOPIC_ARN
      };
      console.log(process.env.TOPIC_ARN)
    try {
        const newProject = await docClient.batchWrite(params).promise();
        console.log(`Created project: ${JSON.stringify(project, null, 2)}`);
        console.log(`Created client: ${JSON.stringify(client, null, 2)}`);

        if (newProject) {
            try{
                const snsResult = await snsClient.send(new PublishCommand(snsParams));
                console.log(`SNS Result: ${JSON.stringify(snsResult, null, 2)}`);
            } catch (err) {
                console.log(`SNS Error: ${JSON.stringify(err, null, 2)}`);
                throw err;
            }
        };
        return project;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createProject;
