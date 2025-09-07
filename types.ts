
export type Day = 'ראשון' | 'שני' | 'שלישי' | 'רביעי' | 'חמישי';
export type TimeSlot = 'שעה 1' | 'שעה 2' | 'שעה 3' | 'שעה 4' | 'שעה 5' | 'שעה 6';

export interface Course {
  id: number;
  name: string;
  details: string;
  day: Day;
  timeSlot: TimeSlot;
}
