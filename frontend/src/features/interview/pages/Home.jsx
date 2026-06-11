import React, { useState,useRef, useEffect } from "react";
import "../style/home.scss";
import { useInterview } from "../Hooks/useInterview";
import { useNavigate } from "react-router";
import { useAuth} from "../../auth/hooks/useAuth";


const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
  const { user } = useAuth();
const {loading, generateReport, reports, getReports} = useInterview()
const [jobDescription, setJobDescription] = useState("")
const [selfDescription, setSelfDescription] = useState("")
const resumeInputRef = useRef()

// Fetch reports on component mount
useEffect(() => {
  getReports()
}, [])

const handleGenerateReport = async () =>{

  const resumeFile = resumeInputRef.current.files[0]
  const data =   await generateReport({jobDescription,selfDescription,resumeFile})

if(data?._id){
   getReports() // Refresh reports list
   navigate(`/interview/${data._id}`)
}

}
if(loading){
  return(
    <main className="load-screen">
      <h1>loading your interview plane</h1>

    </main>
  )
}

  return (

    <main className="home">
      <div className="home-wrapper">
        {/* LEFT SIDEBAR */}
               {sidebarOpen && (
  <div
    className="sidebar-overlay"
    onClick={() => setSidebarOpen(false)}
  />
)}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

          <div className="sidebar-close">
           <button onClick={() => setSidebarOpen(false)}>
              ✕
            </button>
</div>
   

          <div className="sidebar-header">
            <h2>Your Reports</h2>
            <span className="report-count">{reports?.length || 0}</span>
          </div>
          
          <div className="reports-list">
            {!reports || reports.length === 0 ? (
              <div className="no-reports">
                <p>No interview reports yet</p>
              </div>
            ) : (
              reports.map((report) => (
                <div
                  key={report._id}
                  className="report-card"
                  onClick={() => {
  navigate(`/interview/${report._id}`);
  setSidebarOpen(false);
}}
                >
                  <div className="report-title">{report.title || "Untitled Position"}</div>
                  <div className="report-date">
                    {report.generatedAt?.split('T')[0] || "2024-06-15"}
                  </div>
                </div>
              ))
            )}
          </div>
           {/*your profile  */}
           <div className="profile-section" onClick={() => navigate(`/profile/${user?.userId}`)}>
         {/* circle add karna hai profile name se phle se jisme name aur sirname ka phla latter ho   */}

          <div className="profile-circle">
            <span className="user-icon">{user?.username?.charAt(0)  || "U"}</span>
          </div>
            <h3>{user?.username || "Your Name"}</h3>
         
            
          </div>


        </aside>

        {/* MAIN CONTENT */}
        <div className="main-content">
        <button
  className="mobile-menu-btn"
  onClick={() => setSidebarOpen(true)}
>
  ☰
</button>

          <header className="header">
            <h1>
              Create Your Custom <span>Interview Plan</span>
            </h1>
            <p>
              Let our AI analyze the job requirements and your unique profile to
              build a winning strategy.
            </p>
          </header>

          <div className="interview-container">
        <div className="card-body">

          {/* LEFT */}
          <div className="left-col">
            <div className="section-header">
              <h2 className="job-title">Target Job Description</h2>
              <span className="badge required">Required</span>
            </div>

            <div className="textarea-wrapper">
              <textarea
                onChange={(e)=>{setJobDescription(e.target.value)}}
                placeholder="Paste the full job description here...
e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              />
              <span className="char-count">0 / 5000 chars</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right-col">
            <h2 className="profile-title">Your Profile</h2>
            <div className="input-field">
              <div className="section-header">
                <h3 className="upload-resume">Upload Resume</h3>
                <span className="badge best">Best Results</span>
              </div>
              <label className="upload-area">
                <input ref={resumeInputRef} hidden type="file" />
                <div className="upload-content">
                  <div className="upload-icon">⬆️</div>
                  <p className="upload-text">Click to upload or drag & drop</p>
                  <small className="upload-small">PDF or DOCX (Max 5MB)</small>
                </div>
              </label>
            </div>
            <div className="divider"><span>OR</span></div>
            <div className="input-field">
              <h3>Quick Self-Description</h3>
              <textarea onChange={(e)=> {setSelfDescription(e.target.value)}} rows="5" placeholder="Briefly describe your experience..." />
            </div>
            <div className="info-box">
              Either a <strong>Resume</strong> or <strong>Self Description</strong> is required.
            </div>
          </div>
        </div>

        <div className="card-footer">
          <span>AI-Powered Strategy Generation • Approx 30s</span>
          <button onClick={handleGenerateReport} className="generate-btn"> 
            ⭐ Generate My Interview Strategy
          </button>
        </div>
      </div>
        </div>
      </div>
    </main>
  );
  // show recent reports list 



};

export default Home;