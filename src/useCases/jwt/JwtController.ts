import { Request, Response } from 'express';
import { CustomError } from '../../err/CustomError';
import { CreateJwtTokenUseCase } from './createJwtToken/CreateJwtTokenUseCase';

export class JwtController {
  constructor(private createJwtTokenUseCase: CreateJwtTokenUseCase) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    try {
      const token = await this.createJwtTokenUseCase.create(username, password);
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
