/**
 * Dependencies
 */

import express from 'express';
import crypto from 'crypto';
import multer from 'multer';
import mime from 'mime';
import gate from './gate';
import search from './search';

/**
 * Private
 */

const router = express.Router();
// const uploadPath = './uploads/';
const storage = multer.diskStorage({
  // if (fs.existsSync(uploadPath)) {}
  destination: (req, file, cb) => { cb(null, './uploads/'); },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, `${raw.toString('hex')}${Date.now()}.${mime.extension(file.mimetype)}`);
    });
  },
});
const upload = multer({ storage });

/**
  * Routes
  */

//  User
router.post('/v1/user', gate.register);
router.post('/v1/user/login', gate.login);
router.get('/v1/user/:id', gate.checkpoint, gate.getUser);
router.post('/v1/user/:id/complete', gate.checkpoint, gate.completeProfile);
router.post('/v1/user/:id/uploadpicture', gate.checkpoint, upload.single('picture'), gate.uploadPic);
router.post('/v1/user/:id/like', gate.checkpoint, gate.like);
router.post('/v1/user/:id/unlike', gate.checkpoint, gate.unlike);
router.get('/v1/user/:id/report', gate.checkpoint, gate.report);
router.get('/v1/user/:id/block', gate.checkpoint, gate.block);

// Search
router.post('/v1/user/:id/search', gate.checkpoint, search.filteredSearch);

/**
 * Interface
 */

export default router;
