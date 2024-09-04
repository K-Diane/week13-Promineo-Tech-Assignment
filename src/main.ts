import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
//import "jquery/dist/jquery.js";

import $ from "jquery";

import { deleteContact, fetchContact } from "./fetchcontact";
import { createContact } from "./createcontact";

type contact = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
};

// the function will run after the DOM has been loaded to prevent issues
$(document).ready(function () {
  // Function to display the list of contacts in the HTML
  function displayContacts(contacts: contact[]) {
    // Get the element where contact information will be displayed.

    const contactInfo = document.getElementById("contact-info") as HTMLElement;

    // Attach event listener to the submit button to create conatct
    document.getElementById("submit")!.addEventListener("click", createContact);

    // Clear any previously displayed contact information to avoid duplication.

    contactInfo.innerHTML = "";
    // Iterate over each contact in the array.

    contacts.forEach((contact) => {
      // Create a string of HTML to represent the contact details for each contact and action buttons.

      contactInfo.innerHTML += `

          <div>

              <p>id: ${contact.id}</p>
              <p>name:${contact.name}</p>
              <p>Email: ${contact.email}</p>
              <p>Phone: ${contact.phoneNumber}</p>
              <button class="delete-button"  data-index="${contact.id}">Delete</button> 

              
              
          </div>
      `;
    });
  }

  fetchContact().then((data) => displayContacts(data));

  // add a click on the delete a contact button

  $(document).on("click", ".delete-button", async function () {
    // Get the id of the contact to be deleted
    const id = $(this).data("index");
    //console log the delete function
    console.log("deleting", { id });

    // await deleteContact(id);

    await deleteContact(id);

    //fetch the contact and display the data

    await fetchContact().then((data) => displayContacts(data));
  });
});
