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
  // Default to English - always start with English
  // Only apply Chinese if user explicitly toggles in this session
  const stored = localStorage.getItem('language');
  
  // Always default to English on page load
  // Keep the default English text from HTML, don't modify it
  const langDisplay = document.getElementById('lang-display');
  const langDisplayMobile = document.getElementById('lang-display-mobile');
  if (langDisplay) {
    langDisplay.textContent = '中文';
  }
  if (langDisplayMobile) {
    langDisplayMobile.textContent = '中文';
  }
  document.documentElement.lang = 'en';
  
  // Only apply stored language if it was explicitly set to Chinese
  // and user wants to keep it (we'll respect their choice after they toggle)
  // For now, always start with English
  if (stored === 'zh') {
    // User previously chose Chinese, but we'll start with English
    // They can toggle to Chinese if they want
    // Uncomment the line below if you want to respect previous choice:
    // updateLanguage('zh');
  }
  
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
