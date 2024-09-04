import { fetchContact, apiUrl } from "./fetchcontact";

// Create a new contact  with data from the form

export async function createContact() {
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
  await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCreatedContact),
  });

  // Refresh contact list
  fetchContact();
}
