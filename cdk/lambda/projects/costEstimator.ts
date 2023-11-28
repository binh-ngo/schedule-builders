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
// establishes material types and their price range per sq ft
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

  // establishes types of deck projects and their price range per sq ft
  // this is the general pricing of the entire project.
  const projectPrices: ProjectPrices = {
    'Build or Replace Deck': [30, 60],
    'Paint a Deck': [2, 5],
    'Repair Deck': [10, 50],
    'Clean and Seal Deck': [2, 3.5],
    'Patio': [7, 35],
  };

  // these are base prices for every deck construction project
  const laborPrices: LaborPrices = {
    framing: [9, 12],
    baseLabor: [15, 35],
  };

  if (!materialPrices[material] || !projectPrices[projectType]) {
    return "Invalid material or project type specified.";
  }

  const materialCostRange = materialPrices[material];
  // const projectCostRange = projectPrices[projectType];
  const framingLaborRange = laborPrices.framing;
  const baseLaborRange = laborPrices.baseLabor;

  const materialCost = (materialCostRange[0] + materialCostRange[1]) / 2; 
  const framingLaborCost = (framingLaborRange[0] + framingLaborRange[1]) / 2; 
  const baseLaborCost = (baseLaborRange[0] + baseLaborRange[1]) / 2; 

  if (projectType === 'Paint a Deck') {
    // used a fixed multiple due to the average price/sq ft of this job
    const totalCost = projectSize * 5;
    return `${totalCost.toFixed(2)}`;
  } else if (projectType === 'Clean and Seal Deck') {
    // used a fixed multiple due to the average price/sq ft of this job
    const totalCost = projectSize * 3.5;
    return `${totalCost.toFixed(2)}`;
  } else if (projectType === 'Repair a Deck') {
    // removed framing cost as it may not be needed. project size should just be the sq footage of the damaged area
    const totalCost = projectSize * (materialCost + baseLaborCost); 
    return `${totalCost.toFixed(2)}`;
  } else {
    // Full Possible Cost
    const totalCost = projectSize * (materialCost + framingLaborCost + baseLaborCost); 
    return `${totalCost.toFixed(2)}`;
  }
}
