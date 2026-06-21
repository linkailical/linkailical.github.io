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
      subtitle: 'Student-Athlete (Golf & Badminton) & Community Leader | Class of 2027',
      bio1: 'Linkaili is a high school student at <strong>Portola High School</strong> in Irvine, California (Class of 2027). She is a three-year member of the girls golf team—<strong>back-to-back CIF Division II champions</strong> (2024–25 and 2025–26)—and the top girls\' player and treasurer of the badminton club she helped found.',
      bio2: 'Beyond competition, she leads and serves: a kids\' buddy for children with special needs at Mariners Church, an assistant badminton coach for the Pureking community program, and a dragon dancer at Irvine Chinese School. She founded her school\'s <strong>Dragon &amp; Lion Dance Club</strong> to share Chinese culture—approved to launch next school year.',
      viewProfile: 'View Academic Profile',
      contactAdmissions: 'Contact for Admissions',
      researchTitle: 'Research & Leadership Highlights',
      golfTitle: 'CIF Division II Champion — Girls Golf',
      golfDesc: 'Three-year member of Portola High School\'s girls golf team — back-to-back CIF Division II champions (2024–25 and 2025–26).',
      envTitle: 'Leadership, Culture & Service',
      envDesc: 'Founder of the school\'s Dragon & Lion Dance Club, badminton club treasurer, and a volunteer at Mariners Church, Pureking, and Irvine Chinese School.',
      roboticsTitle: 'Robotics Engineering — Voice Dog',
      roboticsDesc: 'A continuing robotics project family, starting with a Petoi Bittle X V2 voice dog that turns spoken commands into expressive actions.',
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
      subtitle: '学生运动员（高尔夫 & 羽毛球）& 社区领袖 | 2027届',
      bio1: 'Linkaili 就读于加州尔湾的 <strong>Portola High School</strong>（2027届）。她是女子高尔夫球队的三年队员——球队<strong>连续两年蝉联 CIF 第二组别冠军</strong>（2024–25、2025–26）；她也是校羽毛球俱乐部的财务主管、并参与创建了校羽毛球队，目前是队内女子第一号选手。',
      bio2: '在竞技之外，她积极服务社区：在 Mariners Church 担任特殊需要儿童的伙伴，在政府项目 Pureking 担任羽毛球助理教练，并在尔湾中文学校参与舞龙。她还发起创建了学校的<strong>舞龙舞狮俱乐部</strong>以传播中华文化，已获批将于下学年启动。',
      viewProfile: '查看学术履历',
      contactAdmissions: '招生咨询联系',
      researchTitle: '研究与领导力亮点',
      golfTitle: 'CIF 第二组别冠军 — 女子高尔夫',
      golfDesc: 'Portola High School 女子高尔夫球队三年队员——连续两年蝉联 CIF 第二组别冠军（2024–25、2025–26）。',
      envTitle: '领导力、文化与服务',
      envDesc: '学校舞龙舞狮俱乐部创始人、羽毛球俱乐部财务主管，并在 Mariners Church、Pureking 与尔湾中文学校参与志愿服务。',
      roboticsTitle: '机器人工程 — 语音小狗',
      roboticsDesc: '一个持续迭代的机器人项目分类，第一版用 Petoi Bittle X V2 把语音命令转化为表情化动作。',
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
    roboticsTitle: document.querySelector('[data-i18n="home-robotics-title"]'),
    roboticsDesc: document.querySelector('[data-i18n="home-robotics-desc"]'),
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
    if (homeElements.roboticsTitle) homeElements.roboticsTitle.textContent = t.roboticsTitle;
    if (homeElements.roboticsDesc) homeElements.roboticsDesc.textContent = t.roboticsDesc;
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
