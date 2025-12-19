


  // fetch("/footer.html")
  // .then(res => res.text())
  // .then(html => {
  //   document.getElementById("footer-container").innerHTML = html;
  // });
  
  fetch("footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer-container").innerHTML = html;

    // 🔥 CRITICAL
    applyTranslations();
    applyLangUI();
  });

