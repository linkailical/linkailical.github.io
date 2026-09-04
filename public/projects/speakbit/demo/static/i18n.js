(function initVoiceGraphI18n(global) {
  "use strict";

  const DEFAULT_LOCALE = "zh-CN";
  const STORAGE_KEY = "voice-graph.locale";
  const SUPPORTED_LOCALES = ["zh-CN", "en-US"];
  const bundles = new Map();
  const listeners = new Set();

  function normalizeLocale(value) {
    const locale = String(value || "").trim().toLowerCase();
    if (locale === "zh" || locale.startsWith("zh-")) return "zh-CN";
    if (locale === "en" || locale.startsWith("en-")) return "en-US";
    return null;
  }

  function detectLocale() {
    try {
      const saved = normalizeLocale(global.localStorage && global.localStorage.getItem(STORAGE_KEY));
      if (saved) return saved;
    } catch (_) {}
    const browserLocales = (global.navigator && global.navigator.languages) || [
      global.navigator && global.navigator.language,
    ];
    for (const candidate of browserLocales) {
      const normalized = normalizeLocale(candidate);
      if (normalized) return normalized;
    }
    return DEFAULT_LOCALE;
  }

  let currentLocale = detectLocale();

  function register(locale, messages) {
    const normalized = normalizeLocale(locale);
    if (!normalized || !SUPPORTED_LOCALES.includes(normalized)) {
      throw new Error(`Unsupported locale: ${locale}`);
    }
    bundles.set(normalized, Object.freeze({ ...(messages || {}) }));
  }

  function interpolate(template, params) {
    return String(template).replace(/\{([A-Za-z0-9_]+)\}/g, (match, key) => {
      if (!params || !Object.prototype.hasOwnProperty.call(params, key)) return match;
      return String(params[key]);
    });
  }

  function t(key, params) {
    const active = bundles.get(currentLocale) || {};
    const fallback = bundles.get(DEFAULT_LOCALE) || {};
    const value = active[key] == null ? fallback[key] : active[key];
    if (value == null) {
      if (global.console && typeof global.console.warn === "function") {
        global.console.warn(`[i18n] Missing translation: ${key}`);
      }
      return key;
    }
    return interpolate(value, params);
  }

  function translateAttribute(root, selector, attribute, dataName) {
    root.querySelectorAll(selector).forEach((element) => {
      element.setAttribute(attribute, t(element.dataset[dataName]));
    });
  }

  function applyDocumentTranslations(root) {
    const scope = root || global.document;
    if (!scope || typeof scope.querySelectorAll !== "function") return;
    scope.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    translateAttribute(scope, "[data-i18n-placeholder]", "placeholder", "i18nPlaceholder");
    translateAttribute(scope, "[data-i18n-title]", "title", "i18nTitle");
    translateAttribute(scope, "[data-i18n-aria-label]", "aria-label", "i18nAriaLabel");
    translateAttribute(scope, "[data-i18n-alt]", "alt", "i18nAlt");
    if (global.document) {
      global.document.documentElement.lang = currentLocale;
      global.document.title = t("app.title");
    }
  }

  function setLocale(value) {
    const next = normalizeLocale(value) || DEFAULT_LOCALE;
    if (!SUPPORTED_LOCALES.includes(next)) return currentLocale;
    const changed = next !== currentLocale;
    currentLocale = next;
    try {
      if (global.localStorage) global.localStorage.setItem(STORAGE_KEY, currentLocale);
    } catch (_) {}
    applyDocumentTranslations();
    if (changed) listeners.forEach((listener) => listener(currentLocale));
    return currentLocale;
  }

  function onChange(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function formatDateTime(value) {
    if (!value) return "";
    return new Intl.DateTimeFormat(currentLocale, {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(value));
  }

  function formatNumber(value, options) {
    return new Intl.NumberFormat(currentLocale, options).format(value);
  }

  global.VoiceGraphI18n = Object.freeze({
    DEFAULT_LOCALE,
    STORAGE_KEY,
    SUPPORTED_LOCALES: Object.freeze([...SUPPORTED_LOCALES]),
    applyDocumentTranslations,
    formatDateTime,
    formatNumber,
    getLocale: () => currentLocale,
    normalizeLocale,
    onChange,
    register,
    setLocale,
    t,
  });
})(window);
