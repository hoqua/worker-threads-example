import { nanoid } from 'nanoid';

type CallBackFunction = (message: IMessage) => void;
export interface IMessage {
  imgSrc: string;
  userId: string;
}

export class ServerMock {
  private imageCounter = 0;
  private maxImages = 30;
  private postDelayMs = 3000; // 3s

  private interval = 0;
  private static instance: ServerMock;
  private pushMessageCb: CallBackFunction | null = null;

  public static getInstance(): ServerMock {
    if (!ServerMock.instance) {
      ServerMock.instance = new ServerMock();
    }
    return ServerMock.instance;
  }

  public upload(imgSrc: string, userId: string) {
    this.pushMessageCb?.({ imgSrc, userId });
  }

  public subscribe(callBack: CallBackFunction) {
    this.pushMessageCb = callBack;
    this.init();
  }

  public unsubscribe() {
    this.pushMessageCb = null;
    clearInterval(this.interval);
  }

  private init() {
    this.interval = window.setInterval(() => {
      const message = {
        imgSrc: `https://picsum.photos/300?random=${this.imageCounter}`,
        userId: nanoid(),
      };

      this.pushMessageCb?.(message);
      this.imageCounter++; // to have random images

      if (this.imageCounter > this.maxImages) {
        clearInterval(this.interval);
      }
    }, this.postDelayMs);
  }
}
