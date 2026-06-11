import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : 'https://yt-genai-1.onrender.com'),
    withCredentials: true
})
/**
 * @description sevices to generate interview report based on self description, job description and resume file
 */

export const generateInterviewReport = async ({ selfDescription, jobDescription, resumeFile }) => {
    const formData = new FormData();
    formData.append('selfDescription', selfDescription);
    formData.append('jobDescription', jobDescription);
    formData.append('resume', resumeFile);

    const response = await api.post('api/interview/generate-report', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data;
}
/**
 * @description sevices to get interview report by id
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`);

    return response.data
}
/**
 * @description sevices to get all interview report
 */
export const getAllInterviewReport = async () => {
    const response = await api.get(`/api/interview/`)
    return response.data
}
/**
 * @description sevices to generate pdf from interview report
 */
export const generateResumePdf = async (interviewId) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewId}`, {}, {

        responseType: "blob"
    })
    return response.data
}
