export class AuthHelper {
  static validateEmail(value: string) {
    const rex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const valid = rex.test(value)

    if (!valid) {
      return 'Invalid e-mail'
    }

    return ''
  }

  static validatePassword(value: string) {
    if (value.length < 8) {
      return 'Password must be a minimum of 8 characters'
    }

    if (!/[A-Z]/.test(value)) {
      return 'Password must have at least one upper case letter'
    }

    if (!/[a-z]/.test(value)) {
      return 'Password must have at least one lower case letter'
    }

    return ''
  }

  static validateConfirmPassword(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      return 'Password does not match!'
    }

    return ''
  }

  static validateInput(type: string, value: string, required = true) {
    if (!value && required) {
      return 'This field is required!'
    }

    switch (type) {
      case 'email':
        return this.validateEmail(value)
      case 'password':
        return this.validatePassword(value)
      default:
        return ''
    }
  }
}
