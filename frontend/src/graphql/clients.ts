import { API } from "aws-amplify";

export type SaveClientProps = {
    clientName: string;
    phone: string;
    address: string;
    city: string;
    email: string[];
    clientId: string;
}
// ==============
// CREATE CLIENT
// ==============

// handled in createProject

// ==============
// GET CLIENT BY ID
// ==============

const getClientByIdQuery = `
query getClientById($clientName: String!, $clientId: String!) {
    getClientById(clientName: $clientName, clientId: $clientId) {
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

export const ddbGetClientById = async (clientName: string, clientId: string) => {
    const resp = await API.graphql({
      query: getClientByIdQuery,
      variables: {
        clientName,
        clientId,
      },
      authMode: "API_KEY"
    });
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    const client = resp.data.getClientById;
    // console.log(`post.content: ${post.content}`);
    return client;
  };

// ==============
// GET ALL CLIENTS
// ==============

  const getAllClientsQuery = `
  query getAllClients {
      getAllClients {
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
  export const ddbGetAllClients = async () => {
    const resp = await API.graphql({ 
      query: getAllClientsQuery,
      authMode: "API_KEY"
    });
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    return resp.data.getAllClients;
  }; 

// ===========
// UPDATE CLIENT
// ===========

const updateClientQuery = `
    mutation updateClient($clientName: String!, $clientId: String!, $clientInput: ClientInput!) {
      updateClient(clientName: $clientName, clientId: $clientId, clientInput: $clientInput) {
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
  `;

  export const ddbUpdateClient = async (clientInput: SaveClientProps) => {
    const resp = await API.graphql({
      query: updateClientQuery,
      variables: {
        name: clientInput.clientName,
        clientId: clientInput.clientId,
        clientInput: {
          clientName: clientInput.clientName,
          phone: clientInput.phone,
          address: clientInput.address,
          city: clientInput.city,
          email: clientInput.email,
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  };

// ===========
// DELETE CLIENT
// ===========

const deleteClientQuery = `
  mutation deleteClient($clientName: String!, $clientId: String!) {
    deleteClient(clientName: $clientName, clientId: $clientId)
  }
`;

export const ddbDeleteClient = async (clientId: string, clientName: string) => {
    console.log(`delete called for client ${clientName}`);
    const resp = await API.graphql({
      query: deleteClientQuery,
      variables: {
        clientName,
        clientId,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    console.log(`successfully deleted: ${resp.data.deleteClient}`);
  };
