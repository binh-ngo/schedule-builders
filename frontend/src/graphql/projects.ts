import { API } from "aws-amplify";

// ===========
// CREATE POST
// ===========

export type SaveProjectProps = {
    clientName?: string;
    projectId?: string;
    clientPhone?: string;
    email?: string;
    address?: string;
    city?: string;
    description?: string;
    material?: string;
    projectSize?: string;
    projectType?: string;
    propertyType?: string;
    desiredCompletionTime?: string;
    imageUrls?: File[];
    earlyEstimate?: number;
    estimate?: number;
    startDate?: string;
    endDate?: string;
    clientCost?: number;
    contractorId?: string;
    contractorName?: string;
  };

const createProjectQuery = `
  mutation createProject($projectInput: ProjectInput!) {
    createProject(projectInput: $projectInput) {
      address
      city
      clientCost
      clientId
      clientName
      clientPhone
      contractorId
      contractorName
      createdAt
      customAttributes {
        name
        value
      }
      description
      desiredCompletionTime
      earlyEstimate
      endDate
      estimate
      imageUrls
      material
      projectId
      projectSize
      projectType
      propertyType
      startDate
      updatedAt
    }
  }
`;

export const ddbCreateProject = async (projectInput: SaveProjectProps) => {

const resp = await API.graphql({
  query: createProjectQuery,
  variables: {
    projectInput: {
      projectType: projectInput.projectType,
      description: projectInput.description,
      material: projectInput.material,
      projectSize: projectInput.projectSize,
      desiredCompletionTime: projectInput.desiredCompletionTime,
      propertyType: projectInput.propertyType,
      clientName: projectInput.clientName,
      address: projectInput.address,
      city: projectInput.city,
      clientPhone: projectInput.clientPhone,
      email: projectInput.email,
      startDate: projectInput.startDate,
      endDate: projectInput.endDate,
    },
  },
  authMode: "API_KEY",
});
console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
return resp;
  };
  

  // ==============
// GET Project By ID
// ==============

const getProjectByIdQuery = `
    query getProjectById($projectId: String!) {
      getProjectById(projectId: $projectId) {
        address
        city
        clientCost
        clientId
        clientName
        clientPhone
        contractorId
        contractorName
        createdAt
        customAttributes {
          name
          value
        }
        description
        desiredCompletionTime
        earlyEstimate
        endDate
        estimate
        imageUrls
        material
        projectId
        projectSize
        projectType
        propertyType
        startDate
        updatedAt
      }
    }
  `;

