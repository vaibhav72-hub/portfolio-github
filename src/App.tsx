import React, { useState, useEffect } from 'react';
import { 
  Download, ArrowRight, ExternalLink, Mail, MapPin, 
  Phone, Award, Code, Database, LineChart, Cpu, Terminal
} from 'lucide-react';
import './index.css';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

// --- Data ---
const SKILLS = [
  {
    category: "Core Programming",
    icon: <Code className="w-6 h-6 mb-4 text-[#06B6D4]" />,
    items: ["Python", "R", "C++", "JavaScript"]
  },
  {
    category: "Data Engineering",
    icon: <Database className="w-6 h-6 mb-4 text-[#06B6D4]" />,
    items: ["MySQL", "REST APIs", "ETL Automation", "Geospatial Data"]
  },
  {
    category: "BI & Analytics",
    icon: <LineChart className="w-6 h-6 mb-4 text-[#06B6D4]" />,
    items: ["Power BI", "DAX", "Qlik Sense", "Advanced Excel"]
  },
  {
    category: "AI, ML & GenAI",
    icon: <Cpu className="w-6 h-6 mb-4 text-[#06B6D4]" />,
    items: ["Scikit-Learn", "TensorFlow", "Hugging Face", "LLMs", "NLP"]
  },
  {
    category: "Developer Tools",
    icon: <Terminal className="w-6 h-6 mb-4 text-[#06B6D4]" />,
    items: ["VS Code", "Jupyter", "Git/GitHub", "Anaconda"]
  }
];

const PROJECTS = [
  {
    title: "Deaf-Mute Language Translator Using Machine Learning",
    problem: "Real-time two-way sign-to-speech/text translation system.",
    stack: ["Python", "OpenCV", "Deep Learning", "Audio Transcription"],
    deliverables: [
      "Bridges communication barriers by converting real-time video gestures into speech and text streams."
    ],
    githubUrl: "https://github.com/vaibhav72-hub/Deaf-Mute-Language-Translator-Using-Machine-Learning-",
    liveUrl: "#"
  },
  {
    title: "Stock Market Analytics & Trend Visualizer",
    problem: "Interactive financial intelligence suite for multi-asset market analysis.",
    stack: ["Power BI", "DAX", "Dynamic Time Intelligence"],
    deliverables: [
      "Candlestick charts, custom indicators, and dynamic risk/return KPI tracking."
    ],
    githubUrl: "https://github.com/vaibhav72-hub/Stock-market-visualization.git",
    liveUrl: "https://docs.google.com/videos/d/1839sHttZkKYNBbr4zWHYiQgyP4SiFF-i5-nXZq9brTY/play?usp=sharing"
  },
  {
    title: "AI-Enhanced Intrusion Detection System",
    problem: "Advanced threat detection system using Artificial Intelligence to identify network intrusions.",
    stack: ["Python", "Machine Learning", "Cybersecurity", "AI"],
    deliverables: [
      "Improves network security through AI-driven anomaly detection and intelligent threat monitoring."
    ],
    githubUrl: "https://github.com/vaibhav72-hub/AI-Enhanced-Intrusion-Detection-System-main",
    liveUrl: "https://drive.google.com/file/d/1KlyNJ3lcaGRObGtk4BoqAS_iylgCqpFh/view?usp=sharing"
  }
];

const CERTS = [
  { title: "SmartBridge & Google for Developers: Artificial Intelligence", link: "/SmartBridge_Certificate.html" },
  { title: "SmartBridge & Google for Developers: Cloud Practitioner", link: "/SmartBridge_CP_Certificate.html" },
  { title: "SmartBridge & Google for Developers: Cyber Security Analyst", link: "/SmartBridge_CS_Certificate.html" },
  { title: "MeitY: Essentials of Solution Development in IT (NSQF Level 5)", link: "/MeitY_Certificate.html" },
  { title: "IBM SkillsBuild: Introduction to Generative AI", link: "/IBM_Certificate.html" },
  { title: "Disha Computer Institute: Certificate Course in C & C++", link: "/Disha_Certificate.html" }
];

// --- Components ---
const SectionWrapper = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => (
  <section id={id} className={`section ${className}`}>
    <div className="container">
      {children}
    </div>
  </section>
);

