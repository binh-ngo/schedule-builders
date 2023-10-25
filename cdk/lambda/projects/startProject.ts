import { Project } from "../types";
import getProjectById from "./getProjectById";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const startProject = async (
    projectId: string,
    startDate: string
) => {

    const retrievedProject = await getProjectById(projectId);
    // const project: Project = {
    //     clientId: retrievedProject.clientId,
    //     clientName: retrievedProject.clientName,
    //     address: retrievedProject.address,
    //     city: retrievedProject.city,
    //     locationType: retrievedProject.locationType,
    //     projectId: retrievedProject.projectId,
    //     description: retrievedProject.description,
    //     imageUrls: retrievedProject.imageUrls,
    //     contractorName: retrievedProject.contractorName,
    //     contractorId: retrievedProject.contractorId,
    //     estimate,
    //     startDate: retrievedProject.startDate,
    //     endDate: retrievedProject.endDate,
    //     desiredCompletionTime: retrievedProject.desiredCompletionTime,
    //     clientCost: retrievedProject.clientCost,
    //     createdAt: retrievedProject.createdAt,
    //     updatedAt: new Date().toISOString(),
    // }
    const project: Project = {
        ...retrievedProject,
        startDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    const entitiesToUpdate = [
        { PK: `PROJECTS`, SK: `PROJECT#${projectId}` },
        { PK: `PROJECT#${projectId}`, SK: `PROJECT#${projectId}` },
        { PK: `CLIENT#${retrievedProject.clientName}`, SK: `PROJECT#${projectId}` },
      ];

      const batchWriteRequests = entitiesToUpdate.map((entity) => ({
        PutRequest: {
          Item: {
            ...entity,
            type: "project",
            ...project,
          },
        },
      }));

    const params = {
        RequestItems: {
            "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": batchWriteRequests,
                // {
                //     PutRequest: {
                //         Item: {
                //             PK: `PROJECTS`,
                //             SK: `PROJECT#${projectId}`,
                //             type: "project",
                //             ...project
                //         },
                //     },
                // },
                // {
                //     PutRequest: {
                //         Item: {
                //             PK: `PROJECT#${projectId}`,
                //             SK: `PROJECT#${projectId}`,
                //             type: 'project',
                //             ...project,
                //         },
                //     },
                // },
                // {
                //     PutRequest: {
                //         Item: {
                //             PK: `CLIENT#${project.clientName}`,
                //             SK: `PROJECT#${projectId}`,
                //             type: 'project',
                //             ...project,
                //         },
                //     },
                // },
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    try {
        await docClient.batchWrite(params).promise();

        console.log(`updatedProjectEstimate: ${JSON.stringify(project, null, 2)}`);

        return project;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default startProject;