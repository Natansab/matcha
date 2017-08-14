/**
 * Models
 */

import crypto from 'crypto';
import mongoose from 'mongoose';
import lo from 'lodash';
import nodemailer from 'nodemailer';
import UserModel from '../../schemas/user';
import { encryptPassword } from './auth';

/**
 * Public
 */

async function register({ username, firstname, lastname, email, password }) {
  let userDoc = await UserModel.findOne({
    $or: [
      { email },
      { username },
    ],
  });

  if (lo.get(userDoc, 'email') === email) throw new Error('E-mail already linked to account');
  if (lo.get(userDoc, 'username') === username) throw new Error('Username not available');

  const hash = encryptPassword(password);

  userDoc = new UserModel({ username, firstname, lastname, email, password: hash });

  const token = crypto.createHash('sha256').update(`${userDoc.email}${Date.now()}`).digest('hex');
  Object.assign(userDoc, { token });

  userDoc.save();

  const user = userDoc;
  delete user.password;

  return user;
}

async function get(userId) {
  const userDoc = await UserModel.findById(userId, 'username firstname lastname bio gender orientation interests');

  if (!userDoc) throw new Error(`User id ${userId} incorrect`);

  return userDoc;
}

async function complete({
  userId, gender, orientation, bio,
  interests, coordinates,
  dob,
}) {
  const userDoc = await UserModel.findById(userId, '-password -token');

  if (!userDoc) throw new Error(`User id ${userId} incorrect`);

  const location = { coordinates };
  Object.assign(userDoc, { gender, orientation, bio, interests, location, dob: new Date(dob) });
  return userDoc.save();
}

async function uploadPic(userId, picPath, profilPic) {
  const userDoc = await UserModel.findById(userId, '-password -token');

  if (!userDoc) throw new Error(`User id ${userId} incorrect`);

  userDoc.pictures.push({ picPath, profilPic });
  return userDoc.save();
}

async function like(userId, relationId) {
  const userDoc = await UserModel.findById(userId, '-password -token');

  if (!userDoc) throw new Error(`User id ${userId} incorrect`);

  if (!userDoc.likes) { userDoc.likes = []; }
  if (userDoc.likes.indexOf(mongoose.Types.ObjectId(relationId)) !== -1) {
    throw new Error(`User ${userId} already liked user ${relationId}`);
  }

  userDoc.likes.push(mongoose.Types.ObjectId(relationId));
  return userDoc.save();
}

async function unlike(userId, relationId) {
  const userDoc = await UserModel.findById(userId, '-password -token');

  if (!userDoc) throw new Error(`User id ${userId} incorrect`);

  if (!userDoc.likes || userDoc.likes.indexOf(mongoose.Types.ObjectId(relationId)) === -1) {
    throw new Error(`User ${userId} does not like user ${relationId}`);
  }

  const index = userDoc.likes.indexOf(mongoose.Types.ObjectId(relationId));

  userDoc.likes.splice(index, 1);
  return userDoc.save();
}

async function report(userId, reportedId) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nsabbah42@gmail.com',
      pass: '*****',
    },
  });

  const mailOptions = {
    from: 'nsabbah42@gmail.com',
    to: 'nsabbah42@gmail.com',
    subject: 'New user reported',
    text: `User ${reportedId} reported by user ${userId}`,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error);
    } else {
      return `Email sent: ${info.response}`;
    }
  });
}


/**
  * Interface
  */

export default {
  register,
  get,
  complete,
  uploadPic,
  like,
  unlike,
  report,
};
