export interface IMessageQueue {
  publish(queue: string, message: any): Promise<void>;
  //consume(queue: string, onMessage: (msg: any) => Promise<void>): Promise<void>;
}
