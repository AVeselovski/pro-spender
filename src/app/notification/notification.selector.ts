import type { RootState } from "../store";

export const selectNotifications = (state: RootState) => state.notification.items;
