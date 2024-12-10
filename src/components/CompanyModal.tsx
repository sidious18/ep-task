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
import { Job } from '../models/job';
import { getCompanyVacancies } from '../models/company';

interface AddCandidateModalProps {
  companyID?: number;
  open: boolean;
  onClose: () => void;
}

const CompanyModal = ({ companyID, open, onClose }: AddCandidateModalProps) => {
  if (companyID !== undefined) {
    const company = getCompanyVacancies(companyID);
    return (
      <Modal
        open={open}
        onClose={() => onClose()}
      >
        <Box className='modal-box'>
        <Typography variant="h4" gutterBottom>
          {company.name}
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="subtitle1" color="text.secondary">
              {company.industry}
            </Typography>
            <Typography variant="body1">Address: {company.address}</Typography>
          </CardContent>
        </Card>

        <Typography variant="h5" gutterBottom>
          Vacancies
        </Typography>
        {company.vacancies.map((exp: Job, index: number) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{exp.jobTitle}</Typography>
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

export default CompanyModal;
