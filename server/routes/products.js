const express = require('express');
const { getTopProducts, getTopProducts2, getProductWithVariants, handleProductClick, deleteProduct, getProductsByCategory, addProduct, editProduct, getVariantsByProductId, addVariant, editVariant, getTopWomen, getProductsByCategory2, getAllProducts, getSearchResults, updateProductStatus, deleteVariant, updateVariantStatus, getProductsByCategory3, getVariantByVariantId, editBanners, editBanners1, getBanners, editBanners2, editBanners3 } = require('../controllers/productController');
const upload = require('../config/multer2');
const router = express.Router();










router.post('/top',getTopProducts)
router.post('/all',getAllProducts)
router.get('/top',getTopProducts)

router.post('/topman',getTopProducts2)
router.post('/topwomen',getTopWomen)
router.post('/byid',handleProductClick)
router.post('/delete',deleteProduct)
router.post('/bycat',getProductsByCategory)
router.post('/bycat2',getProductsByCategory2)
router.post('/bycat3',getProductsByCategory3)
router.post('/add',upload.array('images', 5),addProduct)
router.post('/edit',upload.array('images', 5),editProduct)
router.post('/addvariant',upload.array('images', 5),addVariant)
router.post('/deletevariant',deleteVariant)
router.post('/editvariant',upload.array('images', 5),editVariant)
router.post('/allvariants',getVariantsByProductId)
router.post('/getvariantbyid',getVariantByVariantId)
router.post('/search',getSearchResults)
router.post('/updatestatus',updateProductStatus)
router.post('/updatestatusvariant',updateVariantStatus)

router.post('/editbanners1',upload.array('images', 5),editBanners1)
router.post('/editbanners2',upload.array('images', 5),editBanners2)
router.post('/editbanners3',upload.array('images', 5),editBanners3)
router.post('/getbanners',getBanners)





module.exports = router;