export default function App() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      (el as HTMLElement).style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '4f35a6eb-9fe4-4dd1-b772-9d7127d316a2',
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  const handleDownloadResume = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const fileUrl = `${import.meta.env.BASE_URL}resume.pdf`;
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Vaibhav_Pernole_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed, falling back to opening in new tab", error);
      window.open(`${import.meta.env.BASE_URL}resume.pdf`, '_blank');
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav>
        <div className="container nav-content">
          <a href="#" className="logo" style={{ color: "var(--text-primary)", fontWeight: "bold", fontSize: "1.2rem" }}>
            Vaibhav Pernole <span style={{ color: "var(--accent-cyan)" }}>| Data & AI</span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Work</a>
            <a href="#contact">Contact</a>
          </div>
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} onClick={handleDownloadResume} className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.9rem" }}>
            Resume <Download className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section hero-gradient" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "80px", overflow: "hidden" }}>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="container">
          <div className="reveal" style={{ maxWidth: "800px", position: "relative", zIndex: 10 }}>
            <div className="badge reveal" style={{ marginBottom: "24px" }}>B.Tech AI & ML | Data Analyst & BI Developer</div>
            <h1 className="text-gradient reveal" style={{ fontSize: "clamp(2rem, 8vw, 4rem)", marginBottom: "24px" }}>
              Architecting Scalable Data Pipelines, Interactive BI Ecosystems, and Applied ML Models.
            </h1>
            <p className="reveal" style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "40px" }}>
              Bridging raw data and executive strategy with automated Python workflows, DAX-modeled Power BI analytics, and end-to-end Machine Learning.
            </p>
            
            <div className="grid-3 reveal" style={{ marginBottom: "40px" }}>
              <div className="glass-card floating-element" style={{ padding: "20px", textAlign: "center", animationDelay: "0s" }}>
                <h3 style={{ fontSize: "2.5rem", color: "var(--accent-cyan)" }}>40%</h3>
                <p style={{ fontSize: "0.9rem" }}>Reduction in verification time</p>
              </div>
              <div className="glass-card floating-element" style={{ padding: "20px", textAlign: "center", animationDelay: "1s" }}>
                <h3 style={{ fontSize: "2.5rem", color: "var(--accent-emerald)" }}>35%</h3>
                <p style={{ fontSize: "0.9rem" }}>Efficiency boost in KPI reporting</p>
              </div>
              <div className="glass-card floating-element" style={{ padding: "20px", textAlign: "center", animationDelay: "2s" }}>
                <h3 style={{ fontSize: "2.5rem", color: "var(--text-primary)" }}>Global</h3>
                <p style={{ fontSize: "0.9rem" }}>Scope across Asia, Europe & Middle East</p>
              </div>
            </div>

            <div className="reveal" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="#projects" className="btn-primary">Explore Projects <ArrowRight className="w-5 h-5" /></a>
              <a href="#contact" className="btn-secondary">Get in Touch</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <SectionWrapper id="about">
        <h2 className="section-title reveal">Executive <span>Summary</span></h2>
        <div className="grid-2">
          <div className="glass-card reveal">
            <h3 style={{ marginBottom: "16px", color: "var(--text-primary)" }}>Professional Bio</h3>
            <p style={{ marginBottom: "16px" }}>
              Strong foundation in relational database management (MySQL) and automated REST API pipelines. Expertise in translating multi-regional trade benchmarks into executive-level B2B dashboards.
            </p>
            <p>
              I specialize in bridging the gap between raw data and actionable business strategy, delivering high-impact solutions through clean architecture and robust ML models.
            </p>
          </div>
          <div className="glass-card reveal">
            <h3 style={{ marginBottom: "16px", color: "var(--text-primary)" }}>Fast Facts</h3>
            <ul style={{ listStyle: "none", display: "grid", gap: "12px" }}>
              <li><strong style={{ color: "var(--accent-cyan)" }}>Education:</strong> B.Tech in AI & ML</li>
              <li><strong style={{ color: "var(--accent-cyan)" }}>University:</strong> DY Patil Agriculture & Technical University</li>
              <li><strong style={{ color: "var(--accent-cyan)" }}>CGPA:</strong> 7.8/10 (Graduating 2026)</li>
              <li><strong style={{ color: "var(--accent-cyan)" }}>Languages:</strong> English, Hindi, Marathi</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Skills Matrix */}
      <SectionWrapper id="skills">
        <h2 className="section-title reveal">Technical <span>Skills Matrix</span></h2>
        <div className="grid-3">
          {SKILLS.map((skill, idx) => (
            <div key={idx} className="glass-card reveal">
              {skill.icon}
              <h3 style={{ marginBottom: "16px" }}>{skill.category}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "-4px" }}>
                {skill.items.map(item => (
                  <span key={item} className="badge">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Experience Section */}
      <SectionWrapper id="experience">
        <h2 className="section-title reveal">Work <span>Experience</span></h2>
        <div className="glass-card reveal" style={{ maxWidth: "800px", margin: "0 auto", position: "relative", paddingLeft: "48px" }}>
          <div style={{ position: "absolute", left: "24px", top: "32px", bottom: "32px", width: "2px", background: "var(--accent-cyan)" }}></div>
          <div style={{ position: "absolute", left: "19px", top: "32px", width: "12px", height: "12px", borderRadius: "50%", background: "var(--accent-cyan)", boxShadow: "0 0 10px var(--accent-cyan)" }}></div>
          
          <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>Data Analyst Intern</h3>
          <p style={{ color: "var(--accent-emerald)", fontWeight: "500", marginBottom: "16px" }}>Global Vision Trade Organization (Aug 2025 – Aug 2026)</p>
          
          <ul style={{ paddingLeft: "20px", display: "grid", gap: "12px" }}>
            <li>Engineered automated data-cleaning and geospatial-enrichment pipelines in Python using REST APIs, cutting verification time by <strong style={{ color: "var(--accent-cyan)" }}>40%</strong> across logistics, automotive, and healthcare datasets.</li>
            <li>Deployed dynamic Power BI dashboards with custom DAX calculations to track vendor KPIs, lifting operational reporting efficiency by <strong style={{ color: "var(--accent-cyan)" }}>35%</strong>.</li>
            <li>Consolidated multi-region trade data across Asia, Europe, and the Middle East to steer executive B2B vendor-sourcing decisions.</li>
            <li>Centralized fragmented trade records in MySQL, guaranteeing high data integrity for scalable global benchmarking.</li>
          </ul>
          
          <div style={{ marginTop: "24px" }}>
            <a href={`${import.meta.env.BASE_URL}GVTO_Certificate.html`} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Award className="w-4 h-4" /> View Certificate
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper id="projects">
        <h2 className="section-title reveal">Featured <span>Work</span></h2>
        <div className="grid-2">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="glass-card reveal" style={{ borderTop: "4px solid var(--accent-cyan)" }}>
              <h3 style={{ fontSize: "1.3rem", color: "var(--text-primary)", marginBottom: "8px" }}>{project.title}</h3>
              <p style={{ marginBottom: "16px", minHeight: "48px" }}>{project.problem}</p>
              
              <div style={{ marginBottom: "24px" }}>
                {project.stack.map(tech => <span key={tech} className="badge">{tech}</span>)}
              </div>
              
              <ul style={{ paddingLeft: "20px", marginBottom: "32px", color: "var(--text-secondary)" }}>
                {project.deliverables.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
              
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {project.githubUrl !== "#" && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: "8px 16px" }}>
                    <GithubIcon className="w-4 h-4" /> Code
                  </a>
                )}
                {project.liveUrl !== "#" && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: "8px 16px" }}>
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Certifications Section */}
      <SectionWrapper id="credentials">
        <h2 className="section-title reveal">Credentials <span>& Certifications</span></h2>
        <div className="grid-2">
          {CERTS.map((cert, idx) => (
            <div key={idx} className="glass-card cert-card reveal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Award className="w-8 h-8 text-[#10B981]" style={{ flexShrink: 0 }} />
                <p style={{ fontWeight: "500", color: "var(--text-primary)" }}>{cert.title}</p>
              </div>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.8rem", flexShrink: 0 }}>
                  View
                </a>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper id="contact">
        <h2 className="section-title reveal">Get In <span>Touch</span></h2>
        <div className="grid-2">
          <form onSubmit={handleFormSubmit} className="glass-card reveal" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px" }}>Name</label>
              <input 
                type="text" required
                value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "var(--bg-tertiary)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} 
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px" }}>Work Email</label>
              <input 
                type="email" required
                value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "var(--bg-tertiary)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} 
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px" }}>Message</label>
              <textarea 
                required rows={4}
                value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "var(--bg-tertiary)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", resize: "vertical" }} 
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ marginTop: "8px", opacity: status === 'Sending...' ? 0.7 : 1 }}
              disabled={status === 'Sending...'}
            >
              {status === 'Sending...' ? 'Sending...' : 'Send Message'}
            </button>
            {status && status !== 'Sending...' && (
              <p style={{ marginTop: "8px", fontSize: "0.9rem", color: status.includes('successfully') ? "var(--accent-emerald)" : "#ef4444" }}>
                {status}
              </p>
            )}
          </form>

          <div className="glass-card reveal" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <h3 style={{ color: "var(--text-primary)" }}>Contact Information</h3>
            <p style={{ color: "var(--accent-cyan)", fontWeight: "500" }}>Currently open to Full-Time Data Analyst / AI Engineer/ ML Engineer opportunities.</p>
            
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <MapPin className="w-6 h-6 text-[#94A3B8]" />
              <span>Kolhapur, Maharashtra, India</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Mail className="w-6 h-6 text-[#94A3B8]" />
              <a href="mailto:vaibhavpernole72@gmail.com">vaibhavpernole72@gmail.com</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Phone className="w-6 h-6 text-[#94A3B8]" />
              <span>+91 8600120032</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <LinkedinIcon className="w-6 h-6 text-[#94A3B8]" />
              <a href="https://linkedin.com/in/vaibhav-pernole-64234b2bb" target="_blank" rel="noreferrer">LinkedIn Profile</a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 0", marginTop: "40px" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <p>Copyright © 2026 Vaibhav Pernole.</p>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#" className="btn-secondary" style={{ padding: "8px" }}><GithubIcon className="w-5 h-5" /></a>
            <a href="https://linkedin.com/in/vaibhav-pernole-64234b2bb" className="btn-secondary" style={{ padding: "8px" }}><LinkedinIcon className="w-5 h-5" /></a>
            <a href="mailto:vaibhavpernole72@gmail.com" className="btn-secondary" style={{ padding: "8px" }}><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}


