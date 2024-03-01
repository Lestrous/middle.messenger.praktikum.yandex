export class Validator {
  validateMessage(message: string) {
    return !!message;
  }

  validateLogin(login: string) {
    const regexp = /^[\w-]{3,20}$/;
    const regexpNotOnlyNumbers = /\D/;

    return regexp.test(login) && regexpNotOnlyNumbers.test(login);
  }

  validatePassword(password: string) {
    const regexp = /^\S{8,40}$/;
    const regexpAtLeastOneCapitalize = /[A-Z]/;
    const regexpAtLeastOneNumber = /\d/;

    return (
      regexp.test(password) &&
      regexpAtLeastOneCapitalize.test(password) &&
      regexpAtLeastOneNumber.test(password)
    );
  }

  validateEmail(email: string) {
    const regexp = /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]*$/;

    return regexp.test(email);
  }

  validateName(name: string) {
    const regexp = /^[А-ЯA-Z]+[А-ЯA-Zа-яa-z-]*$/;

    return regexp.test(name);
  }

  validatesPhone(phone: string) {
    const regexp = /^\+\d{9,14}$|^\d{10,15}$/;

    return regexp.test(phone);
  }
}
