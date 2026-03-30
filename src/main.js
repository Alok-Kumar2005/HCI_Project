import './style.css'
import Chart from 'chart.js/auto'

const app = document.querySelector('#app')

// State management
let state = {
  view: 'login', // login, dashboard, community, schedule, library, performance
  role: 'student', // student, professor, admin, clubhead, librarian
  user: {
    name: 'Julian Thorne',
    email: 'j.thorne@academy.edu',
    avatar: 'https://ui-avatars.com/api/?name=Julian+Thorne&background=8B5CF6&color=fff'
  }
}

// Icons (Lucide-like SVG strings)
const icons = {
  student: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  professor: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/><circle cx="12" cy="12" r="3"/></svg>`,
  admin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  clubhead: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  librarian: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  community: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  library: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/></svg>`,
  stats: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  bell: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`
}

// Router
function navigate(view) {
  state.view = view
  render()
}

// Render Logic
function render() {
  if (state.view === 'login') {
    renderLogin()
  } else {
    renderMainLayout()
  }
}

function renderLogin() {
  app.innerHTML = `
    <div class="auth-container animate-fade-in">
      <div class="logo-container">
        <h1 class="logo-text">ACADEMY AI</h1>
        <p class="logo-subtext">Luminescent Scholar Access Terminal</p>
      </div>

      <div style="width: 100%; max-width: 400px; margin-bottom: 2rem;">
        <h2 class="font-heading" style="margin-bottom: 0.5rem; font-size: 1.5rem;">Identify Your Path</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Choose your academic identity to personalize your AI workspace.</p>
      </div>

      <div class="role-card-grid">
        <div class="role-card ${state.role === 'student' ? 'active' : ''}" onclick="setRole('student')">
          <div class="role-icon">${icons.student}</div>
          <span class="role-name">Student</span>
        </div>
        <div class="role-card ${state.role === 'professor' ? 'active' : ''}" onclick="setRole('professor')">
          <div class="role-icon">${icons.professor}</div>
          <span class="role-name">Professor</span>
        </div>
        <div class="role-card ${state.role === 'admin' ? 'active' : ''}" onclick="setRole('admin')">
          <div class="role-icon">${icons.admin}</div>
          <span class="role-name">Admin</span>
        </div>
        <div class="role-card ${state.role === 'clubhead' ? 'active' : ''}" onclick="setRole('clubhead')">
          <div class="role-icon">${icons.clubhead}</div>
          <span class="role-name">Club Head</span>
        </div>
        <div class="role-card ${state.role === 'librarian' ? 'active' : ''}" onclick="setRole('librarian')">
          <div class="role-icon">${icons.librarian}</div>
          <span class="role-name">Librarian</span>
        </div>
      </div>

      <div class="login-form">
        <h3 class="font-heading" style="margin-bottom: 0.5rem;">Secure Entry</h3>
        <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 1.5rem;">Enter your credentials to access the research mainframe.</p>
        
        <div class="input-group">
          <label class="input-label">Academy Email</label>
          <input type="email" class="input-field" placeholder="j.thorne@academy.edu" value="j.thorne@academy.edu">
        </div>

        <div class="input-group">
          <label class="input-label">Vault Key</label>
          <input type="password" class="input-field" value="••••••••••••">
        </div>

        <button class="btn-primary" onclick="login()">Initiate Access</button>
        
        <p style="text-align: center; margin-top: 1.5rem; color: var(--accent-teal); font-size: 0.8rem; cursor: pointer; font-weight: 600;">
          Continue as Guest ${icons.arrowRight}
        </p>
      </div>

      <div style="display: flex; gap: 2rem; margin-top: 3rem; font-size: 0.6rem; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase;">
        <span>● System Status: Optimal</span>
        <span>● Encryption: Level 4</span>
      </div>
    </div>
  `
}

window.setRole = (role) => {
  state.role = role
  render()
}

window.login = () => {
  state.view = 'dashboard'
  render()
}

window.navigate = (view) => {
  state.view = view
  render()
}

function renderMainLayout() {
  app.innerHTML = `
    <div class="dashboard-container">
      <nav class="top-nav">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button style="background: none; border: none; color: var(--text-primary); cursor: pointer;">${icons.menu}</button>
          <span class="logo-text" style="font-size: 1.2rem; letter-spacing: 1px; margin-bottom: 0;">ACADEMY AI</span>
        </div>
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--bg-card); padding: 0.25rem 0.75rem; border-radius: var(--radius-pill); border: 1px solid var(--glass-border); cursor: pointer;">
            <span style="font-size: 0.7rem; font-weight: 700;">EN</span>
            <div style="width: 1px; height: 10px; background: var(--text-muted);"></div>
            <span style="font-size: 0.7rem; color: var(--text-muted);">HI</span>
          </div>
          <div style="position: relative; cursor: pointer;">
            ${icons.bell}
            <div style="position: absolute; top: 0; right: 0; width: 8px; height: 8px; background: var(--warning); border-radius: 50%; border: 2px solid var(--bg-deep);"></div>
          </div>
          <img src="${state.user.avatar}" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--accent-purple);" alt="Profile">
        </div>
      </nav>

      <main class="main-content" id="main-content">
        ${renderViewContent()}
      </main>

      <div class="bottom-dock">
        <div class="nav-item ${state.view === 'dashboard' ? 'active' : ''}" onclick="navigate('dashboard')">${icons.home}</div>
        <div class="nav-item ${state.view === 'schedule' ? 'active' : ''}" onclick="navigate('schedule')">${icons.calendar}</div>
        <div class="nav-item ${state.view === 'community' ? 'active' : ''}" onclick="navigate('community')">${icons.community}</div>
        <div class="nav-item ${state.view === 'library' ? 'active' : ''}" onclick="navigate('library')">${icons.library}</div>
        <div class="nav-item ${state.view === 'performance' ? 'active' : ''}" onclick="navigate('performance')">${icons.stats}</div>
      </div>
    </div>
  `
  
  if (state.view === 'dashboard' && state.role === 'student') initAttendanceChart()
  if (state.view === 'dashboard' && state.role === 'professor') initProfessorChart()
  if (state.view === 'performance') initPerformanceChart()
}

function renderViewContent() {
  switch (state.view) {
    case 'dashboard': return renderDashboard()
    case 'community': return renderCommunity()
    case 'schedule': return renderSchedule()
    case 'library': return renderLibrary()
    case 'performance': return renderPerformance()
    default: return '<h1>Select a view</h1>'
  }
}

// View: Dashboard (Attendance/Analytics)
function renderDashboard() {
  switch (state.role) {
    case 'professor': return renderProfessorDashboard()
    case 'admin': return renderAdminDashboard()
    case 'librarian': return renderLibrarianDashboard()
    case 'clubhead': return renderClubHeadDashboard()
    default: return renderStudentDashboard() // default to student
  }
}

function renderStudentDashboard() {
  return `
    <div class="animate-fade-in">
      <div class="section-header">
        <h1 class="section-title">Academic Presence.</h1>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">
          Your current standing is above the university threshold. Maintain consistency for ML certification eligibility.
        </p>
      </div>

      <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
        <div class="card" style="flex: 1; display: flex; align-items: center; gap: 1rem; padding: 1rem;">
          <div style="color: var(--success);">${icons.student}</div>
          <div>
            <div style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase;">Status</div>
            <div style="font-weight: 700;">Consistent</div>
          </div>
        </div>
        <div class="card" style="flex: 1; display: flex; align-items: center; gap: 1rem; padding: 1rem;">
          <div style="color: var(--accent-purple);">${icons.stats}</div>
          <div>
            <div style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase;">Rank</div>
            <div style="font-weight: 700;">Top 12%</div>
          </div>
        </div>
      </div>

      <div class="card" style="display: flex; flex-direction: column; align-items: center; padding: 2rem;">
        <div style="width: 200px; height: 200px; position: relative;">
          <canvas id="attendanceChart"></canvas>
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
            <div style="font-size: 2.5rem; font-weight: 800; font-family: 'Outfit';">85%</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Overall</div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; margin-top: 2rem;">
        <h2 class="font-heading">Subject Insights</h2>
        <span style="color: var(--text-muted); font-size: 0.8rem;">Semester Fall 2024</span>
      </div>

      <div class="subject-grid">
        <div class="card subject-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="font-weight: 700;">Machine Learning</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Advanced Neural Networks</div>
            </div>
            <span class="badge badge-present">SAFE</span>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-size: 0.8rem; color: var(--text-muted);">Attendance</span>
              <span style="font-weight: 700;">92%</span>
            </div>
            <div class="progress-container">
              <div class="progress-bar" style="width: 92%; background: var(--success);"></div>
            </div>
          </div>
        </div>

        <div class="card subject-card" style="border-color: var(--warning);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="font-weight: 700;">Database Systems</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Relational & NoSQL Architecture</div>
            </div>
            <span class="badge badge-absent">LOW ATTENDANCE</span>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-size: 0.8rem; color: var(--text-muted);">Attendance</span>
              <span style="font-weight: 700;">68%</span>
            </div>
            <div class="progress-container">
              <div class="progress-bar" style="width: 68%; background: var(--warning);"></div>
            </div>
          </div>
        </div>

        <div class="card subject-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="font-weight: 700;">Operating Systems</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Kernel Design & Concurrency</div>
            </div>
            <span class="badge badge-present">SAFE</span>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-size: 0.8rem; color: var(--text-muted);">Attendance</span>
              <span style="font-weight: 700;">88%</span>
            </div>
            <div class="progress-container">
              <div class="progress-bar" style="width: 88%; background: var(--accent-purple);"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="section-header" style="margin-top: 2rem; margin-bottom: 1rem;">
        <h2 class="font-heading">Attendance Log</h2>
      </div>

      <div class="card table-container">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Machine Learning</td>
              <td>Oct 24, 2023</td>
              <td>NFC Tap</td>
              <td><span class="badge badge-present">Present</span></td>
            </tr>
            <tr>
              <td>Operating Systems</td>
              <td>Oct 23, 2023</td>
              <td>QR Scan</td>
              <td><span class="badge badge-present">Present</span></td>
            </tr>
            <tr>
              <td>Database Systems</td>
              <td>Oct 22, 2023</td>
              <td>Facial ID</td>
              <td><span class="badge badge-absent">Absent</span></td>
            </tr>
          </tbody>
        </table>
        <button class="btn-primary" style="background: transparent; border: 1px solid var(--glass-border); margin-top: 1rem; font-size: 0.7rem; padding: 0.5rem;">LOAD MORE RECORDS</button>
      </div>
    </div>
  `
}

function renderProfessorDashboard() {
  return `
    <div class="animate-fade-in">
      <div class="section-header">
        <h1 class="section-title">Faculty Analytics.</h1>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">Monitor student performance and engagement metrics for your courses.</p>
      </div>
      
      <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
        <div class="card" style="flex: 1; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-purple);">128</div>
          <div style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase;">Total Students</div>
        </div>
        <div class="card" style="flex: 1; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-teal);">94%</div>
          <div style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase;">Avg Attendance</div>
        </div>
      </div>

      <h2 class="font-heading" style="margin-bottom: 1rem;">Course Overview</h2>
      <div class="card">
        <canvas id="professorChart" style="height: 200px;"></canvas>
      </div>
      
      <h2 class="font-heading" style="margin-top: 2rem; margin-bottom: 1rem;">Quick Actions</h2>
      <div class="subject-grid">
        <div class="card" style="cursor: pointer;">
          <h3 style="font-size: 1rem;">Upload Attendance</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted);">Sync from Classroom NFC/QR</p>
        </div>
        <div class="card" style="cursor: pointer;">
          <h3 style="font-size: 1rem;">Update Results</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted);">Post Sessional/Lab Marks</p>
        </div>
      </div>
    </div>
  `
}

function renderAdminDashboard() {
  return `
    <div class="animate-fade-in">
      <div class="section-header">
        <h1 class="section-title">Command Center.</h1>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">System-wide health, user engagement, and data synchronization status.</p>
      </div>
      <div class="subject-grid">
        <div class="card">
          <h3 style="color: var(--success);">OPTIMAL</h3>
          <p style="font-size: 0.7rem; color: var(--text-muted);">SYSTEM HEALTH</p>
        </div>
        <div class="card">
          <h3 style="color: var(--accent-purple);">4.2k</h3>
          <p style="font-size: 0.7rem; color: var(--text-muted);">DAILY QUERIES</p>
        </div>
         <div class="card">
          <h3 style="color: var(--accent-teal);">89%</h3>
          <p style="font-size: 0.7rem; color: var(--text-muted);">AI ACCURACY</p>
        </div>
      </div>
      
      <h2 class="font-heading" style="margin-top: 2rem; margin-bottom: 1rem;">User Roles & Permissions</h2>
      <div class="card">
        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
          <span>Students</span>
          <span style="font-weight: 700;">3,850</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
          <span>Faculty</span>
          <span style="font-weight: 700;">145</span>
        </div>
        <button class="btn-primary" style="font-size: 0.7rem; padding: 0.5rem;">Manage User Directory</button>
      </div>
    </div>
  `
}

function renderLibrarianDashboard() {
  return `
    <div class="animate-fade-in">
      <div class="section-header">
        <h1 class="section-title">Resource Central.</h1>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">Manage book availability and digital repositories.</p>
      </div>
      <div class="card">
         <h3 style="margin-bottom: 1rem;">Today's Activity</h3>
         <div style="display: flex; justify-content: space-around;">
           <div style="text-align: center;">
             <div style="font-size: 1.5rem; font-weight: 800;">42</div>
             <div style="font-size: 0.6rem; color: var(--text-muted);">ISSUES</div>
           </div>
           <div style="text-align: center;">
             <div style="font-size: 1.5rem; font-weight: 800;">18</div>
             <div style="font-size: 0.6rem; color: var(--text-muted);">RETURNS</div>
           </div>
         </div>
      </div>
      <button class="btn-primary" style="margin-top: 1rem;">Sync Digital Library</button>
    </div>
  `
}

function renderClubHeadDashboard() {
  return `
    <div class="animate-fade-in">
      <div class="section-header">
        <h1 class="section-title">Echo Point.</h1>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">Club engagement and event registrations.</p>
      </div>
      <div class="card">
         <h3 style="margin-bottom: 0.5rem;">Upcoming Hackathon</h3>
         <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">Registrations: 245/300</p>
         <div class="progress-container">
            <div class="progress-bar" style="width: 82%; background: var(--accent-purple);"></div>
         </div>
      </div>
      <button class="btn-primary" style="margin-top: 1rem;">Create Announcement</button>
    </div>
  `
}

function initAttendanceChart() {
  const ctx = document.getElementById('attendanceChart').getContext('2d')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [85, 15],
        backgroundColor: ['rgba(139, 92, 246, 0.8)', 'rgba(30, 41, 59, 0.5)'],
        borderWidth: 0,
        borderRadius: 10,
        hoverOffset: 4
      }]
    },
    options: {
      cutout: '85%',
      responsive: true,
      plugins: { legend: { display: false } }
    }
  })
}

// View: Community (Knowledge Exchange)
function renderCommunity() {
  return `
    <div class="animate-fade-in">
      <div class="section-header">
        <h1 class="section-title">Knowledge Exchange</h1>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">
          Collaborate with the brightest minds in the Academy AI ecosystem.
        </p>
      </div>

      <button class="btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 1.25rem; border-radius: var(--radius-pill); margin-bottom: 2rem;">
        ${icons.plus} Ask a Question
      </button>

      <div style="background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 0.75rem 1.5rem; display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        ${icons.search}
        <input type="text" placeholder="Search questions, topics, or scholars..." style="background: none; border: none; color: var(--text-primary); flex: 1; font-size: 1rem; outline: none;">
        <div style="color: var(--accent-purple); cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
        </div>
      </div>
      
      <div style="display: flex; gap: 0.5rem; margin-top: -1.5rem; margin-bottom: 2rem;">
        <span style="font-size: 0.6rem; color: var(--text-muted); padding-top: 0.2rem;">Try:</span>
        <div class="badge" style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); font-size: 0.6rem; cursor: pointer;">ML sessional results</div>
        <div class="badge" style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); font-size: 0.6rem; cursor: pointer;">Holiday calendar</div>
      </div>

      <div style="display: flex; gap: 0.75rem; margin-bottom: 2rem;">
        <div class="badge badge-official" style="padding: 0.5rem 1.25rem; cursor: pointer;">Latest</div>
        <div class="badge" style="padding: 0.5rem 1.25rem; background: var(--bg-card); border: 1px solid var(--glass-border); color: var(--text-muted); cursor: pointer;">Top Voted</div>
        <div class="badge" style="padding: 0.5rem 1.25rem; background: var(--bg-card); border: 1px solid var(--glass-border); color: var(--text-muted); cursor: pointer;">Unanswered</div>
      </div>

      <div class="card" style="position: relative;">
        <div style="display: flex; gap: 1rem; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 1rem;">
          <div style="background: rgba(255,255,255,0.05); padding: 0.25rem 0.75rem; border-radius: 4px;">15 VOTES</div>
          <div style="background: rgba(255,255,255,0.05); padding: 0.25rem 0.75rem; border-radius: 4px;">4 REPLIES</div>
          <span class="badge badge-official" style="margin-left: auto;">OFFICIAL ANSWER</span>
        </div>
        <h3 style="margin-bottom: 0.5rem;">How to prepare for Semester 4 ML exam?</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem;">
          The focus areas seem to be backpropagation and convolutional layers...
        </p>
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
             <img src="https://ui-avatars.com/api/?name=JT&background=random" style="width: 24px; height: 24px; border-radius: 50%;">
             <span style="font-size: 0.8rem; color: var(--text-muted);">2 hours ago by Julian Thorne</span>
          </div>
          <div style="margin-left: auto; display: flex; gap: 0.5rem;">
            <span class="badge" style="background: var(--bg-input); color: var(--text-muted);">#ExamPrep</span>
            <span class="badge" style="background: var(--bg-input); color: var(--text-muted);">#ML</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div style="display: flex; gap: 1rem; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 1rem;">
          <div style="background: rgba(255,255,255,0.05); padding: 0.25rem 0.75rem; border-radius: 4px;">42 VOTES</div>
          <div style="background: rgba(255,255,255,0.05); padding: 0.25rem 0.75rem; border-radius: 4px;">12 REPLIES</div>
        </div>
        <h3 style="margin-bottom: 0.5rem;">Ethical implications of AGI in healthcare</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem;">
          Discussing the role of transparency in medical black-box models...
        </p>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <img src="https://ui-avatars.com/api/?name=DR&background=random" style="width: 24px; height: 24px; border-radius: 50%;">
          <span style="font-size: 0.8rem; color: var(--text-muted);">5 hours ago by Dr. Aris</span>
        </div>
      </div>
    </div>
  `
}

// View: Schedule (Calendar)
function renderSchedule() {
  const hours = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM']
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  
  return `
    <div class="animate-fade-in">
      <div class="section-header">
        <h1 class="section-title">Academic Schedule</h1>
      </div>

      <div class="card" style="border-left: 4px solid var(--warning); background: rgba(244, 63, 94, 0.05);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div style="color: var(--warning); font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">Starts in 15 mins</div>
            <h3 style="margin-top: 0.25rem;">Ethical AI Seminar</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Auditorium • Dr. Sarah</p>
          </div>
          ${icons.bell}
        </div>
      </div>

      <h2 class="font-heading" style="margin-top: 2rem; margin-bottom: 1rem;">Today's Focus</h2>
      <div class="subject-grid">
        <div class="card" style="border-top: 4px solid var(--accent-purple);">
          <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">09:30 AM • LECTURE</div>
          <h3 style="margin: 0.5rem 0;">Advanced Neural Networks</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">Room 402 • Prof. Thorne</p>
          <button class="btn-primary" style="padding: 0.5rem; font-size: 0.8rem;">Join Online</button>
        </div>
        <div class="card" style="border-top: 4px solid var(--accent-teal);">
          <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">01:00 PM • LAB</div>
          <h3 style="margin: 0.5rem 0;">Data Visualization</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted);">Main Lab • Dr. Aris</p>
        </div>
      </div>

      <div style="overflow-x: auto; margin-top: 2rem;">
        <div style="min-width: 600px; display: grid; grid-template-columns: 80px repeat(6, 1fr); gap: 0.5rem;">
          <div></div>
          ${days.map(d => `<div style="text-align: center; font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">${d}</div>`).join('')}
          
          ${hours.map(h => `
            <div style="font-size: 0.7rem; color: var(--text-muted); padding: 1rem 0;">${h}</div>
            ${days.map(d => `
              <div style="background: var(--bg-input); border-radius: 4px; min-height: 50px; border: 1px solid rgba(255,255,255,0.02);">
                 ${h === '09:00 AM' && (d === 'MON' || d === 'WED') ? '<div style="background: var(--accent-purple); height: 100%; border-radius: 4px; opacity: 0.3;"></div>' : ''}
                 ${h === '11:00 AM' && d === 'TUE' ? '<div style="background: var(--accent-teal); height: 100%; border-radius: 4px; opacity: 0.3;"></div>' : ''}
              </div>
            `).join('')}
          `).join('')}
        </div>
      </div>
    </div>
  `
}

// View: Library (Knowledge Repository)
function renderLibrary() {
  const resources = [
    { title: 'Neural Architectures in Synthetic Environments', type: 'Paper', size: '2.4 MB', author: 'Dr. Sarah', featured: true },
    { title: 'Quantum Cryptography basics', type: 'Video', size: '45 mins', author: 'Prof. X', featured: false },
    { title: 'Distributed AI Systems', type: 'Notes', size: '1.2 MB', author: 'Julian T.', featured: false }
  ]

  return `
    <div class="animate-fade-in">
      <div class="section-header">
        <h1 class="section-title">Knowledge Repository</h1>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">Academic resources (papers, videos, assets)</p>
      </div>

      <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
        <div style="flex: 1; background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 0.75rem 1.5rem; display: flex; align-items: center; gap: 1rem;">
          ${icons.search}
          <input type="text" placeholder="Search for PDFs, Video lectures..." style="background: none; border: none; color: var(--text-primary); flex: 1; outline: none;">
        </div>
        <button class="btn-primary" style="width: auto; padding: 0 1.5rem; border-radius: var(--radius-md); font-size: 0.8rem;">Upload</button>
      </div>

      <h2 class="font-heading" style="margin-bottom: 1rem;">Featured Card</h2>
      <div class="card" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(30, 41, 59, 1) 100%);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
           <h3 style="max-width: 60%;">${resources[0].title}</h3>
           <span class="badge badge-official">NEW</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
           <span style="font-size: 0.8rem; color: var(--text-muted);">${resources[0].author} • ${resources[0].size}</span>
           <div style="display: flex; gap: 0.5rem;">
             <button class="badge" style="background: var(--accent-purple); color: white; border: none; cursor: pointer;">Preview</button>
             <button class="badge" style="background: var(--bg-input); color: var(--text-primary); border: 1px solid var(--glass-border); cursor: pointer;">Download</button>
           </div>
        </div>
      </div>

      <h2 class="font-heading" style="margin-top: 2rem; margin-bottom: 1rem;">Latest Resources</h2>
      ${resources.slice(1).map(r => `
        <div class="card" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
           <div>
             <div style="font-weight: 600;">${r.title}</div>
             <div style="font-size: 0.7rem; color: var(--text-muted);">${r.type} • ${r.author}</div>
           </div>
           <div style="color: var(--text-muted);">${icons.arrowRight}</div>
        </div>
      `).join('')}
    </div>
  `
}

// View: Performance (Analytics)
function renderPerformance() {
  return `
    <div class="animate-fade-in">
      <div class="section-header">
        <h1 class="section-title">Academic Analytics</h1>
      </div>

      <div class="card" style="background: var(--gradient-primary); text-align: center; padding: 2.5rem 1.5rem;">
        <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem; opacity: 0.8;">Current CGPA</div>
        <div style="font-size: 4rem; font-weight: 800; font-family: 'Outfit';">3.88</div>
        <div style="font-size: 0.9rem; opacity: 0.9;">Top 5% of cohort</div>
        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
          <button style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 0.5rem 1rem; border-radius: var(--radius-pill); font-size: 0.7rem; font-weight: 700; cursor: pointer;">Download PDF</button>
          <button style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 0.5rem 1rem; border-radius: var(--radius-pill); font-size: 0.7rem; font-weight: 700; cursor: pointer;">Share Transcript</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
         <div class="card" style="text-align: center;">
           <div style="font-size: 2rem; font-weight: 800; color: var(--accent-teal);">124</div>
           <div style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase;">Credits Earned</div>
         </div>
         <div class="card" style="text-align: center;">
           <div style="font-size: 2rem; font-weight: 800; color: var(--accent-purple);">Sem 4</div>
           <div style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase;">Current Level</div>
         </div>
      </div>

      <h2 class="font-heading" style="margin-top: 2rem; margin-bottom: 1rem;">GPA Progression</h2>
      <div class="card">
        <canvas id="performanceChart" style="height: 200px;"></canvas>
      </div>

      <h2 class="font-heading" style="margin-top: 2rem; margin-bottom: 1rem;">Current Semester Breakdown</h2>
      <div class="card table-container">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
              <th>Internal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Advanced Neural Networks</td>
              <td><span style="font-weight: 700; color: var(--success);">A+</span></td>
              <td>48/50</td>
            </tr>
            <tr>
              <td>Quantum Data Structures</td>
              <td><span style="font-weight: 700; color: var(--accent-purple);">A</span></td>
              <td>42/50</td>
            </tr>
            <tr>
              <td>Ethical AI Governance</td>
              <td><span style="font-weight: 700; color: var(--success);">A+</span></td>
              <td>49/50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
}

function initPerformanceChart() {
  const ctx = document.getElementById('performanceChart').getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      datasets: [{
        label: 'GPA',
        data: [3.68, 3.85, 3.75, 3.92],
        backgroundColor: 'rgba(139, 92, 246, 0.6)',
        borderColor: 'var(--accent-purple)',
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: false, min: 3, max: 4, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748B' } },
        x: { grid: { display: false }, ticks: { color: '#64748B' } }
      },
      plugins: { legend: { display: false } }
    }
  })
}

function initProfessorChart() {
  const ctx = document.getElementById('professorChart').getContext('2d')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Engagement',
        data: [65, 72, 68, 85, 90],
        borderColor: 'var(--accent-teal)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748B' } },
        x: { grid: { display: false }, ticks: { color: '#64748B' } }
      }
    }
  })
}

// Initial Render
render()
