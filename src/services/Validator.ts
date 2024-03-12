export class Validator {
  validateMessage(message: string) {
    return !!message;
  }

  validateLogin(login: string) {
    const regexp = /^[\w-]{3,20}$/;
    const regexpNotOnlyNumbers = /^\d+$/;

    if (regexpNotOnlyNumbers.test(login)) {
      return {
        isValidValue: false,
        error: 'Логин не может состоять только из цифр',
      };
    }

    if (!regexp.test(login)) {
      return {
        isValidValue: false,
        error:
          login.length < 3
            ? 'Длина логина не может быть меньше 3 символов'
            : login.length > 20
              ? 'Длина логина не может быть больше 20 символов'
              : 'Используются недопустимые символы',
      };
    }

    return {
      isValidValue: true,
      error: '',
    };
  }

  validatePassword(password: string) {
    const regexp = /^\S{8,40}$/;
    const regexpAtLeastOneCapitalize = /[A-Z]/;
    const regexpAtLeastOneNumber = /\d/;

    if (!regexpAtLeastOneCapitalize.test(password)) {
      return {
        isValidValue: false,
        error: 'Должна быть хотя бы одна заглавная буква',
      };
    }

    if (!regexpAtLeastOneNumber.test(password)) {
      return {
        isValidValue: false,
        error: 'Должна быть хотя бы одна цифра',
      };
    }

    if (!regexp.test(password)) {
      return {
        isValidValue: false,
        error:
          password.length < 8
            ? 'Длина пароля не может быть меньше 8 символов'
            : password.length > 40
              ? 'Длина пароля не может быть больше 40 символов'
              : 'Неверный пароль',
      };
    }

    return {
      isValidValue: true,
      error: '',
    };
  }

  validateEmail(email: string) {
    const regexp = /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]*$/;

    if (!regexp.test(email)) {
      return {
        isValidValue: false,
        error: 'Неверный формат почты',
      };
    }

    return {
      isValidValue: true,
      error: '',
    };
  }

  validateName(name: string) {
    const regexp = /^[А-ЯA-Z]+[А-ЯA-Zа-яa-z-]*$/;
    const regexpFirstLetterCapitalize = /^[А-ЯA-Z].*$/;
    const regexpSpaces = /\s/;
    const regexpNumbers = /\d/;

    if (!regexpFirstLetterCapitalize.test(name)) {
      return {
        isValidValue: false,
        error: 'Первая буква должна быть заглавной',
      };
    }

    if (regexpSpaces.test(name)) {
      return {
        isValidValue: false,
        error: 'Не должно быть пробелов',
      };
    }

    if (regexpNumbers.test(name)) {
      return {
        isValidValue: false,
        error: 'Не должно быть цифр',
      };
    }

    if (!regexp.test(name)) {
      return {
        isValidValue: false,
        error: 'Не должно быть спецсимволов',
      };
    }

    return {
      isValidValue: true,
      error: '',
    };
  }

  validatePhone(phone: string) {
    const regexp = /^\+\d{9,14}$|^\d{10,15}$/;

    if (!regexp.test(phone)) {
      return {
        isValidValue: false,
        error:
          phone.length < 10
            ? 'Длина номера не может быть меньше 10 символов'
            : phone.length > 15
              ? 'Длина номера не может быть больше 15 символов'
              : 'Неверный формат номера',
      };
    }

    return {
      isValidValue: true,
      error: '',
    };
  }

  validateDisplayName() {
    return {
      isValidValue: true,
      error: '',
    };
  }
}
