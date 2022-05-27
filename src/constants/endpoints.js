export const MAIN_API = "https://flowrspot-api.herokuapp.com/api/v1";

export const API_LOGIN = MAIN_API + "/users/login";

export const API_REGISTRATION = MAIN_API + "/users/register";

export const API_USER_ME = MAIN_API + "/users/me";

export const API_FLOWERS_SEARCH = MAIN_API + "/flowers/search";

export const API_FLOWERS_FAVORITES_FUNCTION = (idCvijeta) =>
  MAIN_API + "/flowers/" + idCvijeta + "/favorites/";

export const API_FLOWERS = MAIN_API + "/flowers/";

export const API_USER_FLOWER_FAVORITES = MAIN_API + "/flowers/favorites";
