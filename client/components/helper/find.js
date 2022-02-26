const url = [
  "https://cdn-icons.flaticon.com/png/512/4140/premium/4140047.png?token=exp=1645702659~hmac=56e2c2a16f51f7ec5a10ad49dfbef661",
  "https://cdn-icons-png.flaticon.com/128/1177/1177568.png",
  "https://cdn-icons-png.flaticon.com/512/219/219969.png",
  "https://cdn-icons-png.flaticon.com/512/924/924874.png",
  "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
  "https://cdn-icons.flaticon.com/png/512/1785/premium/1785888.png?token=exp=1645702669~hmac=bbe7cee9b0e13a08399b1629747433f3",
  "https://cdn-icons-png.flaticon.com/512/236/236832.png",
  "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
  "https://cdn-icons.flaticon.com/png/512/3006/premium/3006876.png?token=exp=1645702676~hmac=b3acf2c14625555242acd149a9161826",
];

function getUrl() {
  let index = Math.floor(Math.random() * url.length);
  return url[index];
}

export { getUrl };
