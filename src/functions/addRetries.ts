import { sleep } from "./sleep";

type AsyncCallback<T extends unknown[], R> = (...args: T) => Promise<R>;

export function addRetries<T extends unknown[], R>(
  callbackToRetry: AsyncCallback<T, R>
): AsyncCallback<T, R> {
  return async (...args: T): Promise<R> => {
    let retryCount = 0;
    let newError: unknown;

    while (retryCount < 3) {
      try {
        const result = await callbackToRetry(...args);
        return result;
      } catch (error) {
        retryCount++;
        newError = error;

        if (retryCount < 3) {
          await sleep(200 * retryCount);
        }
      }
    }

    if (newError) {
      throw newError;
    }

    return Promise.reject(new Error("Retries exceeded"));
  };
}
