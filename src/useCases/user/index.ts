import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateUserUseCase } from './createUser/CreateUserUseCase';

const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);

export { createUserUseCase };
