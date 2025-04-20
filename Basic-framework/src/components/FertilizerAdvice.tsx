
import { Card } from "@/components/ui/card";
import { Check, AlertTriangle } from "lucide-react";

interface FertilizerAdviceProps {
  predictions: {
    random_forest_prediction: string;
    decision_tree_prediction: string;
    logistic_regression_prediction: string;
    fertilizer_advice: string;
  };
  className?: string;
}

const FertilizerAdvice = ({ predictions, className = "" }: FertilizerAdviceProps) => {
  const uniquePredictions = new Set([
    predictions.random_forest_prediction,
    predictions.decision_tree_prediction,
    predictions.logistic_regression_prediction
  ]);

  const consensusPrediction = uniquePredictions.size === 1;

  return (
    <div className={className}>
      <Card className="p-6 bg-white shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Fertilizer Recommendations</h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-medium text-gray-700">Model Predictions accuracy:0.607</h4>
              {consensusPrediction ? (
                <span className="inline-flex items-center text-sm text-green-600">
                  <Check className="w-4 h-4 mr-1" />
                  Consensus
                </span>
              ) : (
                <span className="inline-flex items-center text-sm text-amber-600">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Mixed predictions
                </span>
              )}
            </div>
            
            <div className="grid gap-3 md:grid-cols-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Random Forest</p>
                <p className="mt-1 text-sm">{predictions.random_forest_prediction}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Decision Tree</p>
                <p className="mt-1 text-sm">{predictions.decision_tree_prediction}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Logistic Regression</p>
                <p className="mt-1 text-sm">{predictions.logistic_regression_prediction}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Nutrient Analysis & Recommendations</h4>
            <div 
              className="p-4 bg-gray-50 rounded-lg text-sm prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: predictions.fertilizer_advice }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FertilizerAdvice;
