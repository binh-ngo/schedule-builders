import { Project } from "../types";
import getProjectById from "./getProjectById";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const {SNSClient, PublishCommand} = require('@aws-sdk/client-sns');

const snsClient = new SNSClient({region: 'us-east-1'});

const publishProject = async (
    projectId: string,
    isPublished: boolean
) => {

    const retrievedProject = await getProjectById(projectId);

    if (!retrievedProject) {
        console.error(`Project with ID ${projectId} not found.`);
    }
    const username = retrievedProject.email ? retrievedProject.email.split("@")[0] : '';

    const city = retrievedProject && retrievedProject.city ? retrievedProject.city : null;
    if (!city) {
        console.error(`City not found for project with ID ${projectId}.`);
    }
    
    const project: Project = {
        ...retrievedProject,
        isPublished: isPublished ? isPublished : retrievedProject.isPublished,
        publishDate: isPublished ? new Date().toISOString() : ''
    }

    const params = {
        RequestItems: {
            "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB":
                [
                    {
                        PutRequest: {
                            Item: {
                                type: "project",
                                ...project,
                                PK: `PROJECTS`,
                                SK: `PROJECT#${projectId}`
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                type: 'project',
                                ...project,
                                PK: `PROJECT#${projectId}`,
                                SK: `PROJECT#${projectId}`,
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                type: 'project',
                                ...project,
                                PK: `CLIENT#${username}`,
                                SK: `PROJECT#${projectId}`,
                            },
                        },
                    },
                ],
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);
    
    const snsParams = {
        Subject: "New Project Created",
        Message: `A new project in the ${city} area has entered the Workshop! Check it out: https://schedule.builders/pro/workshop
        `, 
        TopicArn: process.env.TOPIC_ARN
      };
      console.log(process.env.TOPIC_ARN)

    try {
        const updatedProject = await docClient.batchWrite(params).promise();

        console.log(`updatedPublishProject: ${JSON.stringify(updatedProject, null, 2)}`);


        if (updatedProject) {
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
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default publishProject;