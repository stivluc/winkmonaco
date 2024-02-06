import React, { useContext, useState } from 'react';
import { generateInitialValues } from '@/lib/generators/generateInitialValues';
import { subscriptionSchema } from '@/schemas/subscriptionSchema';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowBack, Edit, Euro, VolunteerActivism } from '@mui/icons-material';
import { translate } from '@/lib/translations/translate';
import { object, string } from 'yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import RecurringDonationSuccessModal from './RecurringDonationSuccessModal';
import MuiPhoneNumber from 'mui-phone-number';
import ContactCard from '../contact/ContactCard';
import { LanguageContext } from '@/contexts/LanguageContext';

const RecurringForm = () => {
  const [isSending, setIsSending] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [customAmount, setCustomAmount] = useState(0);
  const { language } = useContext(LanguageContext);

  const [selectedOption, setSelectedOption] = useState('50');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = object().shape({
    title: string().required(translate({ tKey: 'helpTexts.requiredTitle', lang: language })),
    firstName: string()
      .required(translate({ tKey: 'helperTexts.requiredFirstName', lang: language }))
      .min(
        2,
        translate({ tKey: 'helperTexts.firstName', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotBeLess', lang: language }) +
          ' 2 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      )
      .max(
        32,
        translate({ tKey: 'helperTexts.firstName', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotExceed', lang: language }) +
          ' 32 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      ),
    lastName: string()
      .required(translate({ tKey: 'helperTexts.requiredLastName', lang: language }))
      .min(
        2,
        translate({ tKey: 'helperTexts.lastName', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotBeLess', lang: language }) +
          ' 2 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      )
      .max(
        32,
        translate({ tKey: 'helperTexts.lastName', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotExceed', lang: language }) +
          ' 32 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      ),
    email: string()
      .required(translate({ tKey: 'helperTexts.email', lang: language }))
      .email(translate({ tKey: 'helperTexts.invalidEmail', lang: language })),
    address: string()
      .required(translate({ tKey: 'helperTexts.requiredAddress', lang: language }))
      .min(
        12,
        translate({ tKey: 'helperTexts.address', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotBeLess', lang: language }) +
          ' 12 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      )
      .max(
        256,
        translate({ tKey: 'helperTexts.address', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotExceed', lang: language }) +
          ' 256 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      ),
    addressDetails: string().max(
      128,
      translate({ tKey: 'helperTexts.addressDetails', lang: language }) +
        ' ' +
        translate({ tKey: 'helperTexts.cannotExceed', lang: language }) +
        ' 128 ' +
        translate({ tKey: 'helperTexts.characters', lang: language })
    ),
    zipCode: string()
      .required(translate({ tKey: 'helperTexts.requiredZipCode', lang: language }))
      .min(
        4,
        translate({ tKey: 'helperTexts.zipCode', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotBeLess', lang: language }) +
          ' 4 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      )
      .max(
        12,
        translate({ tKey: 'helperTexts.zipCode', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotExceed', lang: language }) +
          ' 12 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      ),
    city: string()
      .required(translate({ tKey: 'helperTexts.requiredCity', lang: language }))
      .min(
        2,
        translate({ tKey: 'helperTexts.city', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotBeLess', lang: language }) +
          ' 2 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      )
      .max(
        64,
        translate({ tKey: 'helperTexts.city', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotExceed', lang: language }) +
          ' 64 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      ),
    country: string()
      .required(translate({ tKey: 'helperTexts.requiredCountry', lang: language }))
      .min(
        2,
        translate({ tKey: 'helperTexts.country', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotBeLess', lang: language }) +
          ' 2 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      )
      .max(
        64,
        translate({ tKey: 'helperTexts.country', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotExceed', lang: language }) +
          ' 64 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      ),
    tel: string()
      .required(translate({ tKey: 'helperTexts.tel', lang: language }))
      .matches(
        /^(\+[0-9]{1,3}\s?)?(\([0-9]{1,}\)\s?)?([0-9]|-|\s){5,}$/,
        translate({ tKey: 'helperTexts.invalidTel', lang: language })
      ),
    iban: string()
      .required(translate({ tKey: 'helperTexts.requiredIban', lang: language }))
      .max(
        64,
        translate({ tKey: 'helperTexts.iban', lang: language }) +
          ' ' +
          translate({ tKey: 'helperTexts.cannotExceed', lang: language }) +
          ' 64 ' +
          translate({ tKey: 'helperTexts.characters', lang: language })
      ),
    comment: string(),
  });

  const initialValues = generateInitialValues(subscriptionSchema);

  const handleSubmit = async (values) => {
    values.amountAsked = selectedOption === 'custom' ? parseInt(customAmount) : parseInt(selectedOption);
    values.iban = values.iban.replace(/\s/g, '');

    setIsSending(true);
    if (values.amountAsked < 5 || isNaN(values.amountAsked)) {
      enqueueSnackbar(translate({ tKey: 'donate.donationTooSmall', lang: language }), { variant: 'error' });
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch('/api/subscriptions/ibans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response) {
        const data = await response.json();
        if (data.message === 'alreadyExist') {
          enqueueSnackbar(translate({ tKey: 'donate.alreadyExist', lang: language }), { variant: 'info' });
          setIsSending(false);
        } else {
          // Send orderEmail
          const emailType = 'monthlyDonationEmail';
          const email = values?.email; // Replace with the actual recipient email

          // Send the request to the automaticEmail API endpoint
          const emailResponse = await fetch(
            `/api/emails/automaticEmail?emailType=${emailType}&language=${language}&email=${email}`,
            {
              method: 'POST',
            }
          );

          if (emailResponse.ok) {
            console.log('Monthly donation confirmation email successfully sent');
          } else {
            console.error('Error sending monthly donation confirmation email');
          }
          setIsOpened(true);
          setTimeout(() => {
            router.push('/');
          }, 8000);
        }
      } else {
        enqueueSnackbar(translate({ tKey: 'general.errorOccurred', lang: language }), { variant: 'error' });
        setIsSending(false);
      }
    } catch (err) {
      enqueueSnackbar(translate({ tKey: 'general.errorOccurred', lang: language }), { variant: 'error' });
      setIsSending(false);
      console.error(err);
    }
  };

  const titleOptions = [
    {
      value: 'm',
      label: translate({ tKey: 'general.mister', lang: language }),
    },
    { value: 'ms', label: translate({ tKey: 'general.miss', lang: language }) },
    { value: 'other', label: translate({ tKey: 'general.other', lang: language }) },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      <RecurringDonationSuccessModal opened={isOpened} language={language} />
      <Box
        sx={{
          maxWidth: { xs: '600px', md: '1050px' },
          width: '100%',
          margin: '1.2rem auto',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' mb={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {translate({ tKey: 'donate.title', lang: language })}
        </Typography>
        <Box sx={{ marginTop: '-1rem', textAlign: 'left' }}>
          <Button startIcon={<ArrowBack />} onClick={() => router.push('/donate')}>
            {translate({ tKey: 'general.back', lang: language })}
          </Button>
        </Box>
        <Typography> {translate({ tKey: 'donate.amountOfRecurring', lang: language })}</Typography>
        <FormControl>
          <Grid container mb={2}>
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <FormControlLabel
                disabled={isSending}
                control={<Checkbox checked={selectedOption === '20'} onChange={handleRadioChange} value={'20'} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
                    <Typography variant='h6' sx={{ width: '60px', paddingRight: '0.5rem' }}>
                      20
                    </Typography>
                    <Euro fontSize='small' />
                  </Box>
                }
                value={20}
                sx={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: '1rem',
                  padding: { xs: '0.4rem 1rem 0.4rem 0.4rem', sm: '0.4rem 2rem 0.4rem 1.4rem' },
                  width: 'fit-content',
                  margin: { xs: '1rem auto', md: '1rem' },
                }}
              />
              <FormControlLabel
                disabled={isSending}
                control={<Checkbox checked={selectedOption === '50'} onChange={handleRadioChange} value={'50'} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
                    <Typography variant='h6' sx={{ width: '60px', paddingRight: '0.5rem' }}>
                      50
                    </Typography>
                    <Euro fontSize='small' />
                  </Box>
                }
                value={50}
                sx={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: '1rem',
                  padding: { xs: '0.4rem 1rem 0.4rem 0.4rem', sm: '0.4rem 2rem 0.4rem 1.4rem' },
                  width: 'fit-content',
                  margin: { xs: '1rem auto', md: '1rem' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <FormControlLabel
                disabled={isSending}
                control={<Checkbox checked={selectedOption === '100'} onChange={handleRadioChange} value={'100'} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
                    <Typography variant='h6' sx={{ width: '60px', paddingRight: '0.5rem' }}>
                      100
                    </Typography>
                    <Euro fontSize='small' />
                  </Box>
                }
                value={100}
                sx={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: '1rem',
                  padding: { xs: '0.4rem 1rem 0.4rem 0.4rem', sm: '0.4rem 2rem 0.4rem 1.4rem' },
                  width: 'fit-content',
                  margin: { xs: '1rem auto', md: '1rem' },
                }}
              />
              <FormControlLabel
                disabled={isSending}
                sx={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: '1rem',
                  padding: { xs: '0.4rem 1rem 0.4rem 0.4rem', sm: '0.4rem 2rem 0.4rem 1.4rem' },
                  width: 'fit-content',
                  margin: { xs: '1rem auto', md: '1rem' },
                }}
                control={<Checkbox checked={selectedOption === 'custom'} onChange={handleRadioChange} value='custom' />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      type='number'
                      variant='standard'
                      sx={{ width: '60px' }}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      onClick={() => setSelectedOption('custom')}
                      inputProps={{ min: 1, style: { textAlign: 'center' } }}
                      InputProps={{
                        sx: {
                          fontSize: '1.2rem',
                          fontWeight: 600,
                          '&.MuiInputBase-root': {
                            backgroundColor: '#f0f0f0',
                          },
                          '& input[type=number]': {
                            MozAppearance: 'textfield',
                          },
                          '& input[type=number]::-webkit-outer-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0,
                          },
                          '& input[type=number]::-webkit-inner-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0,
                          },
                        },
                      }}
                    />
                    {customAmount === 0 || customAmount === '' ? <Edit fontSize='small' /> : <Euro fontSize='small' />}
                  </Box>
                }
                value={customAmount}
              />
            </Grid>
          </Grid>
        </FormControl>
        <Typography>{translate({ tKey: 'donate.myInfo', lang: language })}</Typography>
        <Paper
          sx={{
            backgroundColor: '#f0f0f0',
            marginTop: 2,
            padding: { md: '2rem 3rem 1.5rem 1rem', xs: '2rem 2rem 1.5rem 0rem' },
            borderRadius: '1rem',
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item mt={0.5} xs={4} md={2}>
                <TextField
                  fullWidth
                  select
                  label={translate({ tKey: 'general.formTitle', lang: language })}
                  name={'title'}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && !!formik.errors.title}
                  helperText={formik.touched.title && formik.errors.title}
                  disabled={isSending || false}
                  sx={{ textAlign: 'left' }}
                >
                  {titleOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item mt={0.5} xs={8} md={4}>
                <TextField
                  fullWidth
                  label={translate({ tKey: 'general.firstName', lang: language })}
                  name={'firstName'}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && !!formik.errors.firstName}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  disabled={isSending || false}
                  autoFocus
                />
              </Grid>
              <Grid item mt={0.5} xs={12} md={6}>
                <TextField
                  fullWidth
                  label={translate({ tKey: 'general.lastName', lang: language })}
                  name={'lastName'}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && !!formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  disabled={isSending || false}
                />
              </Grid>
              <Grid item mt={0.5} xs={12} md={6}>
                <TextField
                  fullWidth
                  label={translate({ tKey: 'general.email', lang: language })}
                  name={'email'}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled={isSending || false}
                  autoCorrect='off'
                  spellCheck='false'
                  autoCapitalize='off'
                />
              </Grid>
              <Grid item mt={0.5} xs={12} md={6}>
                <MuiPhoneNumber
                  sx={{ '& svg': { height: '1em', borderRadius: '5px' } }}
                  fullWidth
                  variant='outlined'
                  label={translate({ tKey: 'general.tel', lang: language })}
                  defaultCountry='fr'
                  onlyCountries={['fr', 'mc', 'ch', 'it', 'uk', 'gb', 'gr', 'de', 'ru', 'lu', 'us']}
                  // preferredCountries={['fr', 'mc', 'it', 'gb', 'be', 'ch', 'de', 'us', 'lu', 'ru']}
                  disableAreaCodes
                  name={'tel'}
                  value={formik.values.tel}
                  onChange={(val) => (formik.values.tel = val)}
                  error={formik.touched.tel && !!formik.errors.tel}
                  helperText={formik.touched.tel && formik.errors.tel}
                  disabled={isSending || false}
                />
              </Grid>
              <Grid item mt={0.5} xs={12} md={6}>
                <TextField
                  fullWidth
                  label={translate({ tKey: 'general.address', lang: language })}
                  name={'address'}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && !!formik.errors.address}
                  helperText={formik.touched.address && formik.errors.address}
                  disabled={isSending || false}
                />
              </Grid>
              <Grid item mt={0.5} xs={12} md={6}>
                <TextField
                  fullWidth
                  label={translate({ tKey: 'general.addressDetails', lang: language })}
                  name={'addressDetails'}
                  value={formik.values.addressDetails}
                  onChange={formik.handleChange}
                  error={formik.touched.addressDetails && !!formik.errors.addressDetails}
                  helperText={formik.touched.addressDetails && formik.errors.addressDetails}
                  disabled={isSending || false}
                />
              </Grid>
              <Grid item mt={0.5} xs={12} md={2.5}>
                <TextField
                  fullWidth
                  label={translate({ tKey: 'general.zipCode', lang: language })}
                  name={'zipCode'}
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  error={formik.touched.zipCode && !!formik.errors.zipCode}
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                  disabled={isSending || false}
                />
              </Grid>
              <Grid item mt={0.5} xs={12} md={4.75}>
                <TextField
                  fullWidth
                  label={translate({ tKey: 'general.city', lang: language })}
                  name={'city'}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && !!formik.errors.city}
                  helperText={formik.touched.city && formik.errors.city}
                  disabled={isSending || false}
                />
              </Grid>
              <Grid item mt={0.5} xs={12} md={4.75}>
                <TextField
                  fullWidth
                  label={translate({ tKey: 'general.country', lang: language })}
                  name={'country'}
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={formik.touched.country && !!formik.errors.country}
                  helperText={formik.touched.country && formik.errors.country}
                  disabled={isSending || false}
                />
              </Grid>
              <Grid item mt={0.5} xs={12}>
                <TextField
                  fullWidth
                  label={'IBAN'}
                  name={'iban'}
                  value={formik.values.iban
                    .replace(/[^\dA-Z]/g, '')
                    .replace(/(.{4})/g, '$1 ')
                    .trim()}
                  onChange={formik.handleChange}
                  error={formik.touched.iban && !!formik.errors.iban}
                  helperText={formik.touched.iban && formik.errors.iban}
                  disabled={isSending || false}
                />
              </Grid>
              <Grid item xs={12} mt={1}>
                <LoadingButton
                  loadingPosition='end'
                  loading={isSending}
                  type='sumbit'
                  variant='contained'
                  color='secondary'
                  endIcon={<VolunteerActivism />}
                >
                  {translate({ tKey: 'donate.monthlyButton', lang: language })}
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Typography variant='h4' mt={4} mb={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {translate({ tKey: 'donate.help', lang: language })}
        </Typography>
        <Typography> {translate({ tKey: 'donate.donationService', lang: language })}</Typography>
        <Paper
          sx={{
            backgroundColor: '#fafafa',
            width: 'fit-content',
            textAlign: 'left',
            margin: '2rem auto',
            borderRadius: '1rem',
            padding: '1rem',
          }}
        >
          <ContactCard language={language} />
        </Paper>
      </Box>
    </Box>
  );
};

export default RecurringForm;
