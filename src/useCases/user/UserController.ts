import { Request, Response } from 'express';
import { CustomError } from '../../err/CustomError';
import { VerifyJwtTokenUseCase } from '../jwt/verifyJwtToken/VerifyJwtTokenUseCase';
import { UpdateUserUseCase } from './updateUser/UpdateUserUseCase';

export class UserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase,
    private verifyJwtTokenUseCase: VerifyJwtTokenUseCase
  ) {}

  async update(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;
    const jwt = request.headers['authorization'];

    const usernameToUpdate = this.verifyJwtTokenUseCase.getUsername(jwt);

    try {
      const user = await this.updateUserUseCase.execute(
        usernameToUpdate,
        username,
        password
      );

      return response.status(200).json(user).send();
    } catch (error) {
      if (error instanceof CustomError) {
        return response
          .status(error.statusCode)
          .send(...error.serializeErrors());
      }

      return response.status(500).send(error);
    }
  }
}
