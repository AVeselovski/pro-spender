import { FC } from "react";
import { NavLink } from "react-router-dom";

import {
  Box,
  Link,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  Typography,
} from "views/components/common";

// TEMP
const INSIGHTS = [
  { value: "Utilities is 69,20€ over budget (+13,8%)" },
  { value: "Utilities overflows 2nd time in 6 months" },
  { value: "Average true budget of Utilitites is 551,20€" },
];

const Title: FC = ({ children }) => (
  <Typography
    color="default"
    component="h2"
    gutterBottom
    sx={{
      alignItems: "center",
      display: "flex",
      fontWeight: "fontWeightBold",
      mb: 1.5,
      ml: 2,
    }}
    variant="h6"
  >
    {children}
  </Typography>
);

type LatestInsightsProps = {
  insights: any[]; // temp > IInsight[]
};

const LatestInsights: FC<LatestInsightsProps> = ({ insights }) => {
  // TODO: Needs proper design of insights themselves as a concept and the structure of whatever is behind "show more"

  return (
    <Timeline position="right" sx={{ alignItems: "flex-start", mb: 0, mt: 1, py: 0 }}>
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
    </Timeline>
  );
};

const Summary = () => {
  const insights = INSIGHTS; // TEMP > select latest insights

  return (
    <Box sx={{ minHeight: 170, mb: 1.5 }}>
      <Title>March 2022</Title>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <LatestInsights insights={insights} />
        </Box>
      </Box>
    </Box>
  );
};

export default Summary;
