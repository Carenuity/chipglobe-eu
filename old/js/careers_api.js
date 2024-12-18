// This JS can be used if the API server is running to get locations and posts
// Configurations
// API BASE URL
const api_url = "http://localhost:6060";


let errorHtml = '<span style="margin-left:20px"><h2>Sorry, we are facing some issues at the moment.</h2>Please visit later or write to us at info@chipglobe.com with your details.</span>';
// Defining async function
async function getPosts(url) {
   fetch(url)
      .then(
         async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;
            // check for error response
            if (!response.ok) {
               // get error message from body or default to response status
               document.getElementById("careersGrid").innerHTML = tab;
               return Promise.reject(error);
            }
            if ((data != undefined || data != null) && data.posts != undefined) {
               let htmlData = '';
               htmlData += `
               <thead class="thead-dark">
               <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Location</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
               </tr>
               </thead>
               <tbody>`;
               for (let r of data.posts) {
                  htmlData += `<tr> 
                  <td>${r.Title}</td>
                  <td>${r.Location}</td>
                  <td>${r.CreatedDate}</td>
                  <td><a href="${api_url}/files/${r.FileName}">Download</a></td>
                  </tr>`;
               }
               htmlData += `</tbody>`;
               document.getElementById("careersTable").innerHTML = htmlData;
               SetDataTable();
               var $anchor = $('#dropdownMenuButton').offset();
               window.scrollTo({
                  top: $anchor.top-200,
                  left: $anchor.left,
                  behavior: "smooth",
                });
            } else {
               document.getElementById("careersGrid").innerHTML = errorHtml;
            }           
         }
      ).catch(error => {
         //alert('error fetching careers');
         document.getElementById("careersGrid").innerHTML = errorHtml;
      });
}

async function getLocations(url) {
   fetch(url)
      .then(
         async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;
            // check for error response
            if (!response.ok) {
               // get error message from body or default to response status
               document.getElementById("locations").disabled = true;
               return Promise.reject(error);
            }
            if ((data != undefined || data != null) && data.locations != undefined) {
               let tab = `<a class="dropdown-item" href="#" onclick='getAllPosts()'>All</a>`;
               for (let r of data.locations) {
                  tab += `<a class="dropdown-item" href="#" onclick='getPostsByLocation(\"${r}\")'>${r}</a>`;
               }
               document.getElementById("locations").innerHTML = tab;
            }
         }
      ).catch(error => {
         //$('.dropdown').html('');
      });
}



function SetDataTable() {
   //https://datatables.net/examples/basic_init/dom.html
   if ($.fn.dataTable.isDataTable('#careersTable')) {
      table = $('#careersTable').DataTable();
  }
  else {
      table = $('#careersTable').DataTable( {
         info: false,
         // to include search bar
         //dom: '<"top"f><"bottom"rtlp><"clear">',
         dom: '<"bottom"rtlp><"clear">',
      } );
  }
}

async function getAllPosts()
{
   $('#dropdownMenuButton').text('All');
   await getPosts(api_url + "/careers");
}

async function getPostsByLocation(location)
{
   $('#dropdownMenuButton').text(location);
   await getPosts(api_url + "/careers?location=" + location);
}

getLocations(api_url + "/locations");
getPosts(api_url + "/careers");