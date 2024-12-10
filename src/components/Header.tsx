import { Box, Button } from "@mui/material"
import { useState } from "react";
import AddCandidateModal from "./AddCandidateModal";
import AddCompanyModal from "./AddCompanyModal";

const Header = () => {
  const [openCandidateModal, setOpenCadidateModal] = useState(false);
  const handleOpenCandidateModal = () => setOpenCadidateModal(true);
  const handleCloseCandidateModal = () => setOpenCadidateModal(false);

  const [openCompanyModal, setOpenCompanyModal] = useState(false);
  const handleOpenCompanyModal = () => setOpenCompanyModal(true);
  const handleCloseCompanyModal = () => setOpenCompanyModal(false);

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', width: '100%' }}
    >
      <Box>
        <Button
          onClick={handleOpenCandidateModal}
          className="header-button"
          variant="outlined"
        >
          Add candidate
        </Button>
        <Button
          onClick={handleOpenCompanyModal}
          className="header-button"
          variant="outlined"
        >
          Add company
        </Button>
      </Box>
      
      <AddCandidateModal open={openCandidateModal} onClose={handleCloseCandidateModal} />
      <AddCompanyModal open={openCompanyModal} onClose={handleCloseCompanyModal} />
    </Box>
  );
}

export default Header;