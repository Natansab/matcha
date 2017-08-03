/**
 * Dependencies
 */

import mongooseTypeEmail from 'mongoose-type-email';
import mongoose from '../lib/mongoose';

/**
 * Private
 */

const Schema = mongoose.Schema;

/**
 * Schema
 */

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  bio: String,
  interest: Array,
  email: { type: mongooseTypeEmail, required: true },
  // gender: { type: String, match: /^m$|^w$|^t$/ },
  // orientation: { type: String, match: /^hetero$|^homo$|^bi$/, default: 'bisexual' },
},
);

/**
 * Interface
 */

export default mongoose.model('User', UserSchema);
