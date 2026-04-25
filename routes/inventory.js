const router = require('express').Router();
const ctrl = require('../controllers/inventoryController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/low-stock',       auth, ctrl.getLowStock);
router.get('/summary',         auth, ctrl.getSummary);
router.patch('/restock/:id',   auth, adminOnly, ctrl.restock);

module.exports = router;