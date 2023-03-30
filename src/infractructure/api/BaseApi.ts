import HTTPTransport from '../../script';

export default abstract class BaseApi {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  abstract create?(data: unknown): Promise<unknown>;
  abstract read?(id: number): Promise<unknown>;
  abstract update?(id: number, data: unknown): Promise<unknown>;
  abstract delete?(id: number): Promise<unknown>;
}
