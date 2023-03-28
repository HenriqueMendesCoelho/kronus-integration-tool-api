import { ISendGridRepository } from '../../../repositories/ISendGridRepository';

export class SendMailTemplateUseCase {
  constructor(private sendGridRepository: ISendGridRepository) {}

  async send(
    from: string,
    to: string,
    templateId: string,
    subject: string,
    params?: object
  ): Promise<void> {
    await this.sendGridRepository.sendMailTemplate({
      from: {
        email: from,
      },
      personalizations: [
        {
          to: [
            {
              email: to,
            },
          ],
          dynamic_template_data: {
            subject: subject,
            ...params,
          },
        },
      ],
      template_id: templateId,
    });
    return;
  }
}
