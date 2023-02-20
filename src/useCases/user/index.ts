import { UserRepository } from '../../repositories/implementations/UserRepository';
import { verifyJwtTokenUseCase } from '../jwt';
import { CreateUserUseCase } from './createUser/CreateUserUseCase';
import { UpdateUserUseCase } from './updateUser/UpdateUserUseCase';
import { UserController } from './UserController';

const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);

const userController = new UserController(
  updateUserUseCase,
  verifyJwtTokenUseCase
);

export { createUserUseCase, userController };
