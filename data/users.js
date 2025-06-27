// This data file should export all functions using the ES6 standard as shown in the lecture code
// import {products} from './mongoCollections.js';
import {users} from '../config/mongoCollections.js';

//import mongo collections, bcrypt and implement the following data functions
//import {users} from '../config/mongoCollections.js';
//import { getCollectionFn } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import bcrypt from 'bcrypt';


//---------------------------------------------------- get

export const getUserById = async (userId) => {
  let x = new ObjectId();
    //Error checks ooooooooooooooooooooooo
    if (!userId) throw 'Error: You must provide an id to search for';
    if (typeof userId !== 'string') throw 'Error: Id must be a string';
    if (userId.trim().length === 0) throw 'Error: Id cannot be an empty string or just spaces';
    userId = userId.trim();
    if (!ObjectId.isValid(userId)) throw 'Error: Invalid object ID';
    //end error checks ooooooooooooooooooooooo
    const usersCollection = await users();
    const p = await usersCollection.findOne({_id: new ObjectId(userId)});
    if (p === null || !p) throw 'Error: No user with that id';
    p._id = p._id.toString();
    return p;
};

export const getUserByUsername = async (username) => {
    const usersCollection = await users();
    return await usersCollection.findOne({username});
};

//---------------------------------------------------- getAll


export const getAllUsers = async () => {


  const usersCollection = await users();
 const usersList =  await usersCollection.find({}, { projection: { _id: 1, username: 1 } }).toArray();
 
 //Error checks ooooooooooooooooooooooo

 if (!usersList) throw 'Error: Could not get all users';
 if (usersList === undefined || usersList === null) {
  return [];
}

//end error checks ooooooooooooooooooooooo
 
return usersList;

};

//---------------------------------------------------------- create

export const createUsers = async ({
  firstName,
  lastName,
  email,
  username,
  password,
  age,
  //dateJoined,
  carbonFootprint
}) => {


  //Error checks ooooooooooooooooooooooo

//   if (!firstName) throw 'Error: Input missing firstName!';
//   if (!lastName) throw 'Error: Input missing lastName!';
//   if (!email) throw 'Error: Input missing email!';
//   if (!username) throw 'Error: Input missing username!';
//   if (!age) throw 'Error: Input missing age!';
//   //if (!dateJoined) throw 'Error: Input missing dateJoined!';
//   if (!carbonFootprint) throw 'Error: Input missing carbonFootprint!';

//  if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof username !== 'string' /*|| typeof dateJoined !== 'string'*/) throw 'Error: Given input incorrect type!';
//  if (firstName.trim().length === 0 || lastName.trim().length === 0 || email.trim().length === 0 || username.trim().length === 0 /*|| dateJoined.trim().length === 0*/) throw 'Error: Cannot be empty string!';

//  if (typeof age !== 'number') throw 'Error: age must be a number';
//  if (typeof carbonFootprint !== 'number') throw 'Error: carbon footprint must be a number';

 //we must make the date in mm/dd/yyyy format (2 for month, 2 for day, 4 for year) using padding
 const nowDate = new Date();
 const m = (nowDate.getMonth() + 1).toString().padStart(2, '0');
 const d = nowDate.getDate().toString().padStart(2, '0');
 const y = nowDate.getFullYear();
 const dateJoined = `${m}/${d}/${y}`;

//end error checks ooooooooooooooooooooooo


// //trim the strings
// firstName = firstName.trim();
// lastName = lastName.trim();
// email = email.trim();
// username = username.trim();
// //dateJoined = dateJoined.trim();

let newUsers = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  username: username,
  password,
  age: age,
  dateJoined: dateJoined,
  carbonFootprint: carbonFootprint,
//For create: When a product is created, in your DB function, you will initialize the reviews array to be an empty array. You will also initialize averageRating to be 0 when a product is created.
reviews: [],
favoriteBusinesses: []
};

const usersCollection = await users();
const insertInfo = await usersCollection.insertOne(newUsers);
if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw 'Error: Could not add user';

const newId = insertInfo.insertedId.toString();

const prod = await getUserById(newId);
return prod;

};

//---------------------------------------------------- remove

export const removeUsers = async (userId) => {

//Error checks ooooooooooooooooooooooo

  if (!userId) throw 'Error: You must provide an ID to search for';
    if (typeof userId !== 'string') throw 'Error: ID must be a string';
    if (userId.trim().length === 0) throw 'Error: ID cannot be an empty string or just spaces';
    userId = userId.trim();
    if (!ObjectId.isValid(userId)) throw 'Error: Invalid object ID';

//end error checks ooooooooooooooooooooooo


    const usersCollection = await users();
    const deletionInfo = await usersCollection.findOneAndDelete({
      _id: new ObjectId(userId)
    });


    if (!deletionInfo) {
      throw `Error: Could not delete user with id of ${userId}`;
    }
    return `${deletionInfo.username} has been successfully deleted!`;


};


//---------------------------------------------------- update


