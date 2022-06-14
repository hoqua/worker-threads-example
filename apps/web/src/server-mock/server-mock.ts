interface IMessage {
  imgSrc: string;
}

type CallBackFunction = (message: IMessage) => void;

export class ServeMock {
  private callBack: CallBackFunction | null = null;
  private interval = 0;

  public publish(imgSrc: string) {
    this.callBack?.({ imgSrc });
  }

  public subscribe(callBack: CallBackFunction) {
    this.callBack = callBack;
    this.init();
  }

  public unsubscribe() {
    this.callBack = null
    clearInterval(this.interval)
  }

  private init() {
    this.interval = window.setInterval(() => {
      this.callBack?.({ imgSrc: 'https://picsum.photos/200/300' });
    }, 1000);
  }
}
