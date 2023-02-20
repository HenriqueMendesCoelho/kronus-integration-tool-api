export interface ISendGridRepository {
  sendMailTemplate(data: object): Promise<object>;
}
