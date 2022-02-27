const url = [

  "https://cdn-icons-png.flaticon.com/128/1177/1177568.png",
  "https://cdn-icons-png.flaticon.com/512/219/219969.png",
  "https://cdn-icons-png.flaticon.com/512/924/924874.png",
  "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
  "https://cdn-icons-png.flaticon.com/512/236/236832.png",
  "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",

];

function getUrl() {
  let index = Math.floor(Math.random() * url.length);
  return url[index];
}

export { getUrl };
