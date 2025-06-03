
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
      const response = await fetch('https://sharepoint-dot-solution-builder-421307.ew.r.appspot.com/v1/records?listName=Contacts', {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      loading.style.display = "none";

      if (response.ok) {
        successMsg.innerText = "Form submitted successfully!";
        form.reset();
      } else {
        const errorData = await response.json();
        errorMsg.innerText = "Error: " + (errorData.message || "Submission failed.");
      }
    } catch (error) {
      loading.style.display = "none";
      errorMsg.innerText = "Network error: " + error.message;
    }
  });
