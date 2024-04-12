import { Type } from "@aws-sdk/client-s3";
import { bool } from "aws-sdk/clients/signer";

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
    clientUsername: string;
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
    clientUsername: string;
    address: string;
    city: string;
}

//~~~~~~~~~~~~~~~~~~~~~~  //
//    Contractor Types    //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Contractor = {
    contractorId: string;
    contractorName: string;
    description: string;
    company: string;
    specialty: string;
    address: string;
    city: string;
    email: string;
    imageUrl: string;
    phone: string;
    rating: number;
    numProjects: number;
    createdAt: string;
    updatedAt: string;
}

export type ContractorInput = {
    contractorName: string;
    company: string;
    description: string;
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
    clientUsername: string;
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
  threadId: string;
  projectId: string;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export type MessageInput = {
  body: string;
  authorId: string;
  threadId: string;
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
//  Thread Event Types    //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Thread = {
  threadId: string;
  projectId: string;
  numMessages: number;
  createdAt: string;
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

export type MessageAppsyncEvent = {
    info: {
        fieldName: string;
      };
      arguments: {
        messageId?: string;
        threadId?: string;
        projectId?: string;
        authorName?: string;
        authorName1?: string;
        authorName2?: string;
        messageInput?: MessageInput;
      };
}

export type SurveyFormAppsyncEvent = {
    info: {
        fieldName: string;
      };
      arguments: {
        jobId?: string;
        owner?: string;
        surveyFormInput?: SurveyFormInput;
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

export type SurveyForm = {
  owner: string;
  date: string;
  jobId: string;
  address: string;
  city: string;
  email: string;
  clientPhone: string;
  squareFootage: number;
  yearBuilt: number;
  bathrooms: [Bathroom];
  otherRoom: OtherRoom;
  typeOfPiping: TypeOfPiping;
  mainLine: MainLine;
  misc: Miscellaneous;
  additionalNotes: string;
  contractPrice: number;
  salesTax: number;
  downPayment: number;
  pipingInstalledPayment: number;
  uponCompletionPayment: number;
  salesPerson: string;
  createdAt: string;
  updatedAt: string;
}

export type SurveyFormInput = {
  owner: string;
  date: string;
  address: string;
  city: string;
  email: string;
  clientPhone: string;
  squareFootage: number;
  yearBuilt: number;
  bathrooms: [Bathroom]
  otherRoom: OtherRoom;
  typeOfPiping: TypeOfPiping
  mainLine: MainLine
  misc: Miscellaneous
  additionalNotes: string;
  contractPrice: number;
  salesTax: number;
  downPayment: number;
  pipingInstalledPayment: number;
  uponCompletionPayment: number;
  salesPerson: string;
}

type TypeOfPiping = {
  pipeType: string;
  pexFittingType: string;
  foundationType: string;
  crawlClearance: string;
  numLevels: number;
  units: number;
}

type MainLine = {
  existingPipe: TypeAndSize;
  replaceMain: boolean;
  length: string; 
  pressureReg: string;
  valve: string;
  hoseBibb: string;
  tieInExistingSprinklers: string
  directionalBoring: string;
  concreteAsphaltCutting: boolean;
  concreteAsphaltPatching: string;
}

type Miscellaneous = {
  recirculationLine: RecirculationLine;
  dishwasherLine: string;
  quarterInchFridgeLine: string;
  waterFilterLine: string;
  totalHoseBibbs: TotalHoseBibbs;
  relocateWaterHeater: boolean;
  newWaterHeater: TypeAndSize;
  insulatePipes: boolean;
  quarterTurnValvesAndTubings: boolean;
  tubValveInstall: CountAndEmployee;
  showerValveInstall: CountAndEmployee;
  tubShowerValveInstall: CountAndEmployee;
  electricalGround:string;
  patchingBy: string;
  permitBy: string;
}

type CountAndEmployee = {
  number: number
  employee: string;
}

type TypeAndSize = {
  size: number;
  type: string;
}

type RecirculationLine = {
  pipe: string;
  pump: string;
  timer: string;
}

type TotalHoseBibbs = {
  regulated: number;
  unregulated: number;
}

type Bathroom = {
  sink1: DefaultConfig;
  sink2: DefaultConfig;
  toilet: DefaultConfig;
  bidet: DefaultConfig;
  tubShower1: BathtubShowerConfig;
  tubShower2: BathtubShowerConfig;
}

type OtherRoom = {
  kitchenSink1: DefaultConfig;
  kitchenSink2: DefaultConfig;
  refrigerator: DefaultConfig;
  barSink: DefaultConfig;
  landrySink: DefaultConfig;
  washMachine: DefaultConfig;
  waterHeater: DefaultConfig;
  waterSoftener: DefaultConfig;
}

type DefaultConfig = {
  verticals: string;
  patching: number;
  wallSide: string;
  comments: string;
}

type BathtubShowerConfig = {
  verticals: string;
  patching: number;
  wallSide: string;
  valves: string;
  comments: string;
}

