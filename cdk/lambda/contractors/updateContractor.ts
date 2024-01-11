const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Contractor, ContractorInput } from "../types";
import getContractorById from "./getContractorById";

const updateContractor = async (
    contractorId: string,
    contractorInput: ContractorInput
) => {

    if (!contractorInput) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    };
    
    if (!contractorId) {
        return { statusCode: 400, body: 'invalid request, you are missing the pk or sk.' };
    }

    const retrievedContractor = await getContractorById(contractorId);

        const contractor: Contractor = {
            contractorId,
            contractorName: retrievedContractor.contractorName,
            company: contractorInput.company ? contractorInput.company : retrievedContractor.company,
            description: contractorInput.description ? contractorInput.description : retrievedContractor.description,
            specialty: contractorInput.specialty ? contractorInput.specialty : retrievedContractor.specialty,
            address: contractorInput.address ? contractorInput.address : retrievedContractor.address,
            city: contractorInput.city ? contractorInput.city : retrievedContractor.city,
            email: contractorInput.email ? contractorInput.email : retrievedContractor.email,
            imageUrl: contractorInput.imageUrl ? contractorInput.imageUrl : retrievedContractor.imageUrl,
            phone: contractorInput.phone ? contractorInput.phone : retrievedContractor.phone,
            numProjects: retrievedContractor.numProjects,
            rating: retrievedContractor.rating,
            createdAt: retrievedContractor.createdAt,
            updatedAt: new Date().toISOString(),
        };

        console.log(`UPDATE contractor called with:` + JSON.stringify(` UserPK: ${contractor.contractorName} and UserSk: ${contractorId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF CONTRACTORINPUT --------- ${typeof (contractorInput)}`);
    
        const params = {
            RequestItems: {
                "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
                    {
                        PutRequest: {
                            Item: {
                                PK: `CONTRACTORS`,
                                SK: `CONTRACTOR#${contractor.contractorName}`,
                                type: "contractor",
                                ...contractor
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                PK: `CONTRACTOR#${contractorId}`,
                                SK: `CONTRACTOR#${contractor.contractorName}`,
                                type: 'contractor',
                                ...contractor,
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                PK: `CONTRACTOR#${contractorId}`,
                                SK: `CONTRACTOR#${contractorId}`,
                                type: 'contractor',
                                ...contractor,
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

        console.log(`updatedContractor: ${JSON.stringify(contractor, null, 2)}`);

        return contractor;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateContractor;