import { SendGridRepository } from '../../repositories/implementations/SendGridRepository';
import { SendGridController } from './SendGridController';
import { SendMailTemplateUseCase } from './sendMailTemplate/SendMailTemplateUseCase';

const sendGridRepository = new SendGridRepository();

const sendMailTemplateUseCase = new SendMailTemplateUseCase(sendGridRepository);

const sendGridController = new SendGridController(sendMailTemplateUseCase);

export { sendMailTemplateUseCase, sendGridController };
