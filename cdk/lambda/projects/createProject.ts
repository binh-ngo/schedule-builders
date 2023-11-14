const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Client, Project, ProjectInput } from "../types";
require("dotenv").config({ path: ".env" });

// TODO: as of right now, clients don't need to sign in, so they have to fill out the 
// form every time they want to do another project
const createProject = async (projectInput: ProjectInput) => {
    const projectId = ulid();
    const clientId = ulid();

    const formattedName = projectInput.clientName ? projectInput.clientName.trim().replace(/\s+/g, "") : "";

    const client: Client = {
        clientId,
        clientName: formattedName,
        clientPhone: projectInput.clientPhone,
        address: projectInput.address,
        city: projectInput.city,
        email: projectInput.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const project: Project = {
        clientId,
        clientName: formattedName,
        clientPhone: projectInput.clientPhone,
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
        estimate: 0,
        startDate: '',
        endDate: '',
        desiredCompletionTime: projectInput.desiredCompletionTime,
        clientCost: 0,
        customAttributes: projectInput.customAttributes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Store Contractor data in DynamoDB
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
                            PK: `CLIENT#${project.clientName}`,
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
                            SK: `CLIENT#${formattedName}`,
                            type: 'client',
                            ...client,
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `CLIENT#${project.clientName}`,
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
    
    try {

        await docClient.batchWrite(params).promise();
        console.log(`Created project: ${JSON.stringify(project, null, 2)}`);
        console.log(`Created client: ${JSON.stringify(client, null, 2)}`);
        return project;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createProject;
