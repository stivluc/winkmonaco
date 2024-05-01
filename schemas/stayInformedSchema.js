import { generateMongooseModel } from '@/lib/generators/generateMongooseModel';
import { generateColumns } from '@/lib/generators/generateColumns';
import { generateCollectionApiHandler } from '@/lib/generators/generateCollectionApiHandler';
import { generateElementApiHandler } from '@/lib/generators/generateElementApiHandler';
import { generateFormik } from '@/lib/generators/generateFormik';
import CustomDatagrid from '@/components/datagrid/CustomDatagrid';
import { bool, string } from 'yup';
import { Cancel, CheckCircle } from '@mui/icons-material';

//* General model definition
export const stayInformedSchema = [
  {
    name: 'title',
    placeholder: 'Civilité',
    type: 'text',
    initialValue: 'm',
    muiHeaderName: 'Civilité',
    muiType: 'singleSelect',
    muiMdSize: 2,
    selectOptions: [
      {
        value: 'm',
        label: 'M.',
      },
      { value: 'ms', label: 'Mme.' },
      { value: 'other', label: 'Autre' },
    ],
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required('Civilité requise'),
  },
  {
    name: 'firstName',
    placeholder: 'Prénom',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Prénom',
    muiType: 'string',
    muiMdSize: 4,
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Prénom requis')
      .min(2, 'Le prénom ne peut pas faire moins de 2 caractères')
      .max(32, 'Le prénom ne peut pas faire plus de 32 caractères'),
  },
  {
    name: 'lastName',
    placeholder: 'Nom',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Nom',
    muiType: 'string',
    muiMdSize: 6,
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Nom de famille requis')
      .min(2, 'Le nom de famille ne peut pas faire moins de 2 caractères')
      .max(32, 'Le nom de famille ne peut pas faire plus de 32 caractères'),
  },
  {
    name: 'country',
    placeholder: 'Country',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Country',
    muiType: 'string',
    muiMdSize: 6,
    muiFlex: 3,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le pays est requis')
      .min(2, 'Le pays ne peut pas faire moins de 2 caractères')
      .max(64, 'Le pays ne peut pas faire plus de 64 caractères'),
  },
  {
    name: 'email',
    placeholder: 'E-mail',
    autocorrect: false,
    type: 'text',
    initialValue: '',
    muiHeaderName: 'E-mail',
    muiType: 'string',
    muiFlex: 4,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'email est requis").email('Entrez une adresse e-mail valide'),
  },
  {
    name: 'tel',
    placeholder: '06 01 02 03 04',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Tel',
    muiType: 'string',
    muiFlex: 1.5,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string()
      .required('Téléphone requis')
      .matches(/^(\+[0-9]{1,3}\s?)?(\([0-9]{1,}\)\s?)?([0-9]|-|\s){5,}$/, 'Numéro de téléphone invalide'),
  },
  {
    name: 'comment',
    placeholder: 'Commentaire',
    type: 'text',
    initialValue: '',
    multiline: true,
    minRows: 2,
    muiHeaderName: 'Commentaire',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string(),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const StayInformedModel = generateMongooseModel('StayInformed', stayInformedSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const VolunteersColumns = (handleDelete) => generateColumns(stayInformedSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const StayInformedFormik = ({ id, title, children }) =>
  generateFormik(stayInformedSchema, 'stayInformed', title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const stayInformedAPIHandler = generateCollectionApiHandler(StayInformedModel);
export const oneStayInformedAPIHandler = generateElementApiHandler(StayInformedModel);

//* --------
//* Datagrid
//* --------

export const StayInformedDatagrid = () => (
  <CustomDatagrid schema={stayInformedSchema} title='RestezInformes' endpoint='stayInformed' />
);
