
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SoilAnalysisFormProps {
  onPredictionResult: (result: {
    random_forest_prediction: string;
    decision_tree_prediction: string;
    logistic_regression_prediction: string;
    fertilizer_advice: string;
  }) => void;
}

const SoilAnalysisForm: React.FC<SoilAnalysisFormProps> = ({ onPredictionResult }) => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    crop: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('predict-fertilizer', {
        body: {
          nitrogen: Number(formData.nitrogen),
          phosphorous: Number(formData.phosphorus),
          potassium: Number(formData.potassium),
          crop: formData.crop
        }
      });

      if (error) throw error;
      
      onPredictionResult(data);
      toast({
        title: "Prediction Complete",
        description: "Your fertilizer recommendations are ready.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get predictions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCropChange = (value: string) => {
    setFormData({
      ...formData,
      crop: value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-700 mb-1">
            Nitrogen (N)
          </label>
          <input
            type="number"
            id="nitrogen"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-soilsmart-green focus:border-soilsmart-green"
            placeholder="Enter nitrogen value"
            required
          />
        </div>

        <div>
          <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-700 mb-1">
            Phosphorus (P)
          </label>
          <input
            type="number"
            id="phosphorus"
            name="phosphorus"
            value={formData.phosphorus}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-soilsmart-green focus:border-soilsmart-green"
            placeholder="Enter phosphorus value"
            required
          />
        </div>

        <div>
          <label htmlFor="potassium" className="block text-sm font-medium text-gray-700 mb-1">
            Potassium (K)
          </label>
          <input
            type="number"
            id="potassium"
            name="potassium"
            value={formData.potassium}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-soilsmart-green focus:border-soilsmart-green"
            placeholder="Enter potassium value"
            required
          />
        </div>

        <div>
          <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-1">
            Crop Type
          </label>
          <Select 
            value={formData.crop}
            onValueChange={handleCropChange}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="maize">Maize</SelectItem>
              <SelectItem value="jute">Jute</SelectItem>
              <SelectItem value="cotton">Cotton</SelectItem>
              <SelectItem value="coconut">Coconut</SelectItem>
              <SelectItem value="papaya">Papaya</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="muskmelon">Muskmelon</SelectItem>
              <SelectItem value="watermelon">Watermelon</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="mango">Mango</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="pomegranate">Pomegranate</SelectItem>
              <SelectItem value="lentil">Lentil</SelectItem>
              <SelectItem value="blackgram">Blackgram</SelectItem>
              <SelectItem value="mungbean">Mungbean</SelectItem>
              <SelectItem value="mothbeans">Mothbeans</SelectItem>
              <SelectItem value="pigeonpeas">Pigeonpeas</SelectItem>
              <SelectItem value="kidneybeans">Kidneybeans</SelectItem>
              <SelectItem value="chickpea">Chickpea</SelectItem>
              <SelectItem value="coffee">Coffee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-soilsmart-green text-white py-2 px-4 rounded-md hover:bg-soilsmart-green-dark transition-colors duration-300 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Soil Parameters'}
      </button>
    </form>
  );
};

export default SoilAnalysisForm;
