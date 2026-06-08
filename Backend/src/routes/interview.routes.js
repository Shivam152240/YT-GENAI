const express = require('express')

const authMiddleware = require('../middlewares/auth.middleware')
const interviewRouter = express.Router()
const interviewController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware')
/**
 * @route PSOT api/interview
 * @description generate the new interview report on the  basis of user self description , resume,pdf and job description
 * @access Private
*/

interviewRouter.post('/generate-report', authMiddleware.authUser,upload.single("resume"),interviewController.interviewReportController)

/**
 * @route GET api/interview/report/invertiewId
 * @description get interview report by intvertiewId.
 * @access Private
 */
interviewRouter.get('/report/:interviewId',authMiddleware.authUser,interviewController.getInterviewReportByIdController)

/**
 * @route GET api/interview/
 * @description get all interview reports of logged in user.
 * @access Private
 */
interviewRouter.get('/', authMiddleware.authUser, interviewController.getAllInterviewReportController)

/**
 * @route GET api/interview/resume/pdf/:interviewReportId
 * @description download the resume in pdf format.
 * @access Private
 */
interviewRouter.post('/resume/pdf/:interviewReportId', authMiddleware.authUser, interviewController.generateReportPdfController)

module.exports = interviewRouter