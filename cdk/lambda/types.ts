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
    locationType: string;
    projectId: string;
    description: string;
    imageUrls: string[];
    contractorName: string;
    contractorId: string;
    estimate: number;
    material: string;
    projectSize: string;
    propertyType: string;
    startDate: string;
    endDate: string;
    desiredCompletionTime: string;
    clientCost: number;
    createdAt: string;
    updatedAt: string;
}

export type ProjectInput = {
    clientName: string;
    clientPhone: string;
    email: string;
    address: string;
    city: string;
    locationType: string;
    description: string;
    desiredCompletionTime: string;
    imageUrls: string[];
    estimate: number;
    material: string;
    propertyType: string;
    projectSize: string;
    startDate: string;
    endDate: string;
    clientCost: number;
    contractorId: string;
    contractorName: string;
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