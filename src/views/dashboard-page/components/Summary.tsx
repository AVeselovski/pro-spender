import { NavLink } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";

// temp
const INSIGHTS = [
  { value: "Utilities is 69,20€ over budget (+13,8%)" },
  { value: "Utilities overflows 2nd time in 6 months" },
  { value: "Average true budget of Utilitites is 551,20€" },
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

const StyledTimeline = styled(Timeline)(({ theme }) => ({}));

interface LatestInsightsProps {
  insights: any[]; // temp
}

function LatestInsights({ insights }: LatestInsightsProps) {
  return (
    <StyledTimeline position="right" sx={{ alignItems: "flex-start", mb: 0, mt: 1, py: 0 }}>
      {insights.map((insight, i) => (
        <TimelineItem
          key={i}
          position="right"
          sx={{ "::before": { display: "none" }, minHeight: 0.75 }}
        >
          <TimelineSeparator>
            <TimelineDot
              sx={i !== 0 ? { opacity: 0, my: 0, p: "2px" } : { my: "12px", p: "2px" }}
            />
            <TimelineConnector sx={{ my: "-15px" }} />
          </TimelineSeparator>
          <TimelineContent
            sx={{ fontWeight: i === 0 ? "fontWeightMedium" : "fontWeightRegular", py: 0.5 }}
          >
            {insight.value}
          </TimelineContent>
        </TimelineItem>
      ))}
      <TimelineItem sx={{ "::before": { display: "none" }, minHeight: 0.5 }}>
        <TimelineSeparator>
          <TimelineDot sx={{ my: "12px", p: "2px" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: 0.5 }}>
          <Link color="primary" component={NavLink} sx={{ fontWeight: "fontWeightMedium" }} to="/">
            Show more...
          </Link>
        </TimelineContent>
      </TimelineItem>
    </StyledTimeline>
  );
}

function Summary() {
  return (
    <Box sx={{ minHeight: 170, mb: 1.5 }}>
      <Title>March 2022</Title>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <LatestInsights insights={INSIGHTS} />
        </Box>
      </Box>
    </Box>
  );
}

export default Summary;
