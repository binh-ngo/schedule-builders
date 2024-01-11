import { API } from "aws-amplify";

export type SaveContractorProps = {
    contractorName: string;
    contractorId?: string;
    company: string;
    specialty: string;
    description: string;
    address: string;
    phone: string;
    city: string;
    email: string;
    imageUrl: File | null;
    clientId?: string;
}
// ==================
// CREATE CONTRACTOR
// ==================

const createContractorQuery = `
  mutation createContractor($contractorInput: ContractorInput!) {
    createContractor(contractorInput: $contractorInput) {
        contractorId
        contractorName
        company
        specialty
        description
        address
        city
        phone
        email
        imageUrl
        createdAt
        updatedAt
    }
  }
`;

export const ddbCreateContractor = async (contractorInput: SaveContractorProps) => {

const resp = await API.graphql({
  query: createContractorQuery,
  variables: {
    contractorInput: {
      contractorName: contractorInput.contractorName,
      address: contractorInput.address,
      city: contractorInput.city,
      email: contractorInput.email,
      company: contractorInput.company,
      specialty: contractorInput.specialty,
      description: contractorInput.description,
      phone: contractorInput.phone,
      imageUrl: contractorInput.imageUrl
    },
  },
  authMode: "API_KEY",
});
// console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
return resp;
  };
// =====================
// GET CONTRACTOR BY ID
// =====================

const getContractorByIdQuery = `
query getContractorById($contractorId: String!) {
    getContractorById(contractorId: $contractorId) {
        contractorId
        contractorName
        company
        specialty
        description
        address
        city
        phone
        email
        imageUrl
        createdAt
        updatedAt
    }
  }
`

export const ddbGetContractorById = async (contractorId: string) => {
    const resp = await API.graphql({
      query: getContractorByIdQuery,
      variables: {
        contractorId,
      },
      authMode: "API_KEY"
    });
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    const contractor = resp.data.getContractorById;
    // console.log(`post.content: ${post.content}`);
    return contractor;
  };

// ===================
// GET ALL CONTRACTORS
// ===================

  const getAllContractorsQuery = `
  query getAllContractors {
      getAllContractors {
        contractorId
        contractorName
        company
        specialty
        description
        address
        city
        phone
        email
        imageUrl
        createdAt
        updatedAt
      }
    }
  `
  export const ddbGetAllContractors = async () => {
    const resp = await API.graphql({ 
      query: getAllContractorsQuery,
      authMode: "API_KEY"
    });
    // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    return resp.data.getAllContractors;
  }; 

// ===================
// UPDATE CONTRACTORS
// ===================

const updateContractorQuery = `
    mutation updateContractor($contractorId: String!, $contractorInput: ContractorInput!) {
      updateContractor(contractorId: $contractorId, contractorInput: $ContractorInput) {
        contractorId
        contractorName
        company
        specialty
        description
        address
        city
        phone
        email
        imageUrl
        createdAt
        updatedAt
      }
    }
  `;

  export const ddbUpdateContractor = async (contractorInput: SaveContractorProps) => {
    const resp = await API.graphql({
      query: updateContractorQuery,
      variables: {
        contractorName: contractorInput.contractorName,
        contractorId: contractorInput.contractorId,
        contractorInput: {
          contractorName: contractorInput.contractorName,
          phone: contractorInput.phone,
          address: contractorInput.address,
          company: contractorInput.company,
          specialty: contractorInput.specialty,
          imageUrl: contractorInput.imageUrl,
          city: contractorInput.city,
          email: contractorInput.email,
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  };

// ==============
// DELETE CLIENT
// ==============

const deleteContractorQuery = `
  mutation deleteContractor($contractorName: String!, $contractorId: String!) {
    deleteContractor(contractorName: $contractorName, contractorId: $contractorId)
  }
`;

export const ddbDeleteContractor = async (contractorName: string, contractorId: string) => {
    // console.log(`delete called for contractor ${contractorName}`);
    const resp = await API.graphql({
      query: deleteContractorQuery,
      variables: {
        contractorName,
        contractorId,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    // console.log(`successfully deleted: ${resp.data.deleteContractor}`);
  };
