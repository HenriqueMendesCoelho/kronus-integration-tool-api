import { Request, Response } from 'express';
import { SearchApiKey } from './searchApiKey/SearchApiKey';
import { CreateApiKeyUseCase } from './createApiKey/CreateApiKeyUseCase';
import { DeleteApiKeyUseCase } from './deleteApiKey/DeleteApiKeyUseCase';
import Ajv from 'ajv';

export class ApiKeyController {
  constructor(
    private createApiKeyUseCase: CreateApiKeyUseCase,
    private searchApiKey: SearchApiKey,
    private deleteApiKey: DeleteApiKeyUseCase
  ) {}

  private createScheme = {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
      },
    },
  };

  async createKey(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const validate = new Ajv().compile(this.createScheme);
    if (!validate(request.body)) {
      return response.status(400).json({
        message: validate.errors?.map((err) => err.message).join(', '),
        error: 400,
        timestamp: Date.now(),
      });
    }

    try {
      const apiKey = await this.createApiKeyUseCase.execute(name);
      return response.status(200).json(apiKey).send();
    } catch (error) {
      return response
        .status(500)
        .json({
          sucess: false,
          message: 'Internal server error',
          timestamp: Date.now(),
        })
        .send();
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const apiKey = await this.searchApiKey.findAll();

      if (apiKey) {
        return response.status(200).json(apiKey);
      }

      return response.status(204).send();
    } catch (error) {
      return response
        .status(500)
        .json({
          sucess: false,
          message: 'Internal server error',
          timestamp: Date.now(),
        })
        .send();
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.params;
      await this.deleteApiKey.execute(name);

      return response.status(200).send();
    } catch (error) {
      return response
        .status(500)
        .json({
          sucess: false,
          message: 'Internal server error',
          timestamp: Date.now(),
        })
        .send();
    }
  }
}
