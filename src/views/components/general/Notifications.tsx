import React from "react";
import { useAppDispatch, useAppSelector } from "app/store";
import { removeNotification } from "app/notification/notification.action";
import { selectNotifications } from "app/notification/notification.selector";
import { NotificationStatusEnum as Status } from "app/notification/types";

import type { INotification } from "app/notification/types";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IProps {
  id: string;
  message: string;
  type: Status;
}

function Notification({ id = "", message = "", type = Status.Info }: IProps) {
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={true}
      autoHideDuration={5000}
      onClose={() => dispatch(removeNotification(id))}
    >
      <Alert
        onClose={() => dispatch(removeNotification(id))}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

function Notifications() {
  const notifications: INotification[] = useAppSelector((state) => selectNotifications(state));

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {notifications.map((notification: INotification) => (
        <Notification
          id={notification.id}
          key={notification.id}
          message={notification.message}
          type={notification.type}
        />
      ))}
    </Stack>
  );
}

export default Notifications;
