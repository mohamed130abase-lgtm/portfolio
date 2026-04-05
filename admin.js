// Admin Dashboard JavaScript

// Default Data
const DEFAULTS = {
  settings: {
    name:'Ahmed Hassan', title:'Data Analyst & BI Specialist',
    email:'hello@ahmedhassan.com', linkedin:'linkedin.com/in/ahmed-hassan',
    github:'github.com/ahmed-hassan', location:'Cairo, Egypt',
    bio:'Transforming raw data into powerful insights. Specializing in advanced analytics, visualization, and data-driven decision making.',
    about1:"I'm a passionate Data Analyst with expertise in transforming complex datasets into clear, actionable insights. I combine statistical rigor with compelling storytelling to help organizations make data-driven decisions.",
    about2:'My approach bridges the gap between technical analysis and business strategy, ensuring that data insights directly translate into measurable outcomes.',
    tags:'Python, SQL, Power BI, Machine Learning, Statistics',
    s1v:'50+',s1l:'Projects Completed',s2v:'5+',s2l:'Years Experience',
    s3v:'20+',s3l:'Tools & Technologies',s4v:'30+',s4l:'Happy Clients'
  },
  projects:[
    {id:1,title:'Sales Performance Dashboard',cat:'Data Visualization',desc:'Interactive Power BI dashboard tracking KPIs across 15 regions with drill-down capabilities and real-time data refresh.',tools:'Power BI, SQL Server, DAX',link:'https://github.com'},
    {id:2,title:'Customer Churn Prediction',cat:'Machine Learning',desc:'ML model achieving 87% accuracy in predicting customer churn, enabling proactive retention strategies that saved $2M annually.',tools:'Python, Scikit-learn, Pandas, Matplotlib',link:'https://github.com'},
    {id:3,title:'Supply Chain Analytics',cat:'Business Intelligence',desc:'End-to-end supply chain optimization using demand forecasting and inventory modeling, reducing stockouts by 40%.',tools:'Python, SQL, Tableau, Excel',link:''}
  ],
  skills:[
    {id:1,name:'Python',cat:'Programming & Tools',level:92},
    {id:2,name:'SQL',cat:'Databases & SQL',level:95},
    {id:3,name:'Power BI',cat:'Visualization',level:90},
    {id:4,name:'Tableau',cat:'Visualization',level:85},
    {id:5,name:'Machine Learning',cat:'Machine Learning',level:78},
    {id:6,name:'Excel / VBA',cat:'Programming & Tools',level:88}
  ],
  experience:[
    {id:1,role:'Senior Data Analyst',company:'Tech Corp Egypt',start:'Mar 2022',end:'Present',desc:'Lead analytics team of 5, built company-wide BI framework, reduced reporting time by 60%.'},
    {id:2,role:'Data Analyst',company:'Cairo Analytics Ltd',start:'Jan 2020',end:'Feb 2022',desc:'Designed 30+ dashboards for C-suite, automated ETL pipelines, supported product decisions.'}
  ],
  certs:[
    {id:1,name:'Google Data Analytics Certificate',issuer:'Google / Coursera',year:'2023',color:'cyan',icon:'GD'},
    {id:2,name:'Microsoft Power BI Data Analyst',issuer:'Microsoft',year:'2023',color:'gold',icon:'PB'},
    {id:3,name:'AWS Cloud Practitioner',issuer:'Amazon Web Services',year:'2022',color:'green',icon:'AW'}
  ],
  password:'admin123'
};

// Data Functions
function getData(){
  try{
    const d = localStorage.getItem('da_portfolio');
    return d ? JSON.parse(d) : JSON.parse(JSON.stringify(DEFAULTS));
  }catch(e){
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
}

function saveData(d){
  localStorage.setItem('da_portfolio', JSON.stringify(d));
}

function resetData(){
  localStorage.setItem('da_portfolio', JSON.stringify(DEFAULTS));
  location.reload();
}

// Theme Functions
function initTheme(){
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
}

function setTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeToggleButton(theme);
}

