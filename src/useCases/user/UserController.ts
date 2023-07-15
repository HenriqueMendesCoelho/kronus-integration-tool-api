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
    const { username, password, new_password } = request.body;

    if (this.isPasswordWeak(new_password)) {
      return this.errorResponse(
        'Password is weak, needs minumum 20 characters, uppercase, lowercase, number and special character',
        response
      );
    }

    const jwt = request.headers['authorization'];
    const usernameToUpdate = this.verifyJwtTokenUseCase.getUsername(jwt);

    try {
      await this.updateUserUseCase.execute(
        usernameToUpdate,
        username,
        password,
        new_password
      );

      return response.status(200).json({
        success: true,
        message: 'User updated',
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return response
          .status(error.statusCode)
          .send(...error.serializeErrors());
      }

      return response.status(500).send(error);
    }
  }

  private isPasswordWeak(password: string) {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&^])[A-Za-z\d@#$!%*?&^]{20,70}$/;

    return !passwordRegex.test(password);
  }

  private errorResponse(msg: string, response: Response) {
    return response.status(400).json({
      success: false,
      status: 400,
      message: msg,
      path: 'api/v1/user',
      timestamp: Date.now(),
    });
  }
}
