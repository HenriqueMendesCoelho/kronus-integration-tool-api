import { Request, Response } from 'express';
import { CustomError } from '../../err/CustomError';
import { VerifyJwtTokenUseCase } from '../jwt/verifyJwtToken/VerifyJwtTokenUseCase';
import { UpdateUserUseCase } from './updateUser/UpdateUserUseCase';
import Ajv from 'ajv';

export class UserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase,
    private verifyJwtTokenUseCase: VerifyJwtTokenUseCase
  ) {}

  private updatePasswordSchema = {
    type: 'object',
    required: ['password', 'new_password'],
    properties: {
      password: { type: 'string' },
      new_password: { type: 'string' },
    },
  };

  async updatePassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { password, new_password } = request.body;
    const validate = new Ajv().compile(this.updatePasswordSchema);
    if (!validate(request.body)) {
      return response.status(400).json({
        message: validate.errors?.map((err) => err.message).join(', '),
        error: 400,
        timestamp: Date.now(),
      });
    }
    if (this.isPasswordWeak(new_password)) {
      return this.errorResponse(
        'Password is weak, needs minumum 20 characters, uppercase, lowercase, number and special character',
        response
      );
    }

    const jwt = request.headers['authorization'];
    console.log(jwt);
    const usernameToUpdate = this.verifyJwtTokenUseCase.getUsername(jwt);
    console.log(usernameToUpdate);
    try {
      await this.updateUserUseCase.execute(
        usernameToUpdate,
        usernameToUpdate,
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
      console.error(error);

      return response.status(500).send(error);
    }
  }

  private isPasswordWeak(password: string) {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{20,70}$/;

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
