import { useAppDispatch, useAppSelector } from "app/store";
import { removeNotification } from "app/notification/notification.action";
import { selectNotifications } from "app/notification/notification.selector";
import { NotificationStatusEnum as Status } from "app/notification/types";

import { Alert, Snackbar, Stack } from "../common";

const Notification = ({ id = "", message = "", type = Status.Info }) => {
  const dispatch = useAppDispatch();

  // TODO: Placement - 30px from bottom
  // TODO: Different look and placement for mobile

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      autoHideDuration={5000}
      onClose={() => dispatch(removeNotification(id))}
      open={true}
      sx={{ width: { sm: "400px" } }}
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
};

const Notifications = () => {
  const notifications = useAppSelector((state) => selectNotifications(state));

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {notifications.map((notification) => (
        <Notification
          id={notification.id}
          key={notification.id}
          message={notification.message}
          type={notification.type}
        />
      ))}
    </Stack>
  );
};

export default Notifications;
