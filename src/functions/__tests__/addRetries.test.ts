import { addRetries } from "../addRetries";

describe("Add Retries function", () => {
  test("When a function suceeds it should return the result.", async () => {
    const mockFunction = jest.fn().mockResolvedValue("success");
    const response = addRetries(mockFunction);
    const result = await response();
    expect(result).toBe("success");
  });

  test("When a function errors it should retry the function 3 times and return the error", async () => {
    const mockError = new Error("error");
    const mockFunction = jest.fn().mockRejectedValue(mockError);
    const response = addRetries(mockFunction);

    await expect(response()).rejects.toThrow("error");
    expect(mockFunction).toHaveBeenCalledTimes(3);
  });
});
