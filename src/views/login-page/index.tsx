import { NavLink, useNavigate, useLocation } from "react-router-dom";

import { useAppDispatch } from "app/store";
import { login } from "app/user/user.action";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

interface LocationState {
  from: {
    pathname: string;
  };
}

function Login() {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState;
  const from = state?.from?.pathname || "/69";

  console.log(location);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email: "test", password: "test" }, () => navigate(from, { replace: true })));
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "100vh",
        justifyContent: ["center", "center", "space-between"],
      }}
    >
      <Card variant="outlined" sx={{ borderRadius: "1rem", minWidth: ["100%", 320] }}>
        <CardContent sx={{ px: [2, 3], py: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography align="center" variant="h6" component="h1">
              Spendly
            </Typography>
            <Typography align="center" gutterBottom variant="h4" component="h2">
              Welcome back!
            </Typography>
          </Box>
          <Container disableGutters sx={{ maxWidth: ["100%", 380] }}>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ mb: 2, width: "100%" }}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  autoFocus
                  id="email"
                  placeholder="jane.spender@spendly.com"
                  size="medium"
                  type="email"
                />
              </FormControl>
              <FormControl sx={{ mb: 2, width: "100%" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField id="password" size="medium" type="password" />
              </FormControl>

              <Button
                color="primary"
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign in
              </Button>
              <Divider sx={{ my: 2 }} />
              <Button component={NavLink} to="/signup" fullWidth variant="text">
                Don't have an account?
              </Button>
            </form>
          </Container>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
