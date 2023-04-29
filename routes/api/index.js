const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Other route imports here

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
// Other router.use() here

module.exports = router;

