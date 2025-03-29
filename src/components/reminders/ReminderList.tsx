
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Reminder } from "@/types/reminders";
import { formatTaskType } from "@/utils/reminderUtils";
import { Calendar, Trash2 } from "lucide-react";

interface ReminderListProps {
  reminders: Reminder[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const ReminderList = ({ reminders, onToggle, onDelete }: ReminderListProps) => {
  if (reminders.length === 0) {
    return <p className="text-muted-foreground">No reminders set. Add one above to get started.</p>;
  }

  return (
    <div className="space-y-3">
      {reminders.map((reminder) => (
        <Card key={reminder.id} className="flex items-center">
          <CardContent className="flex justify-between items-center p-4 w-full">
            <div className="flex items-center space-x-4">
              <Switch
                checked={reminder.enabled}
                onCheckedChange={() => onToggle(reminder.id)}
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
              onClick={() => onDelete(reminder.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReminderList;
