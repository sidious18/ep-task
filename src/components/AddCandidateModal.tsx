import React from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Modal,
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { addCandidate } from '../models/candidate';
import { addCandidateJobs } from '../models/job';

interface AddCandidateModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCandidateModal = ({ open, onClose }: AddCandidateModalProps) => {
  const { control, handleSubmit, register, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      address: '',
      jobTitle: '',
      experience: [
        {
          jobTitle: '',
          periodStart: '',
          periodEnd: '',
          technologies: '',
          description: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  const onSubmit = (data: any) => {
    addCandidateJobs(data.experience);
    addCandidate({
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      address: data.address,
      jobTitle: data.jobTitle,
    })
    document.dispatchEvent(new MouseEvent('add_candidate', { bubbles: true, cancelable: true }));
    reset();
    onClose()
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose()}
    >
      <Box className='modal-box'>
        <Typography variant="h4" gutterBottom>
          Candidate Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                {...register('firstName', { required: 'First Name is required' })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                {...register('lastName', { required: 'Last Name is required' })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                {...register('jobTitle', { required: 'Job Title is required' })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                {...register('age', { required: 'Age is required', min: { value: 1, message: 'Age must be at least 1' } })}
                error={!!errors.age}
                helperText={errors.age?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                {...register('address', { required: 'Address is required' })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Experience</Typography>
            </Grid>

            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`experience.${index}.jobTitle`}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Job Title"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    control={control}
                    name={`experience.${index}.periodStart`}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Period Start"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    control={control}
                    name={`experience.${index}.periodEnd`}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Period End"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name={`experience.${index}.technologies`}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Technologies"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name={`experience.${index}.description`}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={3}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    color="error"
                    onClick={() => remove(index)}
                  >
                    <RemoveCircle />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<AddCircle />}
                onClick={() =>
                  append({
                    jobTitle: '',
                    periodStart: '',
                    periodEnd: '',
                    technologies: '',
                    description: '',
                  })
                }
              >
                Add Experience
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button onClick={onClose} variant="outlined" color="primary" style={{ marginLeft: '10px' }}>
                Close
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

export default AddCandidateModal;
