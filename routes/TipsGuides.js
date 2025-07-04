import {Router} from 'express';
const router = Router();

import {getTipsGuides, getAllTipsGuides} from '../data/TipsGuides.js';
import validation from '../validation.js';

router.route('/index').get(async (req, res) => {
  const TG = await getAllTipsGuides();
  res.render('TipsGuides/index', {TG: TG});
});
router
  .route('/')
  .get(async (req, res) => {
    try {
      const TGList = await getAllTipsGuides();
      res.render('TipsGuides/index', {TipsGuides: TGList});
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
      const TG = await getTipsGuides(req.params.id);
      res.render('TipsGuides/single', {TG: TG});
    } catch (e) {
      res.status(404).json({error: e});
    }
  })


  export default router;