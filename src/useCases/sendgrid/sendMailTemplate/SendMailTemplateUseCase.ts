import { ISendGridRepository } from '../../../repositories/ISendGridRepository';
import { SendEmailError } from '../errors/SendEmailError';

export class SendMailTemplateUseCase {
  constructor(private sendGridRepository: ISendGridRepository) {}

  async send(
    from: string,
    to: string,
    templateId: string,
    subject: string,
    username: string
  ): Promise<void> {
    try {
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
              user: username,
            },
          },
        ],
        template_id: templateId,
      });
      return;
    } catch (error) {
      throw new SendEmailError();
    }
  }
}
