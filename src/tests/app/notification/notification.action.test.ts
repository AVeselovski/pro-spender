import {
  addNotification,
  removeNotification,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from "app/notification/notification.action";
import { NotificationStatusEnum } from "app/notification/types";

describe("notification.action", () => {
  test("addNotification should create appropriate action", () => {
    const action = addNotification("Test message", NotificationStatusEnum.Warning);

    expect(action).toHaveProperty("type", ADD_NOTIFICATION);
    expect(action).toHaveProperty("payload.id");
    expect(action).toHaveProperty("payload.message", "Test message");
    expect(action).toHaveProperty("payload.type", "warning");
  });

  test("removeNotification should create appropriate action", () => {
    const action = removeNotification("abc123");

    expect(action).toHaveProperty("type", REMOVE_NOTIFICATION);
    expect(action).toHaveProperty("payload", "abc123");
  });
});
