// Agricultural knowledge base
const database = {
    crops: {
        rice: {
            name: "Rice",
            soilType: "Clay or clay loam soil",
            season: "Kharif (monsoon) and Rabi",
            fertilizers: "NPK (Nitrogen, Phosphorus, Potassium)",
            waterNeeds: "Standing water for most growth stages",
            tips: "Requires proper field leveling and water management"
        },
        wheat: {
            name: "Wheat",
            soilType: "Loam or clay loam soil",
            season: "Rabi (winter)",
            fertilizers: "NPK with emphasis on Nitrogen",
            waterNeeds: "Moderate, regular irrigation",
            tips: "Proper spacing and timely sowing is crucial"
        },
        cotton: {
            name: "Cotton",
            soilType: "Black soil or well-drained clay",
            season: "Kharif",
            fertilizers: "NPK with micronutrients",
            waterNeeds: "Moderate, avoid waterlogging",
            tips: "Pest management is crucial"
        }
    },
    
    soilTypes: {
        clay: {
            description: "Heavy, dense soil with high water retention",
            suitableCrops: "Rice, Wheat, Cotton",
            pros: "Good water and nutrient retention",
            cons: "Poor drainage, hard when dry",
            management: "Add organic matter to improve structure"
        },
        loam: {
            description: "Ideal soil with balanced properties",
            suitableCrops: "Most crops",
            pros: "Good drainage and fertility",
            cons: "Can be expensive to maintain",
            management: "Regular organic matter addition"
        },
        sandy: {
            description: "Light soil with good drainage",
            suitableCrops: "Groundnuts, Carrots, Potatoes",
            pros: "Good drainage and aeration",
            cons: "Poor water retention",
            management: "Add organic matter to improve water retention"
        }
    },

    fertilizers: {
        npk: {
            name: "NPK",
            composition: "Nitrogen, Phosphorus, and Potassium",
            usage: "General purpose fertilizer",
            benefits: "Promotes overall plant growth",
            precautions: "Follow recommended dosage"
        },
        urea: {
            name: "Urea",
            composition: "High Nitrogen content",
            usage: "For leafy growth",
            benefits: "Promotes vegetative growth",
            precautions: "Can burn plants if over-applied"
        },
        dap: {
            name: "DAP",
            composition: "Di-ammonium Phosphate",
            usage: "Good starter fertilizer",
            benefits: "Promotes root development",
            precautions: "Apply before sowing"
        }
    }
};