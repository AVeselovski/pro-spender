import * as actions from "./notification.action";

import type { IAction } from "../types";
import type INotificationState from "./types";
import type { INotification } from "./types";

const initialState: INotificationState = {
  items: [],
};

function notificationReducer(
  state = initialState,
  action: IAction<INotification | string>
): INotificationState {
  if (action.error) return state;

  switch (action.type) {
    case actions.ADD_NOTIFICATION:
      return {
        ...state,
        items: [...state.items, action.payload as INotification],
      };
    case actions.REMOVE_NOTIFICATION:
      return {
        ...state,
        items: state.items.filter(
          (notification: INotification) => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export default notificationReducer;
