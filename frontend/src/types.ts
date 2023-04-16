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
