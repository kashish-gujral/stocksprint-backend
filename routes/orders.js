const router = require('express').Router();
const ctrl = require('../controllers/orderController');
const { auth, adminOnly } = require('../middleware/auth');

router.post('/',                  auth, ctrl.placeOrder);
router.get('/',                   auth, ctrl.getOrders);
router.patch('/:id/status',       auth, ctrl.updateStatus);
router.get('/stats/revenue',      auth, adminOnly, ctrl.getRevenue);

module.exports = router;