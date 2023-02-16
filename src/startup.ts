import crypto from 'crypto';
import { UserRepository } from './repositories/implementations/UserRepository';
import { createUserUseCase } from './useCases/user';

const userRepository = new UserRepository();

async function validationIfExistUser(): Promise<void> {
  const user = await userRepository.findAll();

  if (user.length) {
    return;
  }

  const randomPassword = crypto.randomBytes(30).toString('base64').slice(0, 30);

  createUserUseCase.execute('kronus-adm', randomPassword);
  console.log(
    '\n',
    '**** First start ****',
    '\n',
    'New user have been created',
    '\n',
    'username: kronus-adm',
    '\n',
    `password: ${randomPassword}`,
    '\n',
    '*********************'
  );
}

export { validationIfExistUser };
