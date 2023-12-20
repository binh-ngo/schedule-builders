const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Client, Project, ProjectInput } from "../types";
import { calculateProjectEstimate, ProjectEstimateProps } from "./costEstimator";

require("dotenv").config({ path: ".env" });
const config = {
    region: 'us-east-1'
}
const sns = new AWS.SNS();

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
        clientUsername: extractUsernameFromEmail(projectInput.email)!,
        address: projectInput.address,
        city: projectInput.city,
        email: projectInput.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Patios 10-20 / sqft
    // https://www.bankrate.com/homeownership/how-much-does-it-cost-to-build-a-deck/#how-much-it-costs

    const costEstimatorObject: ProjectEstimateProps = {
        material: projectInput.material ?? 'NA',
        projectType: projectInput.projectType ?? 'NA',
        projectSize: projectInput.projectSize ?? 1
    }

    const project: Project = {
        clientId,
        clientName: formattedName,
        clientUsername: client.clientUsername,
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
        earlyEstimate: calculateProjectEstimate(costEstimatorObject),
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
                            PK: `CLIENT#${client.clientUsername}`,
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
                            SK: `CLIENT#${client.clientUsername}`,
                            type: 'client',
                            ...client,
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `CLIENT#${client.clientUsername}`,
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
        const newProject = await docClient.batchWrite(params).promise();
        console.log(`Created project: ${JSON.stringify(project, null, 2)}`);
        console.log(`Created client: ${JSON.stringify(client, null, 2)}`);

        const topicParams = {
            Name: `ProjectBidNotifications-${projectId}`,
        };
        const snsTopic = await sns.createTopic(topicParams).promise();

        const subscribeParams = {
            Protocol: "email", 
            TopicArn: snsTopic.TopicArn,
            Endpoint: projectInput.email,
        };
        await sns.subscribe(subscribeParams).promise();
        return project;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createProject;
