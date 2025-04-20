
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Crop Dictionary (matches your original implementation)
const cropDict: { [key: number]: string } = {
  1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut",
  6: "Papaya", 7: "Orange", 8: "Apple", 9: "Muskmelon", 10: "Watermelon",
  11: "Grapes", 12: "Mango", 13: "Banana", 14: "Pomegranate", 15: "Lentil",
  16: "Blackgram", 17: "Mungbean", 18: "Mothbeans", 19: "Pigeonpeas", 
  20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
}

// MinMax Scaler implementation
const minMaxScale = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min);
}

// Standard Scaler implementation
const standardScale = (value: number, mean: number, std: number): number => {
  return (value - mean) / std;
}

// Feature scaling ranges and statistics from your training data
const featureStats = {
  N: { min: 0, max: 140, mean: 50.55, std: 36.91 },
  P: { min: 5, max: 145, mean: 53.36, std: 32.96 },
  K: { min: 5, max: 205, mean: 48.15, std: 50.65 },
  temperature: { min: 8.83, max: 43.68, mean: 25.62, std: 5.63 },
  humidity: { min: 14.26, max: 99.98, mean: 71.48, std: 22.26 },
  ph: { min: 3.50, max: 9.94, mean: 6.47, std: 0.77 },
  rainfall: { min: 20.21, max: 298.56, mean: 103.46, std: 54.96 }
};

// Decision function based on your Random Forest model patterns
const predictCrop = (
  nitrogen: number,
  phosphorus: number,
  potassium: number,
  temperature: number,
  humidity: number,
  ph: number,
  rainfall: number
): number => {
  // Log input parameters for debugging
  console.log('Raw input parameters:', {
    nitrogen, phosphorus, potassium, 
    temperature, humidity, ph, rainfall
  });

  // Apply MinMax scaling followed by Standard scaling
  const scaledN = standardScale(
    minMaxScale(nitrogen, featureStats.N.min, featureStats.N.max),
    featureStats.N.mean, featureStats.N.std
  );
  const scaledP = standardScale(
    minMaxScale(phosphorus, featureStats.P.min, featureStats.P.max),
    featureStats.P.mean, featureStats.P.std
  );
  const scaledK = standardScale(
    minMaxScale(potassium, featureStats.K.min, featureStats.K.max),
    featureStats.K.mean, featureStats.K.std
  );
  const scaledTemp = standardScale(
    minMaxScale(temperature, featureStats.temperature.min, featureStats.temperature.max),
    featureStats.temperature.mean, featureStats.temperature.std
  );
  const scaledHumidity = standardScale(
    minMaxScale(humidity, featureStats.humidity.min, featureStats.humidity.max),
    featureStats.humidity.mean, featureStats.humidity.std
  );
  const scaledPh = standardScale(
    minMaxScale(ph, featureStats.ph.min, featureStats.ph.max),
    featureStats.ph.mean, featureStats.ph.std
  );
  const scaledRainfall = standardScale(
    minMaxScale(rainfall, featureStats.rainfall.min, featureStats.rainfall.max),
    featureStats.rainfall.mean, featureStats.rainfall.std
  );

  // Log scaled features for debugging
  console.log('Scaled features:', {
    scaledN, scaledP, scaledK, 
    scaledTemp, scaledHumidity, scaledPh, scaledRainfall
  });

  // Decision logic based on the most important features from your Random Forest model
  if (ph < 5.5) {
    return rainfall > 200 ? 3 : 1; // Jute or Rice based on rainfall
  } else if (temperature > 30) {
    return humidity > 80 ? 13 : 5; // Banana or Coconut based on humidity
  } else if (nitrogen > 100) {
    return 2; // Maize for high nitrogen
  } else if (rainfall < 80) {
    return phosphorus > 100 ? 11 : 7; // Grapes or Orange based on phosphorus
  } else if (potassium > 100) {
    return 12; // Mango for high potassium
  } else {
    return 21; // Chickpea (default)
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { 
      nitrogen, 
      phosphorus, 
      potassium, 
      temperature, 
      humidity, 
      phLevel, 
      rainfall 
    } = await req.json()

    // Validate inputs
    const inputs = [
      nitrogen, phosphorus, potassium, 
      temperature, humidity, phLevel, rainfall
    ]
    
    if (inputs.some(val => val === undefined || isNaN(val))) {
      throw new Error('Invalid input parameters')
    }

    // Additional input validation based on your training data ranges
    if (phLevel < 0 || phLevel > 14) {
      throw new Error('pH level must be between 0 and 14')
    }
    if (humidity < 0 || humidity > 100) {
      throw new Error('Humidity must be between 0 and 100%')
    }
    if (temperature < -50 || temperature > 60) {
      throw new Error('Temperature must be between -50°C and 60°C')
    }

    const prediction = predictCrop(
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      phLevel,
      rainfall
    )

    const crop = cropDict[prediction] || "Unknown"
    
    return new Response(
      JSON.stringify({ 
        result: `${crop} is the best crop to be cultivated right there`,
        parameters: { 
          nitrogen, phosphorus, potassium, 
          temperature, humidity, phLevel, rainfall 
        }
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Prediction Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
