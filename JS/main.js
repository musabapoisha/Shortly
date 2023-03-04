"use strict";
let shorten_link = document.querySelector(".shorter-link  .container img");
let result = document.querySelector(".shorter-link .result");

var half_shorten = parseInt(getComputedStyle(shorten_link).height) / 2;

result.style.top = "-" + half_shorten + "px";
result.style.marginBottom = "-" + half_shorten + "px";

var input = document.querySelector("#link");
var button = document.querySelector(".shorter-link " + '[type = "submit"]');
var form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const prePayload = new FormData(form);
  const payload = new URLSearchParams(prePayload);

  const yourLink = [...payload][0][1];

  const options = {
    method: "POST",
    body: JSON.stringify(payload),
  };
  var g = "google.com";
  fetch("https://api.shrtco.de/v2/shorten?url=" + yourLink, options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
});

// console.log(input);
// console.log(button);

fetch("https://api.shrtco.de/v2/info?code=example")
  .then((response) => response.json())
  .then((data) => console.log(data));

/*
// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
*/
