
const express = require('express')
const writeArticle = require('../controllers/api/writeArticle')
const verifyToken = require('../middleware/verifyToken')
const generateImage = require('../controllers/api/generateImage')
const resumeReview = require('../controllers/api/resumeReview')
const apiRouter = express.Router()
const multer = require('multer')
const logApiUsage = require('../middleware/logApiUsage')
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    },
});



//middleware
apiRouter.use(verifyToken)

//api routes
apiRouter.post('/write-article', logApiUsage('write-article'), writeArticle)
apiRouter.post('/generate-image', logApiUsage('image-generation'), generateImage)
apiRouter.post('/resume-review', upload.single('resume'), logApiUsage('resume-review'), resumeReview)



module.exports = apiRouter