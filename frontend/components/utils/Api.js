import axios from 'axios';
import FormData from 'form-data';
import CONSTANTS from '../constants/constants';
import { getJWTRefreshToken, getJWTToken } from './CookieStorage';
import { RefreshOrRedirect } from './AuthUtils';

const getProtocol = () => {
  return new URL(CONSTANTS.SITE_BASE_URL).protocol;
};

const getDomain = () => {
  return new URL(CONSTANTS.SITE_BASE_URL).hostname;
};

export const host = `${getProtocol()}//api.${getDomain()}/`;

/**
 * Refresh the access token using the refresh token
 */
export const refreshAccessToken = () => {
  const refreshToken = getJWTRefreshToken();
  const data = new FormData();
  if (refreshToken !== undefined) {
    data.append('refresh', refreshToken);
  }
  return axios
    .post(`${host}auth/jwt/refresh/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.error(e.message);
      throw e;
    });
};

/**
 * Get request with JWT token
 * @param {string} uri URL to get
 * @returns data from the response
 */
export const get = (uri) => {
  const headers = {
    Authorization: `Token ${getJWTToken()}`,
  };

  return fetch(host + uri, {
    method: 'GET',
    headers: {
      Authorization: `Token ${getJWTToken()}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error((await response.json()).message);
  });
};

/**
  * Get request with JWT token
  * @param {string} uri URL to get
  * @returns data from the response
  */
export const getQuery = (uri, params) => {
  const headers = {
    Authorization: `Token ${getJWTToken()}`,
  };

  return fetch(host + uri + "?" + new URLSearchParams({
    username: params,
  }), {
    method: 'GET',
    headers: {
      Authorization: `Token ${getJWTToken()}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error((await response.json()).message);
  });
};

/**
 * Post request with JWT token
 * @param {string} uri URL to post
 * @returns data from the response
 */
export const post = (uri, data) => {
  return fetch(host + uri, {
    method: 'POST',
    headers: {
      Authorization: `Token ${getJWTToken()}`,
    },
    body: new FormData(data),
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error((await response.json()).message);
  });
};

/**
 * post request without JWT token (mainly for login)
 * @param {string} uri URL to post
 * @returns data from the response
 */
export const post_no_bearer = (uri, data) => {
  return fetch(host + uri, {
    method: 'POST',
    body: new FormData(data),
  }).then(async (response) => {
    if (response.ok) {
      return { "message": "success" };
    }
    else {
      return response.json();
    }
  });
};



/**
 * post request without JWT token (mainly for login), data already in JSON format
 * @param {string} uri URL to post
 * @returns data from the response
 */
export const post_form_no_bearer = (uri, data) => {
  return fetch(host + uri, {
    method: 'POST',
    body: data,
  }).then(async (response) => {
    if (response.ok) {
      return { "message": "success" };
    }
    else {
      return response.json();
    }
  });
};

/**
 * Del request with JWT token
 * @param {string} uri URL to delete
 * @returns data from the response
 */
export const del = (uri, data) => {
  const headers = {
    Authorization: `Token ${getJWTToken()}`,
  };

  return axios
    .delete(host + uri, {
      data,
      headers,
    })
    .then((r) => r.data);
};

/**
 * Patch request with JWT token
 * @param {string} uri URL to patch
 * @returns data from the response
 */
export const patch = (uri, data) => {
  const headers = {
    Authorization: `Token ${getJWTToken()}`,
  };

  return axios.patch(host + uri, data, { headers });
};

/**
 * Put request with JWT token
 * @param {string} uri URL to put
 * @returns data from the response
 */
export const put = (uri, data) => {
  const headers = {
    Authorization: `Token ${getJWTToken()}`,
  };

  return axios.put(host + uri, data, { headers });
};


/**
 * Put request with JWT token, data already in JSON format
 * @param {string} uri URL to post
 * @returns data from the response
 */
export const post_form = (uri, data) => {
  const headers = {
    Authorization: `Token ${getJWTToken()}`,
  };

  return axios.post(host + uri, data, { headers });
};


/**
 * Get the current user
 * @param {function} successCallback Callback function to run on success. A userData object is passed to this callback function as a parameter
 */
export const getCurrentUser = (successCallback, router) => {
  get('auth/users/me/')
    .then((userData) => {
      if (!userData) throw new Error('No user data found');

      successCallback(userData);
    })
    .catch((e) => {
      console.error(e.message);

      RefreshOrRedirect(router);
    });
};
