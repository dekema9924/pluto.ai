
const express = require('express')
const writeArticle = require('../controllers/api/writeArticle')
const verifyToken = require('../middleware/verifyToken')
const generateImage = require('../controllers/api/generateImage')
const resumeReview = require('../controllers/api/resumeReview')
const apiRouter = express.Router()
const multer = require('multer')
// const limitFeatureUsage = require('../middleware/limitFeatureUsage')
const logApiUsage = require('../middleware/logApiUsage')
const limitUsage = require('../middleware/limitUsage')
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
// apiRouter.use(limitUsage)


//api routes
apiRouter.post('/write-article', limitUsage('write-article'), logApiUsage('write-article'), writeArticle)
apiRouter.post('/generate-image', limitUsage('image-generation'), logApiUsage('image-generation'), generateImage)
apiRouter.post('/resume-review', upload.single('resume'), limitUsage('resume-review'), logApiUsage('resume-review'), resumeReview)

// apiRouter.get('/api-usage')


module.exports = apiRouter