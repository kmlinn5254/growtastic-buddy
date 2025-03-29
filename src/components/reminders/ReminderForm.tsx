
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Plant } from "@/types/plants";
import { ReminderFormValues, ReminderType } from "@/types/reminders";

interface ReminderFormProps {
  plants: Plant[];
  onSubmit: (data: ReminderFormValues) => void;
}

const ReminderForm = ({ plants, onSubmit }: ReminderFormProps) => {
  const form = useForm<ReminderFormValues>({
    defaultValues: {
      plantId: 0,
      type: "water",
      frequency: "weekly",
      notes: "",
    },
  });

  const handleSubmit = (data: ReminderFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="plantId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plant</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {plants.map((plant) => (
                    <SelectItem key={plant.id} value={plant.id.toString()}>
                      {plant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reminder Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reminder type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="fertilize">Fertilize</SelectItem>
                  <SelectItem value="repot">Repot</SelectItem>
                  <SelectItem value="prune">Prune</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Every 2 Weeks</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Add any special notes..." {...field} />
              </FormControl>
              <FormDescription>
                Any specific details to remember for this task
              </FormDescription>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="bg-plant-primary hover:bg-plant-primary/90 w-full"
        >
          Add Reminder
        </Button>
      </form>
    </Form>
  );
};

export default ReminderForm;
