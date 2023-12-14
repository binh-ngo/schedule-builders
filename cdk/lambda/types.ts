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
  isSelected: boolean;
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

export type CustomAttributes = {
  name: string;
  value: string;
}
//~~~~~~~~~~~~~~~~~~~~~~  //
//      Client Types      //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Client = {
    clientId: string;
    clientName: string
    clientPhone: string;
    username: string;
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
    username: string;
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
    rating: number;
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
    email: string;
    address: string;
    city: string;
    projectId: string;
    description: string;
    imageUrls: string[];
    contractorName: string;
    contractorId: string;
    earlyEstimate: string;
    estimate: number;
    material: string;
    projectSize: number;
    projectType: string;
    propertyType: string;
    startDate: string;
    endDate: string;
    desiredCompletionTime: string;
    clientCost: number;
    publishDate: string;
    createdAt: string;
    updatedAt: string;
    customAttributes: CustomAttributes[];
    isCompleted: boolean;
    isPublished: boolean;
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
    projectSize: number;
    startDate: string;
    endDate: string;
    clientCost: number;
    contractorId: string;
    contractorName: string;
    customAttributes: CustomAttributes[];
    isCompleted: boolean;
    isPublished: boolean;
    publishDate: string;
}
//~~~~~~~~~~~~~~~~~~~~~~  //
//  Messages Event Types  //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Message = {
  messageId: string;
  projectId: string;
  body: string;
  authorId: string;
  authorName: string
  createdAt: string;
  updatedAt: string;
}

export type MessageInput = {
  body: string;
  authorId: string;
  authorName: string;
  projectId: string;
}
//~~~~~~~~~~~~~~~~~~~~~~  //
//  Bid Event Types   //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Bid = {
  bidId: string;
  projectId: string;
  contractorName: string;
  contractorId: string;
  bidAmount: number;
  createdAt: string;
  updatedAt: string;
}

export type BidInput = {
  projectId: string;
  contractorName: string;
  contractorId: string;
  bidAmount: number;
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
        isPublished?: boolean
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
        isSelected?: boolean;
      };
}

export type BidAppsyncEvent = {
    info: {
        fieldName: string;
      };
      arguments: {
        bidId?: string;
        projectId?: string;
        bidAmount?: number;
        bidInput?: BidInput;
      };
}


export type ProjectFormManager = {
  questions: string[];
  customQuestions: string[];
}
