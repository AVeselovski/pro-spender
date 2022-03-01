import React from "react";
import { useAppSelector } from "app/store";
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
  message: string;
  type: Status;
}

function Notification({ message = "", type = Status.Info }: IProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={true}
      autoHideDuration={5000}
      onClose={() => {}}
    >
      <Alert onClose={() => {}} severity={type} sx={{ width: "100%" }}>
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
        <Notification message={notification.message} type={notification.type} />
      ))}
    </Stack>
  );
}

export default Notifications;
