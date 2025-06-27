// Import the express router as shown in the lecture code
import {Router} from 'express';
const router = Router();
import {createReview, getReview, removeReview, updateReview, getAllReviews} from '../data/reviews.js';
import {ObjectId} from 'mongodb';
// Note: please do not forget to export the router!

//-------------------------------------------------------------------------------------------------- .get

router
  .route('/:businessId')
  .get(async (req, res) => {
    //code here for GET


       //try getting the post by ID
       try {
        const review1 = await getAllReviews(req.params.businessId);
        return res.json(review1);
      } catch (e) {
        return res.status(400).json({e});
      }
    })


  //-------------------------------------------------------------------------------------------------- .post


  .post(async (req, res) => {
    //code here for POST
    
    const { businessId } = req.params;
    
    try {
      const { title, reviewerName, review, rating } = req.body;
     // const productId = req.params.productId;
     console.log(rating);
      const newestReview = await createReview( businessId, title, reviewerName, review, rating);

       return res.json(newestReview);
     } catch (e) {
       return res.status(400).json(e);
     }
   })


//-------------------------------------------------------------------------------------------------- .get
 

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET


    try {
      const review = await getReview(req.params.reviewId);
      return res.json(review);
    } catch (e) {
        //lecture code and live session says to use .json below, not .send 
      return res.status(400).json(e);
    }
  })


//-------------------------------------------------------------------------------------------------- .patch


  .patch(async (req, res) => {
    //code for PATCH

  

  try{
    const { title, reviewerName, review, rating } = req.body;
    const updateObject = {};

if (title !== undefined) updateObject.title = title;
if (reviewerName !== undefined) updateObject.reviewerName = reviewerName;
if (review !== undefined) updateObject.review = review;
if (rating !== undefined) updateObject.rating = rating;

    const reviewId = req.params.reviewId;


    const updatedReview = await updateReview(reviewId, updateObject);
    return res.json(updatedReview);
   } catch (e) {
    //lecture code and live session says to use .json below, not .send
  return res.status(400).json(e);
}
    })


//-------------------------------------------------------------------------------------------------- .delete


  .delete(async (req, res) => {
    //code here for DELETE


    try {
      let deletedProduct = await removeReview(req.params.reviewId);
      return res.json(deletedProduct);
    } catch (e) {
      return res.status(400).json({error: e});
    }
})


//--------------------------------------------------------------------------------------------------

  export default router;

