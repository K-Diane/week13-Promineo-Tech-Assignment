// API endpoint
export const apiUrl = "http://localhost:3000/contact";

// Fetches contact from the API and displays them, Send GET request to API to retrieve contact data,  JSON response
export async function fetchContact() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  // Pass the fetched data to the displayContacts function and console log the data
  //displayContacts(data);
  console.log("data: ", data);
  return data;
}

export async function deleteContact(id: string) {
  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
}
