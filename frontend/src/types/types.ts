export type ddbGetAllQueryResponse = {
  clientName: string;
  projectId?: string;
  clientPhone: string;
  email: string;
  address: string;
  city: string;
  description: string;
  material: string;
  projectSize: string;
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
}
