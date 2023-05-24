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
  edit: boolean;
  onChange: (option: string) => void;
};

export type RadioProps = {
  option: Option;
  checked: boolean;
  changeHandler: (option: string) => void;
  edit: boolean;
};

export type RadioCircleProps = {
  checked: boolean;
};

export type TextFieldProps = {
  type?: string;
};

export type NumberFieldProps = {
  step: number;
  goal: boolean;
  field: FieldType;
  setId: number;
};

export type LogoProps = {
  closeMenu: () => void;
};

export type ActionButtonProps = {
  menuClickHandler: () => void;
  theme: boolean;
};

export type SetButtonProps = {
  set: SetType;
  bg: string;
  text: string;
  edit: boolean;
};

export type SetComponentProps = {
  set: SetType;
  hover: boolean;
  selected: boolean;
  edit: boolean;
  bg: string;
};

// Data types
export type FieldType = {
  goal?: boolean;
  type: string;
  unit: string;
  value: number;
};

export type SetType = {
  id: number;
  fields: FieldType[];
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
  breadcrumbs: BreadcumbType[];
};

export type EditType = {
  value: boolean;
  result: null | boolean;
};

export type AddType = {
  value: boolean;
  result: null | boolean;
  type: string;
  object: SetType | ExerciseType | GroupType | null;
};

export type ConfirmType = {
  value: boolean;
  result: null | boolean;
  // msg: string;
  type: string;
  id: number;
};

export type ActionsSliceType = {
  edit: EditType;
  add: AddType;
  confirm: ConfirmType;
};

export type UnitsType = {
  [key: string]: Option[];
};

export type RouteLoaderType = {
  id: number | string;
};
