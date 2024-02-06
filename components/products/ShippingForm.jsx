import { ArrowBack, ShoppingCart } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import Translation from '../general/Translation';
import { translate } from '@/lib/translations/translate';
import { bool, object, string } from 'yup';
import Link from 'next/link';
import MuiPhoneNumber from 'mui-phone-number';
import ContactCard from '../contact/ContactCard';
import { useCart } from '@/contexts/CartContext';
import { countries } from '@/lib/countries';

const ShippingForm = ({ language }) => {
  const [isSending, setIsSending] = useState(false);
  const { cart } = useCart();

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
    agreeTerms: bool()
      .required(translate({ tKey: 'helperTexts.requiredTerms', lang: language }))
      .oneOf([true], translate({ tKey: 'helperTexts.requiredTerms', lang: language })),
  });

  const titleOptions = [
    {
      value: 'm',
      label: translate({ tKey: 'general.mister', lang: language }),
    },
    { value: 'ms', label: translate({ tKey: 'general.miss', lang: language }) },
    { value: 'other', label: translate({ tKey: 'general.other', lang: language }) },
  ];

  const handleSubmit = async (values) => {
    values.items = cart.items
      .map((item) => {
        // Include the size in the description if it exists
        const sizePart = item.size ? ` - ${item.size}` : '';
        return `${item.quantity} x ${item.product.name}${sizePart}`;
      })
      .join('; ');
    values.amount = parseInt(
      cart.items.reduce((acc, obj) => {
        return acc + obj.product.price * obj.quantity;
      }, 0) + (values.country === 'FR' ? 5 : 10)
    );
    values.isPaid = false;
    values.createdAt = new Date();
    values.status = 'Commande créée';

    setIsSending(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const { data } = await response.json();
        router.push({ pathname: '/shop/cart/payment', query: data });
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

  const formik = useFormik({
    initialValues: {
      title: 'm',
      firstName: '',
      lastName: '',
      email: '',
      tel: '',
      address: '',
      addressDetails: '',
      zipCode: '',
      city: '',
      country: '',
      agreeTerms: false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      <Box sx={{ marginTop: '-1rem', textAlign: 'left' }}>
        <Button startIcon={<ArrowBack />} onClick={() => router.push('/shop/cart')}>
          <Translation tKey='general.back' lang={language} />
        </Button>
      </Box>
      <React.Fragment>
        <Paper
          sx={{
            backgroundColor: '#fafafa',
            marginTop: 1,
            padding: { md: '2rem 3rem 1.5rem 1rem', xs: '2rem 2rem 1.5rem 0rem' },
            borderRadius: '1rem',
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item mt={0.5} xs={12}>
                <Typography>{translate({ tKey: 'general.contactInfo', lang: language })}</Typography>
              </Grid>
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
                  name={'tel'}
                  value={formik.values.tel}
                  onChange={(val) => (formik.values.tel = val)}
                  error={formik.touched.tel && !!formik.errors.tel}
                  helperText={formik.touched.tel && formik.errors.tel}
                  disabled={isSending || false}
                />
              </Grid>
              <Grid item mt={0.5} xs={12}>
                <Typography>{translate({ tKey: 'general.address', lang: language })}</Typography>
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
              <Grid item mt={0.5} xs={6} md={2.5}>
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
              <Grid item mt={0.5} xs={6} md={4.75}>
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
                  select
                  label={translate({ tKey: 'general.country', lang: language })}
                  name={'country'}
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={formik.touched.country && !!formik.errors.country}
                  helperText={formik.touched.country && formik.errors.country}
                  disabled={isSending || false}
                  sx={{ textAlign: 'left' }}
                  SelectProps={{
                    MenuProps: {
                      style: { maxHeight: '300px' }, // Adjust the maxHeight as needed
                    },
                  }}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControl
                    required
                    error={formik.touched.agreeTerms && Boolean(formik.errors.agreeTerms)}
                    component='fieldset'
                    disabled={isSending}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={'agreeTerms'}
                          onChange={formik.handleChange}
                          value={formik.values.agreeTerms || false}
                          checked={formik.values.agreeTerms || false}
                        />
                      }
                      label={
                        <div>
                          {translate({ tKey: 'shop.readAndAccept', lang: language })}{' '}
                          <Link href={'/shop/termsOfSale?previous=/shop/cart/checkout'}>
                            {translate({ tKey: 'shop.termsOfSale', lang: language })}
                          </Link>{' '}
                        </div>
                      }
                    />
                    <FormHelperText>{formik.touched.agreeTerms && formik.errors.agreeTerms}</FormHelperText>
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'>{translate({ tKey: 'shop.summary', lang: language })}</Typography>
                <hr />
                <Typography variant='body1' textAlign='left'>
                  {cart.items.map((item, index) => {
                    // Include the size in the description if it exists
                    const sizePart = item.size ? ` - ${item.size}` : '';
                    const lineBreak = index < cart.items.length - 1 ? <br /> : null;
                    return (
                      <React.Fragment key={Math.random()}>
                        {`${item.quantity} x ${item.product.name}${sizePart}`}
                        {lineBreak}
                      </React.Fragment>
                    );
                  })}
                </Typography>
                <hr />
                <Typography variant='body1' textAlign='left'>
                  {translate({ tKey: 'shop.subtotal', lang: language })}:{' '}
                  <b>
                    {cart.items
                      .reduce((acc, obj) => {
                        return acc + obj.product.price * obj.quantity;
                      }, 0)
                      .toLocaleString()}
                    €
                  </b>
                </Typography>
                <Typography variant='body1' textAlign='left'>
                  {translate({ tKey: 'shop.shippingPrice', lang: language })}:{' '}
                  {formik.values.country === 'FR' ? '5€' : '10€'}
                </Typography>
                <Typography variant='h6' textAlign='left' mt={1}>
                  {translate({ tKey: 'shop.total', lang: language })}:{' '}
                  <b>
                    {(
                      cart.items.reduce((acc, obj) => {
                        return acc + obj.product.price * obj.quantity;
                      }, 0) + (formik.values.country === 'FR' ? 5 : 10)
                    ).toLocaleString()}
                    €
                  </b>
                </Typography>
              </Grid>
              <Grid item xs={12} mt={1}>
                <LoadingButton
                  loadingPosition='end'
                  loading={isSending}
                  type='sumbit'
                  variant='contained'
                  color='success'
                  endIcon={<ShoppingCart />}
                >
                  {translate({ tKey: 'shop.payment', lang: language })}
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Typography variant='h4' mt={4} mb={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {translate({ tKey: 'volunteers.help', lang: language })}
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
      </React.Fragment>
    </Box>
  );
};

export default ShippingForm;
