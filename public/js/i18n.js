// Language translations
const translations = {
  en: {
    notes: {
      title: 'Study Notes',
      description: 'Mathematics, Physics, and other study materials with problem-solving methods',
      noContent: 'No Content',
      noContentDesc: 'There are no study notes yet. Please check back later!',
      newerNotes: 'Newer Notes',
      olderNotes: 'Older Notes',
    },
    menu: {
      home: 'Biography',
      cv: 'Academic Profile (CV)',
      projects: 'Research & Inquiry',
      blog: 'Selected Essays',
      notes: 'Study Notes',
      book: 'My Book',
      contact: 'Contact',
    },
    header: {
      name: 'Linkaili',
      sidebarCaption: 'Me and My Little Brother',
    },
    breadcrumb: {
      home: 'Home',
      blog: 'Essays',
      notes: 'Notes',
    },
    home: {
      biographyLabel: 'Biography',
      name: 'Linkaili',
      subtitle: 'Student-Athlete (Golf) & Academic Scholar | Class of 2027',
      bio1: 'Linkaili is a dedicated high school student based in the United States, currently pursuing a rigorous academic curriculum alongside competitive varsity athletics. With a graduation target of 2027, she embodies the <strong>scholar-athlete</strong> ideal—demonstrating discipline on the golf course and intellectual curiosity in the classroom.',
      bio2: 'Her academic interests lie at the intersection of <strong>Science and Social Impact</strong>, exploring how analytical thinking can solve community challenges. As a Varsity Golf team captain, she applies strategic planning and resilience learned from sport to her leadership roles.',
      viewProfile: 'View Academic Profile',
      contactAdmissions: 'Contact for Admissions',
      researchTitle: 'Research & Leadership Highlights',
      golfTitle: 'Varsity Golf Leadership',
      golfDesc: 'Serving as Team Captain to foster a culture of excellence and sportsmanship. Analyzing performance metrics to improve team strategy.',
      envTitle: 'Environmental Impact Study',
      envDesc: 'Independent research investigating sustainable water management practices in local golf courses, bridging athletic interest with environmental science.',
      essaysTitle: 'Selected Essays',
    },
  },
  zh: {
    notes: {
      title: '学习笔记',
      description: '数学、物理等学习资料与解题方法',
      noContent: '暂无内容',
      noContentDesc: '目前还没有学习笔记，稍后再来看看吧！',
      newerNotes: '较新笔记',
      olderNotes: '更早笔记',
    },
    menu: {
      home: '个人简介',
      cv: '学术履历',
      projects: '研究与探索',
      blog: '精选文章',
      notes: '学习笔记',
      book: '我的书籍',
      contact: '联系方式',
    },
    header: {
      name: 'Linkaili',
      sidebarCaption: '我和我的弟弟',
    },
    breadcrumb: {
      home: '首页',
      blog: '文章',
      notes: '笔记',
    },
    home: {
      biographyLabel: '个人简介',
      name: 'Linkaili',
      subtitle: '学生运动员（高尔夫）& 学术学者 | 2027届',
      bio1: 'Linkaili 是一名在美国就读的高中生，目前在追求严谨学术课程的同时参与校队竞技体育。作为2027届毕业生，她践行着<strong>学者运动员</strong>的理想——在高尔夫球场上展现纪律性，在课堂上保持求知欲。',
      bio2: '她的学术兴趣在于<strong>科学与社会影响</strong>的交汇点，探索如何用分析思维解决社区问题。作为校高尔夫球队队长，她将从运动中学到的战略规划和韧性应用于领导角色。',
      viewProfile: '查看学术履历',
      contactAdmissions: '招生咨询联系',
      researchTitle: '研究与领导力亮点',
      golfTitle: '校队高尔夫领导力',
      golfDesc: '担任队长，培养卓越与体育精神的文化。分析表现数据以改进团队策略。',
      envTitle: '环境影响研究',
      envDesc: '独立研究调查当地高尔夫球场的可持续水资源管理实践，将运动兴趣与环境科学相结合。',
      essaysTitle: '精选文章',
    },
  },
};

