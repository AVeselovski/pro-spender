import { removeById, clearAll, REMOVE_ERROR, CLEAR_ALL_ERRORS } from "app/error/error.action";

describe("error.action", () => {
  test("removeById should create appropriate action", () => {
    const action = removeById("abc123");

    expect(action).toHaveProperty("type", REMOVE_ERROR);
    expect(action).toHaveProperty("payload", "abc123");
  });

  test("clearAll should create appropriate action", () => {
    const action = clearAll();

    expect(action).toHaveProperty("type", CLEAR_ALL_ERRORS);
  });
});
