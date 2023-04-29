const router = require('express').Router();
const UserNameRoutes = require('./userRoutes');
const ThoughtsRoutes = require('./thoughtsRoutes');
const EmailRoutes = require('./emailRoutes');
const FriendRoutes = require('friendRoutes');


router.use('./userNameRoutes', UserNameRoutes);
router.use('./thoughtsRoutes', ThoughtsRoutes);
router.use('./emailRoutes', EmailRoutes);
router.use('friendRoutes', FriendRoutes);

module.exports = router;
