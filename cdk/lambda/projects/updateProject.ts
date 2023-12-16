const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Project, ProjectInput } from "../types";
import getProjectById from "./getProjectById";
import { ulid } from "ulid";

const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
});

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
        clientUsername: retrievedProject.clientUsername,
        clientId: retrievedProject.clientId,
        projectId: retrievedProject.projectId,
        email: projectInput.email ? projectInput.email : retrievedProject.email,
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
        earlyEstimate: retrievedProject.earlyEstimate,
        estimate: projectInput.estimate ? projectInput.estimate : retrievedProject.estimate,
        startDate: projectInput.startDate ? projectInput.startDate : retrievedProject.startDate,
        endDate: projectInput.endDate ? projectInput.endDate : retrievedProject.endDate,
        desiredCompletionTime: projectInput.desiredCompletionTime ? projectInput.desiredCompletionTime : retrievedProject.desiredCompletionTime,
        clientCost: projectInput.clientCost ? projectInput.clientCost : retrievedProject.clientCost,
        customAttributes: projectInput.customAttributes ? projectInput.customAttributes : retrievedProject.customAttributes,
        isCompleted: projectInput.isCompleted ? projectInput.isCompleted : retrievedProject.isCompleted,
        isPublished: projectInput.isPublished ? projectInput.isPublished : retrievedProject.isPublished,
        publishDate: projectInput.publishDate ? projectInput.publishDate : retrievedProject.publishDate,
        createdAt: retrievedProject.createdAt,
        updatedAt: new Date().toISOString(),
    };
// TODO: Code below is a simplified way of writing the project object but it doesnt
// work. need to troubleshoot
    // const project: Project = {
    //     ...retrievedProject, // Spread the retrieved project's properties
    //     ...projectInput,   // Spread the updated properties
    //     updatedAt: new Date().toISOString(),
    // };
    const username = project.email ? project.email.split("@")[0] : '';

    try {

        if (projectInput.imageUrls) {
            const imageUrls = await Promise.all(projectInput.imageUrls.map(async (imageUrl: string) => {
                return await generateUploadURL(username, projectId);
            }));
            project.imageUrls = imageUrls;
        }
        

        console.log(`UPDATE project called with:` + JSON.stringify(`Project ID: ${projectId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF projectInput --------- ${typeof (projectInput)}`);

        const params = {
            RequestItems: {
                "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB":
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
                                    PK: `CLIENT#${username}`,
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

        await docClient.batchWrite(params).promise();

        console.log(`updatedProject: ${JSON.stringify(project, null, 2)}`);

        return project;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export async function generateUploadURL(username: string, projectId: string) {
    const imageId = ulid().slice(-5);
    const params = ({
        Bucket: process.env.BUCKET_NAME,
        Key: `clients/${username}/${projectId}-${imageId}.jpg`,
        Expires: 120
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
}
export default updateProject;