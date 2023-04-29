const textColors = [
  'text-light-50 dark:text-dark-50',
  'text-light-100 dark:text-dark-100',
  'text-light-200 dark:text-dark-200',
  'text-light-300 dark:text-dark-300',
  'text-light-400 dark:text-dark-400',
  'text-light-500 dark:text-dark-500',
  'text-light-600 dark:text-dark-600',
  'text-light-700 dark:text-dark-700',
  'text-light-800 dark:text-dark-800',
  'text-light-900 dark:text-dark-900',
];

export const getTextColors = (length: number) => {
  const mid = textColors.length / 2;
  const begin = mid - length / 2 + ((length + 1) % 2);
  const end = mid + length / 2;

  return textColors.slice(begin, end);
};
