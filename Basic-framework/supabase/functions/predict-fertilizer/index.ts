
// Follow Supabase Edge Function format
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock implementation of the prediction logic
function predictFertilizer(n: number, p: number, k: number, crop: string) {
  console.log(`Predicting fertilizer for N:${n}, P:${p}, K:${k}, Crop:${crop}`);
  
  // Fertilizer suggestions based on nutrient levels
  const fertilizer_dic = {
    'NHigh': "N is high. Suggestions: Use green manure, mulch, legumes, etc.",
    'Nlow': "N is low. Suggestions: Add manure, use NPK fertilizer with high N, etc.",
    'PHigh': "P is high. Suggestions: Avoid manure, use phosphorus-free fertilizer, etc.",
    'Plow': "P is low. Suggestions: Use bone meal, phosphate, manure, compost, etc.",
    'KHigh': "K is high. Suggestions: Water soil, avoid K fertilizers, add calcium sources.",
    'Klow': "K is low. Suggestions: Use potash, banana peels, seaweed, etc."
  };

  // Generate fertilizer advice based on input values
  const getFertilizerFeedback = (n: number, p: number, k: number) => {
    const feedback = [];

    if (n > 120) {
      feedback.push(fertilizer_dic['NHigh']);
    } else if (n < 90) {
      feedback.push(fertilizer_dic['Nlow']);
    }

    if (p > 100) {
      feedback.push(fertilizer_dic['PHigh']);
    } else if (p < 40) {
      feedback.push(fertilizer_dic['Plow']);
    }

    if (k > 120) {
      feedback.push(fertilizer_dic['KHigh']);
    } else if (k < 20) {
      feedback.push(fertilizer_dic['Klow']);
    }

    return feedback.length > 0 
      ? feedback.join("<br><br>") 
      : "Nutrient levels are optimal.";
  };

  // Simulate model predictions
  // In a real implementation, these would be actual model predictions
  const getRandomFertilizer = () => {
    const fertilizers = [
      "Urea", "DAP", "14-35-14", "28-28", "17-17-17", "20-20",
      "10-26-26", "NPK-10", "NPK-20", "Organic Fertilizer"
    ];
    return fertilizers[Math.floor(Math.random() * fertilizers.length)];
  };

  const feedback = getFertilizerFeedback(n, p, k);
  
  // Return the predictions and advice
  return {
    random_forest_prediction: getRandomFertilizer(),
    decision_tree_prediction: getRandomFertilizer(),
    logistic_regression_prediction: getRandomFertilizer(),
    fertilizer_advice: feedback
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nitrogen, phosphorous, potassium, crop } = await req.json();
    
    // Validate input
    if (nitrogen === undefined || phosphorous === undefined || potassium === undefined || !crop) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get fertilizer prediction
    const result = predictFertilizer(
      parseFloat(nitrogen),
      parseFloat(phosphorous), 
      parseFloat(potassium), 
      crop.toLowerCase()
    );

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
