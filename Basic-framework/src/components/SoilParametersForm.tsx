import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Thermometer, Droplets, MapPin, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { predictCrop } from "@/utils/cropPrediction";
import CropPredictionResult from "./CropPredictionResult";

const formSchema = z.object({
  nitrogen: z.number().min(0).max(1000),
  phosphorus: z.number().min(0).max(1000),
  potassium: z.number().min(0).max(1000),
  temperature: z.number().min(-50).max(60),
  humidity: z.number().min(0).max(100),
  phLevel: z.number().min(0).max(14).step(0.1),
  rainfall: z.number().min(0).max(10000),
});

type FormValues = z.infer<typeof formSchema>;

const SoilParametersForm = () => {
  const { toast } = useToast();
  const [predictionResult, setPredictionResult] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      temperature: 20,
      humidity: 50,
      phLevel: 7,
      rainfall: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const result = await predictCrop(
      data.nitrogen,
      data.phosphorus,
      data.potassium,
      data.temperature,
      data.humidity,
      data.phLevel,
      data.rainfall
    );
    setPredictionResult(result);
    toast({
      title: "Prediction complete",
      description: "Your crop prediction has been calculated.",
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="nitrogen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Hash className="h-4 w-4" /> N (Nitrogen)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter nitrogen value..."
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phosphorus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Hash className="h-4 w-4" /> P (Phosphorus)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter phosphorus value..."
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="potassium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Hash className="h-4 w-4" /> K (Potassium)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter potassium value..."
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Hash className="h-4 w-4" /> pH Level
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter pH level..."
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4" /> Temperature (°C)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter temperature..."
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rainfall"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Droplets className="h-4 w-4" /> Rainfall (mm)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter rainfall..."
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="humidity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Hash className="h-4 w-4" /> Humidity
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter humidity..."
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <Button
            type="submit"
            className="w-full bg-soilsmart-green hover:bg-soilsmart-green-dark transition-all duration-300 hover:shadow-lg active:transform active:scale-95"
          >
            Predict Suitable Crop
          </Button>
        </form>
      </Form>
      <CropPredictionResult result={predictionResult} />
    </>
  );
};

export default SoilParametersForm;
