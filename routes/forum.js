// Import the express router as shown in the lecture code
import {Router} from 'express';
const router = Router();
import {createForum, getForum, removeForum, updateForum, getAllForum} from '../data/forum.js';
// Note: please do not forget to export the router!

//our function options from data/products are.. create, getAll, get, update, and remove

//router.route('/').get(async (req, res) => {...                  corresponds to the **getALL** function from data/products.js
//.post(async (req, res) => {...                                  corresponds to the **create** function from in data/products.js
//router.route('/:productId').get(async (req, res) => {...        corresponds to the **get** function from data/products.js
//.delete(async (req, res) => {...                                corresponds to the **remove** function from data/products.js
//.put(async (req, res) => {...                                   corresponds to the **update** function from data/products.js

//-------------------------------------------------------------------------------------------------- .get

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
   

    try {
      
      const correctFormat = await getAllForum();
     
     
      return res.json(correctFormat);
    } catch (e) {
      return res.status(400).json(e);
    }
  })

  //-------------------------------------------------------------------------------------------------- .post

  .post(async (req, res) => {
    //code here for POST


    //insert the post
    try {
      const { userId, text } = req.body;/////////////////////////////////
      const newProducts = await createForum(userId, text);
      return res.json(newProducts);
    } catch (e) {
      return res.status(400).json(e);
    }
  });


//-------------------------------------------------------------------------------------------------- .get


router
  .route('/:forumId')
  .get(async (req, res) => {



    try {
      const prod = await getForum(req.params.forumId);
      return res.json(prod);
    } catch (e) {
        //lecture code and live session says to use .json below, not .send 
      return res.status(400).json(e);
    }
  })


//-------------------------------------------------------------------------------------------------- .delete


  .delete(async (req, res) => {
    //code here for DELETE



    //try to delete product
    try {
      await removeForum(req.params.forumId);
      return res.json({ "_id": req.params.forumId, "deleted": true});
    } catch (e) {
      return res.status(400).json(e);
    }

  })

  //-------------------------------------------------------------------------------------------------- .put

  .put(async (req, res) => {
 


    try {
      const productInfo = req.body;
      
      
      const updatedProd = await updateForum(
        req.params.forumId, 
        productInfo.userId, 
        productInfo.text, 
        );

     
      return res.json(updatedProd);
    } catch (e) {
      return res.status(400).json(e);
    }
  });

  

//--------------------------------------------------------------------------------------------------

  export default router;