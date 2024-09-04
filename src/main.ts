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

      //onclick="deleteContact(${contact.id})

      //let container =  document.createElement('div')
      //create the button element and add it to the container
      //let deleteButton = document.createElement('button')
      //deleteButton.textContent = 'Delete';
      //conatiner.appendChild(deleteButton)

      //attach evenet listener to the button
      //deleteButton.addEventListenet('click',()=> deleteContact(conatact.id))

      //append the container to the contactInfo
      //contactInfo.appendChild(container);

      contactInfo.innerHTML += `

          <div>

              <p>id: ${contact.id}</p>
              <p>name:${contact.name}</p>
              <p>Email: ${contact.email}</p>
              <p>Phone: ${contact.phoneNumber}</p>
              <button class="delete-button"  data-index="${contact.id}">Delete</button> 

              
              
          </div>
      `;
      //create delete button variableS and link it to HTMLButtonElement
      // let deleteButton = document.getElementById(
      //   "delete-button"
      // ) as HTMLButtonElement;
      // Add a click event listener to the deleteButton

      // When the button is clicked, it will call the deleteContact function with contact.id
      //deleteButton.addEventListener("click", () => deleteContact(contact.id));

      //    document.getElementById("delete-button")!.addEventListener("click", () => {
      // deleteContact(contact.id);
      //});
    });
  }

  fetchContact().then((data) => displayContacts(data));

  // Delete a contact

  $(document).on("click", ".delete-button", async function () {
    // Get the id of the todo to be deleted
    const id = $(this).data("index");
    console.log("deleting", { id });

    // await deleteContact(id);

    await deleteContact(id);

    await fetchContact().then((data) => displayContacts(data));
    // Delete the todo from the server
    // await fetch(`${BASE_URL}/todos/${id}`, {
    //   method: "DELETE",
    // });
    // Re-render the todos by calling the render function
  });
});
