import { Request, Response } from 'express';
import { CustomError } from '../../err/CustomError';
import { CreateJwtTokenUseCase } from './createJwtToken/CreateJwtTokenUseCase';
import Ajv from 'ajv';

export class JwtController {
  constructor(private createJwtTokenUseCase: CreateJwtTokenUseCase) {}

  private createScheme = {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['username', 'password'],
    additionalProperties: false,
  };
  async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const validate = new Ajv().compile(this.createScheme);
    if (!validate(request.body)) {
      return response.status(400).json({
        message: validate.errors?.map((err) => err.message).join(', '),
        error: 400,
        timestamp: Date.now(),
      });
    }

    try {
      const token = await this.createJwtTokenUseCase.create(
        username.T,
        password
      );
      return response.status(200).send(token);
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
