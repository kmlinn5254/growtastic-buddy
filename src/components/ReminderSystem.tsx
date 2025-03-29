
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Bell, Calendar, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Plant } from "./PlantSelection";

export type Reminder = {
  id: string;
  plantId: number;
  plantName: string;
  type: "water" | "fertilize" | "repot" | "prune" | "other";
  frequency: string;
  enabled: boolean;
  nextDate: Date;
  notes: string;
};

interface ReminderSystemProps {
  plants: Plant[];
}

const ReminderSystem = ({ plants }: ReminderSystemProps) => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const savedReminders = localStorage.getItem("plantReminders");
    return savedReminders ? JSON.parse(savedReminders) : [];
  });

  const form = useForm({
    defaultValues: {
      plantId: 0,
      type: "water" as const,
      frequency: "weekly",
      notes: "",
    },
  });

  useEffect(() => {
    localStorage.setItem("plantReminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (data: any) => {
    const plant = plants.find((p) => p.id === parseInt(data.plantId));
    if (!plant) return;

    const newReminder: Reminder = {
      id: Date.now().toString(),
      plantId: parseInt(data.plantId),
      plantName: plant.name,
      type: data.type,
      frequency: data.frequency,
      enabled: true,
      nextDate: getNextDate(data.frequency),
      notes: data.notes,
    };

    setReminders((prev) => [...prev, newReminder]);
    form.reset();
    
    toast({
      title: "Reminder created",
      description: `You will be reminded to ${data.type} your ${plant.name} ${data.frequency}.`,
    });
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
    toast({
      title: "Reminder deleted",
      variant: "destructive",
    });
  };

  const getNextDate = (frequency: string): Date => {
    const date = new Date();
    
    switch (frequency) {
      case "daily":
        date.setDate(date.getDate() + 1);
        break;
      case "weekly":
        date.setDate(date.getDate() + 7);
        break;
      case "biweekly":
        date.setDate(date.getDate() + 14);
        break;
      case "monthly":
        date.setMonth(date.getMonth() + 1);
        break;
      default:
        break;
    }
    
    return date;
  };

  const formatTaskType = (type: string): string => {
    switch (type) {
      case "water":
        return "Water";
      case "fertilize":
        return "Fertilize";
      case "repot":
        return "Repot";
      case "prune":
        return "Prune";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-plant-primary" />
            Create a Plant Care Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addReminder)} className="space-y-4">
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
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Plant Care Reminders</h3>
        {reminders.length === 0 ? (
          <p className="text-muted-foreground">No reminders set. Add one above to get started.</p>
        ) : (
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <Card key={reminder.id} className="flex items-center">
                <CardContent className="flex justify-between items-center p-4 w-full">
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={reminder.enabled}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                    />
                    <div>
                      <h4 className="font-medium">
                        {formatTaskType(reminder.type)} {reminder.plantName}
                      </h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{reminder.frequency}, next: {new Date(reminder.nextDate).toLocaleDateString()}</span>
                      </div>
                      {reminder.notes && (
                        <p className="text-sm italic mt-1">{reminder.notes}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReminderSystem;