export const ddbGetProjectById = async (projectId: string) => {
  const resp = await API.graphql({
    query: getProjectByIdQuery,
    variables: {
      projectId,
    },
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  const project = resp.data.getProjectById;
  return project;
};

// =========
// GET ALL PROJECTS
// =========

const getAllProjectsQuery = `
query getAllProjects($clientName: String!) {
  getAllProjects(clientName: $clientName) {
    address
    city
    clientCost
    clientId
    clientName
    clientPhone
    contractorId
    contractorName
    createdAt
    customAttributes {
      name
      value
    }
    description
    desiredCompletionTime
    earlyEstimate
    endDate
    estimate
    imageUrls
    material
    projectId
    projectSize
    projectType
    propertyType
    startDate
    updatedAt
  }
}
`;

export const ddbGetAllProjects = async (clientName: string) => {
  const resp = await API.graphql({ 
    query: getAllProjectsQuery,
    variables: {
      clientName
    },
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllProjects;
};

const getAllProjectsFromAllClientsQuery = `
query getAllProjectsFromAllClients {
  getAllProjectsFromAllClients {
    address
    city
    clientCost
    clientId
    clientName
    clientPhone
    contractorId
    contractorName
    createdAt
    customAttributes {
      name
      value
    }
    description
    desiredCompletionTime
    earlyEstimate
    endDate
    estimate
    imageUrls
    material
    projectId
    projectSize
    projectType
    propertyType
    startDate
    updatedAt
  }
}
`;
export const ddbGetAllProjectsFromAllClients = async () => {
  const resp = await API.graphql({ 
    query: getAllProjectsFromAllClientsQuery,
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllProjectsFromAllClients;
};
// =======================================
// GET ALL ESTIMATED/UNESTIMATED PROJECTS
// ========================================
const getAllProjectsWithEstimatesQuery = `
query getAllProjectsWithEstimates {
  getAllProjectsWithEstimates {
    address
    city
    clientCost
    clientId
    clientName
    clientPhone
    contractorId
    contractorName
    createdAt
    customAttributes {
      name
      value
    }
    description
    desiredCompletionTime
    earlyEstimate
    endDate
    estimate
    imageUrls
    material
    projectId
    projectSize
    projectType
    propertyType
    startDate
    updatedAt
  }
}
`;

export const ddbGetAllProjectsWithEstimates = async () => {
  const resp = await API.graphql({ 
    query: getAllProjectsWithEstimatesQuery,
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllProjectsWithEstimates;
};

const getAllProjectsWithEstimatesAndContractorsQuery = `
query getAllProjectsWithEstimatesAndContractors {
  getAllProjectsWithEstimatesAndContractors {
    address
    city
    clientCost
    clientId
    clientName
    clientPhone
    contractorId
    contractorName
    createdAt
    customAttributes {
      name
      value
    }
    description
    desiredCompletionTime
    earlyEstimate
    endDate
    estimate
    imageUrls
    material
    projectId
    projectSize
    projectType
    propertyType
    startDate
    updatedAt
  }
}
`;

export const ddbGetAllProjectsWithEstimatesAndContractors = async () => {
  const resp = await API.graphql({ 
    query: getAllProjectsWithEstimatesAndContractorsQuery,
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllProjectsWithEstimatesAndContractors;
};

const getAllProjectsWithoutEstimatesQuery = `
query getAllProjectsWithoutEstimates {
  getAllProjectsWithoutEstimates {
    address
    city
    clientCost
    clientId
    clientName
    clientPhone
    contractorId
    contractorName
    createdAt
    customAttributes {
      name
      value
    }
    description
    desiredCompletionTime
    earlyEstimate
    endDate
    estimate
    imageUrls
    material
    projectId
    projectSize
    projectType
    propertyType
    startDate
    updatedAt
  }
}
`;
export const ddbGetAllProjectsWithoutEstimates = async () => {
  const resp = await API.graphql({ 
    query: getAllProjectsWithoutEstimatesQuery,
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllProjectsWithoutEstimates;
};
// ===========
// UPDATE PROJECT
// ===========

const updateProjectQuery = `
    mutation updateProject($projectId: String!, $projectInput: ProjectInput!) {
      updateProject(projectId: $projectId, projectInput: $projectInput) {
        projectId
        address
        city
        description
        material
        projectSize
        propertyType
        projectType
        desiredCompletionTime
        imageUrls
        clientCost
        clientPhone
        clientId
        clientName
        contractorName
        contractorId
        startDate
        endDate
        estimate
        createdAt
        updatedAt
      }
    }
  `;

export const ddbUpdateProject = async (projectInput: SaveProjectProps) => {

  const resp = await API.graphql({
    query: updateProjectQuery,
    variables: {
      projectId: projectInput.projectId,
      projectInput: {
        clientPhone: projectInput.clientPhone,
        email: projectInput.email,
        address: projectInput.address,
        city: projectInput.city,
        description: projectInput.description,
        material: projectInput.material,
        projectSize: projectInput.projectSize,
        propertyType: projectInput.propertyType,
        desiredCompletionTime: projectInput.desiredCompletionTime,
        estimate: projectInput.estimate,
        earlyEstimate: projectInput.earlyEstimate,
        startDate: projectInput.startDate,
        endDate: projectInput.endDate,
        clientCost: projectInput.clientCost,
        contractorId: projectInput.contractorId,
        contractorName: projectInput.contractorName,
        imageUrls: projectInput.imageUrls,
    },
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  return resp;
};

// ===========
// DELETE POST
// ===========

const deleteQuery = `
  mutation deleteProject($clientName: String!, $projectId: String!) {
    deleteProject(clientName: $clientName, projectId: $projectId)
  }
`;

export const ddbDeleteProject = async (projectId: string, clientName: string) => {
  console.log(`delete called for client ${clientName}`);
  const resp = await API.graphql({
    query: deleteQuery,
    variables: {
      clientName,
      projectId,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  console.log(`successfully deleted: ${resp.data.deleteProject}`);
};

