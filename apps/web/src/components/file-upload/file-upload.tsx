import { FC, useEffect } from 'react';
import { useTimer } from 'use-timer';
import styles from './file-upload.module.css';
interface IProps {
  onChange: (file: File) => void;
  loading: boolean;
}

export const FileUpload: FC<IProps> = (props) => {
  const { onChange, loading } = props;
  const { time, start, pause, reset } = useTimer({ interval: 100, step: 0.1 });

  useEffect(() => {
    if (!loading) return pause();

    reset();
    start();
  }, [loading]);

  const elapsedTime = time.toFixed(1);
  const dropZoneHeader = loading ? `Uploading! Elapsed: ${elapsedTime}` : 'Drop Image here!';
  const lastUploadSubheader = !loading && time > 0 ? `Last upload took: ${elapsedTime}` : null;

  return (
    <form className={styles['form']}>
      <h1>{dropZoneHeader}</h1>
      <h1>{lastUploadSubheader}</h1>

      <input
        className={styles['upload']}
        type="file"
        required
        onChange={({ target: { files } }) => {
          if (!files) return;

          onChange(files[0]);
        }}
      />
    </form>
  );
};
