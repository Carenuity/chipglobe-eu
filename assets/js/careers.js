const API_URL =
  "https://sharepoint-dot-solution-builder-421307.ew.r.appspot.com/v1/records?listName=Jobs";

let allJobs = [];

/**
 * Truncate text to 300 chars
 */
function truncateText(text, maxLength = 300) {
  if (!text) return "";
  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
}

/**
 * Fetch jobs
 */
async function fetchJobs() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    // IMPORTANT: SharePoint structure
    allJobs = result?.data?.items || [];

    renderJobs(allJobs);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  }
}

/**
 * Render cards
 */
function renderJobs(jobs) {
  const container = document.getElementById("jobsContainer");

  if (!container) return;

  if (!jobs.length) {
    container.innerHTML = "<p>No jobs available.</p>";
    return;
  }

  container.innerHTML = "";

  jobs.forEach(job => {
    container.innerHTML += `
      <div class="col-lg-4">
        <div class="card job-card h-100">
          <div class="card-body d-flex flex-column">
            <h6><strong>${job.Title}</strong></h6>
            <hr />
            <strong>Job description</strong>
            <p>${truncateText(job.Description)}</p>

            <a
              href="job-details.html?id=${job.Id}"
              class="mt-auto"
              style="font-size:16px"
            >
              <u>Learn More</u> →
            </a>
          </div>
        </div>
      </div>
    `;
  });
}

/**
 * Apply filters
 */
function applyFilters() {
  const type = document.getElementById("jobType").value.trim().toLowerCase();
  const location = document.getElementById("location").value.trim().toLowerCase();
  const search = document.getElementById("searchInput").value.trim().toLowerCase();

  const filtered = allJobs.filter(job => {
    const jobType = (job.Kind || "").toLowerCase();
    const jobLocation = (job.Country || "").toLowerCase();
    const title = (job.Title || "").toLowerCase();
    const description = (job.Description || "").toLowerCase();

    const matchType = !type || jobType === type;
    const matchLocation = !location || jobLocation === location;
    const matchSearch =
      !search ||
      title.includes(search) ||
      description.includes(search);

    return matchType && matchLocation && matchSearch;
  });

  renderJobs(filtered);
}


/**
 * Events
 */
document.addEventListener("DOMContentLoaded", () => {
  fetchJobs();

  document.getElementById("jobType").addEventListener("change", applyFilters);
  document.getElementById("location").addEventListener("change", applyFilters);
  document
    .getElementById("searchInput")
    .addEventListener("input", applyFilters);
});

// style

const trigger = document.querySelector(".custom-select-trigger");
const options = document.querySelector(".custom-options");

trigger.addEventListener("click", () => {
  options.style.display =
    options.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".custom-option").forEach(option => {
  option.addEventListener("click", () => {
    trigger.textContent = option.textContent;
    options.style.display = "none";
  });
});





// const API_URL =
//   "https://sharepoint-dot-solution-builder-421307.ew.r.appspot.com/v1/records?listName=Jobs";

// /**
//  * Truncate text to 300 characters and add ...
//  */
// function truncateText(text, maxLength = 300) {
//   if (!text) return "";
//   return text.length > maxLength
//     ? text.substring(0, maxLength) + "..."
//     : text;
// }

// /**
//  * Fetch jobs from SharePoint
//  */
// async function fetchJobs() {
//   try {
//     const response = await fetch(API_URL);

//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("API RESULT:", result);

//     // ✅ THIS IS THE IMPORTANT LINE
//     const jobs = result?.data?.items || [];

//     renderJobs(jobs);
//   } catch (error) {
//     console.error("Failed to fetch jobs:", error);
//   }
// }

// /**
//  * Render job cards
//  */
// function renderJobs(jobs) {
//   const container = document.getElementById("jobsContainer");

//   if (!container) {
//     console.error("jobsContainer not found");
//     return;
//   }

//   if (!jobs.length) {
//     container.innerHTML = "<p>No jobs available.</p>";
//     return;
//   }

//   container.innerHTML = "";

//   jobs.forEach(job => {
//     container.innerHTML += `
//       <div class="col-lg-4">
//   <div class="card job-card">
//     <div class="card-body job-card-body">
//       <h6><strong>${job.Title}</strong></h6>
//       <hr />
//       <strong>Job description</strong>
//       <p>${truncateText(job.Description)}</p>

//       <a
//         href="job-details.html?id=${job.Id}"
//         class="learn-more"
//       >
//         <u>Learn More</u> →
//       </a>
//     </div>
//   </div>
// </div>

//     `;
//   });
// }

// /**
//  * Init
//  */
// document.addEventListener("DOMContentLoaded", fetchJobs);
