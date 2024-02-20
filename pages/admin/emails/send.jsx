import ConfirmationModal from '@/components/general/ConfirmationModal';
import { Cancel, CloudUpload, Send } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { bool, object, string } from 'yup';

const SendEmail = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [emails, setEmails] = useState([]);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFileName(name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;

      const records = parseCSV(result);

      const uniqueEmails = Array.from(new Set(records.flatMap((row) => getEmailsFromRow(row))));

      setEmails(uniqueEmails);
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const records = [];
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');
      const record = {};
      for (let j = 0; j < headers.length; j++) {
        record[headers[j]] = currentLine[j];
      }
      records.push(record);
    }
    return records;
  };

  const getEmailsFromRow = (row) => {
    return Object.values(row).filter((value) => isValidEmail(value));
  };

  const isValidEmail = (value) => {
    return typeof value === 'string' && value.includes('@');
  };

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const initialValues = {
    group: 'everyone',
    subject: '',
    text: '',
    isHtml: false,
    verification: false,
  };

  const validationSchema = object().shape({
    group: string().required('Groupe requis'),
    subject: string().required('Sujet requis'),
    text: string().required('Texte requis').min(64, 'Le texte doit faire minimum 64 caractères'),
    isHtml: bool(),
    verification: bool().required('Cette case doit être cochée').oneOf([true], 'Cette case doit être cochée'),
  });

  const groupOptions = [
    { value: 'test', label: 'Test (winkmonaco@gmail.com)' },
    {
      value: 'everyone',
      label: 'Tout le monde',
    },
    { value: 'donators', label: 'Tous donateurs' },
    { value: 'oneTimeDonators', label: 'Tous donateurs uniques' },
    { value: 'donatorsSup200', label: 'Donateurs uniques > 200€' },
    { value: 'inactiveRecurring', label: 'Donateurs récurrents inactifs' },
    { value: 'activeRecurring', label: 'Donateurs récurrents actifs' },
    { value: 'activeRecurringSup50', label: 'Donateurs récurrents actifs > 50€' },
    { value: 'volunteersWithKit', label: 'Tous bénévoles avec kit' },
    { value: 'volunteers', label: 'Tous bénévoles' },
    { value: 'import', label: 'Liste importée' },
  ];

  const handleSubmit = async (values) => {
    try {
      setIsSending(true);

      values.emails = emails;

      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        enqueueSnackbar(`Données enregistrées avec succès`, { variant: 'success' });
        router.push(`/admin/emails`);
      } else {
        // Handle the case when the update/create fails
        enqueueSnackbar(`Une erreur s'est produite lors de l'envoi des données`, { variant: 'error' });
        console.error(`Failed to send email`);
        setIsSending(false);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Une erreur s'est produite lors de l'envoi des données`, { variant: 'error' });
      setIsSending(false);
    }
  };

  const onConfirm = () => {
    enqueueSnackbar(`Les modifications ont bien été annulées`, { variant: 'info' });
    router.push(`/admin/emails`);
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <React.Fragment>
      <ConfirmationModal
        onConfirm={onConfirm}
        opened={isOpened}
        handleClose={handleClose}
        title='Annulation'
        text='Êtes-vous sur de vouloir annuler vos modifications?'
        cancelModal
      />
      <Box
        sx={{
          maxWidth: { xs: '600px', md: '1200px' },
          width: '100%',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h2'>{`Envoi d'email de masse`}</Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid item xs={12} mt={2}>
                <TextField
                  fullWidth
                  select
                  label={'Envoyer à'}
                  name={'group'}
                  value={formik.values.group}
                  onChange={formik.handleChange}
                  error={formik.touched.group && !!formik.errors.group}
                  helperText={formik.touched.group && formik.errors.group}
                  disabled={isSending || false}
                  sx={{ textAlign: 'left', width: '30%' }}
                >
                  {groupOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Collapse in={formik.values.group === 'import'}>
                <Grid item xs={6} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <LoadingButton component='label' variant='contained' color='secondary' startIcon={<CloudUpload />}>
                    Importer une liste
                    <input type='file' hidden onChange={handleFileUpload} accept='.csv' />
                  </LoadingButton>
                  <Typography ml={2}>{fileName}</Typography>
                </Grid>
              </Collapse>
              <Grid item xs={12} mt={2}>
                <TextField
                  fullWidth
                  label={'Objet'}
                  name={'subject'}
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  error={formik.touched.subject && !!formik.errors.subject}
                  helperText={formik.touched.subject && formik.errors.subject}
                  disabled={isSending || false}
                ></TextField>
              </Grid>
              <Grid item xs={12} mt={2}>
                <TextField
                  fullWidth
                  label={'Contenu'}
                  name={'text'}
                  multiline
                  minRows={4}
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  error={formik.touched.text && !!formik.errors.text}
                  helperText={formik.touched.text && formik.errors.text}
                  disabled={isSending || false}
                ></TextField>
              </Grid>
              <Grid item xs={12} mt={2}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    value={formik.values.isHtml}
                    checked={formik.values.isHtml}
                    label={'Le texte est écrit en HTML'}
                    name={'isHtml'}
                    onChange={formik.handleChange}
                    disabled={isSending || false}
                  />
                  <FormControl
                    required
                    error={formik.touched.verification && Boolean(formik.errors.verification)}
                    component='fieldset'
                    disabled={isSending}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={formik.values.verification}
                          checked={formik.values.verification}
                          onChange={formik.handleChange}
                          name='verification'
                        />
                      }
                      label="J'ai bien relu mon mail et vérifié qu'il n'y a pas d'erreurs"
                    />
                    <FormHelperText>{formik.touched.verification && formik.errors.verification}</FormHelperText>
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={12} mt={2}>
                <LoadingButton
                  loadingPosition='end'
                  loading={isSending}
                  type='submit'
                  variant='contained'
                  color='primary'
                  endIcon={<Send />}
                >
                  Envoyer
                </LoadingButton>
                <LoadingButton
                  loading={isSending}
                  startIcon={<Cancel />}
                  loadingPosition='start'
                  variant='text'
                  onClick={() => setIsOpened(true)}
                  color='error'
                  sx={{ ml: 3 }}
                >
                  {`Annuler`}
                </LoadingButton>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default SendEmail;
