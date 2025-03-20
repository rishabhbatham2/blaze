const express = require('express');
const { submitDesign, getAllDesigns, updatePreselect, getDesignsByUserId, updateSelect, updateWinner, submitDesign2 } = require('../controllers/designCont');
const router = express.Router();
const upload = require('../config/multer');









router.post('/submit', upload.array('images', 5),submitDesign)
router.post('/submit2', upload.array('images', 5),submitDesign2)
router.post('/updatepreselect',updatePreselect)
router.post('/updateselect',updateSelect)
router.post('/updatewinners',updateWinner)
router.post('/byid',getDesignsByUserId)

router.get('/alldesigns',getAllDesigns)









module.exports = router;















