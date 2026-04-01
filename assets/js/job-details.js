
// Get job ID from URL
const jobId = new URLSearchParams(window.location.search).get("id");

async function fetchJobDetails() {
  try {
    const response = await fetch(`${SHAREPOINT_API_BASE}/Jobs/items/${jobId}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    const job = data.data;

    if (!job) {
      document.getElementById("jobTitle").textContent = "Job not found";
      document.getElementById("jobDescription").textContent = "";
      document.getElementById("jobRequirements").textContent = "";
      return;
    }

    renderJob(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
  }
}

function renderJob(job) {
  document.getElementById("jobTitle").textContent = job.Title;

  // Optional: preserve line breaks in description
  document.getElementById("jobDescription").innerHTML = job.Description.replace(/\n/g, "<br>");

  // Render Technical Requirements as list
  const requirementsContainer = document.getElementById("jobRequirements");
  const reqList = job.Technical_requirements
    ? job.Technical_requirements.split(/\r?\n/).filter(line => line.trim() !== "")
    : [];

  if (reqList.length) {
    const ul = document.createElement("ul");
    reqList.forEach(req => {
      const li = document.createElement("li");
      li.textContent = req;
      ul.appendChild(li);
    });
    requirementsContainer.innerHTML = "";
    requirementsContainer.appendChild(ul);
  } else {
    requirementsContainer.textContent = "No requirements specified.";
  }
}

// Init
document.addEventListener("DOMContentLoaded", fetchJobDetails);
