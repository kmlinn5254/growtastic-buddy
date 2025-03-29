
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";
import { Plant } from "@/types/plants";
import { Reminder, ReminderFormValues } from "@/types/reminders";
import { getNextDate } from "@/utils/reminderUtils";
import ReminderForm from "./reminders/ReminderForm";
import ReminderList from "./reminders/ReminderList";

interface ReminderSystemProps {
  plants: Plant[];
}

const ReminderSystem = ({ plants }: ReminderSystemProps) => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const savedReminders = localStorage.getItem("plantReminders");
    return savedReminders ? JSON.parse(savedReminders) : [];
  });

  useEffect(() => {
    localStorage.setItem("plantReminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (data: ReminderFormValues) => {
    const plant = plants.find((p) => p.id === parseInt(data.plantId.toString()));
    if (!plant) return;

    const newReminder: Reminder = {
      id: Date.now().toString(),
      plantId: parseInt(data.plantId.toString()),
      plantName: plant.name,
      type: data.type,
      frequency: data.frequency,
      enabled: true,
      nextDate: getNextDate(data.frequency),
      notes: data.notes,
    };

    setReminders((prev) => [...prev, newReminder]);
    
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
          <ReminderForm plants={plants} onSubmit={addReminder} />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Plant Care Reminders</h3>
        <ReminderList 
          reminders={reminders} 
          onToggle={toggleReminder} 
          onDelete={deleteReminder} 
        />
      </div>
    </div>
  );
};

export default ReminderSystem;
