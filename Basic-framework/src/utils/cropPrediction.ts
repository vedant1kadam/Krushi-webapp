const cropDict: { [key: number]: string } = {
  1: "Rice",
  2: "Maize",
  3: "Jute",
  4: "Cotton",
  5: "Coconut",
  6: "Papaya",
  7: "Orange",
  8: "Apple",
  9: "Muskmelon",
  10: "Watermelon",
  11: "Grapes",
  12: "Mango",
  13: "Banana",
  14: "Pomegranate",
  15: "Lentil",
  16: "Blackgram",
  17: "Mungbean",
  18: "Mothbeans",
  19: "Pigeonpeas",
  20: "Kidneybeans",
  21: "Chickpea",
  22: "Coffee",
};

import { supabase } from "@/integrations/supabase/client";

export const predictCrop = async (
  nitrogen: number,
  phosphorus: number,
  potassium: number,
  temperature: number,
  humidity: number,
  ph: number,
  rainfall: number
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('predict-crop', {
      body: {
        nitrogen,
        phosphorus,
        potassium,
        temperature,
        humidity,
        phLevel: ph,
        rainfall
      }
    });

    if (error) throw error;
    return data.result;
  } catch (error) {
    console.error('Error predicting crop:', error);
    return "Error predicting crop. Please try again.";
  }
};