export type InputProps = {
  name: string;
  type: boolean;
  children: React.ReactNode;
};

type Option = {
  label: string;
  value: string;
};

export type MultiselectProps = {
  options: Option[];
};

export type MultiselectOptionProps = {
  option: Option;
};

export type RadioGroupProps = {
  options: Option[];
  initial: string;
  layout?: string;
};

export type RadioProps = {
  option: Option;
  checked: boolean;
  changeHandler: (option: string) => void;
};

export type RadioCircleProps = {
  checked: boolean;
};

export type TextFieldProps = {
  type?: string;
};

export type NumberFieldProps = {
  step: number;
  units?: Option[];
};

export type LogoProps = {
  isEdit: boolean;
};

// Data types
export type FieldType = {
  type: string;
  unit: string;
  value: number;
};

export type SetType = {
  id: number;
  fields: FieldType[];
  type: string;
  unit: string | null;
  goal: number;
};

export type RecordType = {
  id: number;
  created_at: Date;
  set: SetType;
};

export type ExerciseType = {
  id: number;
  name: string;
  description: string;
  sets: number[]; // Set IDs
  history: number[]; // Record IDs
};

export type GroupType = {
  id: number;
  name: string;
  exercises: number[]; // Exercise IDs
};

export type WeekdayType = {
  groups: number[]; // Group IDs
  active: boolean;
  day: string;
};

export type WeekdaysType = {
  [key: string]: WeekdayType;
};
