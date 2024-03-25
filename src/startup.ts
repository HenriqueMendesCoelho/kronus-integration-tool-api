import crypto from 'crypto';
import { UserRepository } from './repositories/implementations/UserRepository';
import { createUserUseCase } from './useCases/user';

const userRepository = new UserRepository();

async function validateFirstStart(): Promise<void> {
  const user = await userRepository.findAll();

  if (user.length) {
    return;
  }

  const randomPassword = crypto.randomBytes(30).toString('base64').slice(0, 30);

  const userCreated = await createUserUseCase.execute(
    'kronus-ing-tool',
    randomPassword
  );
  console.log(
    '\n',
    '**** First start ****',
    '\n',
    'New user have been created',
    '\n',
    `username: ${userCreated.username}`,
    '\n',
    `password: ${randomPassword}`,
    '\n',
    '*********************'
  );
}

export { validateFirstStart };
