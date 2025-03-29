
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Leaf, X, Plus } from "lucide-react";
import { Plant, saveImportedPlant } from "@/services/plantService";
import { toast } from "@/components/ui/use-toast";

interface ImportPlantFormProps {
  onSuccess?: () => void;
  onCancel: () => void;
}

const ImportPlantForm: React.FC<ImportPlantFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [careSteps, setCareSteps] = useState<{ title: string; description: string }[]>([
    { title: "", description: "" }
  ]);

  const form = useForm<Omit<Plant, "id" | "isImported">>({
    defaultValues: {
      name: "",
      image: "",
      difficulty: "Moderate",
      light: "",
      water: "",
      temperature: "",
      description: "",
    },
  });

  const addCareStep = () => {
    setCareSteps([...careSteps, { title: "", description: "" }]);
  };

  const removeCareStep = (index: number) => {
    setCareSteps(careSteps.filter((_, i) => i !== index));
  };

  const updateCareStep = (index: number, field: "title" | "description", value: string) => {
    const updatedSteps = [...careSteps];
    updatedSteps[index][field] = value;
    setCareSteps(updatedSteps);
  };

  const onSubmit = (data: Omit<Plant, "id" | "isImported">) => {
    // Filter out empty care steps
    const validCareSteps = careSteps.filter(
      step => step.title.trim() !== "" && step.description.trim() !== ""
    );

    const plant: Omit<Plant, "id"> = {
      ...data,
      careSteps: validCareSteps.length > 0 ? validCareSteps : undefined,
      isImported: true
    };

    const success = saveImportedPlant(plant as Plant);
    
    if (success) {
      toast({
        title: "Plant guide imported",
        description: `${plant.name} has been added to your plant database.`,
      });
      if (onSuccess) onSuccess();
    } else {
      toast({
        title: "Import failed",
        description: "There was an error importing the plant guide. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-plant-dark flex items-center gap-2">
          <Leaf className="h-6 w-6 text-plant-primary" />
          Import Plant Care Guide
        </h2>
        <Button variant="ghost" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plant Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Monstera Deliciosa" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/plant-image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Very Easy">Very Easy</SelectItem>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Difficult">Difficult</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="light"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Light Requirements*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Bright indirect light"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="water"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Watering Needs*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Once a week, when soil is dry"
                      {...field}
                      required
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
                  <FormLabel>Temperature Range*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 65-80°F"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add a general description of the plant..."
                    className="min-h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Care Steps</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCareStep}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Step
              </Button>
            </div>

            {careSteps.map((step, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 p-4 border rounded-md relative"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => removeCareStep(index)}
                  disabled={careSteps.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div>
                  <FormLabel className={`${index !== 0 ? "sr-only" : ""}`}>
                    Step Title
                  </FormLabel>
                  <Input
                    placeholder="e.g., Watering Instructions"
                    value={step.title}
                    onChange={(e) =>
                      updateCareStep(index, "title", e.target.value)
                    }
                  />
                </div>

                <div>
                  <FormLabel className={`${index !== 0 ? "sr-only" : ""}`}>
                    Step Description
                  </FormLabel>
                  <Textarea
                    placeholder="Detailed instructions for this care step..."
                    className="min-h-20"
                    value={step.description}
                    onChange={(e) =>
                      updateCareStep(index, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Import Plant Guide</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ImportPlantForm;
