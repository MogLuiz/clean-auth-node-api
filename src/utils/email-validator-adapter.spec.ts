import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator-adapter'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const anyEmail = 'any_email@mail.com'
    const isEmailValidSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid(anyEmail)
    expect(isEmailValidSpy).toHaveBeenCalledWith(anyEmail)
  })
})
