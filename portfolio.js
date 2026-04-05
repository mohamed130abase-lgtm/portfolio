// Portfolio JavaScript - Data, Rendering, and Theme Toggle

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

// State Management
function getData(){
  try{
    const d = localStorage.getItem('da_portfolio');
    return d ? JSON.parse(d) : JSON.parse(JSON.stringify(DEFAULTS));
  }catch(e){
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
}

// Theme Management
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

// Rendering Functions
function renderAll(){
  const d = getData();
  renderSettings(d.settings);
  renderSkillsSection(d.skills);
  renderProjectsSection(d.projects);
  renderTimeline(d.experience);
  renderCerts(d.certs);
  renderContact(d.settings);
}

function renderSettings(s){
  const heroName = document.getElementById('hero-name');
  const heroTitle = document.getElementById('hero-title');
  const heroBio = document.getElementById('hero-bio');
  const aboutInitials = document.getElementById('about-initials');
  const aboutBioText = document.getElementById('about-bio-text');
  const aboutTags = document.getElementById('about-tags');
  const footerCopy = document.getElementById('footer-copy');
  
  if(heroName) heroName.innerHTML = nameHtml(s.name);
  if(heroTitle) heroTitle.textContent = s.title;
  if(heroBio) heroBio.textContent = s.bio;
  if(aboutInitials) aboutInitials.textContent = initials(s.name);
  if(aboutBioText) aboutBioText.innerHTML = `<p>${s.about1}</p><p>${s.about2}</p>`;
  if(aboutTags) aboutTags.innerHTML = s.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('');
  
  const statIds = [
    ['stat1', 'stat1-label', s.s1v, s.s1l],
    ['stat2', 'stat2-label', s.s2v, s.s2l],
    ['stat3', 'stat3-label', s.s3v, s.s3l],
    ['stat4', 'stat4-label', s.s4v, s.s4l]
  ];
  
  statIds.forEach(([valId, labelId, val, label]) => {
    const valEl = document.getElementById(valId);
    const labelEl = document.getElementById(labelId);
    if(valEl) valEl.textContent = val;
    if(labelEl) labelEl.textContent = label;
  });
  
  if(footerCopy) footerCopy.textContent = `© ${new Date().getFullYear()} ${s.name} · Data Analyst`;
}

function nameHtml(name){
  const parts = name.trim().split(' ');
  if(parts.length < 2) return name;
  return parts.slice(0, -1).join(' ') + ' <span>' + parts[parts.length - 1] + '</span>';
}

function initials(name){
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function renderSkillsSection(skills){
  const g = document.getElementById('skills-grid');
  if(!g) return;
  
  const bycat = {};
  skills.forEach(s => {
    bycat[s.cat] = bycat[s.cat] || [];
    bycat[s.cat].push(s);
  });
  
  g.innerHTML = Object.entries(bycat).map(([cat, items]) => `
    <div class="skills-category">
      <h3>${escapeHtml(cat)}</h3>
      ${items.map(s => `
        <div class="skill-item">
          <div class="skill-header">
            <span class="skill-name">${escapeHtml(s.name)}</span>
            <span class="skill-pct">${s.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-fill" style="width:${s.level}%"></div>
          </div>
        </div>`).join('')}
    </div>`).join('');
}

function renderProjectsSection(projects){
  const g = document.getElementById('projects-grid');
  if(!g) return;
  
  if(!projects.length){
    g.innerHTML = '<p style="color:var(--text2)">No projects yet. Add some in the admin dashboard.</p>';
    return;
  }
  
  g.innerHTML = projects.map(p => `
    <div class="project-card">
      <div class="project-cat">${escapeHtml(p.cat)}</div>
      <div class="project-title">${escapeHtml(p.title)}</div>
      <div class="project-desc">${escapeHtml(p.desc)}</div>
      <div class="project-tools">${p.tools.split(',').map(t => `<span class="project-tool">${escapeHtml(t.trim())}</span>`).join('')}</div>
      ${p.link ? `<a href="${escapeHtml(p.link)}" target="_blank" class="project-link">View Project →</a>` : ''}
    </div>`).join('');
}

function renderTimeline(exp){
  const t = document.getElementById('timeline');
  if(!t) return;
  
  if(!exp.length){
    t.innerHTML = '<p style="color:var(--text2)">No experience added yet.</p>';
    return;
  }
  
  t.innerHTML = exp.map(e => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-date">${escapeHtml(e.start)} — ${escapeHtml(e.end)}</div>
      <div class="timeline-role">${escapeHtml(e.role)}</div>
      <div class="timeline-company">${escapeHtml(e.company)}</div>
      <div class="timeline-desc">${escapeHtml(e.desc)}</div>
    </div>`).join('');
}

function renderCerts(certs){
  const g = document.getElementById('certs-grid');
  if(!g) return;
  
  const colors = {
    cyan: 'rgba(0,217,255,0.15)',
    gold: 'rgba(245,158,11,0.15)',
    purple: 'rgba(139,92,246,0.15)',
    green: 'rgba(16,185,129,0.15)'
  };
  const tc = {
    cyan: 'var(--primary)',
    gold: 'var(--secondary)',
    purple: 'var(--accent)',
    green: 'var(--success)'
  };
  
  if(!certs.length){
    g.innerHTML = '<p style="color:var(--text2)">No certifications added yet.</p>';
    return;
  }
  
  g.innerHTML = certs.map(c => `
    <div class="cert-card">
      <div class="cert-icon" style="background:${colors[c.color] || colors.cyan};color:${tc[c.color] || tc.cyan}">${escapeHtml(c.icon)}</div>
      <div>
        <div class="cert-name">${escapeHtml(c.name)}</div>
        <div class="cert-issuer">${escapeHtml(c.issuer)}</div>
        <div class="cert-year">${escapeHtml(c.year)}</div>
      </div>
    </div>`).join('');
}

function renderContact(s){
  const links = document.getElementById('contact-links');
  if(!links) return;
  
  let html = `
    <a href="mailto:${encodeURIComponent(s.email)}" class="contact-link">
      <div class="contact-link-icon">✉</div>
      <div>
        <div class="contact-link-text">Email Me</div>
        <div class="contact-link-sub">${escapeHtml(s.email)}</div>
      </div>
    </a>`;
  
  if(s.linkedin){
    html += `
    <a href="https://${escapeHtml(s.linkedin)}" target="_blank" class="contact-link">
      <div class="contact-link-icon">in</div>
      <div>
        <div class="contact-link-text">LinkedIn</div>
        <div class="contact-link-sub">${escapeHtml(s.linkedin)}</div>
      </div>
    </a>`;
  }
  
  if(s.github){
    html += `
    <a href="https://${escapeHtml(s.github)}" target="_blank" class="contact-link">
      <div class="contact-link-icon">gh</div>
      <div>
        <div class="contact-link-text">GitHub</div>
        <div class="contact-link-sub">${escapeHtml(s.github)}</div>
      </div>
    </a>`;
  }
  
  if(s.location){
    html += `
    <div class="contact-link" style="cursor:default">
      <div class="contact-link-icon">📍</div>
      <div>
        <div class="contact-link-text">Location</div>
        <div class="contact-link-sub">${escapeHtml(s.location)}</div>
      </div>
    </div>`;
  }
  
  links.innerHTML = html;
}

function sendContact(){
  const name = document.getElementById('cf-name');
  const email = document.getElementById('cf-email');
  const msg = document.getElementById('cf-msg');
  const success = document.getElementById('contact-success');
  
  if(!name || !email || !msg) return;
  
  if(!name.value || !email.value || !msg.value){
    alert('Please fill in all fields.');
    return;
  }
  
  if(success) success.style.display = 'block';
  name.value = '';
  email.value = '';
  msg.value = '';
  
  setTimeout(() => {
    if(success) success.style.display = 'none';
  }, 5000);
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

// Particle Animation
function initParticles(){
  const c = document.getElementById('particleCanvas');
  if(!c) return;
  
  const ctx = c.getContext('2d');
  let w, h, particles = [];
  
  function resize(){
    w = c.width = c.offsetWidth;
    h = c.height = c.offsetHeight;
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  function Particle(){
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) - 0.2;
    this.opacity = Math.random() * 0.4 + 0.1;
  }
  
  for(let i = 0; i < 60; i++){
    particles.push(new Particle());
  }
  
  function draw(){
    ctx.clearRect(0, 0, w, h);
    
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 217, 255, ${p.opacity})`;
      ctx.fill();
      
      p.x += p.speedX;
      p.y += p.speedY;
      
      if(p.y < -10 || p.x < -10 || p.x > w + 10){
        p.x = Math.random() * w;
        p.y = h + 10;
      }
      
      particles.forEach(p2 => {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if(dist < 120){
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 217, 255, ${0.04 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

// Scroll Animations
function initScrollAnim(){
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        
        if(e.target.classList.contains('skill-fill')){
          const w = e.target.dataset.width;
          setTimeout(() => e.target.style.width = w, 100);
        }
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.project-card, .timeline-item, .cert-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    obs.observe(el);
  });
  
  document.querySelectorAll('.skill-fill').forEach(el => {
    el.dataset.width = el.style.width;
    el.style.width = '0';
    obs.observe(el);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderAll();
  initParticles();
  setTimeout(initScrollAnim, 300);
});
