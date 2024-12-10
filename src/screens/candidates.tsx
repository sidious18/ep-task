import { useEffect, useState } from "react"
import DraggableTable from "../components/DraggableTable";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Job } from "../models/job";
import { loadAllCandidates } from "../models/candidate";
import CandidateModal from "../components/CandidateModal";

interface CandidatesScreenProps {
  visible: boolean;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 0.1 },
  {
    field: 'fullName',
    headerName: 'Full name',
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    flex: 0.2,
  },
  {
    field: 'age',
    headerName: 'Age',
    flex: 0.15,
  },
  {
    field: 'address',
    headerName: 'Address',
    type: 'string',
    flex: 0.25,
  },
  {
    field: 'job_title',
    headerName: 'Job Title',
    valueGetter: (value, row) => `${row.jobTitle}`,
    flex: 0.35,
  },
  {
    field: 'technologies',
    headerName: 'Technologies',
    valueGetter: (value, row) => {
      const technologies = row.experience.map((job: Job) =>
        `${job.technologies.join(' ')}`).join(' ')
      return technologies.split(' ').filter((value: string, index: number, array: any[]) => 
        array.indexOf(value) === index
      ).join(' ')
    },
    flex: 1,
  },
];

const CandidatesScreen = ({ visible }: CandidatesScreenProps)  => {
  const [ candidates, setCandidates ] = useState(loadAllCandidates())
  const [ candidateIDToShow, setCandidateIDToShow ] = useState<number>();

  const [openCandidateModal, setOpenCadidateModal] = useState(false);
  const handleOpenCandidateModal = () => setOpenCadidateModal(true);
  const handleCloseCandidateModal = () => setOpenCadidateModal(false);

  useEffect(() => {
    const handleAddCandidate = () => {
      const last_index = localStorage.getItem('last_candidate_index')
      const added_candidate = localStorage.getItem(`candidate_${last_index}`)
      const experience = localStorage.getItem(`jobs_${last_index}`);
      if (added_candidate && experience) {
        setCandidates(candidates.concat({...JSON.parse(added_candidate), experience: JSON.parse(experience)}))
      }
    };

    document.addEventListener('add_candidate', handleAddCandidate);

    return () => {
      document.removeEventListener('add_candidate', handleAddCandidate);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = (id: number) => {
    setCandidateIDToShow(id)
    handleOpenCandidateModal();
  }

  return (
    <Box sx={{ display: visible ? 'block' : 'none' }}>
      <DraggableTable data={candidates} columns={columns} onRowClick={handleRowClick} />
      <CandidateModal open={openCandidateModal} onClose={handleCloseCandidateModal} candidateID={candidateIDToShow} />
    </Box>
    
  );
}

export default CandidatesScreen;