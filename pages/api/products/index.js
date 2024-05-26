import { ProductModel } from '@/schemas/productSchema';
import { dbConnect, dbDisconnect } from '@/lib/dbConnect';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        await dbConnect();
        const models = await ProductModel.find();
        res.status(200).json({ success: true, data: models });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        await dbConnect();
        const model = new ProductModel(req.body);
        await model.save();
        res.status(201).json({ success: true, data: model });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error });
      }
      break;
  }
}
