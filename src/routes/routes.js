const router = require('express').Router();
const { createClg } = require('../controller/collegeCntrl');
const { createIntern, getIntern } = require('../controller/internCntrl');


// router.get('/test' , (req, res) => {
//     res.send('Hello World')
// })
//============================== college API =============================
router.post('/colleges', createClg)

// ================================ intern API =============================
router.post('/interns', createIntern)

router.get('/collegeDetails', getIntern)


module.exports = router;