import { maxLength, minLength, patterEmail, required } from './rules';

export const emailSchema = {
  required,
  minLength: minLength(2),
  maxLength: maxLength(25),
  pattern: patterEmail
};
