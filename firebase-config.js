// Firebase Configuration
// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Data collection reference
const portfolioRef = db.collection('portfolio').doc('data');

// Default data structure
const DEFAULT_DATA = {
  settings: {
    name: 'Ahmed Hassan',
    title: 'Data Analyst & BI Specialist',
    email: 'hello@ahmedhassan.com',
    linkedin: 'linkedin.com/in/ahmed-hassan',
    github: 'github.com/ahmed-hassan',
    location: 'Cairo, Egypt',
    bio: 'Transforming raw data into powerful insights. Specializing in advanced analytics, visualization, and data-driven decision making.',
    about1: "I'm a passionate Data Analyst with expertise in transforming complex datasets into clear, actionable insights. I combine statistical rigor with compelling storytelling to help organizations make data-driven decisions.",
    about2: 'My approach bridges the gap between technical analysis and business strategy, ensuring that data insights directly translate into measurable outcomes.',
    tags: 'Python, SQL, Power BI, Machine Learning, Statistics',
    s1v: '50+',
    s1l: 'Projects Completed',
    s2v: '5+',
    s2l: 'Years Experience',
    s3v: '20+',
    s3l: 'Tools & Technologies',
    s4v: '30+',
    s4l: 'Happy Clients',
    image: ''
  },
  projects: [
    {
      id: 1,
      title: 'Sales Performance Dashboard',
      cat: 'Data Visualization',
      desc: 'Interactive Power BI dashboard tracking KPIs across 15 regions with drill-down capabilities and real-time data refresh.',
      tools: 'Power BI, SQL Server, DAX',
      link: 'https://github.com'
    },
    {
      id: 2,
      title: 'Customer Churn Prediction',
      cat: 'Machine Learning',
      desc: 'ML model achieving 87% accuracy in predicting customer churn, enabling proactive retention strategies that saved $2M annually.',
      tools: 'Python, Scikit-learn, Pandas, Matplotlib',
      link: 'https://github.com'
    },
    {
      id: 3,
      title: 'Supply Chain Analytics',
      cat: 'Business Intelligence',
      desc: 'End-to-end supply chain optimization using demand forecasting and inventory modeling, reducing stockouts by 40%.',
      tools: 'Python, SQL, Tableau, Excel',
      link: ''
    }
  ],
  skills: [
    { id: 1, name: 'Python', cat: 'Programming & Tools', level: 92 },
    { id: 2, name: 'SQL', cat: 'Databases & SQL', level: 95 },
    { id: 3, name: 'Power BI', cat: 'Visualization', level: 90 },
    { id: 4, name: 'Tableau', cat: 'Visualization', level: 85 },
    { id: 5, name: 'Machine Learning', cat: 'Machine Learning', level: 78 },
    { id: 6, name: 'Excel / VBA', cat: 'Programming & Tools', level: 88 }
  ],
  experience: [
    {
      id: 1,
      role: 'Senior Data Analyst',
      company: 'Tech Corp Egypt',
      start: 'Mar 2022',
      end: 'Present',
      desc: 'Lead analytics team of 5, built company-wide BI framework, reduced reporting time by 60%.'
    },
    {
      id: 2,
      role: 'Data Analyst',
      company: 'Cairo Analytics Ltd',
      start: 'Jan 2020',
      end: 'Feb 2022',
      desc: 'Designed 30+ dashboards for C-suite, automated ETL pipelines, supported product decisions.'
    }
  ],
  certs: [
    { id: 1, name: 'Google Data Analytics Certificate', issuer: 'Google / Coursera', year: '2023', color: 'cyan', icon: 'GD' },
    { id: 2, name: 'Microsoft Power BI Data Analyst', issuer: 'Microsoft', year: '2023', color: 'gold', icon: 'PB' },
    { id: 3, name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2022', color: 'green', icon: 'AW' }
  ],
  password: 'admin123'
};

// Load data from Firebase with fallback
async function loadFirebaseData(){
  try {
    const doc = await portfolioRef.get();
    if (doc.exists) {
      return doc.data();
    } else {
      // Initialize with default data if not exists
      await portfolioRef.set(DEFAULT_DATA);
      return DEFAULT_DATA;
    }
  } catch (error) {
    console.error('Firebase load error:', error);
    // Fallback to localStorage
    const local = localStorage.getItem('da_portfolio');
    if (local) return JSON.parse(local);
    return DEFAULT_DATA;
  }
}

// Save data to Firebase
async function saveFirebaseData(data){
  try {
    await portfolioRef.set(data);
    // Also save to localStorage as backup
    localStorage.setItem('da_portfolio', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Firebase save error:', error);
    // Save to localStorage only
    localStorage.setItem('da_portfolio', JSON.stringify(data));
    return false;
  }
}

// Real-time listener for data changes
function onDataChange(callback){
  return portfolioRef.onSnapshot((doc) => {
    if (doc.exists) {
      callback(doc.data());
    }
  }, (error) => {
    console.error('Realtime listener error:', error);
  });
}
