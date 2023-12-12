export type ddbGetAllQueryResponse = {
  clientName: string;
  projectId?: string;
  clientPhone: string;
  email: string;
  address: string;
  city: string;
  description: string;
  material: string;
  projectSize: number;
  projectType: string;
  propertyType: string;
  desiredCompletionTime: string;
  imageUrls?: string[];
  estimate?: number;
  startDate?: string;
  endDate?: string;
  clientCost?: number;
  contractorId?: string;
  contractorName?: string;
  createdAt: string;
  updatedAt?: string;
  earlyEstimate?: string;
}

export type ddbGetAllFormResponse = {
  formId: string;
  formName: string;
  isSelected: string;
  questions: {
    question: string;
    attributes: {
      name: string;
      value: string;
  };
}[];
  createdAt: string;
  updatedAt?: string;
}

export type ProjectProps = {
  clientName: string;
  projectId?: string;
  clientPhone: string;
  email: string;
  address: string;
  city: string;
  description: string;
  material: string;
  projectSize: number;
  projectType: string;
  propertyType: string;
  desiredCompletionTime: string;
  imageUrls?: string[];
  earlyEstimate?: string;
  estimate?: number;
  startDate?: string;
  endDate?: string;
  clientCost?: number;
  contractorId?: string;
  contractorName?: string;
  createdAt: string;
  updatedAt?: string;
  isPublished?: boolean
}