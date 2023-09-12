import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export function comparePasswords(enteredPassword: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(enteredPassword, hashedPassword);
}