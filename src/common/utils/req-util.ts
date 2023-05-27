export function queryParamToBool(value: unknown) {
  if (value === undefined || value === null) return value;
  return ((value + '').toLowerCase() === 'true')
}

