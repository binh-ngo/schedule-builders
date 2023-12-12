interface MaterialPrices {
  [key: string]: [number, number];
}

interface ProjectPrices {
  [key: string]: [number, number];
}

interface LaborPrices {
  framing: [number, number];
  baseLabor: [number, number];
  roofingLabor: [number, number];
}
// establishes material types and their price range per sq ft
export type ProjectEstimateProps = {
  material?: string;
  projectType?: string;
  projectSize?: number
}
export const calculateProjectEstimate = (props: ProjectEstimateProps): string => {
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
    'Asphalt shingle': [6,8],
    'Metal': [8.2,12.8],
    'Wood or Composite shingle': [6,18],
    'Tile': [4,16],
    'Flat/foam/single ply': [4,7],
    'Natural slate': [10,35],
    'NA': [1,1],
  };

  // establishes types of deck projects and their price range per sq ft
  // this is the general pricing of the entire project.
  const projectPrices: ProjectPrices = {
    // Deck prices
    'Build or Replace Deck': [30, 60],
    'Paint a Deck': [2, 5],
    'Repair Deck': [10, 50],
    'Clean and Seal Deck': [2, 3.5],
    'Patio': [7, 35],

    // Electrical prices
    'Lights, outlets, or switches -> Repair or install new switches, fixtures, or outlets': [200,400],
    'Lights, outlets, or switches -> Repair electrical problem': [200,400],
    'Lights, outlets, or switches -> Move switches, fixtures, or outlets': [200,400],
    
    'Electrical for addition/remodel': [1.8, 42],

    'Upgrade electrical wiring/panel -> As part of remodel or addition': [1100, 13000],
    'Upgrade electrical wiring/panel -> Fuses blow often': [1100, 13000],
    "Upgrade electrical wiring/panel -> Appliances don't operate at full power": [1100, 13000],
    'Upgrade electrical wiring/panel -> Flickering lights': [1100, 13000],
    'Upgrade electrical wiring/panel -> Not sure/other': [1100, 13000],

    'More options -> Generator': [2000, 15000],
    'More options -> Electric vehicle station installation': [1000, 2500],
    'More options -> Fan': [150, 300],
    'More options -> Smart home system': [1138, 3095],
    'More options -> Telephone': [92, 200],
    'More options -> Lightning rod/lightning protection': [439, 2614],

    // Handyperson Prices
    'General handyperson': [320, 600],
    'Carpentry': [250, 850],
    'Doors': [350, 650],
    'Electrical': [150, 600],
    'Plumbing': [270, 450],
    'Appliances': [100, 350],
    'Furniture Assembly': [270, 450],
    'Drywall': [500, 5600],
    'Window': [450, 1400],
    'Landscaping': [200, 600],
    'Air conditioning system': [2500, 1200],
    'Interior painting': [1500, 3500],
    'Exterior painting': [760, 12000],
    'Siding': [300, 450],
    'Other': [320, 600],

    // Landscaping Prices
    'Landscaping for yard/garden': [1000, 3000],
    'Grade or reslope grounds': [1750, 2500],
    'Delivery of soil/sand/mulch/rock': [340, 1270],
    'Install sod': [200, 400],
    'Other landscaping projects': [1000, 10000],

    // Plumbing prices
    'Faucets, fixtures, drains, or pipes': [125, 500],
    'Water heater': [300, 1000],
    'Septic system, sewer or water main': [6000, 12000],
    'Other plumbing projects': [6000, 12000],

    // Remodeling prices
    'Bathroom remodel': [31000, 94000],
    'Kitchen remodel': [31000, 177000],
    'Other remodeling projects': [20000, 100000],

    // Roofing prices
    'Install or repair roof': [12000, 15000],
    'Install or replace gutters': [150, 630],
    'Clean roof/gutters': [75, 250],
    'Other roofing job': [200, 400],

    // If no value
    'NA': [1,1]
  };

  // these are base prices for every deck construction project
  const laborPrices: LaborPrices = {
    framing: [9, 12],
    baseLabor: [15, 35],
    // per sqft
    roofingLabor: [1.5,1.8]
  };

  const materialCostRange = materialPrices[props.material!];
  // const projectCostRange = projectPrices[projectType];
  const framingLaborRange = laborPrices.framing;
  const baseLaborRange = laborPrices.baseLabor;

  const materialCost = (materialCostRange[0] + materialCostRange[1]) / 2; 
  const framingLaborCost = (framingLaborRange[0] + framingLaborRange[1]) / 2; 
  const baseLaborCost = (baseLaborRange[0] + baseLaborRange[1]) / 2; 

  switch (props.projectType) {
    // Deck Costs
    case 'Paint a Deck':
      const paintCost = Number(props.projectSize!) * 5;
      return `${paintCost.toFixed(2)}`;

    case 'Clean and Seal Deck':
      const cleanAndSealCost = Number(props.projectSize!) * 3.5;
      return `${cleanAndSealCost.toFixed(2)}`;

    case 'Repair Deck':
      // removed framing cost as it may not be needed. project size should just be the sq footage of the damaged area
      const repairCost = Number(props.projectSize!) * (materialCost + baseLaborCost);
      return `${repairCost.toFixed(2)}`;

      // Electrical Costs
    case 'Lights, outlets, or switches -> Repair or install new switches, fixtures, or outlets':
      const switchesSpecificProjectCost = projectPrices[props.projectType!];
      const switchesSpecificTotalCost = (switchesSpecificProjectCost[0] + switchesSpecificProjectCost[1]) / 2;
      return `${switchesSpecificTotalCost.toFixed(2)}`;
      
    case 'Lights, outlets, or switches -> Repair electrical problem':
      const electricalSpecificProjectCost = projectPrices[props.projectType!];
      const electricalSpecificTotalCost = (electricalSpecificProjectCost[0] + electricalSpecificProjectCost[1]) / 2;
      return `${electricalSpecificTotalCost.toFixed(2)}`;

    case 'Lights, outlets, or switches -> Move switches, fixtures, or outlets':
      const specificProjectCost = projectPrices[props.projectType!];
      const specificTotalCost = (specificProjectCost[0] + specificProjectCost[1]) / 2;
      return `${specificTotalCost.toFixed(2)}`;

    case 'Electrical for addition/remodel':
      const remodelSpecificProjectCost = projectPrices[props.projectType!];
      const remodelSpecificTotalCost = (remodelSpecificProjectCost[0] + remodelSpecificProjectCost[1]) / 2;
      return `${remodelSpecificTotalCost.toFixed(2)}`;

    case 'Upgrade electrical wiring/panel -> As part of remodel or addition':
      const panelSpecificProjectCost = projectPrices[props.projectType!];
      const panelSpecificTotalCost = (panelSpecificProjectCost[0] + panelSpecificProjectCost[1]) / 2;
      return `${panelSpecificTotalCost.toFixed(2)}`;

    case 'Upgrade electrical wiring/panel -> Fuses blow often':
      const fusesSpecificProjectCost = projectPrices[props.projectType!];
      const fusesSpecificTotalCost = (fusesSpecificProjectCost[0] + fusesSpecificProjectCost[1]) / 2;
      return `${fusesSpecificTotalCost.toFixed(2)}`;

    case "Upgrade electrical wiring/panel -> Appliances don't operate at full power":
      const applianceSpecificProjectCost = projectPrices[props.projectType!];
      const applianceSpecificTotalCost = (applianceSpecificProjectCost[0] + applianceSpecificProjectCost[1]) / 2;
      return `${applianceSpecificTotalCost.toFixed(2)}`;

    case 'Upgrade electrical wiring/panel -> Flickering lights':
      const lightsSpecificProjectCost = projectPrices[props.projectType!];
      const lightsSpecificTotalCost = (lightsSpecificProjectCost[0] + lightsSpecificProjectCost[1]) / 2;
      return `${lightsSpecificTotalCost.toFixed(2)}`;

    case 'Upgrade electrical wiring/panel -> Not sure/other':
      const otherElectricalSpecificProjectCost = projectPrices[props.projectType!];
      const otherElectricalSpecificTotalCost = (otherElectricalSpecificProjectCost[0] + otherElectricalSpecificProjectCost[1]) / 2;
      return `${otherElectricalSpecificTotalCost.toFixed(2)}`;

    case 'More options -> Generator':
      const generatorSpecificProjectCost = projectPrices[props.projectType!];
      const generatorSpecificTotalCost = (generatorSpecificProjectCost[0] + generatorSpecificProjectCost[1]) / 2;
      return `${generatorSpecificTotalCost.toFixed(2)}`;

    case 'More options -> Electric vehicle station installation':
      const evSpecificProjectCost = projectPrices[props.projectType!];
      const evSpecificTotalCost = (evSpecificProjectCost[0] + evSpecificProjectCost[1]) / 2;
      return `${evSpecificTotalCost.toFixed(2)}`;

    case 'More options -> Fan':
      const fanSpecificProjectCost = projectPrices[props.projectType!];
      const fanSpecificTotalCost = (fanSpecificProjectCost[0] + fanSpecificProjectCost[1]) / 2;
      return `${fanSpecificTotalCost.toFixed(2)}`;

    case 'More options -> Smart home system':
      const homeSpecificProjectCost = projectPrices[props.projectType!];
      const homeSpecificTotalCost = (homeSpecificProjectCost[0] + homeSpecificProjectCost[1]) / 2;
      return `${homeSpecificTotalCost.toFixed(2)}`;

    case 'More options -> Telephone':
      const phoneSpecificProjectCost = projectPrices[props.projectType!];
      const phoneSpecificTotalCost = (phoneSpecificProjectCost[0] + phoneSpecificProjectCost[1]) / 2;
      return `${phoneSpecificTotalCost.toFixed(2)}`;

    case 'More options -> Lightning rod/lightning protection':
      const lightningSpecificProjectCost = projectPrices[props.projectType!];
      const lightningSpecificTotalCost = (lightningSpecificProjectCost[0] + lightningSpecificProjectCost[1]) / 2;
      return `${lightningSpecificTotalCost.toFixed(2)}`;

      // Handyperson costs
    case 'General handyperson':
      const handypersonProjectCost = projectPrices[props.projectType!];
      const handypersonTotalCost = (handypersonProjectCost[0] + handypersonProjectCost[1]) / 2;
      return `${handypersonTotalCost.toFixed(2)}`;

    case 'Carpentry':
      const carpentryProjectCost = projectPrices[props.projectType!];
      const carpentryTotalCost = (carpentryProjectCost[0] + carpentryProjectCost[1]) / 2;
      return `${carpentryTotalCost.toFixed(2)}`;

    case 'Doors':
      const doorsProjectCost = projectPrices[props.projectType!];
      const doorsTotalCost = (doorsProjectCost[0] + doorsProjectCost[1]) / 2;
      return `${doorsTotalCost.toFixed(2)}`;

    case 'Electrical':
      const electricalProjectCost = projectPrices[props.projectType!];
      const electricalTotalCost = (electricalProjectCost[0] + electricalProjectCost[1]) / 2;
      return `${electricalTotalCost.toFixed(2)}`;

    case 'Plumbing':
      const plumbingProjectCost = projectPrices[props.projectType!];
      const plumbingTotalCost = (plumbingProjectCost[0] + plumbingProjectCost[1]) / 2;
      return `${plumbingTotalCost.toFixed(2)}`;

    case 'Appliances':
      const appliancesProjectCost = projectPrices[props.projectType!];
      const appliancesTotalCost = (appliancesProjectCost[0] + appliancesProjectCost[1]) / 2;
      return `${appliancesTotalCost.toFixed(2)}`;

    case 'Furniture Assembly':
      const furnitureProjectCost = projectPrices[props.projectType!];
      const furnitureTotalCost = (furnitureProjectCost[0] + furnitureProjectCost[1]) / 2;
      return `${furnitureTotalCost.toFixed(2)}`;

    case 'Drywall':
      const drywallProjectCost = projectPrices[props.projectType!];
      const drywallTotalCost = (drywallProjectCost[0] + drywallProjectCost[1]) / 2;
      return `${drywallTotalCost.toFixed(2)}`;

    case 'Window':
      const windowProjectCost = projectPrices[props.projectType!];
      const windowTotalCost = (windowProjectCost[0] + windowProjectCost[1]) / 2;
      return `${windowTotalCost.toFixed(2)}`;

    case 'Landscaping':
      const landscapingProjectCost = projectPrices[props.projectType!];
      const landscapingTotalCost = (landscapingProjectCost[0] + landscapingProjectCost[1]) / 2;
      return `${landscapingTotalCost.toFixed(2)}`;

    case 'Air conditioning system':
      const acProjectCost = projectPrices[props.projectType!];
      const acTotalCost = (acProjectCost[0] + acProjectCost[1]) / 2;
      return `${acTotalCost.toFixed(2)}`;

    case 'Interior painting':
      const interiorPaintingProjectCost = projectPrices[props.projectType!];
      const interiorPaintingTotalCost = (interiorPaintingProjectCost[0] + interiorPaintingProjectCost[1]) / 2;
      return `${interiorPaintingTotalCost.toFixed(2)}`;

    case 'Exterior painting':
      const exteriorPaintingProjectCost = projectPrices[props.projectType!];
      const exteriorPaintingTotalCost = (exteriorPaintingProjectCost[0] + exteriorPaintingProjectCost[1]) / 2;
      return `${exteriorPaintingTotalCost.toFixed(2)}`;

    case 'Siding':
      const sidingProjectCost = projectPrices[props.projectType!];
      const sidingTotalCost = (sidingProjectCost[0] + sidingProjectCost[1]) / 2;
      return `${sidingTotalCost.toFixed(2)}`;

    case 'Other':
      const otherHandypersonProjectCost = projectPrices[props.projectType!];
      const otherHandypersonTotalCost = (otherHandypersonProjectCost[0] + otherHandypersonProjectCost[1]) / 2;
      return `${otherHandypersonTotalCost.toFixed(2)}`;

      // Landscaping Costs
    case'Landscaping for yard/garden':
      const yardGardenProjectCost = projectPrices[props.projectType!];
      const yardGardenTotalCost = (yardGardenProjectCost[0] + yardGardenProjectCost[1]) / 2;
      return `${yardGardenTotalCost.toFixed(2)}`;

    case 'Grade or reslope grounds':
      const reslopeProjectCost = projectPrices[props.projectType!];
      const reslopeTotalCost = (reslopeProjectCost[0] + reslopeProjectCost[1]) / 2;
      return `${reslopeTotalCost.toFixed(2)}`;

    case 'Delivery of soil/sand/mulch/rock':
      const deliveryProjectCost = projectPrices[props.projectType!];
      const deliveryTotalCost = (deliveryProjectCost[0] + deliveryProjectCost[1]) / 2;
      return `${deliveryTotalCost.toFixed(2)}`;

    case 'Install sod':
      const sodProjectCost = projectPrices[props.projectType!];
      const sodTotalCost = (sodProjectCost[0] + sodProjectCost[1]) / 2;
      return `${sodTotalCost.toFixed(2)}`;

    case 'Other landscaping projects':
      const otherLandscapingProjectCost = projectPrices[props.projectType!];
      const otherLandscapingTotalCost = (otherLandscapingProjectCost[0] + otherLandscapingProjectCost[1]) / 2;
      return `${otherLandscapingTotalCost.toFixed(2)}`;

      // Plumbing Costs
    case 'Faucets, fixtures, drains, or pipes':
      const faucetsProjectCost = projectPrices[props.projectType!];
      const faucetsTotalCost = (faucetsProjectCost[0] + faucetsProjectCost[1]) / 2;
      return `${faucetsTotalCost.toFixed(2)}`;

    case 'Water heater':
      const heaterProjectCost = projectPrices[props.projectType!];
      const heaterTotalCost = (heaterProjectCost[0] + heaterProjectCost[1]) / 2;
      return `${heaterTotalCost.toFixed(2)}`;

    case 'Septic system, sewer or water main':
      const septicProjectCost = projectPrices[props.projectType!];
      const septicTotalCost = (septicProjectCost[0] + septicProjectCost[1]) / 2;
      return `${septicTotalCost.toFixed(2)}`;

    case 'Other plumbing projects':
      const otherPlumbingProjectCost = projectPrices[props.projectType!];
      const otherPlumbingTotalCost = (otherPlumbingProjectCost[0] + otherPlumbingProjectCost[1]) / 2;
      return `${otherPlumbingTotalCost.toFixed(2)}`;

      // Remodeling Costs
    case 'Bathroom remodel':
      const bathroomRemodelProjectCost = projectPrices[props.projectType!];
      const bathroomRemodelTotalCost = (bathroomRemodelProjectCost[0] + bathroomRemodelProjectCost[1]) / 2;
      return `${bathroomRemodelTotalCost.toFixed(2)}`;

    case 'Kitchen remodel':
      const kitchenRemodelProjectCost = projectPrices[props.projectType!];
      const kitchenRemodelTotalCost = (kitchenRemodelProjectCost[0] + kitchenRemodelProjectCost[1]) / 2;
      return `${kitchenRemodelTotalCost.toFixed(2)}`;

    case 'Other remodeling projects':
      const otherRemodelingProjectCost = projectPrices[props.projectType!];
      const otherRemodelingTotalCost = (otherRemodelingProjectCost[0] + otherRemodelingProjectCost[1]) / 2;
      return `${otherRemodelingTotalCost.toFixed(2)}`;

    // Roofing Costs
    case 'Install or repair roof':
      const roofTotalCost = (((laborPrices.roofingLabor[0] + laborPrices.roofingLabor[1]) / 2) + materialCost) * Number(props.projectSize)!;
      return `${roofTotalCost.toFixed(2)}`;

    case 'Install or replace gutters':
      const guttersProjectCost = projectPrices[props.projectType!];
      const guttersTotalCost = (guttersProjectCost[0] + guttersProjectCost[1]) / 2;
      return `${guttersTotalCost.toFixed(2)}`;

    case 'Clean roof/gutters':
      const cleanGuttersProjectCost = projectPrices[props.projectType!];
      const cleanGuttersTotalCost = (cleanGuttersProjectCost[0] + cleanGuttersProjectCost[1]) / 2;
      return `${cleanGuttersTotalCost.toFixed(2)}`;

    case 'Other roofing job':
      const otherRoofingProjectCost = projectPrices[props.projectType!];
      const otherRoofingTotalCost = (otherRoofingProjectCost[0] + otherRoofingProjectCost[1]) / 2;
      return `${otherRoofingTotalCost.toFixed(2)}`;


    default:
      // Full Decking Cost
      const totalCost = Number(props.projectSize!) * (materialCost + framingLaborCost + baseLaborCost);
      return `${totalCost.toFixed(2)}`;
  }
}
