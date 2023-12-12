import deleteClient from "./clients/deleteClient";
import getAllClients from "./clients/getAllClients";
import getClientById from "./clients/getClientById";
import updateClient from "./clients/updateClient";
import createContractor from "./contractors/createContractor";

import deleteContractor from "./contractors/deleteContractor";
import getAllContractors from "./contractors/getAllContractors";
import getContractorById from "./contractors/getContractorById";
import updateContractor from "./contractors/updateContractor";
import { adjustFormSelection } from "./form/adjustFormSelection";
import createForm from "./form/createForm";
import deleteForm from "./form/deleteForm";
import getAllForms from "./form/getAllForms";
import getFormById from "./form/getFormById";
import { getSelectedForm } from "./form/getSelectedForm";

import createProject from "./projects/createProject";
import deleteProject from "./projects/deleteProject";
import getAllProjects from "./projects/getAllProjects";
import getAllProjectsFromAllClients from "./projects/getAllProjectsFromAllClients";
import getAllProjectsWithEstimates from "./projects/getAllProjectsWithEstimates";
import getAllProjectsWithEstimatesAndContractors from "./projects/getAllProjectsWithEstimatesAndContractors";
import getAllProjectsWithoutEstimates from "./projects/getAllProjectsWithoutEstimates";
import getAllPublishedProjectsFromAllClients from "./projects/getAllPublishedProjectsFromAllClients";
import getAllUnpublishedProjectsFromAllClients from "./projects/getAllUnpublishedProjectsFromAllClients";

import getProjectById from "./projects/getProjectById";
import getPublishedProjects from "./projects/getPublishedProjects";
import getUnpublishedProjects from "./projects/getUnpublishedProjects";
import publishProject from "./projects/publishProject";
import updateProject from "./projects/updateProject";

import { ClientAppsyncEvent, ContractorAppsyncEvent, FormAppsyncEvent, ProjectAppsyncEvent } from "./types";

export async function handler(event: any): Promise<any> {
  console.log(`EVENT --- ${JSON.stringify(event)}`);
  const eventType = getEventType(event);

  if (eventType === "Client") {
    return handleClientEvent(event);
  } else if (eventType === "Project") {
    return handleProjectEvent(event);
  }
  else if (eventType === "Contractor") {
    return handleContractorEvent(event);
  } else if (eventType === "Form") {
    return handleFormEvent(event);
  }
  else {
    throw new Error(`Unknown event type.`);
  }
}

// Function to determine the event type based on the field name
function getEventType(event: any): "Client" | "Project" | "Contractor" | "Form" {
  switch (event.info.fieldName) {
    case "getAllProjects":
    case "getAllProjectsFromAllClients":
    case "getAllProjectsWithEstimates":
    case "getAllProjectsWithEstimatesAndContractors":
    case "getAllProjectsWithoutEstimates":
    case "getPublishedProjects":
    case "getUnpublishedProjects":
    case "getAllPublishedProjectsFromAllUsers":
    case "getAllUnpublishedProjectsFromAllUsers":
    case "getProjectById":
    case "publishProject":
    case "createProject":
    case "deleteProject":
    case "updateProject":
      return "Project";
    case "getAllClients":
    case "getClientById":
    case "deleteClient":
    case "updateClient":
      return "Client";
    case "getAllContractors":
    case "getContractorById":
    case "createContractor":
    case "updateContractor":
    case "deleteContractor":
      return "Contractor";
    case "getAllForms":
    case "getFormById":
    case "getSelectedForm":
    case "adjustFormSelection":
    case "createForm":
    case "updateForm":
    case "deleteForm":      
      return "Form";
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

// Handler function for Client events
function handleClientEvent(event: ClientAppsyncEvent) {
  switch (event.info.fieldName) {
    case "getClientById":
      return getClientById(event.arguments.clientName!, event.arguments.clientId!);
    case "getAllClients":
      return getAllClients();
    case "updateClient":
      return updateClient(
        event.arguments.clientName!,
        event.arguments.clientId!,
        event.arguments.clientInput!
      );
    case "deleteClient":
      return deleteClient(event.arguments.clientName!, event.arguments.clientId!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

// Handler function for Project events
function handleProjectEvent(event: ProjectAppsyncEvent) {
  switch (event.info.fieldName) {
    case "getProjectById":
      return getProjectById(event.arguments.projectId!);
    case "getAllProjects":
      return getAllProjects(event.arguments.clientName!);
    case "getAllProjectsFromAllClients":
      return getAllProjectsFromAllClients();
    case "getAllProjectsWithEstimates":
      return getAllProjectsWithEstimates();
    case "getAllProjectsWithEstimatesAndContractors":
      return getAllProjectsWithEstimatesAndContractors();
    case "getAllProjectsWithoutEstimates":
      return getAllProjectsWithoutEstimates();
    case "getPublishedProjects":
      return getPublishedProjects(event.arguments.clientName!);
    case "getUnpublishedProjects":
      return getUnpublishedProjects(event.arguments.clientName!);
    case "getAllPublishedProjectsFromAllClients":
      return getAllPublishedProjectsFromAllClients();
    case "getAllUnpublishedProjectsFromAllClients":
      return getAllUnpublishedProjectsFromAllClients();
    case "publishProject":
      return publishProject(event.arguments.projectId!, event.arguments.isPublished!);
    case "createProject":
      return createProject(event.arguments.projectInput!);
    case "updateProject":
      return updateProject(
        event.arguments.projectId!,
        event.arguments.projectInput!
      );
    case "deleteProject":
      return deleteProject(event.arguments.clientName!, event.arguments.projectId!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

// Handler function for Contractor events
function handleContractorEvent(event: ContractorAppsyncEvent) {
  switch (event.info.fieldName) {
    case "getContractorById":
      return getContractorById(event.arguments.contractorName!, event.arguments.contractorId!);
    case "getAllContractors":
      return getAllContractors();
    case "createContractor":
      return createContractor(event.arguments.contractorInput!);
    case "updateContractor":
      return updateContractor(
        event.arguments.contractorName!,
        event.arguments.contractorId!,
        event.arguments.contractorInput!
      );
    case "deleteContractor":
      return deleteContractor(event.arguments.contractorName!, event.arguments.contractorId!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

function handleFormEvent(event: FormAppsyncEvent) {
  switch (event.info.fieldName) {
    case "getFormById":
      return getFormById(event.arguments.formId!);
    case "getAllForms":
      return getAllForms();
    case "getSelectedForm":
      return getSelectedForm();
    case "adjustFormSelection":
      return adjustFormSelection(event.arguments.formId!, event.arguments.isSelected!);
    case "createForm":
      return createForm(event.arguments.formInput!);
    // case "updateForm":
    //   return updateForm(
    //     event.arguments.formName!,
    //     event.arguments.formId!,
    //     event.arguments.formInput!
    //   );
    case "deleteForm":
      return deleteForm(event.arguments.formName!, event.arguments.formId!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}