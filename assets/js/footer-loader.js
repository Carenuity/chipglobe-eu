
// fetch("footer.html")
//   .then(res => res.text())
//   .then(html => {
//     document.getElementById("footer-container").innerHTML = html;
   
//   })
//   .catch(err => console.error("Footer load failed", err));

  fetch("/footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer-container").innerHTML = html;
  });
