import { useRouter } from 'next/router';
import { OrderFormik } from '@/schemas/orderSchema';

const EditOrder = () => {
  const router = useRouter();
  const { id } = router.query;

  return <OrderFormik id={id} title="Modification d'une commande" />;
};

export default EditOrder;
