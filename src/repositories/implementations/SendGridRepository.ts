import axios from 'axios';
import { SendEmailError } from '../../useCases/sendgrid/errors/SendEmailError';
import { ISendGridRepository } from '../ISendGridRepository';

export class SendGridRepository implements ISendGridRepository {
  private sendGridUrl = process.env.SENDGRID_URL;
  private sendGridApiKey = process.env.SENDGRID_API_KEY;

  async sendMailTemplate(data: object): Promise<object> {
    try {
      const response = await axios.post(this.sendGridUrl, data, {
        headers: {
          Authorization: `Bearer ${this.sendGridApiKey}`,
        },
      });
      return response;
    } catch (error) {
      throw new SendEmailError(error.response.data, error.response.status);
    }
  }
}
