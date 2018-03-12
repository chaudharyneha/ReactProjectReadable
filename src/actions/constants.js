// API params
export const api = "http://localhost:5001/";
export const headers = {
  'Authorization': "myToken1234",
  'Content-Type': 'application/json'
}

/* API request error handling */
export const showError = (error) =>
  console.log('fetch failed: ' , error.statusText);
