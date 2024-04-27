import { generateMongooseModel } from '@/lib/generators/generateMongooseModel';
import { generateColumns } from '@/lib/generators/generateColumns';
import { generateCollectionApiHandler } from '@/lib/generators/generateCollectionApiHandler';
import { generateElementApiHandler } from '@/lib/generators/generateElementApiHandler';
import { date, number, string } from 'yup';
import { generateFormik } from '@/lib/generators/generateFormik';
import CustomDatagrid from '@/components/datagrid/CustomDatagrid';

//* General schema definition
export const emailSchema = [
  {
    name: 'subject',
    placeholder: 'Objet',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Objet',
    muiType: 'string',
    muiMdSize: 12,
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Objet requis')
      .min(2, "L'objet ne peut pas faire moins de 2 caractères")
      .max(32, "L'objet ne peut pas faire plus de 32 caractères"),
  },

  {
    name: 'group',
    placeholder: 'Groupe',
    type: 'text',
    initialValue: 'everyone',
    muiHeaderName: 'Groupe',
    muiType: 'singleSelect',
    muiMdSize: 4,
    selectOptions: [
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
      { value: 'activeRecurring', label: 'Donateurs récurrents actifs > 50€' },
      { value: 'volunteersWithKit', label: 'Tous bénévoles avec kit' },
      { value: 'volunteers', label: 'Tous bénévoles' },
      { value: 'import', label: 'Liste importée' },
      { value: 'stayInformed', label: 'Adresses de la page restez informés' },
    ],
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required('Groupe requis'),
  },
  {
    name: 'count',
    placeholder: 'Nombre de personnes',
    type: 'number',
    initialValue: 0,
    muiHeaderName: 'Nombre de personnes',
    muiType: 'number',
    muiMdSize: 2,
    muiFlex: 2,
    mongooseType: Number,
    mongooseRequired: true,
    yupValidations: string().required('Nombre de personnes requis'),
  },
  {
    name: 'sentOn',
    placeholder: 'Envoyé le',
    type: 'date',
    disabled: true,
    initialValue: new Date(),
    fullWidth: false,
    muiHeaderName: 'Envoyé le',
    muiType: 'date',
    muiFlex: 2,
    mongooseType: Date,
    mongooseRequired: true,
    yupValidations: date().required('Date requise'),
  },
  {
    name: 'comment',
    placeholder: 'Commentaire',
    type: 'text',
    multiline: true,
    minRows: 2,
    initialValue: '',
    muiHeaderName: 'Commentaire',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le commentaire est requis')
      .min(2, 'Le commentaire ne peut pas faire moins de 2 caractères')
      .max(300, 'Le commentaire ne peut pas faire plus de 300 caractères'),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const EmailModel = generateMongooseModel('Email', emailSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const emailsColumns = (handleDelete) => generateColumns(emailSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const EmailFormik = ({ id, title, children }) => generateFormik(emailSchema, 'emails', title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const emailsAPIHandler = generateCollectionApiHandler(EmailModel);
export const emailAPIHandler = generateElementApiHandler(EmailModel);

//* --------
//* Datagrid
//* --------

export const EmailsDatagrid = () => <CustomDatagrid schema={emailSchema} title='Emails' endpoint='emails' />;
