
import { Reminder, ReminderType } from "@/types/reminders";

export const getNextDate = (frequency: string): Date => {
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

export const formatTaskType = (type: string): string => {
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
