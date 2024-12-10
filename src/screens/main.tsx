import { Box, Tabs, Tab } from "@mui/material"
import { useState } from "react"
import Header from "../components/Header";
import CandidatesScreen from "./candidates";
import CompaniesScreen from "./companies";

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      className="main-box"
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', paddingLeft: '20px', paddingRight: '20px'}}
    >
      <Box>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={activeTab}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <Tab label="Candidates" style={{ paddingRight: '20px' }} />
          <Tab label="Companies"  style={{ paddingRight: '20px' }} />
        </Tabs>
      </Box>
      <Box sx={{ flex: 1, width: '100%', paddingLeft: '20px' }}>
        <Header />
        <CandidatesScreen visible={activeTab === 0} />
        <CompaniesScreen visible={activeTab === 1} />
      </Box>
    </Box>
  );
}

export default MainScreen;