function getLanguage() {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('language');
  // Default to English if no preference is set
  // Only use stored language if it was explicitly set by user
  if (!stored) return 'en';
  return (stored === 'en' || stored === 'zh') ? stored : 'en';
}

function setLanguage(lang) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
}

function updateLanguage(lang) {
  setLanguage(lang);
  document.documentElement.lang = lang;
  
  // Update menu items
  const menuItems = {
    home: document.getElementById('home'),
    cv: document.getElementById('cv'),
    projects: document.getElementById('projects'),
    blog: document.getElementById('blog'),
    notes: document.getElementById('notes'),
    book: document.getElementById('book'),
  };
  
  if (menuItems.home && translations[lang]) menuItems.home.textContent = translations[lang].menu.home;
  if (menuItems.cv && translations[lang]) menuItems.cv.textContent = translations[lang].menu.cv;
  if (menuItems.projects && translations[lang]) menuItems.projects.textContent = translations[lang].menu.projects;
  if (menuItems.blog && translations[lang]) menuItems.blog.textContent = translations[lang].menu.blog;
  if (menuItems.notes && translations[lang]) menuItems.notes.textContent = translations[lang].menu.notes;
  if (menuItems.book && translations[lang]) menuItems.book.textContent = translations[lang].menu.book;

  // Update contact menu item
  const contactMenu = document.querySelector('[data-i18n="menu-contact"]');
  if (contactMenu && translations[lang]) contactMenu.textContent = translations[lang].menu.contact;

  // Update header and sidebar
  const headerName = document.querySelector('[data-i18n="header-name"]');
  const sidebarCaption = document.querySelector('[data-i18n="sidebar-caption"]');
  if (headerName && translations[lang] && translations[lang].header) {
    headerName.textContent = translations[lang].header.name;
  }
  if (sidebarCaption && translations[lang] && translations[lang].header) {
    sidebarCaption.textContent = translations[lang].header.sidebarCaption;
  }

  // Update breadcrumb navigation
  const breadcrumbHome = document.querySelector('[data-i18n="breadcrumb-home"]');
  const breadcrumbBlog = document.querySelector('[data-i18n="breadcrumb-blog"]');
  const breadcrumbNotes = document.querySelector('[data-i18n="breadcrumb-notes"]');
  if (translations[lang] && translations[lang].breadcrumb) {
    if (breadcrumbHome) breadcrumbHome.textContent = translations[lang].breadcrumb.home;
    if (breadcrumbBlog) breadcrumbBlog.textContent = translations[lang].breadcrumb.blog;
    if (breadcrumbNotes) breadcrumbNotes.textContent = translations[lang].breadcrumb.notes;
  }

  // Update notes page content if on notes page
  const notesTitle = document.querySelector('[data-i18n="notes-title"]');
  const notesDesc = document.querySelector('[data-i18n="notes-desc"]');
  const notesNoContent = document.querySelector('[data-i18n="notes-no-content"]');
  const notesNoContentDesc = document.querySelector('[data-i18n="notes-no-content-desc"]');
  const notesNewer = document.querySelector('[data-i18n="notes-newer"]');
  const notesOlder = document.querySelector('[data-i18n="notes-older"]');

  if (notesTitle && translations[lang]) notesTitle.textContent = translations[lang].notes.title;
  if (notesDesc && translations[lang]) notesDesc.textContent = translations[lang].notes.description;
  if (notesNoContent && translations[lang]) notesNoContent.textContent = translations[lang].notes.noContent;
  if (notesNoContentDesc && translations[lang]) notesNoContentDesc.textContent = translations[lang].notes.noContentDesc;
  if (notesNewer && translations[lang]) notesNewer.textContent = translations[lang].notes.newerNotes;
  if (notesOlder && translations[lang]) notesOlder.textContent = translations[lang].notes.olderNotes;

  // Update homepage content
  const homeElements = {
    biographyLabel: document.querySelector('[data-i18n="home-biography-label"]'),
    name: document.querySelector('[data-i18n="home-name"]'),
    subtitle: document.querySelector('[data-i18n="home-subtitle"]'),
    bio1: document.querySelector('[data-i18n="home-bio1"]'),
    bio2: document.querySelector('[data-i18n="home-bio2"]'),
    viewProfile: document.querySelector('[data-i18n="home-view-profile"]'),
    contactAdmissions: document.querySelector('[data-i18n="home-contact-admissions"]'),
    researchTitle: document.querySelector('[data-i18n="home-research-title"]'),
    golfTitle: document.querySelector('[data-i18n="home-golf-title"]'),
    golfDesc: document.querySelector('[data-i18n="home-golf-desc"]'),
    envTitle: document.querySelector('[data-i18n="home-env-title"]'),
    envDesc: document.querySelector('[data-i18n="home-env-desc"]'),
    essaysTitle: document.querySelector('[data-i18n="home-essays-title"]'),
  };

  if (translations[lang] && translations[lang].home) {
    const t = translations[lang].home;
    if (homeElements.biographyLabel) homeElements.biographyLabel.textContent = t.biographyLabel;
    if (homeElements.name) homeElements.name.textContent = t.name;
    if (homeElements.subtitle) homeElements.subtitle.textContent = t.subtitle;
    if (homeElements.bio1) homeElements.bio1.innerHTML = t.bio1;
    if (homeElements.bio2) homeElements.bio2.innerHTML = t.bio2;
    if (homeElements.viewProfile) homeElements.viewProfile.textContent = t.viewProfile;
    if (homeElements.contactAdmissions) homeElements.contactAdmissions.textContent = t.contactAdmissions;
    if (homeElements.researchTitle) homeElements.researchTitle.textContent = t.researchTitle;
    if (homeElements.golfTitle) homeElements.golfTitle.textContent = t.golfTitle;
    if (homeElements.golfDesc) homeElements.golfDesc.textContent = t.golfDesc;
    if (homeElements.envTitle) homeElements.envTitle.textContent = t.envTitle;
    if (homeElements.envDesc) homeElements.envDesc.textContent = t.envDesc;
    if (homeElements.essaysTitle) homeElements.essaysTitle.textContent = t.essaysTitle;
  }

  // Filter notes list by language
  const notesList = document.getElementById('notes-list');
  const emptyState = document.getElementById('notes-empty-state');
  if (notesList) {
    const noteItems = notesList.querySelectorAll('.note-item');
    let visibleCount = 0;
    noteItems.forEach(item => {
      const itemLang = item.getAttribute('data-lang');
      if (itemLang === lang) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });
    // Show empty state if no notes visible
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }
  
  // Update language toggle buttons
  const langDisplay = document.getElementById('lang-display');
  const langDisplayMobile = document.getElementById('lang-display-mobile');
  if (langDisplay) {
    langDisplay.textContent = lang === 'en' ? '中文' : 'EN';
  }
  if (langDisplayMobile) {
    langDisplayMobile.textContent = lang === 'en' ? '中文' : 'EN';
  }
}

// Initialize language function
function initLanguage() {
  const stored = localStorage.getItem('language');
  const currentLang = (stored === 'en' || stored === 'zh') ? stored : 'en';

  // Apply the stored language (or default to English)
  updateLanguage(currentLang);

  // Set up language toggle buttons
  const langToggle = document.getElementById('lang-toggle');
  const langToggleMobile = document.getElementById('lang-toggle-mobile');

  function setupToggle(button) {
    if (button) {
      // Remove existing listeners by cloning and replacing
      const newToggle = button.cloneNode(true);
      button.parentNode?.replaceChild(newToggle, button);

      newToggle.addEventListener('click', () => {
        const currentLang = getLanguage();
        const newLang = currentLang === 'en' ? 'zh' : 'en';
        // Save user's explicit choice
        localStorage.setItem('language', newLang);
        updateLanguage(newLang);
      });
    }
  }

  setupToggle(langToggle);
  setupToggle(langToggleMobile);
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  // DOMContentLoaded has already fired
  initLanguage();
}

// Re-initialize after Astro ViewTransitions page navigation
document.addEventListener('astro:page-load', initLanguage);
