export const required = value => (value != null ? undefined : 'This field is required!')
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const maxLength = (max) => value => value.length > max ? `Max length of this message is ${max} characters` : undefined