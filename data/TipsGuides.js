// This data file should export all functions using the ES6 standard as shown in the lecture code
// import {products} from './mongoCollections.js';
import {TipsGuides} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
//create, read (getAll, get), update, delete (remove)

//---------------------------------------------------- get

export const getTipsGuides = async (TipsGuidesId) => {

  let x = new ObjectId();

    //Error checks ooooooooooooooooooooooo

    if (!TipsGuidesId) throw 'Error: You must provide an id to search for';
    if (typeof TipsGuidesId !== 'string') throw 'Error: Id must be a string';
    if (TipsGuidesId.trim().length === 0) throw 'Error: Id cannot be an empty string or just spaces';
    TipsGuidesId = TipsGuidesId.trim();
    if (!ObjectId.isValid(TipsGuidesId)) throw 'Error: Invalid object ID';

    //end error checks ooooooooooooooooooooooo

  
    const TipsGuidesCollection = await TipsGuides();
    const p = await TipsGuidesCollection.findOne({_id: new ObjectId(TipsGuidesId)});
    if (p === null || !p) throw 'Error: No product with that id';
    p._id = p._id.toString();
    return p;


};

//---------------------------------------------------- getAll


export const getAllTipsGuides = async () => {


  const TipsGuidesCollection = await TipsGuides();
 const TipsGuidesList =  await TipsGuidesCollection.find({}, { projection: { _id: 1, title: 1 } }).toArray();
 
 //Error checks ooooooooooooooooooooooo

 if (!TipsGuidesList) throw 'Error: Could not get all TipsGuides';
 if (TipsGuidesList === undefined || TipsGuidesList === null) {
  return [];
}

//end error checks ooooooooooooooooooooooo
 
return TipsGuidesList;

};

//---------------------------------------------------------- create

export const createTipsGuides = async (
  posterUsername,
  title,
  text
) => {


  //Error checks ooooooooooooooooooooooo

  if (!posterUsername) throw 'Error: Input missing businessName!';
  if (!title) throw 'Error: Input missing type!';
  if (!text) throw 'Error: Input missing address!';

 if (typeof posterUsername !== 'string' || typeof title !== 'string' || typeof text !== 'string') throw 'Error: Given input must be a string!';
 if (posterUsername.trim().length === 0 || title.trim().length === 0 || text.trim().length === 0) throw 'Error: Cannot be empty string!';

//end error checks ooooooooooooooooooooooo


//trim the strings
posterUsername = posterUsername.trim();
title = title.trim();
text = text.trim();

let newTipsGuides = {
    posterUsername: posterUsername,
    title: title,
    text: text,
};

const TipsGuidesCollection = await TipsGuides();
const insertInfo = await TipsGuidesCollection.insertOne(newTipsGuides);
if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw 'Error: Could not add TipsGuides';

const newId = insertInfo.insertedId.toString();

const prod = await getTipsGuides(newId);
return prod;

};

//---------------------------------------------------- remove

export const removeTipsGuides = async (TipsGuidesId) => {

//Error checks ooooooooooooooooooooooo

  if (!TipsGuidesId) throw 'Error: You must provide an ID to search for';
    if (typeof TipsGuidesId !== 'string') throw 'Error: ID must be a string';
    if (TipsGuidesId.trim().length === 0) throw 'Error: ID cannot be an empty string or just spaces';
    TipsGuidesId = TipsGuidesId.trim();
    if (!ObjectId.isValid(TipsGuidesId)) throw 'Error: Invalid object ID';

//end error checks ooooooooooooooooooooooo


    const TipsGuidesCollection = await TipsGuides();
    const deletionInfo = await TipsGuidesCollection.findOneAndDelete({
      _id: new ObjectId(TipsGuidesId)
    });


    if (!deletionInfo) {
      throw `Error: Could not delete tips/ guide with id of ${TipsGuidesId}`;
    }
    return `${deletionInfo.title} has been successfully deleted!`;


};


//---------------------------------------------------- update


export const updateTipsGuides = async (
  TipsGuidesId,
  posterUsername,
  title,
  text
) => {


  //Error checks ooooooooooooooooooooooo

  if (!TipsGuidesId) throw 'Error: You must provide an id to search for';
  if (typeof TipsGuidesId !== 'string') throw 'Error: ID must be a string';
  if (TipsGuidesId.trim().length === 0) throw 'Error: ID cannot be an empty string or just spaces';
  TipsGuidesId = TipsGuidesId.trim();
  if (!ObjectId.isValid(TipsGuidesId)) throw 'Error: Invalid object ID';

  if (!posterUsername) throw 'Error: Input missing posterUsername!';
  if (!title) throw 'Error: Input missing title!';
  if (!text) throw 'Error: Input missing text!';

 if (typeof posterUsername !== 'string' || typeof title !== 'string' || typeof text !== 'string') throw 'Error: Given input must be a string!';
 if (posterUsername.trim().length === 0 || title.trim().length === 0 || text.trim().length === 0) throw 'Error: Cannot be empty string!';

//end error checks ooooooooooooooooooooooo


//trim the strings
TipsGuidesId = TipsGuidesId.trim();
posterUsername = posterUsername.trim();
title = title.trim();
text = text.trim();



const updatedTipsGuides = {
    posterUsername: posterUsername,
    title: title,
    text: text,
};

const TipsGuidesCollection = await TipsGuides();


    const updatedInfo = await TipsGuidesCollection.findOneAndUpdate(
      {_id: new ObjectId(TipsGuidesId)},
      {$set: updatedTipsGuides },
      {returnDocument: 'after'}
    );


    if (!updatedInfo) {
      throw 'Error: Could not update TipsGuides successfully';
    }
    //updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;


};


 //function for updating average rating
 export const updateAvg = async (TipsGuidesId, newAvg) => {
  const TipsGuidesCollection = await TipsGuides();
  await TipsGuidesCollection.updateOne(
    { _id: new ObjectId(TipsGuidesId)},
    { $set: {averageRating: newAvg}}
  );
};