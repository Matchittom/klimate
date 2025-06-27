import {Router} from 'express';
const router = Router();

import {getProjects, getAllProjects} from '../data/projects.js';
import validation from '../validation.js';

router.route('/index').get(async (req, res) => {
  const project = await getAllProjects();
  res.render('projects/index', {project: project});
});
router
  .route('/')
  .get(async (req, res) => {
    try {
      const projectList = await getAllProjects();
      res.render('projects/index', {projects: projectList});
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
      const project = await getProjects(req.params.id);
      res.render('projects/single', {project: project});
    } catch (e) {
      res.status(404).json({error: e});
    }
  })


  export default router;