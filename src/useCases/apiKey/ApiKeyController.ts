import { Request, Response } from 'express';
import { SearchApiKey } from './searchApiKey/SearchApiKey';
import { CreateApiKeyUseCase } from './createApiKey/CreateApiKeyUseCase';

export class ApiKeyController {
  constructor(
    private createApiKeyUseCase: CreateApiKeyUseCase,
    private searchApiKey: SearchApiKey
  ) {}

  async createKey(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
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
        return response.status(200).json(apiKey).send();
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
}
