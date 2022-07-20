import { v4 as uuid } from "uuid";

import * as actionCreator from "utils/actionUtility";
import { IAction } from "../types";
import { INotification, NotificationStatusEnum } from "./types";

export const ADD_NOTIFICATION: string = "notification/ADD_NOTIFICATION";

export function addNotification(
  message: string,
  type: NotificationStatusEnum
): IAction<INotification> {
  const notification = {
    id: uuid(),
    message,
    type,
  };

  return actionCreator.createAction(ADD_NOTIFICATION, notification);
}

export const REMOVE_NOTIFICATION: string = "notification/REMOVE_NOTIFICATION";

export function removeNotification(id: string): IAction<string> {
  return actionCreator.createAction(REMOVE_NOTIFICATION, id);
}
