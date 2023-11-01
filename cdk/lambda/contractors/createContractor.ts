const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Contractor, ContractorInput } from "../types";
require("dotenv").config({ path: ".env" });

const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
});
const createContractor = async (contractorInput: ContractorInput) => {
    const contractorId = ulid();
    const formattedName = contractorInput.contractorName ? contractorInput.contractorName.trim().replace(/\s+/g, "") : "";
    
    try {

        const imageUrl = await generateUploadURL(formattedName, contractorId);
        
        // Create the Contractor object with S3 URLs
    const contractor: Contractor = {
        contractorId,
        contractorName: formattedName,
        company: contractorInput.company,
        specialty: contractorInput.specialty,
        address: contractorInput.address,
        city: contractorInput.city,
        email: contractorInput.email,
        imageUrl,
        phone: contractorInput.phone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    
    const params = {
        RequestItems: {
            "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
                {
                        PutRequest: {
                            Item: {
                                PK: `CONTRACTORS`,
                                SK: `CONTRACTOR#${formattedName}`,
                                type: "contractor",
                                ...contractor
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                PK: `CONTRACTOR#${contractorId}`,
                                SK: `CONTRACTOR#${formattedName}`,
                                type: 'contractor',
                                ...contractor,
                            },
                        },
                    },
                ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };


        await docClient.batchWrite(params).promise();
        console.log(`Created contractor: ${JSON.stringify(contractor, null, 2)}`);
        return contractor;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export async function generateUploadURL(contractorName:string, contractorId:string) {

    const params = ({
      Bucket: process.env.BUCKET_NAME,
      Key: `images/contractors/${contractorName}-${contractorId}.jpg`,
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
  }
export default createContractor;
