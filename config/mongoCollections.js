import {dbConnection} from './mongoConnection.js';

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: 
NOTE: YOU WILL NEED TO CHANGE THE CODE BELOW AND UNCOMMENT IT TO HAVE THE COLLECTION(S) REQUIRED BY THE ASSIGNMENT */

//collection for businesses
export const businesses = getCollectionFn('businesses');

//collection for users
export const users = getCollectionFn('users');

//collection for environmental projects
export const projects = getCollectionFn('projects');

//collection for tips and guides
export const TipsGuides = getCollectionFn('TipsGuides');

//collection for forum
export const forum = getCollectionFn('forum');

//collection for products
export const products = getCollectionFn('products');