function toggleTheme(){
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

function updateThemeToggleButton(theme){
  const btn = document.getElementById('theme-toggle');
  if(btn){
    const icon = theme === 'dark' ? '☀️' : '🌙';
    const text = theme === 'dark' ? 'Light' : 'Dark';
    btn.innerHTML = `<span class="icon">${icon}</span><span>${text}</span>`;
  }
}

// Login Functions
function checkLogin(){
  const d = getData();
  const pw = document.getElementById('admin-pass');
  if(!pw) return;
  
  if(pw.value === d.password){
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-layout').style.display = 'flex';
    loadAdminForms();
    showPanel('settings');
  } else {
    const error = document.getElementById('login-error');
    if(error) error.style.display = 'block';
  }
}

function showPanel(id){
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));
  
  const panel = document.getElementById('panel-' + id);
  if(panel) panel.classList.add('active');
  
  const titles = {
    settings: 'Site Settings',
    'projects-admin': 'Projects',
    'skills-admin': 'Skills',
    'experience-admin': 'Experience',
    'certs-admin': 'Certifications',
    'data-admin': 'Data Management'
  };
  
  const titleEl = document.getElementById('panel-title');
  if(titleEl) titleEl.textContent = titles[id] || id;
  
  // Update nav active state
  const navMap = {
    'settings': 0,
    'projects-admin': 1,
    'skills-admin': 2,
    'experience-admin': 3,
    'certs-admin': 4,
    'data-admin': 5
  };
  
  const navItems = document.querySelectorAll('.admin-nav-item');
  if(navItems[navMap[id]]){
    navItems[navMap[id]].classList.add('active');
  }
  
  // Render tables
  if(id === 'projects-admin') renderProjectsTable();
  if(id === 'skills-admin') renderSkillsTable();
  if(id === 'experience-admin') renderExpTable();
  if(id === 'certs-admin') renderCertsTable();
}

function loadAdminForms(){
  const d = getData();
  const s = d.settings;
  
  const fields = {
    's-name': s.name,
    's-title': s.title,
    's-email': s.email,
    's-linkedin': s.linkedin,
    's-github': s.github,
    's-location': s.location,
    's-bio': s.bio,
    's-about1': s.about1,
    's-about2': s.about2,
    's-tags': s.tags,
    's-s1v': s.s1v,
    's-s1l': s.s1l,
    's-s2v': s.s2v,
    's-s2l': s.s2l,
    's-s3v': s.s3v,
    's-s3l': s.s3l,
    's-s4v': s.s4v,
    's-s4l': s.s4l
  };
  
  Object.entries(fields).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if(el) el.value = val || '';
  });
}

function saveSettings(){
  const d = getData();
  const keys = ['name','title','email','linkedin','github','location','bio','about1','about2','tags','s1v','s1l','s2v','s2l','s3v','s3l','s4v','s4l'];
  
  keys.forEach(k => {
    const el = document.getElementById('s-' + k);
    if(el) d.settings[k] = el.value;
  });
  
  saveData(d);
  showSuccess('settings-success');
}

// Projects CRUD
function saveProject(){
  const d = getData();
  const id = document.getElementById('proj-edit-id');
  
  const obj = {
    id: id && id.value ? +id.value : Date.now(),
    title: document.getElementById('p-title')?.value || '',
    cat: document.getElementById('p-cat')?.value || '',
    desc: document.getElementById('p-desc')?.value || '',
    tools: document.getElementById('p-tools')?.value || '',
    link: document.getElementById('p-link')?.value || ''
  };
  
  if(!obj.title){
    alert('Title is required');
    return;
  }
  
  if(id && id.value){
    const i = d.projects.findIndex(p => p.id === +id.value);
    if(i > -1) d.projects[i] = obj;
  } else {
    d.projects.push(obj);
  }
  
  saveData(d);
  clearProjectForm();
  renderProjectsTable();
  showSuccess('projects-success');
}

