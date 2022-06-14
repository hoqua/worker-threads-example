

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Worker from './resize.worker'

const worker = new Worker()

export const resizeWithWorker = async (offscreen: HTMLCanvasElement, bitmap: ImageBitmap) => {
  return new Promise((resolve, reject) => {
    worker.onmessage = (event: Event) => resolve(event)
    worker.onerror = (error: ErrorEvent) => reject(error)

    worker.postMessage({offscreen, bitmap}, [offscreen, bitmap])
  })
}
