
import { Card } from "@/components/ui/card";
import Image from "../assets/crop.png";

interface CropPredictionResultProps {
  result: string | null;
}

const CropPredictionResult = ({ result }: CropPredictionResultProps) => {
  if (!result) return null;

  return (
    <Card className="w-[300px] mx-auto mt-6 bg-gray-900 text-white p-4">
      <div className="flex flex-col items-center">
        <h5 className="text-lg font-semibold mb-2">
          Recommend Crop for Cultivation is:
        </h5>
        <p className="text-center">{result}</p>
      </div>
    </Card>
  );
};

export default CropPredictionResult;
