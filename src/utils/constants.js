export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
export const USER_AVATAR =
  "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/original";
export const IMG_CDN_URL6 = "https://image.tmdb.org/t/p/w780";
export const IMG_CDN_URL2 = "https://image.tmdb.org/t/p/w185";
export const IMG_CDN_URL3 = "https://image.tmdb.org/t/p/w92";
export const IMG_CDN_URL4 = "https://image.tmdb.org/t/p/w300";
export const IMG_CDN_URL5 = "https://image.tmdb.org/t/p/w500";
export const IMG_CDN_URL10 = "https://image.tmdb.org/t/p/w1280";

export const BACKGROUND_IMG =
  "https://assets.nflxext.com/ffe/siteui/vlv3/563192ea-ac0e-4906-a865-ba9899ffafad/6b2842d1-2339-4f08-84f6-148e9fcbe01b/IN-en-20231218-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "Bangla", name: "Bangla" },
  { identifier: "Hindi", name: "Hindi" },
];

export const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
];

export const SELECT_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hi", name: "Hindi" },
  { identifier: "bn", name: "Bangla" },
];

export const convertHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};

export const OPENAI_KEY = `process.env.REACT_APP_OPENAI_KEY`;
