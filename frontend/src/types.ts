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
  closeMenu: () => void;
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
  active: boolean;
};

export type RecordType = {
  id: number;
  created_at: Date;
  set: number;
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

export type UserType = {
  id: number;
  username: string;
  email: string;
};

export type BreadcumbType = {
  name: string;
  path: string;
};

export type AppSliceType = {
  filterBy: string;
  user: null | UserType;
  edit: boolean;
  breadcrumbs: BreadcumbType[];
};

export type UnitsType = {
  [key: string]: Option[];
};

export type WeekdayLoaderType = {
  data: WeekdayType;
  groups: GroupType[];
};

export type GroupLoaderType = {
  data: GroupType | undefined;
  exercises: ExerciseType[];
};

export type ExerciseLoaderType = {
  data: ExerciseType | undefined;
  sets: SetType[];
};

export type SetLoaderType = {
  data: SetType | undefined;
};
