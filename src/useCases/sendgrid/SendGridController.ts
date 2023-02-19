import { Request, Response } from 'express';
import { CustomError } from '../../err/CustomError';
import { SendMailTemplateUseCase } from './sendMailTemplate/SendMailTemplateUseCase';

export class SendGridController {
  constructor(private sendMailTemplateUseCase: SendMailTemplateUseCase) {}

  async sendMailTemplate(request: Request, response: Response) {
    const { from, to, templateId, subject, username } = request.body;

    try {
      await this.sendMailTemplateUseCase.send(
        from,
        to,
        templateId,
        subject,
        username
      );

      return response.status(202).send();
    } catch (error) {
      if (error instanceof CustomError) {
        return response
          .status(error.statusCode)
          .send({ errors: error.serializeErrors() });
      }
      response.status(500).send(error);
    }
  }
}
