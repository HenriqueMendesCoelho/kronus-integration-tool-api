export interface ILibreTranslateRepository {
  translate(text: string): Promise<string>;
}
