import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueUserEmailValidator } from './validators/unique-user-email.validator';

export function UniqueUserEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UniqueUserEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueUserEmailValidator,
    });
  };
}
