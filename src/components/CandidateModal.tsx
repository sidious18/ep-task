import {
  Typography,
  Box,
  Modal,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { getCandidateJob } from '../models/candidate';
import { Job } from '../models/job';

interface AddCandidateModalProps {
  candidateID?: number;
  open: boolean;
  onClose: () => void;
}

const CandidateModal = ({ candidateID, open, onClose }: AddCandidateModalProps) => {
  if (candidateID !== undefined) {
    const candidate = getCandidateJob(candidateID);
    return (
      <Modal
        open={open}
        onClose={() => onClose()}
      >
        <Box className='modal-box'>
        <Typography variant="h4" gutterBottom>
          {candidate.firstName} {candidate.lastName}
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="subtitle1" color="text.secondary">
              {candidate.jobTitle}
            </Typography>
            <Typography variant="body1">Age: {candidate.age}</Typography>
            <Typography variant="body1">Address: {candidate.address}</Typography>
          </CardContent>
        </Card>

        <Typography variant="h5" gutterBottom>
          Experience
        </Typography>
        {candidate.experience.map((exp: Job, index: number) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{exp.jobTitle}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {new Date(exp.period.start).toLocaleDateString()} - {new Date(exp.period.end).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {exp.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Technologies:
              </Typography>
              <List>
                {exp.technologies.map((tech, techIndex) => (
                  <ListItem key={techIndex} disablePadding>
                    <ListItemText primary={tech} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
        </Box>
      </Modal>
    );
  } return null;
}

export default CandidateModal;
