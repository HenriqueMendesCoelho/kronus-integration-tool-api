import { Request, Response } from 'express';
import { CustomError } from '../../err/CustomError';
import { SendMailTemplateUseCase } from './sendMailTemplate/SendMailTemplateUseCase';

export class SendGridController {
  constructor(private sendMailTemplateUseCase: SendMailTemplateUseCase) {}

  async sendMailTemplate(request: Request, response: Response) {
    const { from, to, template_id, subject, params } = request.body;

    if (!from || !to || !template_id || !subject) {
      return response
        .status(400)
        .json({
          message: 'from, to, template_id and subject are required',
          error: 400,
          timestamp: Date.now(),
        });
    }

    try {
      await this.sendMailTemplateUseCase.send(
        from,
        to,
        template_id,
        subject,
        params
      );

      return response.status(202).send();
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
