import jwt_decode from "jwt-decode";

export function isUserAuthenticated(token) {
  return token !== null;
}

export function getUserRole(token) {
  return jwt_decode(token).userRole;
}
