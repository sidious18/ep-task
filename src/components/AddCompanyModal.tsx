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
import { addCompany } from '../models/company';
import { addCompanyJobs } from '../models/job';

interface AddCompanyModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCompanyModal = ({ open, onClose }: AddCompanyModalProps) => {
  const { control, handleSubmit, register, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      industry: '',
      address: '',
      vacancies: [
        {
          jobTitle: '',
          description: '',
          technologies: '',
        },
      ],
      },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vacancies',
  });

  const onSubmit = (data: any) => {
    addCompanyJobs(data.vacancies);
    addCompany({
      name: data.name,
      industry: data.industry,
      address: data.address,
    })
    document.dispatchEvent(new MouseEvent('add_company', { bubbles: true, cancelable: true }));
    reset()
    onClose()
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose()}
    >
      <Box className='modal-box'>
        <Typography variant="h4" gutterBottom>
          Company Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Industry"
                {...register('industry', { required: 'Industry is required' })}
                error={!!errors.industry}
                helperText={errors.industry?.message}
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
              <Typography variant="h6">Vacancies</Typography>
            </Grid>

            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`vacancies.${index}.jobTitle`}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Job Title"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`vacancies.${index}.technologies`}
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
                    name={`vacancies.${index}.description`}
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
                    technologies: '',
                    description: '',
                  })
                }
              >
                Add Vacancy
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

export default AddCompanyModal;
