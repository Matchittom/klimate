// import businessRoutes from './businesses.js';
// import userRoutes from './users.js';


import businessRoutes from './businesses.js';
import reviewsRoutes from './reviews.js';
import userRoutes from './users.js';
import projectsRoutes from './projects.js';
import TipsGuidesRoutes from './TipsGuides.js';
import forumRoutes from './forum.js';
import productsRoutes from './products.js';
import productReviewsRoutes from './productReviews.js';
import calculatorRoutes from './calculator.js';


import path from 'path';
import {static as staticDir} from 'express';

const constructorMethod = (app) => {
  app.use('/businesses', businessRoutes);
  app.use('/users', userRoutes);
  //app.get('/about', (req, res);
  app.use('/reviews', reviewsRoutes);
  app.use('/projects', projectsRoutes);
  app.use('/TipsGuides', TipsGuidesRoutes);
  app.use('/forum', forumRoutes);
  app.use('/products', productsRoutes);
  app.use('/productReviews', productReviewsRoutes); 
  app.use('/calculator', calculatorRoutes);
  app.use('/public', staticDir('public'));

  //uncomment
// app.get('/', (req, res) => {
//   res.render('welcome')
// });

  app.use('*', (req, res) => {
    // res.redirect('/businesses');
    res.redirect('/welcome');
  });
};

export default constructorMethod;