import { NavLink } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// temp
const INSIGHTS = [
  { value: "Utilities is 69,20€ over budget (+13,8%) (PLACEHOLDER)" },
  { value: "Utilities overflows 2nd time in 6 months (PLACEHOLDER)" },
  { value: "Average true budget of Utilitites is 551,20€ (PLACEHOLDER)" },
];

interface TitleProps {
  children?: React.ReactNode;
}

function Title(props: TitleProps) {
  return (
    <Typography
      color="default"
      component="h1"
      gutterBottom
      sx={{
        alignItems: "center",
        display: "flex",
        fontWeight: "fontWeightBold",
        mb: 1.5,
      }}
      variant="h5"
    >
      {props.children}
    </Typography>
  );
}

const StyledInsights = styled(Box)(({ theme }) => ({
  marginBottom: 0,
  paddingLeft: "20px",
  position: "relative",
  "&::before": {
    backgroundColor: "#ccc",
    content: '""',
    position: "absolute",
    height: "70%",
    left: "3px",
    top: "15%",
    width: "3px",
  },
  "> *:first-of-type": {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    paddingLeft: 0,
    "::before": {
      backgroundColor: "#ccc",
      borderRadius: "50%",
      content: '""',
      position: "absolute",
      height: "9px",
      left: "0px",
      width: "9px",
    },
  },
  "> *:last-child": {
    fontWeight: theme.typography.fontWeightMedium,
    "::before": {
      backgroundColor: "#ccc",
      borderRadius: "50%",
      content: '""',
      position: "absolute",
      height: "9px",
      left: "0px",
      width: "9px",
    },
  },
}));

interface LatestInsightsProps {
  insights: any[]; // temp
}

function LatestInsights({ insights }: LatestInsightsProps) {
  return (
    <StyledInsights component="ul">
      {insights.map((insight, i) => (
        <Typography
          color="text.secondary"
          component="li"
          key={i}
          gutterBottom
          sx={{
            alignItems: "center",
            display: "flex",
            pl: 1,
          }}
          variant="body1"
        >
          {insight.value}
        </Typography>
      ))}
      <Typography
        color="default"
        component="li"
        gutterBottom
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <Link color="primary" component={NavLink} sx={{ fontWeight: "fontWeightMedium" }} to="/">
          Show more...
        </Link>
      </Typography>
    </StyledInsights>
  );
}

function Summary() {
  return (
    <Box sx={{ minHeight: 170, mb: 1.5 }}>
      <Title>February 2022</Title>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <LatestInsights insights={INSIGHTS} />
        </Box>
      </Box>
    </Box>
  );
}

export default Summary;
