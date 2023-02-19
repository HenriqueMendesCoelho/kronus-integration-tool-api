import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateJwtTokenUseCase } from './createJwtToken/CreateJwtTokenUseCase';
import { JwtController } from './JwtController';
import { VerifyJwtTokenUseCase } from './verifyJwtToken/VerifyJwtTokenUseCase';

const userRepository = new UserRepository();

const createJwtTokenUseCase = new CreateJwtTokenUseCase(userRepository);
const verifyJwtTokenUseCase = new VerifyJwtTokenUseCase();

const jwtController = new JwtController(createJwtTokenUseCase);

export { createJwtTokenUseCase, verifyJwtTokenUseCase, jwtController };
