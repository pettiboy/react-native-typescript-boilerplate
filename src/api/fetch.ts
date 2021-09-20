import {URLS} from '../constants';

export const GET = async (url: string, token?: string, object?: Object) => {
  let headers;
  if (token) {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
  } else {
    headers = {Accept: 'application/json', 'Content-Type': 'application/json'};
  }

  let finalUrl = url;
  if (object) {
    finalUrl = url + '?' + serializeObject(object);
  }

  return fetch(URLS.BASE_URL + finalUrl, {
    method: 'GET',
    headers: headers,
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

export const POST = async (url: string, token?: string, object?: Object) => {
  let headers;
  if (token) {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
  } else {
    headers = {Accept: 'application/json', 'Content-Type': 'application/json'};
  }

  return fetch(URLS.BASE_URL + url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(object),
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

const serializeObject = (object: Object) => {
  return Object.entries(object)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
};
