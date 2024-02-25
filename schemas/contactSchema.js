import { generateMongooseModel } from '@/lib/generators/generateMongooseModel';
import { generateColumns } from '@/lib/generators/generateColumns';
import { generateCollectionApiHandler } from '@/lib/generators/generateCollectionApiHandler';
import { generateElementApiHandler } from '@/lib/generators/generateElementApiHandler';
import { generateFormik } from '@/lib/generators/generateFormik';
import CustomDatagrid from '@/components/datagrid/CustomDatagrid';
import { string } from 'yup';

//* General model definition
export const contactSchema = [
  {
    name: 'fullNameFr',
    placeholder: 'Nom complet (FR)',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Nom complet (FR)',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required('Le nom complet (FR) est requis'),
  },
  {
    name: 'fullNameEn',
    placeholder: 'Nom complet (EN)',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Nom complet (EN)',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required('Le nom complet (EN) est requis'),
  },
  {
    name: 'fullNameIt',
    placeholder: 'Nom complet (IT)',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Nom complet (IT)',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required('Le nom complet (IT) est requis'),
  },
  {
    name: 'frTel',
    placeholder: '06 01 02 03 04',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Téléphone - Format français (06 01 02 03 04)',
    muiType: 'string',
    muiFlex: 4,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le numéro de téléphone (FR) est requis')
      .matches(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Entrez un numéro de téléphone (FR) valide'),
  },
  {
    name: 'enTel',
    placeholder: '+33 6 01 02 03 04',
    type: 'text',
    initialValue: '',
    translation: true,
    muiMdSize: 6,
    muiHeaderName: 'Téléphone - Format anglais (+33 6 01 02 03 04)',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le numéro de téléphone (format anglais) est requis')
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Entrez un numéro de téléphone (format anglais) valide'),
  },
  {
    name: 'itTel',
    placeholder: '+33 6 01 02 03 04',
    type: 'text',
    initialValue: '',
    translation: true,
    muiMdSize: 6,
    muiHeaderName: 'Téléphone - Format italien (+33 6 01 02 03 04)',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le numéro de téléphone (format italien) est requis')
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Entrez un numéro de téléphone (format italien) valide'),
  },
  {
    name: 'email',
    placeholder: 'Adresse e-mail',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Adresse e-mail',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'adresse e-mail est requise").email('Entrez une adresse e-mail valide'),
  },
  {
    name: 'profilePicFr',
    placeholder: 'URL de la photo de profil (FR)',
    title: "Lien à compléter: https://drive.google.com/uc?export=view&id=[ID DE L'IMAGE]",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'URL de la photo de profil (FR)',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de la photo de profil (FR) est requise").url('Entrez une URL de la photo de profil (FR) valide'),
  },
  {
    name: 'profilePicEn',
    placeholder: 'URL de la photo de profil (EN)',
    title: "Lien à compléter: https://drive.google.com/uc?export=view&id=[ID DE L'IMAGE]",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'URL de la photo de profil (EN)',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de la photo de profil (EN) est requise").url('Entrez une URL de la photo de profil (EN) valide'),
  },
  {
    name: 'profilePicIt',
    placeholder: 'URL de la photo de profil (IT)',
    title: "Lien à compléter: https://drive.google.com/uc?export=view&id=[ID DE L'IMAGE]",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'URL de la photo de profil (IT)',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de la photo de profil (IT) est requise").url('Entrez une URL de la photo de profil (IT) valide'),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const ContactModel = generateMongooseModel('Contact', contactSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const contactsColumns = generateColumns(contactSchema);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const ContactFormik = ({ id, title, children }) =>
  generateFormik(contactSchema, 'contacts', title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const contactsAPIHandler = generateCollectionApiHandler(ContactModel);
export const contactAPIHandler = generateElementApiHandler(ContactModel);

//* --------
//* Datagrid
//* --------

// export const ContactsDatagrid = () => <CustomDatagrid schema={contactSchema} title='Contacts' endpoint='contacts' />;
