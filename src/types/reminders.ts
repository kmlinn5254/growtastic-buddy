
import { Plant } from "./plants";

export type ReminderType = "water" | "fertilize" | "repot" | "prune" | "other";
export type ReminderFrequency = "daily" | "weekly" | "biweekly" | "monthly";

export interface Reminder {
  id: string;
  plantId: number;
  plantName: string;
  type: ReminderType;
  frequency: string;
  enabled: boolean;
  nextDate: Date;
  notes: string;
}

export interface ReminderFormValues {
  plantId: number;
  type: ReminderType;
  frequency: ReminderFrequency;
  notes: string;
}
