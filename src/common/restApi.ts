'use server';

import type { ObjectWithId } from '@/components/client-table/types.ts';

export const replaceVariables = (text: string, variables: ObjectWithId[]): string => {
  const variableMap = Object.fromEntries(
    variables.filter(({ key, value }) => key.trim() && value.trim()).map(({ key, value }) => [key, value]),
  );

  let result = text;
  Object.entries(variableMap).forEach(([variableKey, variableValue]) => {
    const variablePlaceholder = `{{${variableKey}}}`;
    result = result.replace(new RegExp(variablePlaceholder, 'g'), variableValue);
  });

  return result.trim();
};