export const updateUsers = async (
  userId,
  firstName,
  lastName,
  email,
  username,
  age,
  //dateJoined,
  carbonFootprint,
) => {


  //Error checks ooooooooooooooooooooooo

  if (!firstName) throw 'Error: Input missing firstName!';
  if (!lastName) throw 'Error: Input missing lastName!';
  if (!email) throw 'Error: Input missing email!';
  if (!username) throw 'Error: Input missing username!';
  if (!age) throw 'Error: Input missing age!';
  //if (!dateJoined) throw 'Error: Input missing dateJoined!';
  if (!carbonFootprint) throw 'Error: Input missing carbonFootprint!';

 if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof username !== 'string' /*|| typeof dateJoined !== 'string'*/) throw 'Error: Given input must be a string!';
 if (firstName.trim().length === 0 || lastName.trim().length === 0 || email.trim().length === 0 || username.trim().length === 0 /*|| dateJoined.trim().length === 0*/) throw 'Error: Cannot be empty string!';

 if (typeof age !== 'number') throw 'Error: age must be a number';
 if (typeof carbonFootprint !== 'number') throw 'Error: carbon footprint must be a number';

 //we must make the date in mm/dd/yyyy format (2 for month, 2 for day, 4 for year) using padding
 const nowDate = new Date();
 const m = (nowDate.getMonth() + 1).toString().padStart(2, '0');
 const d = nowDate.getDate().toString().padStart(2, '0');
 const y = nowDate.getFullYear();
 const dateJoined = `${m}/${d}/${y}`;

//end error checks ooooooooooooooooooooooo


//trim the strings
userId = userId.trim();
firstName = firstName.trim();
lastName = lastName.trim();
email = email.trim();
username = username.trim();
//dateJoined = dateJoined.trim();



const updatedUsers = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    age: age,
    dateJoined: dateJoined,
    carbonFootprint: carbonFootprint
};

const usersCollection = await users();


    const updatedInfo = await usersCollection.findOneAndUpdate(
      {_id: new ObjectId(userId)},
      {$set: updatedUsers },
      {returnDocument: 'after'}
    );


    if (!updatedInfo) {
      throw 'Error: Could not update users successfully';
    }
    //updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;


};


 //function for updating average rating
 export const updateAvg = async (userId, newAvg) => {
  const usersCollection = await users();
  await usersCollection.updateOne(
    { _id: new ObjectId(userId)},
    { $set: {averageRating: newAvg}}
  );
};


//You will have one data module in your data folder named: users.js that will only export two functions:

const usersCollection = await users();


export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {

//0000000000000000000000
//Error checks
const valid = /^[a-zA-Z]/;

if (!firstName || !lastName || !emailAddress || !password || !role) throw 'Error: Missing fields!';
if (typeof firstName !== 'string' || !valid || firstName.length < 2 || firstName.length > 25) throw 'Error: incorrect input for firstName';
if (typeof lastName !== 'string' || !valid || lastName.length < 2 || lastName.length > 25) throw 'Error: incorrect input for lastName';
//for emailAddress, non-whitespace/ contains @/ contains ./ more non-whitespace 
if (!/^\S+@\S+\.\S+$/.test(emailAddress)) throw 'Error: invalid email address!';
//for password (uppercase(A-Z), lowercase(a-z), num(d) and non-word char(W))
if (password.length < 8 || !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)/.test(password)) throw 'Error: Password incorrect format! Must be 8 char long, one upper, one lower, one num and one char';
//make sure user email is not already in use
const already = await usersCollection.findOne({ emailAddress: emailAddress.toLowerCase() });
if (already) throw 'Error: A user with that email already exists!';
//role is either admin or user, that's it
if (role.toLowerCase() !== 'admin' && role.toLowerCase() !== 'user') throw 'Error: Only valid values for role are admin and user';

//0000000000000000000000

const hashPass = await bcrypt.hash(password, 10);

//insert user into our database
await usersCollection.insertOne ({
  firstName,
  lastName,
  emailAddress: emailAddress.toLowerCase(),
  password: hashPass,
  role: role.toLowerCase()
});

return { insertedUser: true };

};

//-------------------------------------------------------------------------------

export const loginUser = async (emailAddress, password) => {

//0000000000000000000000
//Error checks

if (!emailAddress || !password) throw 'Error: Missing fields!';
//for emailAddress
if (!/^\S+@\S+\.\S+$/.test(emailAddress)) throw 'Error: Invalid email address!';
//for password
if (password.length < 8 || !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)/.test(password)) throw 'Error: Invalid password!';

//0000000000000000000000
console.log("Attempting to login with email", emailAddress);
const user = await usersCollection.findOne({ emailAddress: emailAddress.toLowerCase() } );
console.log("User found:", user);
if (!user) throw 'Error: Email of password invalid!';

const passMatching = await bcrypt.compare(password, user.password);
if (!passMatching) throw 'Error: Either the email address or password is invalid';


return {
  firstName: user.firstName,
  lastName: user.lastName,
  emailAddress: user.emailAddress,
  role: user.role
};

};
