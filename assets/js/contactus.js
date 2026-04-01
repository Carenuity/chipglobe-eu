
 document.getElementById("sharepointForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    Name: form.name.value,
    Email: form.email.value,
    Company: form.company.value,
    Mobile: form.mobile.value,
    Street: form.street.value,
    Zip: form.zip.value,
    Subject: form.subject.value,
    Message: form.message.value
  };

  const loading = document.querySelector(".loading");
  const errorMsg = document.querySelector(".error-message");
  const successMsg = document.querySelector(".sent-message");

  loading.style.display = "block";
  errorMsg.innerText = "";
  successMsg.innerText = "";

  try {
    const response = await fetch(`${SHAREPOINT_API_BASE}/Contacts/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields: data })
    });

    loading.style.display = "none";

    if (response.ok) {
      showPopup("Form submitted successfully!", true);
      form.reset();
    } else {
      const errorData = await response.json();
      showPopup("Error: " + (errorData.message || "Submission failed."), false);
    }
  } catch (error) {
    loading.style.display = "none";
    showPopup("Network error: " + error.message, false);
  }
});

function showPopup(message, isSuccess) {
  const popup = document.getElementById("popup-message");
  popup.innerText = message;
  popup.classList.remove("hide", "error");

  if (isSuccess) {
    popup.style.color = "green";
  } else {
    popup.style.color = "red";
    popup.classList.add("error");
  }

  popup.style.display = "block";

  setTimeout(() => {
    popup.classList.add("hide");
    setTimeout(() => {
      popup.style.display = "none";
    }, 500);
  }, 5000);
}
