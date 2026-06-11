import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import "../style/interview.scss";
import { useParams } from "react-router";
import { useInterview } from "../Hooks/useInterview";
import { useNavigate } from "react-router-dom";


/* QUESTION CARD */
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`question-card ${open ? "open" : ""}`}>
      
      {/* TOP */}
      <div className="card-top">

        <div className="q-title">
          <span className="q-badge">
            Q{index + 1}
          </span>

          {item.q || item.question}
        </div>

        <button
          className="toggle-btn"
          onClick={() => setOpen(!open)}
        >
          {open ? "▲" : "▼"}
        </button>

      </div>

      {/* BODY */}
      {open && (
        <div className="card-body">

          <div className="tag purple">
            INTENTION
          </div>

          <p className="p">{item.intention}</p>

          <div className="tag green">
            MODEL ANSWER
          </div>

          <p className="p">{item.answer || item.model}</p>

        </div>
      )}
    </div>
  );
};

const Interview = () => {
  const navigate = useNavigate();
const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] =
    useState("Technical Questions");

  const contentRef = useRef(null);

  const { interviewId } = useParams();

  const { report, loading, getReportById, getResumePdf } =
    useInterview();

  useEffect(() => {
    getReportById(interviewId);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeSection]);

  const sectionsData = {
    "Technical Questions":
      report?.technicalQuestion || [],

    "Behavioral Questions":
      report?.behavioralQuestion || [],

    "Preparation Road Map":
      report?.preparationPlan || [],
  };

  const sectionIcons = {
    "Technical Questions": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    "Behavioral Questions": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    "Preparation Road Map": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  };

  const sections = [
    "Technical Questions",
    "Behavioral Questions",
    "Preparation Road Map",
  ];

  return (
    <div className="interview">
    

      {/* SIDEBAR */}
      <aside className="sidebar">
  {/* back arrow to home page  */}
      <div className="back-arrow">
              
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 10L12 3L21 10V21H3V10Z"/>
  </svg>
      <span className="h" onClick={() => navigate("/")}>Home</span>


      </div>
        <h4 className="sidebar-title">
          SECTIONS
        </h4>

        {sections.map((section) => (
          <div
            key={section}
            className={`menu-item ${
              activeSection === section
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveSection(section)
            }
          >
            <span className="menu-icon">
              {sectionIcons[section]}
            </span>
            {section}
          </div>
        ))}
        <div className="nav-content">
        <button 
          onClick={()=>getResumePdf(interviewId)}
          className="button primary-button"
          disabled={loading}
          style={{opacity: loading ? 0.6 : 1}}
        >
          {loading ? (
            <>
              <svg height={20} style={{"marginRight":"0.5rem", display: "inline-block", animation: "spin 1s linear infinite"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="15.7 47.1" strokeDashoffset="0"></circle></svg>
              Downloading...
            </>
          ) : (
            <>
              <svg height={20} style={{"marginRight":"0.2rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
              Download Resume
            </>
          )}
        </button>
        </div>  
      </aside>

      {/* MAIN CONTENT */}
      <main
        className="content"
        ref={contentRef}
      >

        {/* HEADER */}
       <div className="content-header">
  <h2>{activeSection}</h2>

  <div className="header-menu">
    <button
      className="menu-btn"
      onClick={() => setShowMenu(!showMenu)}
    >
      ⋮
    </button>

    {showMenu && (
      <div className="dropdown-menu">
        <button
          onClick={() => {
            getResumePdf(interviewId);
            setShowMenu(false);
          }}
        >
          📄 Download Resume
        </button>
      </div>
    )}
  </div>
</div>

        <div className="hr"></div>

        {/* ROADMAP */}
        {activeSection ===
        "Preparation Road Map" ? (

          <div className="roadmap-wrapper">

            {sectionsData[
              activeSection
            ].map((item, index) => (

              <div
                className="roadmap-item"
                key={index}
              >

                <div className="timeline">

                  <div className="dot"></div>

                  {index !==
                    sectionsData[
                      activeSection
                    ].length -
                      1 && (
                    <div className="line"></div>
                  )}

                </div>

                <div className="roadmap-content">

                  <div className="day-badge">
                    Day {index + 1}
                  </div>

                  <h3>
                    {item.focus || item.q}
                  </h3>

                  <ul>
                    {(item.tasks || []).map(
                      (task, i) => (
                        <li key={i}>
                          {task}
                        </li>
                      )
                    )}
                  </ul>

                </div>

              </div>
            ))}

          </div>

        ) : (

          <div className="cards-wrapper">

            {sectionsData[
              activeSection
            ].map((item, index) => (
              
              <QuestionCard
                item={item}
                index={index}
                key={index}
              />

            ))}

          </div>
        )}
      </main>

      {/* RIGHT PANEL */}
      <aside className="right-panel">

        <div className="score-card">

          <h4>MATCH SCORE</h4>

          <div className="circle">
            <span>{report?.matchScore || 88}%</span>
          </div>

          <p className="good">
            Strong match for this role
          </p>

        </div>

        <div className="skills">

          <h4>SKILL GAPS</h4>

          {report?.skillGap && report.skillGap.length > 0 ? (
            report.skillGap.map((gap, index) => (
              <span 
                key={index}
                className={`chip ${gap.severity || 'medium'}`}
              >
                {gap.skill}
              </span>
            ))
          ) : (
            <span className="chip gray">No skill gaps identified</span>
          )}

        </div>

      </aside>
    </div>
  );
};

export default Interview;