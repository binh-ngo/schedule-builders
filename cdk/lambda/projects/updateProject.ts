const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Project, ProjectInput } from "../types";
import getProjectById from "./getProjectById";

const updateProject = async (
    projectId: string,
    projectInput: ProjectInput
) => {

    if (!projectInput || !projectId) {
        return { statusCode: 400, body: 'Invalid request, missing parameters' };
      }
    const retrievedProject = await getProjectById(projectId);

        const project: Project = {
            clientName: retrievedProject.clientName,
            clientId: retrievedProject.clientId,
            projectId: retrievedProject.projectId,
            clientPhone: projectInput.clientPhone ? projectInput.clientPhone : retrievedProject.clientPhone,
            address: projectInput.address ? projectInput.address : retrievedProject.address,
            city: projectInput.city ? projectInput.city : retrievedProject.city,
            description: projectInput.description ? projectInput.description : retrievedProject.description,
            material: projectInput.material ? projectInput.material : retrievedProject.material,
            projectSize: projectInput.projectSize ? projectInput.projectSize : retrievedProject.projectSize,
            projectType: projectInput.projectType ? projectInput.projectType : retrievedProject.projectType,
            propertyType: projectInput.propertyType ? projectInput.propertyType : retrievedProject.propertyType,
            imageUrls: projectInput.imageUrls ? projectInput.imageUrls : retrievedProject.imageUrls,
            contractorId: projectInput.contractorId ? projectInput.contractorId : retrievedProject.contractorId,
            contractorName: projectInput.contractorName ? projectInput.contractorName : retrievedProject.contractorName,
            estimate: projectInput.estimate ? projectInput.estimate : retrievedProject.estimate,
            startDate: projectInput.startDate ? projectInput.startDate : retrievedProject.startDate,
            endDate: projectInput.endDate ? projectInput.endDate : retrievedProject.endDate,
            desiredCompletionTime: projectInput.desiredCompletionTime ? projectInput.desiredCompletionTime : retrievedProject.desiredCompletionTime,
            clientCost: projectInput.clientCost ? projectInput.clientCost : retrievedProject.clientCost,
            createdAt: retrievedProject.createdAt,
            updatedAt: new Date().toISOString(),
        };
          
        console.log(`UPDATE project called with:` + JSON.stringify(`Project ID: ${projectId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF projectInput --------- ${typeof (projectInput)}`);
    
        const params = {
            RequestItems: {
                "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": // batchWriteRequests
                [
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
                ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    try {
        await docClient.batchWrite(params).promise();

        console.log(`updatedProject: ${JSON.stringify(project, null, 2)}`);

        return project;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateProject;