import {Router} from 'express';
const router = Router();

import {getProducts, getAllProducts} from '../data/products.js';
import validation from '../validation.js';

router.route('/index').get(async (req, res) => {
  const product = await getAllProducts();
  res.render('products/index', {product: product});
});
router
  .route('/')
  .get(async (req, res) => {
    try {
      const productList = await getAllProducts();
      res.render('products/index', {products: productList});
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  })

  router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const product = await getProducts(req.params.id);
      res.render('products/single', {product: product});
    } catch (e) {
      res.status(404).json({error: e});
    }
  })


  export default router;