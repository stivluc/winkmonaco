import { generateMongooseModel } from '@/lib/generators/generateMongooseModel';
import { generateColumns } from '@/lib/generators/generateColumns';
import { generateCollectionApiHandler } from '@/lib/generators/generateCollectionApiHandler';
import { generateElementApiHandler } from '@/lib/generators/generateElementApiHandler';
import { generateFormik } from '@/lib/generators/generateFormik';
import CustomDatagrid from '@/components/datagrid/CustomDatagrid';
import { bool, date, number, string } from 'yup';
import { Cancel, CheckCircle } from '@mui/icons-material';

//* General model definition
export const orderSchema = [
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
    name: 'address',
    placeholder: 'Adresse',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Adresse',
    muiType: 'string',
    muiFlex: 3,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("L'adresse est requise")
      .min(12, "L'adresse ne peut pas faire moins de 12 caractères")
      .max(256, "L'adresse ne peut pas faire plus de 256 caractères"),
  },
  {
    name: 'addressDetails',
    placeholder: "Complément d'adresse",
    type: 'text',
    initialValue: '',
    muiHeaderName: "Complément d'adresse",
    muiType: 'string',
    muiFlex: 3,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string().max(128, "Le complément d'adresse ne peut pas faire plus de 128 caractères"),
  },
  {
    name: 'zipCode',
    placeholder: 'Code postal',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Code postal',
    muiType: 'string',
    muiMdSize: 6,
    muiFlex: 3,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le code postal est requis')
      .min(4, 'Le code postal ne peut pas faire moins de 4 caractères')
      .max(12, 'Le code postal ne peut pas faire plus de 12 caractères'),
  },
  {
    name: 'city',
    placeholder: 'Ville',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Ville',
    muiType: 'string',
    muiMdSize: 6,
    muiFlex: 3,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('La ville est requise')
      .min(2, 'La ville ne peut pas faire moins de 2 caractères')
      .max(64, 'La ville ne peut pas faire plus de 64 caractères'),
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
    name: 'amount',
    placeholder: 'Montant',
    type: 'number',
    initialValue: 0,
    muiHeaderName: 'Montant',
    muiType: 'number',
    muiFlex: 1,
    muiMdSize: 6,
    mongooseType: Number,
    mongooseRequired: true,
    yupValidations: number().required('Montant de la commande requis').positive('Le montant ne peut pas être négatif'),
  },
  {
    name: 'isPaid',
    type: 'checkbox',
    label: 'Achat finalisé',
    initialValue: false,
    muiHeaderName: 'Don finalisé',
    muiType: 'boolean',
    muiFlex: 1.5,
    muiRenderCell: (params) =>
      params.row.isPaid ? (
        <CheckCircle sx={{ color: 'green', fontSize: '2rem' }} />
      ) : (
        <Cancel sx={{ color: 'red', fontSize: '2rem' }} />
      ),
    mongooseType: Boolean,
    mongooseRequired: true,
    yupValidations: bool().required('Requis'),
  },
  {
    name: 'items',
    placeholder: 'Items',
    type: 'text',
    title: 'Haut de page',
    multiline: true,
    minRows: 2,
    initialValue: '',
    muiHeaderName: 'Items',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string(),
  },
  {
    name: 'status',
    placeholder: 'Statut',
    type: 'text',
    initialValue: '',
    multiline: true,
    minRows: 2,
    muiHeaderName: 'Statut',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required('Statut requis'),
  },
  {
    name: 'createdAt',
    placeholder: 'Date',
    type: 'date',
    disabled: true,
    initialValue: new Date(),
    fullWidth: false,
    muiHeaderName: 'Date',
    muiType: 'date',
    muiFlex: 2,
    mongooseType: Date,
    mongooseRequired: true,
    yupValidations: date().required('Date requise'),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const OrderModel = generateMongooseModel('Order', orderSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const ordersColumns = (handleDelete) => generateColumns(orderSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const OrderFormik = ({ id, title, children }) => generateFormik(orderSchema, 'orders', title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const ordersAPIHandler = generateCollectionApiHandler(OrderModel);
export const orderAPIHandler = generateElementApiHandler(OrderModel);

//* --------
//* Datagrid
//* --------

export const OrdersDatagrid = () => <CustomDatagrid schema={orderSchema} title='Commandes' endpoint='orders' />;