function editProject(id){
  const d = getData();
  const p = d.projects.find(x => x.id === id);
  if(!p) return;
  
  document.getElementById('proj-edit-id').value = id;
  document.getElementById('p-title').value = p.title;
  document.getElementById('p-cat').value = p.cat;
  document.getElementById('p-desc').value = p.desc;
  document.getElementById('p-tools').value = p.tools;
  document.getElementById('p-link').value = p.link || '';
  
  const titleEl = document.getElementById('proj-form-title');
  if(titleEl) titleEl.textContent = 'Edit Project';
  
  const form = document.querySelector('#panel-projects-admin .admin-form');
  if(form) form.scrollIntoView({behavior: 'smooth'});
}

function deleteProject(id){
  if(!confirm('Delete this project?')) return;
  const d = getData();
  d.projects = d.projects.filter(p => p.id !== id);
  saveData(d);
  renderProjectsTable();
}

function clearProjectForm(){
  document.getElementById('proj-edit-id').value = '';
  document.getElementById('p-title').value = '';
  document.getElementById('p-desc').value = '';
  document.getElementById('p-tools').value = '';
  document.getElementById('p-link').value = '';
  
  const titleEl = document.getElementById('proj-form-title');
  if(titleEl) titleEl.textContent = 'Add New Project';
}

