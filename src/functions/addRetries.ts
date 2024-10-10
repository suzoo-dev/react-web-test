import { sleep } from "./sleep";

type AsyncCallback<T extends unknown[]> = (...args: T) => Promise<unknown>;

export function addRetries<T extends unknown[]>(
  callbackToRetry: AsyncCallback<T>
): AsyncCallback<T> {
  return async (...args: T): Promise<unknown> => {
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
