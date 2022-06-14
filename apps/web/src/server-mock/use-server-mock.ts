import { useEffect, useState } from 'react';
import { IMessage, ServerMock } from './server-mock';

const serverMock = ServerMock.getInstance();

export const useServerMock = () => {
  const [messages, setMessage] = useState<IMessage[]>([]);

  useEffect(() => {
    serverMock.subscribe((image) => {
      setMessage((prevState) => [...prevState, image]);
    });

    return () => serverMock.unsubscribe();
  }, []);

  return { messages };
};
