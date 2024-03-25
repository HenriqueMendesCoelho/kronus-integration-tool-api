import { Request, Response } from 'express';
import { CustomError } from '../../err/CustomError';
import { SendMailTemplateUseCase } from './sendMailTemplate/SendMailTemplateUseCase';
import Ajv from 'ajv';

export class SendGridController {
  constructor(private sendMailTemplateUseCase: SendMailTemplateUseCase) {}

  private sendMailTemplateSchema = {
    type: 'object',
    required: ['from', 'to', 'template_id', 'subject'],
    properties: {
      from: { type: 'string' },
      to: { type: 'string' },
      template_id: { type: 'string' },
      subject: { type: 'string' },
      params: { type: 'object' },
    },
  };

  async sendMailTemplate(request: Request, response: Response) {
    const { from, to, template_id, subject, params } = request.body;

    const validate = new Ajv().compile(this.sendMailTemplateSchema);

    if (!validate(request.body)) {
      return response.status(400).json({
        message: validate.errors?.map((err) => err.message).join(', '),
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
