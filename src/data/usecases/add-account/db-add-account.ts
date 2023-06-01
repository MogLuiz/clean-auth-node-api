import {
  type AddAccountModel,
  type AddAccount,
  type Encrypter,
  type AccountModel
} from './db-add-account-protocols'
import { type AddAccountRepository } from '../../protocols/add-account-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepositoryStub: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepositoryStub.add(
      Object.assign({}, accountData, { password: hashedPassword })
    )
    return await new Promise((resolve) => {
      resolve({ name: '', id: '', password: '', email: '' })
    })
  }
}
