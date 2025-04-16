import CONFIG from '../config';

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  GET_ALL_STORIES: `${CONFIG.BASE_URL}/stories`,
  GET_DETAIL: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
  POST_STORY: `${CONFIG.BASE_URL}/stories`,
};

export async function registerUser({ name, email, password }) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({ name, email, password }),
  });
  return await response.json();
}

export async function loginUser({ email, password }) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
}

export async function getAllStories(token, { page, size, location } = {}) {
  const url = new URL(ENDPOINTS.GET_ALL_STORIES);
  if (page) url.searchParams.append('page', page);
  if (size) url.searchParams.append('size', size);
  if (location !== undefined) url.searchParams.append('location', location);

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function getStoryDetail(token, id) {
  const response = await fetch(ENDPOINTS.GET_DETAIL(id), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function addStory(token, formData) {
  const response = await fetch(ENDPOINTS.POST_STORY, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
    body: formData, 
  });
  return await response.json();
}
