/* eslint-disable no-undef */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const myHeaders = new Headers();
myHeaders.append('token', '49f306885dbb215de88db3ba4533a2842d73fa611e57bbf0cd8c0baaff26f18d');

const myInitSearch = {
  method: 'POST',
  headers: myHeaders,
  accept: 'application/json',
};


function showAll() {
  return fetch('/v1/user/5985ea9f872dbe0319ddacc7', myInit)
    .then(checkStatus)
    .then(parseJSON);
}

function search(cb) {
  return fetch('/v1/user/5985ea9f872dbe0319ddacc7/search', myInitSearch)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

const Client = { showAll, search };
export default Client;
