document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".php-email-form");
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      // Replace with your SharePoint site and list details
      const siteUrl = "https://yourtenant.sharepoint.com/sites/yoursite";
      const listName = "ContactFormSubmissions";
  
      // Replace with your access token (from MSAL or other auth)
      const accessToken = "YOUR_ACCESS_TOKEN_HERE";
  
      const formData = new FormData(form);
  
      // Construct SharePoint List Item payload
      const payload = {
        fields: {
          CompanyName: formData.getAll("name")[0], // assuming first "name" is company
          YourName: formData.getAll("name")[1],
          Email: formData.get("email"),
          PhoneNumber: formData.get("phoneNumber"),
          Street: formData.getAll("number")[0],
          ZipCity: formData.getAll("number")[1],
          Subject: formData.get("subject"),
          Message: formData.get("message"),
        },
      };
  
      try {
        const response = await fetch(
          `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`,
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Accept": "application/json;odata=verbose",
              "Content-Type": "application/json;odata=verbose",
            },
            body: JSON.stringify(payload),
          }
        );
  
        if (!response.ok) {
          throw new Error("Error saving data to SharePoint.");
        }
  
        document.querySelector(".sent-message").style.display = "block";
      } catch (error) {
        console.error("Submission error:", error);
        document.querySelector(".error-message").textContent = error.message;
        document.querySelector(".error-message").style.display = "block";
      }
    });
  });
  