// Click-to-copy for address blocks.
// Any element with the class "copyable-address" becomes clickable: hovering
// shows a "Click to copy" hint and clicking copies its text to the clipboard.
// Event delegation is used so dynamically injected content (e.g. the footer)
// is handled without needing to re-bind.
(function () {
  function getAddressText(el) {
    return (el.innerText || el.textContent || "")
      .replace(/[ \t]+/g, " ")
      .replace(/\s*\n\s*/g, "\n")
      .trim();
  }

  function fallbackCopy(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (e) {
      /* ignore */
    }
    document.body.removeChild(textarea);
  }

  function showCopied(el) {
    el.classList.add("address-copied");
    setTimeout(function () {
      el.classList.remove("address-copied");
    }, 1500);
  }

  document.addEventListener("click", function (e) {
    if (!e.target || !e.target.closest) return;
    var el = e.target.closest(".copyable-address");
    if (!el) return;

    // Don't hijack clicks on real links inside an address block.
    if (e.target.closest("a")) return;

    var text = getAddressText(el);
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () {
          showCopied(el);
        },
        function () {
          fallbackCopy(text);
          showCopied(el);
        }
      );
    } else {
      fallbackCopy(text);
      showCopied(el);
    }
  });
})();