function renderProjectsTable(){
  const d = getData();
  const wrap = document.getElementById('projects-table-wrap');
  if(!wrap) return;
  
  if(!d.projects.length){
    wrap.innerHTML = '<div class="empty-state">No projects yet. Add one above.</div>';
    return;
  }
  
  wrap.innerHTML = `<table class="admin-table"><thead><tr><th>Title</th><th>Category</th><th>Tools</th><th>Actions</th></tr></thead><tbody>
    ${d.projects.map(p => `<tr><td><strong>${escapeHtml(p.title)}</strong></td><td style="color:var(--text2);font-size:12px">${escapeHtml(p.cat)}</td><td style="color:var(--text3);font-size:11px;max-width:180px">${escapeHtml(p.tools)}</td><td><div class="actions"><button class="admin-btn admin-btn-secondary admin-btn-sm" onclick="editProject(${p.id})">Edit</button><button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteProject(${p.id})">Delete</button></div></td></tr>`).join('')}
  </tbody></table>`;
}

// Skills CRUD
function saveSkill(){
  const d = getData();
  const id = document.getElementById('skill-edit-id');
  
  const obj = {
    id: id && id.value ? +id.value : Date.now(),
    name: document.getElementById('sk-name')?.value || '',
    cat: document.getElementById('sk-cat')?.value || '',
    level: +document.getElementById('sk-level')?.value || 80
  };
  
  if(!obj.name){
    alert('Name required');
    return;
  }
  
  if(id && id.value){
    const i = d.skills.findIndex(s => s.id === +id.value);
    if(i > -1) d.skills[i] = obj;
  } else {
    d.skills.push(obj);
  }
  
  saveData(d);
  clearSkillForm();
  renderSkillsTable();
  showSuccess('skills-success');
}

function editSkill(id){
  const d = getData();
  const s = d.skills.find(x => x.id === id);
  if(!s) return;
  
  document.getElementById('skill-edit-id').value = id;
  document.getElementById('sk-name').value = s.name;
  document.getElementById('sk-cat').value = s.cat;
  document.getElementById('sk-level').value = s.level;
  
  const valEl = document.getElementById('sk-level-val');
  if(valEl) valEl.textContent = s.level + '%';
  
  const titleEl = document.getElementById('skill-form-title');
  if(titleEl) titleEl.textContent = 'Edit Skill';
}

function deleteSkill(id){
  if(!confirm('Delete?')) return;
  const d = getData();
  d.skills = d.skills.filter(s => s.id !== id);
  saveData(d);
  renderSkillsTable();
}

function clearSkillForm(){
  document.getElementById('skill-edit-id').value = '';
  document.getElementById('sk-name').value = '';
  document.getElementById('sk-level').value = 80;
  
  const valEl = document.getElementById('sk-level-val');
  if(valEl) valEl.textContent = '80%';
  
  const titleEl = document.getElementById('skill-form-title');
  if(titleEl) titleEl.textContent = 'Add New Skill';
}

function renderSkillsTable(){
  const d = getData();
  const wrap = document.getElementById('skills-table-wrap');
  if(!wrap) return;
  
  if(!d.skills.length){
    wrap.innerHTML = '<div class="empty-state">No skills yet.</div>';
    return;
  }
  
  wrap.innerHTML = `<table class="admin-table"><thead><tr><th>Skill</th><th>Category</th><th>Level</th><th>Actions</th></tr></thead><tbody>
    ${d.skills.map(s => `<tr><td><strong>${escapeHtml(s.name)}</strong></td><td style="color:var(--text2);font-size:12px">${escapeHtml(s.cat)}</td><td><span class="level-badge ${s.level >= 80 ? 'level-high' : s.level >= 50 ? 'level-mid' : 'level-low'}">${s.level}%</span></td><td><div class="actions"><button class="admin-btn admin-btn-secondary admin-btn-sm" onclick="editSkill(${s.id})">Edit</button><button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteSkill(${s.id})">Delete</button></div></td></tr>`).join('')}
  </tbody></table>`;
}

// Experience CRUD
function saveExp(){
  const d = getData();
  const id = document.getElementById('exp-edit-id');
  
  const obj = {
    id: id && id.value ? +id.value : Date.now(),
    role: document.getElementById('e-role')?.value || '',
    company: document.getElementById('e-company')?.value || '',
    start: document.getElementById('e-start')?.value || '',
    end: document.getElementById('e-end')?.value || '',
    desc: document.getElementById('e-desc')?.value || ''
  };
  
  if(!obj.role){
    alert('Role required');
    return;
  }
  
  if(id && id.value){
    const i = d.experience.findIndex(e => e.id === +id.value);
    if(i > -1) d.experience[i] = obj;
  } else {
    d.experience.push(obj);
  }
  
  saveData(d);
  clearExpForm();
  renderExpTable();
  showSuccess('exp-success');
}

function editExp(id){
  const d = getData();
  const e = d.experience.find(x => x.id === id);
  if(!e) return;
  
  document.getElementById('exp-edit-id').value = id;
  document.getElementById('e-role').value = e.role;
  document.getElementById('e-company').value = e.company;
  document.getElementById('e-start').value = e.start;
  document.getElementById('e-end').value = e.end;
  document.getElementById('e-desc').value = e.desc;
  
  const titleEl = document.getElementById('exp-form-title');
  if(titleEl) titleEl.textContent = 'Edit Experience';
}

function deleteExp(id){
  if(!confirm('Delete?')) return;
  const d = getData();
  d.experience = d.experience.filter(e => e.id !== id);
  saveData(d);
  renderExpTable();
}

function clearExpForm(){
  ['exp-edit-id','e-role','e-company','e-start','e-end','e-desc'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = '';
  });
  
  const titleEl = document.getElementById('exp-form-title');
  if(titleEl) titleEl.textContent = 'Add Experience';
}

function renderExpTable(){
  const d = getData();
  const wrap = document.getElementById('exp-table-wrap');
  if(!wrap) return;
  
  if(!d.experience.length){
    wrap.innerHTML = '<div class="empty-state">No experience added yet.</div>';
    return;
  }
  
  wrap.innerHTML = `<table class="admin-table"><thead><tr><th>Role</th><th>Company</th><th>Period</th><th>Actions</th></tr></thead><tbody>
    ${d.experience.map(e => `<tr><td><strong>${escapeHtml(e.role)}</strong></td><td style="color:var(--text2)">${escapeHtml(e.company)}</td><td style="font-family:'Space Mono',monospace;font-size:11px;color:var(--text3)">${escapeHtml(e.start)}–${escapeHtml(e.end)}</td><td><div class="actions"><button class="admin-btn admin-btn-secondary admin-btn-sm" onclick="editExp(${e.id})">Edit</button><button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteExp(${e.id})">Delete</button></div></td></tr>`).join('')}
  </tbody></table>`;
}

// Certs CRUD
function saveCert(){
  const d = getData();
  const id = document.getElementById('cert-edit-id');
  
  const obj = {
    id: id && id.value ? +id.value : Date.now(),
    name: document.getElementById('c-name')?.value || '',
    issuer: document.getElementById('c-issuer')?.value || '',
    year: document.getElementById('c-year')?.value || '',
    color: document.getElementById('c-color')?.value || 'cyan',
    icon: document.getElementById('c-icon')?.value || '✦'
  };
  
  if(!obj.name){
    alert('Name required');
    return;
  }
  
  if(id && id.value){
    const i = d.certs.findIndex(c => c.id === +id.value);
    if(i > -1) d.certs[i] = obj;
  } else {
    d.certs.push(obj);
  }
  
  saveData(d);
  clearCertForm();
  renderCertsTable();
  showSuccess('certs-admin-success');
}

function editCert(id){
  const d = getData();
  const c = d.certs.find(x => x.id === id);
  if(!c) return;
  
  document.getElementById('cert-edit-id').value = id;
  document.getElementById('c-name').value = c.name;
  document.getElementById('c-issuer').value = c.issuer;
  document.getElementById('c-year').value = c.year;
  document.getElementById('c-color').value = c.color;
  document.getElementById('c-icon').value = c.icon;
  
  const titleEl = document.getElementById('cert-form-title');
  if(titleEl) titleEl.textContent = 'Edit Certification';
}

function deleteCert(id){
  if(!confirm('Delete?')) return;
  const d = getData();
  d.certs = d.certs.filter(c => c.id !== id);
  saveData(d);
  renderCertsTable();
}

function clearCertForm(){
  ['cert-edit-id','c-name','c-issuer','c-year','c-icon'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = '';
  });
  
  const titleEl = document.getElementById('cert-form-title');
  if(titleEl) titleEl.textContent = 'Add Certification';
}

function renderCertsTable(){
  const d = getData();
  const wrap = document.getElementById('certs-admin-table-wrap');
  if(!wrap) return;
  
  if(!d.certs.length){
    wrap.innerHTML = '<div class="empty-state">No certifications yet.</div>';
    return;
  }
  
  wrap.innerHTML = `<table class="admin-table"><thead><tr><th>Certificate</th><th>Issuer</th><th>Year</th><th>Actions</th></tr></thead><tbody>
    ${d.certs.map(c => `<tr><td><strong>${escapeHtml(c.name)}</strong></td><td style="color:var(--text2)">${escapeHtml(c.issuer)}</td><td style="font-family:'Space Mono',monospace;font-size:11px">${escapeHtml(c.year)}</td><td><div class="actions"><button class="admin-btn admin-btn-secondary admin-btn-sm" onclick="editCert(${c.id})">Edit</button><button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteCert(${c.id})">Delete</button></div></td></tr>`).join('')}
  </tbody></table>`;
}

// Data Export/Import
function exportData(){
  const d = getData();
  const blob = new Blob([JSON.stringify(d, null, 2)], {type: 'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'portfolio-backup-' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
}

function importData(e){
  const file = e.target.files[0];
  if(!file) return;
  
  const r = new FileReader();
  r.onload = ev => {
    try{
      const d = JSON.parse(ev.target.result);
      localStorage.setItem('da_portfolio', JSON.stringify(d));
      location.reload();
    }catch(err){
      alert('Invalid JSON file');
    }
  };
  r.readAsText(file);
}

function changePassword(){
  const d = getData();
  const cur = document.getElementById('pw-current')?.value;
  const nw = document.getElementById('pw-new')?.value;
  
  if(cur !== d.password){
    const error = document.getElementById('pw-error');
    if(error) error.style.display = 'block';
    return;
  }
  
  if(!nw){
    alert('New password cannot be empty');
    return;
  }
  
  d.password = nw;
  saveData(d);
  
  document.getElementById('pw-current').value = '';
  document.getElementById('pw-new').value = '';
  
  const error = document.getElementById('pw-error');
  if(error) error.style.display = 'none';
  
  showSuccess('pw-success');
}

// Helpers
function showSuccess(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 3000);
}

function escapeHtml(text){
  if(!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
});
