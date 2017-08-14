/**
 * Dependencies
 */

import 'mongoose-type-email';
import mongoose from '../lib/mongoose';

/**
 * Private
 */

const Schema = mongoose.Schema;
const gender = 'male female'.split(' ');
const orientation = 'straight homosexual bisexual'.split(' ');

/**
 * Schema
 */

const UserSchema = new Schema({
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: mongoose.SchemaTypes.Email, required: true },
  token: String,
  dob: Date,
  bio: String,
  interest: Array,
  gender: { type: String, enum: gender },
  orientation: { type: String, enum: orientation, default: 'bisexual' },
  score: { type: Number, default: 0 },
  blocked: Array,
  location: {
    coordinates: Array,
  },
  likes: [],
  pictures: [{
    profilPic: Boolean,
    picPath: String,
    display: { type: Boolean, default: true },
    _id: 0,
  }],
},
);

/**
 * Interface
 */

export default mongoose.model('User', UserSchema);
