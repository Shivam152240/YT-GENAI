import {generateInterviewReport,getAllInterviewReport,getInterviewReportById} from "../services/interview.api.js"
import {useContext} from "react"
import {useEffect} from "react"
import {generateResumePdf} from "../services/interview.api.js"

import {InterviewContext} from "../interviewContext.js"
export const useInterview = (interviewId) => {
    const context = useContext(InterviewContext)
    if(!context){
        throw new Error("useInterview must be used within InterviewProvider")
    }
    const {loading, setLoading, report, setReport, reports, setReports} = context
    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true)
        try{
        const response = await generateInterviewReport({jobDescription,selfDescription,resumeFile})
        setReport(response.interviewReport)
        return response.interviewReport 
    }catch(err){
        console.log(err)
    }finally{
        setLoading(false)
    }
    }
  
    const getReportById = async(interviewId) => {
        setLoading(true)
        try{
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const getReports = async () =>{
        setLoading(true)    
        try{
           
            const response = await getAllInterviewReport()
          
            setReports(Array.isArray(response.interviewReport) ? response.interviewReport : [])
        }catch(err){
            console.error('Error fetching reports:', err)
           
            setReports([])
        }finally{
            setLoading(false)
        }
    }
    const getResumePdf = async (interviewReportId) =>{
      
        setLoading(true)
        try{
            const response = await generateResumePdf(interviewReportId)
         
            const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url
            link.setAttribute('download', `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }catch(err){
            console.error('Error generating PDF:', err)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        if(interviewId){
            getReportById(interviewId)
        }else{
            getReports()
        }
    }, [interviewId])
   return {loading, report , reports, generateReport, getReportById, getReports, getResumePdf}
}