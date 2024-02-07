import { generateMongooseModel } from '@/lib/generators/generateMongooseModel';
import { generateColumns } from '@/lib/generators/generateColumns';
import { generateCollectionApiHandler } from '@/lib/generators/generateCollectionApiHandler';
import { generateElementApiHandler } from '@/lib/generators/generateElementApiHandler';
import { string, number, bool } from 'yup';
import { generateFormik } from '@/lib/generators/generateFormik';
import CustomDatagrid from '@/components/datagrid/CustomDatagrid';
import { Cancel, CheckCircle } from '@mui/icons-material';

//* General schema definition
export const productSchema = [
  {
    name: 'name',
    placeholder: 'Nom du produit',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Produit',
    muiType: 'string',
    muiFlex: 3,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Nom du produit requis')
      .min(3, 'Le nom du produit ne peut pas faire moins de 6 caractères')
      .max(64, 'Le nom du produit ne peut pas faire plus de 64 caractères'),
  },
  {
    name: 'enName',
    placeholder: 'Nom du produit (EN)',
    translation: true,
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Produit (EN)',
    muiType: 'string',
    muiFlex: 3,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Nom du produit en anglais requis')
      .min(3, 'Le nom du produit en anglais ne peut pas faire moins de 6 caractères')
      .max(64, 'Le nom du produit en anglais ne peut pas faire plus de 64 caractères'),
  },
  {
    name: 'itName',
    placeholder: 'Nom du produit (IT)',
    translation: true,
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Produit (IT)',
    muiType: 'string',
    muiFlex: 3,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Nom du produit en italien requis')
      .min(3, 'Le nom du produit en italien ne peut pas faire moins de 6 caractères')
      .max(64, 'Le nom du produit en italien ne peut pas faire plus de 64 caractères'),
  },
  {
    name: 'price',
    placeholder: 'Prix',
    type: 'number',
    initialValue: 0,
    muiHeaderName: 'Prix',
    muiType: 'number',
    muiFlex: 1,
    muiMdSize: 6,
    mongooseType: Number,
    mongooseRequired: true,
    yupValidations: number().required('Prix du produit requis').positive('Le prix ne peut pas être négatif'),
  },
  {
    name: 'description',
    placeholder: 'Description',
    type: 'text',
    multiline: true,
    minRows: 3,
    initialValue: '',
    muiHeaderName: 'Description',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('La description est requise')
      .min(64, 'La description ne peut pas faire moins de 64 caractères')
      .max(3000, 'La description ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'enDescription',
    placeholder: 'Description (EN)',
    type: 'text',
    translation: true,
    multiline: true,
    minRows: 3,
    initialValue: '',
    muiHeaderName: 'Description (EN)',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('La description (EN) est requise')
      .min(64, 'La description (EN) ne peut pas faire moins de 64 caractères')
      .max(3000, 'La description (EN) ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'itDescription',
    placeholder: 'Description (IT)',
    type: 'text',
    translation: true,
    multiline: true,
    minRows: 3,
    initialValue: '',
    muiHeaderName: 'Description (IT)',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('La description (IT) est requise')
      .min(64, 'La description (IT) ne peut pas faire moins de 64 caractères')
      .max(3000, 'La description (IT) ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'sizes',
    placeholder: `Tailles disponibles - séparées par ";"`,
    title: "Tailles disponibles, à séparer par ';'",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Tailles',
    muiType: 'string',
    muiFlex: 2,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string(),
  },
  {
    name: 'isActive',
    type: 'checkbox',
    label: 'Actif',
    initialValue: true,
    muiHeaderName: 'Actif',
    muiType: 'boolean',
    muiFlex: 1.5,
    muiMdSize: 12,
    muiRenderCell: (params) =>
      params.row.isActive ? (
        <CheckCircle sx={{ color: 'green', fontSize: '2rem' }} />
      ) : (
        <Cancel sx={{ color: 'red', fontSize: '2rem' }} />
      ),
    mongooseType: Boolean,
    mongooseRequired: true,
    yupValidations: bool().required('Le statut du produit est requis'),
  },
  {
    name: 'imageUrl',
    placeholder: "URL de l'image 1",
    title: "Lien à compléter: https://drive.google.com/uc?export=view&id=[ID DE L'IMAGE]",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Image 1',
    muiType: 'string',
    muiFlex: 1,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de l'image 1 est requis").url('Entrez un URL valide'),
  },
  {
    name: 'imageUrl2',
    placeholder: "URL de l'image 2",
    title:
      "L'image numéro 1 sera celle affichée sur la carte du produit dans la boutique! Les suivantes sont pour la fiche produit.",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Image 2',
    muiType: 'string',
    muiFlex: 1,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string().url('Entrez un URL valide'),
  },
  {
    name: 'imageUrl3',
    placeholder: "URL de l'image 3",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Image 3',
    muiType: 'string',
    muiFlex: 1,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string().url('Entrez un URL valide'),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const ProductModel = generateMongooseModel('Product', productSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const productsColumns = (handleDelete) => generateColumns(productSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const ProductFormik = ({ id, title, children }) =>
  generateFormik(productSchema, 'products', title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const productsAPIHandler = generateCollectionApiHandler(ProductModel);
export const productAPIHandler = generateElementApiHandler(ProductModel);

//* --------
//* Datagrid
//* --------

export const ProductsDatagrid = () => <CustomDatagrid schema={productSchema} title='Produits' endpoint='products' />;
