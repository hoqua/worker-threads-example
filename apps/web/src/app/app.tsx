import {useState} from 'react';
import {FileUpload} from '../components/file-upload/file-upload';
import {PageWrapper} from '../components/page-wrapper/page-wrapper';
import Sakura from '../components/sakura/sakura';
import '../components/sakura/sakura.css';
import {ServerMock} from '../server-mock/server-mock';
import {ImagesContainer} from '../components/images-container/images-container';
import {useServerMock} from '../server-mock/use-server-mock';
import resizeImageData from 'resize-image-data';
//import {resizeWithWorker} from "../worker/resize-with-worker";

new Sakura('body');
const USER_ID = 'USER_ID';
const serverMock = ServerMock.getInstance();

export default function App() {
  // It posts a message with image every 3s and stop posting after 30 image
  const { messages } = useServerMock();
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    try {
      await uploadResizedImage(file);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <PageWrapper>
      <ImagesContainer messages={messages} currentUser={USER_ID} />
      <FileUpload onChange={handleImageUpload} loading={loading} />
    </PageWrapper>
  );
}

const uploadResizedImage = async (file: File) => {
  const bitmap = await createImageBitmap(file);
  const canvas = document?.createElement('canvas');

  // Uncomment nex lines and import above
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const offscreen = canvas.transferControlToOffscreen()
  // await resizeWithWorker(offscreen, bitmap)

  //#region Lines to delete. Main thread resizing
  // Draw image on canvas
  canvas.height = bitmap.height;
  canvas.width = bitmap.width;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(bitmap, 0, 0);
  // Get image data
  const imageData = ctx?.getImageData(0, 0, bitmap.width, bitmap.height) as ImageData
  // Resize image
  const resultImageData = resizeImageData(
    imageData,
    300,
    300,
    'nearest-neighbor'
  ) as ImageData
  // Put resized image back on canvas and upload
  canvas.width = 300;
  canvas.height = 300;
  canvas.getContext('2d')?.putImageData(resultImageData, 0, 0);
  //#endregion

  const result = canvas.toDataURL();
  serverMock.upload(result, USER_ID);
};
