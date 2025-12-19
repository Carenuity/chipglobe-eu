// --------------------------------------------------
// Detect page namespace (data-page="home", etc.)
// --------------------------------------------------
const page = document.body.dataset.page || "common";

// --------------------------------------------------
// i18next initialization
// --------------------------------------------------
i18next
  .use(i18nextHttpBackend)
  .init({
    lng: localStorage.getItem("selectedLanguage") || "en",
    fallbackLng: "de",
    ns: [page, "footer"],
    defaultNS: page,
    backend: {
      loadPath: "locales/{{lng}}/{{ns}}.json"
    }
  });

// --------------------------------------------------
// Apply translations on language change
// --------------------------------------------------
i18next.on("languageChanged", () => {
  applyTranslations();
});

// --------------------------------------------------
// Translation renderer
// --------------------------------------------------
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const value = i18next.t(key);

    // Support \n line breaks from JSON
    el.innerHTML = value.replace(/\n/g, "<br>");
  });
}

// Make global (footer injection, etc.)
window.applyTranslations = applyTranslations;

// --------------------------------------------------
// Language switch handler
// --------------------------------------------------
function changeLanguage(lang) {
  localStorage.setItem("selectedLanguage", lang);
  i18next.changeLanguage(lang);
  setActiveLang(lang);
}

window.changeLanguage = changeLanguage;

// --------------------------------------------------
// Highlight active language
// --------------------------------------------------
function setActiveLang(lang) {
  const en = document.getElementById("lang-en");
  const de = document.getElementById("lang-de");

  if (!en || !de) return;

  en.classList.toggle("active", lang === "en");
  de.classList.toggle("active", lang === "de");
}

// --------------------------------------------------
// Apply highlight from saved state
// --------------------------------------------------
function applyLangUI() {
  const lang = localStorage.getItem("selectedLanguage") || "en";
  setActiveLang(lang);
}

// --------------------------------------------------
// 1️⃣ Run immediately (index.html)
// --------------------------------------------------
applyLangUI();

// --------------------------------------------------
// 2️⃣ Observe injected nav/footer (other pages)
// --------------------------------------------------
const observer = new MutationObserver(() => {
  const en = document.getElementById("lang-en");
  const de = document.getElementById("lang-de");

  if (en && de) {
    applyLangUI();
    observer.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
