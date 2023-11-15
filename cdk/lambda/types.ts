export type ddbQueryPostsParams = {
    TableName: string;
    IndexName?: string;
    KeyConditionExpression?: string;
    ExpressionAttributeNames?: { [key: string]: string };
    ExpressionAttributeValues?: { [key: string]: any };
    FilterExpression?: string;
    ReturnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
    ScanIndexForward?: boolean;
  };

//~~~~~~~~~~~~~~~~~~~~~~  //
//      Form Types      //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Form = {
  formId: string;
  formName: string;
  questions: QuestionsInput[];
  createdAt: string;
  updatedAt: string;
}

export type FormInput = {
  formName: string;
  questions: QuestionsInput[];
}

export type QuestionsInput = {
  question: string;
  attributes: CustomAttributes;
}
//~~~~~~~~~~~~~~~~~~~~~~  //
//      Client Types      //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Client = {
    clientId: string;
    clientName: string
    clientPhone: string;
    address: string
    email:string;
    city: string
    createdAt: string
    updatedAt: string
}

export type ClientInput = {
    clientName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
}

//~~~~~~~~~~~~~~~~~~~~~~  //
//    Contractor Types    //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Contractor = {
    contractorId: string;
    contractorName: string;
    company: string;
    specialty: string;
    address: string;
    city: string;
    email: string;
    imageUrl: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

export type ContractorInput = {
    contractorName: string;
    company: string;
    specialty: string;
    address: string;
    city: string;
    email: string;
    imageUrl: string;
    phone: string;
}
//~~~~~~~~~~~~~~~~~~~~~~  //
//     Project Types      //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Project = {
    clientName: string;
    clientId: string;
    clientPhone: string;
    address: string;
    city: string;
    projectId: string;
    description: string;
    imageUrls: string[];
    contractorName: string;
    contractorId: string;
    estimate: number;
    material: string;
    projectSize: string;
    projectType: string;
    propertyType: string;
    startDate: string;
    endDate: string;
    desiredCompletionTime: string;
    clientCost: number;
    createdAt: string;
    updatedAt: string;
    customAttributes: CustomAttributes[];
}

export type ProjectInput = {
    clientName: string;
    clientPhone: string;
    email: string;
    address: string;
    city: string;
    description: string;
    desiredCompletionTime: string;
    imageUrls: string[];
    estimate: number;
    material: string;
    propertyType: string;
    projectType: string;
    projectSize: string;
    startDate: string;
    endDate: string;
    clientCost: number;
    contractorId: string;
    contractorName: string;
    customAttributes: CustomAttributes[];
}

//~~~~~~~~~~~~~~~~~~~~~~  //
//  Appsync Event Types   //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type ClientAppsyncEvent = {
    info: {
        fieldName: string;
      };
      arguments: {
        clientId?: string;
        clientName?: string;
        clientInput?: ClientInput;
      };
}

export type ProjectAppsyncEvent = {
    info: {
        fieldName: string;
      };
      arguments: {
        projectId?: string;
        clientName?: string;
        projectInput?: ProjectInput;
      };
}

export type ContractorAppsyncEvent = {
    info: {
        fieldName: string;
      };
      arguments: {
        contractorId?: string;
        contractorName?: string;
        contractorInput?: ContractorInput;
      };
}

export type FormAppsyncEvent = {
    info: {
        fieldName: string;
      };
      arguments: {
        formId?: string;
        formName?: string;
        formInput?: FormInput;
      };
}

export type CustomAttributes = {
  name: string;
  value: string;
}

export type ProjectFormManager = {
  questions: string[];
  customQuestions: string[];
}
