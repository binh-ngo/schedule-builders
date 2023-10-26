import { API } from "aws-amplify";

export type SaveContractorProps = {
    contractorName: string;
    contractorId: string;
    company: string;
    specialty: string;
    address: string;
    phone: string;
    city: string;
    email: string;
    imageUrl: string;
    clientId: string;
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
        address
        city:
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
      phone: contractorInput.phone,
      imageUrl: contractorInput.imageUrl
    },
  },
  authMode: "AMAZON_COGNITO_USER_POOLS",
});
console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
return resp;
  };
// =====================
// GET CONTRACTOR BY ID
// =====================

const getContractorByIdQuery = `
query getContractorById($contractorName: String!, $contractorId: String!) {
    getContractorById(contractorName: $contractorName, contractorId: $contractorId) {
        contractorId
        contractorName
        company
        specialty
        address
        city:
        phone
        email
        imageUrl
        createdAt
        updatedAt
    }
  }
`

export const ddbGetContractorById = async (contractorName: string, contractorId: string) => {
    const resp = await API.graphql({
      query: getContractorByIdQuery,
      variables: {
        contractorName,
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
        clientId
        clientName
        address
        city
        email
        phone
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
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    return resp.data.getAllContractors;
  }; 

// ===================
// UPDATE CONTRACTORS
// ===================

const updateContractorQuery = `
    mutation updateContractor($contractorName: String!, $contractorId: String!, $contractorInput: ContractorInput!) {
      updateContractor(contractorName: $contractorName, contractorId: $contractorId, contractorInput: $ContractorInput) {
        contractorId
        contractorName
        company
        specialty
        address
        city:
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
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
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
    console.log(`delete called for contractor ${contractorName}`);
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
    console.log(`successfully deleted: ${resp.data.deleteContractor}`);
  };
