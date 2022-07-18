import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch } from "app/store";
import { signup } from "app/user/user.action";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormLabel,
  FormControl,
  TextField,
  Typography,
} from "views/components/common";

const Signup = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      signup({ email: "test", username: "test", password: "test", confirmPassword: "test" }, () =>
        navigate("/", { replace: true })
      )
    );
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: ["center", "center", "space-between"],
      }}
    >
      <Card variant="outlined" sx={{ minWidth: ["100%", 320] }}>
        <CardContent sx={{ px: [2, 3], py: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography align="center" variant="h6" component="h1">
              ProSpender
            </Typography>
            <Typography align="center" gutterBottom variant="h4" component="h2">
              Get started today!
            </Typography>
          </Box>
          <Container disableGutters sx={{ maxWidth: ["100%", 380] }}>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ mb: 2, width: "100%" }}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  autoFocus
                  id="email"
                  placeholder="jane.spender@prospender.com"
                  size="medium"
                  type="email"
                />
              </FormControl>
              <FormControl sx={{ mb: 2, width: "100%" }}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField id="username" placeholder="Jane Spender" size="medium" type="text" />
              </FormControl>
              <FormControl sx={{ mb: 2, width: "100%" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField id="password" size="medium" type="password" />
              </FormControl>
              <FormControl sx={{ mb: 2, width: "100%" }}>
                <FormLabel htmlFor="confirm-password">Confirm password</FormLabel>
                <TextField id="confirm-password" size="medium" type="password" />
              </FormControl>

              <Button
                color="primary"
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign up
              </Button>
              <Divider sx={{ my: 2 }} />
              <Button
                component={NavLink}
                fullWidth
                sx={{ textTransform: "none" }}
                to="/auth/login"
                variant="text"
              >
                Already have an account?
              </Button>
            </form>
          </Container>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
