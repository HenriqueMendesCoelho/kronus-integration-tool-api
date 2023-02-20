import axios from 'axios';
import { ISendGridRepository } from '../ISendGridRepository';

export class SendGridRepository implements ISendGridRepository {
  private sendGridUrl = process.env.SENDGRID_URL;
  private sendGridApiKey = process.env.SENDGRID_API_KEY;

  async sendMailTemplate(data: object): Promise<object> {
    return await axios.post(this.sendGridUrl, data, {
      headers: {
        Authorization: `Bearer ${this.sendGridApiKey}`,
      },
    });
  }
}
