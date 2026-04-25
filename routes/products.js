const router = require('express').Router();
const ctrl = require('../controllers/productController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/',               auth, ctrl.getProducts);
router.get('/stats/summary',  auth, adminOnly, ctrl.getStats);
router.get('/:id',            auth, ctrl.getProduct);
router.post('/',              auth, adminOnly, ctrl.createProduct);
router.put('/:id',            auth, adminOnly, ctrl.updateProduct);
router.delete('/:id',         auth, adminOnly, ctrl.deleteProduct);

module.exports = router;