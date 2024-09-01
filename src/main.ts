import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "jquery/dist/jquery.js";

type contact = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
};

// API endpoint
const apiUrl = "http://localhost:3000/contact";

// Fetches contact from the API and displays them, Send GET request to API to retrieve contact data,  JSON response
async function fetchContact() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  // Pass the fetched data to the displayContacts function and console log the data
  displayContacts(data);
  console.log("data: ", data);

  // Function to display the list of contacts in the HTML

  function displayContacts(contacts: contact[]) {
    // Get the element where contact information will be displayed.

    const contactInfo = document.getElementById("contact-info") as HTMLElement;

    // Clear any previously displayed contact information to avoid duplication.

    contactInfo.innerHTML = "";
    // Iterate over each contact in the array.

    contacts.forEach((contact) => {
      // Create a string of HTML to represent the contact details for each contact and action buttons.

      //onclick="deleteContact(${contact.id})

      contactInfo.innerHTML += `
            <div>
                <p>id: ${contact.id}</p>
                <p>name:${contact.name}</p>
                <p>Email: ${contact.email}</p>
                <p>Phone: ${contact.phoneNumber}</p>
                <button id="delete-button" >Delete</button>               
                
                
            </div>
        `;

      document
        .getElementById("delete-button")!
        .addEventListener("click", () => {
          deleteContact(contact.id);
        });
    });
  }
}

fetchContact();

// Create a new contact  with data from the form

async function createContact() {
  // Retrieve the input values for the new contact from the form
  const id = (document.getElementById("contact-id") as HTMLInputElement).value;
  const name = (document.getElementById("contact-name") as HTMLInputElement)
    .value;
  const email = (document.getElementById("contact-email") as HTMLInputElement)
    .value;
  const phoneNumber = (
    document.getElementById("contact-phoneNumber") as HTMLInputElement
  ).value;
  // Create an object representing the new contact and Convert the contact object to a JSON string
  let newCreatedContact = {
    id: id,
    name: name,
    email: email,
    phoneNumber: phoneNumber,
  };
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCreatedContact),
  });

  // Refresh contact list
  fetchContact();
}

// Delete a contact

async function deleteContact(id: string) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
}
// Refresh contact list
fetchContact();

// Attach event listener to the submit button to create conatct
document.getElementById("submit")!.addEventListener("click", createContact);
