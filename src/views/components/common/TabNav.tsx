import { FC } from "react";
import MuiTab, { tabClasses, TabProps as MuiTabProps } from "@mui/material/Tab";
import MuiTabs, { tabsClasses, TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";

type Props = MuiTabsProps & {
  name: string;
  tabs: string[];
};

const TabNav: FC<Props> = ({ value = 0, onChange, name = "nav", tabs = [] }) => {
  const handleChange = onChange;

  return (
    <Tabs value={value} onChange={handleChange} aria-label={`${name} tabs`}>
      {tabs.map((tab, i) => (
        <Tab key={i} label={tab} {...a11yProps(i, name)} />
      ))}
    </Tabs>
  );
};

export default TabNav;

const Tab = styled(MuiTab)<MuiTabProps>(({ theme }) => ({
  borderRadius: theme.spacing(4),
  minHeight: theme.spacing(4),
  textTransform: "none",
  zIndex: 2,
  paddingBottom: 2,
  paddingTop: 2,
  ":hover": {
    backgroundColor: theme.palette.grey[200],
  },
  [`&.${tabClasses.selected}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[900],
    ":hover": {
      backgroundColor: theme.palette.grey[300],
    },
  },
}));

const Tabs = styled(MuiTabs)<MuiTabsProps>(({ theme }) => ({
  borderRadius: theme.spacing(4),
  minHeight: theme.spacing(4),
  [`.${tabsClasses.indicator}`]: {
    borderRadius: theme.spacing(4),
    height: "100%",
    zIndex: 1,
    backgroundColor: theme.palette.grey[300],
  },
}));

const a11yProps = (index: number, name: string) => {
  return {
    id: `${name}-tab-${index}`,
    "aria-controls": `${name}-tabpanel-${index}`,
  };
};
