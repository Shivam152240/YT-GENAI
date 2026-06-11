const pdfParse = require('pdf-parse')
const path = require('path')
const {generateInterviewReport, generateResumePdf} = require('../services/ai.service')
const interviewModelReport = require('../models/interviewReport.model')
/**
 * @description controller to generate the interview report based on description, resume and job description
 */
async function interviewReportController(req, res){
const standardFontDataUrl = path.join(__dirname, "../../node_modules/pdfjs-dist/standard_fonts/").replace(/\\/g, "/") + "/";
const parser = new pdfParse.PDFParse({ 
    data: req.file.buffer, 
    standardFontDataUrl 
});
const resumeContent = await parser.getText();
const {selfDescription, jobDescription} = req.body
const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription
})

const interviewReport = await interviewModelReport.create({
    user : req.user.id,
    resume :resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi

})
res.status(200).json({
    message: 'interview report generate successfully',
    interviewReport
})
}
/**
 * @description controller to get interview report be interviewId
 */
async function getInterviewReportByIdController(req, res) {
    const {interviewId} = req.params
    const interviewReport = await interviewModelReport.findOne({_id:interviewId, user:req.user.id})
    if(!interviewReport){
        return res.status(404).json({
            message:'interviewReport not found'
        })
    }
    return res.status(200).json({
        message:'interview Report fetched successfully',
        interviewReport
    })
}
/**
 * @description controller to get all interview reports of logged in user
 */
async function getAllInterviewReportController(req, res){
    const interviewReports =  await interviewModelReport.find({user : req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestion -behavioralQuestion -skillGap -preparationPlan")
    res.status(200).json({
        message: 'interview reports fetched successfully',
        interviewReport: interviewReports
    })
}

/**
 * @description controller to download the interview report in pdf format
 */
async function generateReportPdfController(req, res){
    try {
        const {interviewReportId} = req.params
     
        const interviewReport = await interviewModelReport.findOne({_id: interviewReportId, user: req.user.id})
    
        if(!interviewReport){
            return res.status(404).json({
                message : "Interview report not found"
            })
        }
        
        const {resume, selfDescription, jobDescription} = interviewReport
        const pdfBuffer = await generateResumePdf({resume, selfDescription, jobDescription})
        
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
        });
        res.send(pdfBuffer);
    } catch(err) {
        console.error('PDF Controller Error:', err.message)
        return res.status(500).json({
            message: "Error generating PDF",
            error: err.message
        })
    }
}


module.exports = {interviewReportController, getInterviewReportByIdController,getAllInterviewReportController,generateReportPdfController}