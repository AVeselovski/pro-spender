/* Update with proper types, once known */

/* Main default import (state), should be named for importing convenience */
export default interface INotificationState {
  readonly items: INotification[];
}

/* Other named exports */

export enum NotificationStatusEnum {
  Info = "info",
  Error = "error",
  Warning = "warning",
  Success = "success",
}

export interface INotification {
  id: string;
  message: string;
  type: NotificationStatusEnum;
}
