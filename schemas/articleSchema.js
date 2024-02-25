import { generateMongooseModel } from '@/lib/generators/generateMongooseModel';
import { generateColumns } from '@/lib/generators/generateColumns';
import { generateCollectionApiHandler } from '@/lib/generators/generateCollectionApiHandler';
import { generateElementApiHandler } from '@/lib/generators/generateElementApiHandler';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { bool, date, string } from 'yup';
import { generateFormik } from '@/lib/generators/generateFormik';
import CustomDatagrid from '@/components/datagrid/CustomDatagrid';

//* General schema definition
export const articleSchema = [
  {
    name: 'title',
    placeholder: "Titre de l'article",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Titre',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("Le titre de l'article est requis")
      .min(3, 'Le titre ne peut pas faire moins de 3 caractères')
      .max(64, 'Le titre ne peut pas faire plus de 64 caractères'),
  },
  {
    name: 'enTitle',
    placeholder: "Titre de l'article (anglais)",
    type: 'text',
    translation: true,
    hide: true,
    initialValue: '',
    muiHeaderName: 'Titre (EN)',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("Le titre de l'article en anglais est requis")
      .min(3, 'Le titre en anglais ne peut pas faire moins de 3 caractères')
      .max(64, 'Le titre en anglais ne peut pas faire plus de 64 caractères'),
  },
  {
    name: 'itTitle',
    placeholder: "Titre de l'article (italien)",
    type: 'text',
    translation: true,
    hide: true,
    initialValue: '',
    muiHeaderName: 'Titre (IT)',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("Le titre de l'article en italien est requis")
      .min(3, 'Le titre en italien ne peut pas faire moins de 3 caractères')
      .max(64, 'Le titre en italien ne peut pas faire plus de 64 caractères'),
  },
  {
    name: 'content',
    placeholder: "Contenu de l'article",
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Contenu',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le contenu est requis')
      .min(120, 'Le contenu ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le contenu ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'enContent',
    placeholder: "Contenu de l'article (anglais)",
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    hide: true,
    muiHeaderName: 'Contenu (EN)',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le contenu en anglais est requis')
      .min(120, 'Le contenu en anglais ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le contenu en anglais ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'itContent',
    placeholder: "Contenu de l'article (italien)",
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Contenu (IT)',
    muiType: 'string',
    hide: true,
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le contenu en italien est requis')
      .min(120, 'Le contenu en italien ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le contenu en italien ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'videoUrl',
    placeholder: "URL de la vidéo de l'article",
    title:
      'Lien à compléter: https://youtube.com/embed/[ID DE LA VIDEO] - NE PAS UTILISER LE LIEN DE LA VIDEO DIRECTEMENT | Tutoriel: https://docs.google.com/document/d/1QS-sooZ2E9BaXQHjUlZcR4mp5LLuGsV1pDlSu-fo-zU/edit?usp=sharing',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'URL de la vidéo',
    muiType: 'string',
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().url('Entrez un URL valide'),
  },
  {
    name: 'enVideoUrl',
    placeholder: "URL de la vidéo de l'article (EN)",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'URL de la vidéo (EN)',
    muiType: 'string',
    muiFlex: 1,
    hide: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().url('Entrez un URL valide'),
  },
  {
    name: 'itVideoUrl',
    placeholder: "URL de la vidéo de l'article (IT)",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'URL de la vidéo (IT)',
    muiType: 'string',
    muiFlex: 1,
    hide: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().url('Entrez un URL valide'),
  },
  {
    name: 'imageUrl',
    placeholder: "URL de l'image de l'article",
    title: "Lien à compléter: https://drive.google.com/uc?export=view&id=[ID DE L'IMAGE]",
    type: 'text',
    initialValue: '',
    muiHeaderName: "URL de l'image",
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de l'image de l'article est requis").url('Entrez un URL valide'),
  },
  {
    name: 'imageUrl2',
    placeholder: "URL de l'image 2 de l'article",
    type: 'text',
    initialValue: '',
    muiHeaderName: "URL de l'image 2",
    muiType: 'string',
    muiFlex: 1,
    hide: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().url('Entrez un URL valide'),
  },
  {
    name: 'imageUrl3',
    placeholder: "URL de l'image 3 de l'article",
    type: 'text',
    initialValue: '',
    muiHeaderName: "URL de l'image 3",
    muiType: 'string',
    muiFlex: 1,
    hide: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().url('Entrez un URL valide'),
  },
  {
    name: 'imageUrl4',
    placeholder: "URL de l'image 4 de l'article",
    type: 'text',
    initialValue: '',
    muiHeaderName: "URL de l'image 4",
    muiType: 'string',
    muiFlex: 1,
    hide: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().url('Entrez un URL valide'),
  },
  {
    name: 'createdAt',
    placeholder: "Date de création de l'article",
    type: 'date',
    disabled: true,
    initialValue: new Date(),
    fullWidth: false,
    muiHeaderName: 'Date de création',
    muiType: 'date',
    muiFlex: 2,
    mongooseType: Date,
    mongooseRequired: true,
    yupValidations: date().required("La date de création de l'article est requise"),
  },
  {
    name: 'priority',
    type: 'checkbox',
    label: "Mise en avant de l'article",
    initialValue: false,
    muiHeaderName: 'En priorité',
    muiType: 'boolean',
    muiFlex: 1.5,
    muiRenderCell: (params) =>
      params.row.priority ? (
        <CheckCircle sx={{ color: 'green', fontSize: '2rem' }} />
      ) : (
        <Cancel sx={{ color: 'red', fontSize: '2rem' }} />
      ),
    mongooseType: Boolean,
    mongooseRequired: true,
    yupValidations: bool(),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const ArticleModel = generateMongooseModel('Article', articleSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const articlesColumns = (handleDelete) => generateColumns(articleSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const ArticleFormik = ({ id, title, children }) =>
  generateFormik(articleSchema, 'articles', title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const articlesAPIHandler = generateCollectionApiHandler(ArticleModel);
export const articleAPIHandler = generateElementApiHandler(ArticleModel);

//* --------
//* Datagrid
//* --------

export const ArticlesDatagrid = () => <CustomDatagrid schema={articleSchema} title='Articles' endpoint='articles' />;
