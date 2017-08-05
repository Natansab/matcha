/**
 * Dependencies
 */

import 'mongoose-type-email';
import mongoose from '../lib/mongoose';

/**
 * Private
 */

const Schema = mongoose.Schema;
const gender = 'male female trans'.split(' ');
const orientation = 'straight homo bi'.split(' ');

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
  bio: String,
  interest: Array,
  gender: { type: String, enum: gender },
  orientation: { type: String, enum: orientation, default: 'bi' },
  score: Number,
},
);

/**
 * Interface
 */

export default mongoose.model('User', UserSchema);
