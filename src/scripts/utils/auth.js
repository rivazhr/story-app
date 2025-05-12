export function isLoggedIn() {
  const session = getSession();
  return !!session?.token;
}

export function getAccessToken() {
  const session = getSession();
  if (!isLoggedIn()) return;
  return session.token;
}

export function getSession() {
  const session = localStorage.getItem('loginSession');
  return session ? JSON.parse(session) : null;
}
export function setSession(response) {
  const session = {
    token: response.loginResult.token,
    userId: response.loginResult.userId,
    userName: response.loginResult.name,
  };

  localStorage.setItem('loginSession', JSON.stringify(session));
  window.location.hash = '/';
}

export function getCurrentUser() {
  const session = getSession();
  if (!isLoggedIn()) return;
  return session.userId;
}

export function getUserName() {
  const session = getSession();
  if (!isLoggedIn()) return;
  return session.userName;
}
