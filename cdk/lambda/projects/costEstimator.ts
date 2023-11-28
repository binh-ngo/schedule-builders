interface MaterialPrices {
  [key: string]: [number, number];
}

interface ProjectPrices {
  [key: string]: [number, number];
}

interface LaborPrices {
  framing: [number, number];
  baseLabor: [number, number];
}

export const calculateProjectEstimate = (material: string, projectType: string, projectSize: number): string => {
  const materialPrices: MaterialPrices = {
    'Cedar': [4,9],
    'Redwood': [4,6],
    'Ipewood': [5,20],
    'Tigerwood': [7,15],
    'Mahogany': [8,11],
    'Bamboo': [3,10],
    'Pressure-treated Wood': [2,5],
    'Trex (recycled composite)': [5,10],
    'Composite (Fiberglass, Vinyl, PVC)': [12,22],
    'Aluminum': [15,20],
    'Cement': [30,75],
  };

  const projectPrices: ProjectPrices = {
    'Build or Replace Deck': [30, 60],
    'Paint a Deck': [2, 5],
    'Repair Deck': [10, 50],
    'Clean and Seal Deck': [2, 3.5],
    'Patio': [7, 35],
  };

  const laborPrices: LaborPrices = {
    framing: [9, 12],
    baseLabor: [15, 35],
  };

  if (!materialPrices[material] || !projectPrices[projectType]) {
    return "Invalid material or project type specified.";
  }

  const materialCostRange = materialPrices[material];
  const projectCostRange = projectPrices[projectType];
  const framingLaborRange = laborPrices.framing;
  const baseLaborRange = laborPrices.baseLabor;

  const materialCost = (materialCostRange[0] + materialCostRange[1]) / 2; 
  const projectCost = (projectCostRange[0] + projectCostRange[1]) / 2; 
  const framingLaborCost = (framingLaborRange[0] + framingLaborRange[1]) / 2; 
  const baseLaborCost = (baseLaborRange[0] + baseLaborRange[1]) / 2; 

  const totalCost = projectSize * (materialCost + projectCost) + projectSize * framingLaborCost + projectSize * baseLaborCost;

  return `${totalCost.toFixed(2)}`;
}
