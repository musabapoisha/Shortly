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
  half_shorten += 10;
  result.style.top = "-" + half_shorten + "px";
  result.style.marginBottom = "-" + half_shorten + "px";
  half_shorten -= 10;
  var row = document.createElement("div");
  var p = document.createElement("p");
  var short = document.createElement("span");
  var copy = document.createElement("span");

  var m = Object.values(result.children[0].children);

  if (m.length == 1) {
    m.forEach((element) => {
      element.remove();
    });
  }

  p.classList.add("col-7");
  short.classList.add("col-4", "short");
  copy.classList.add("col-1", "copy");
  copy.innerHTML = "copy";
  row.appendChild(p);
  row.appendChild(short);
  row.appendChild(copy);

  row.classList.add("row", "short-link");
  result.children[0].appendChild(row);

  const prePayload = new FormData(form);
  const payload = new URLSearchParams(prePayload);

  const yourLink = [...payload][0][1];

  const options = {
    method: "POST",
    body: JSON.stringify(payload),
  };
  fetch("https://api.shrtco.de/v2/shorten?url=" + yourLink, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.result);
      short.innerHTML = data.result.full_short_link;
      p.innerHTML = data.result.original_link;
      copy.addEventListener("click", () =>
        navigator.clipboard.writeText(short.innerHTML)
      );
    })
    .catch((err) => {
      if (err == "") {
        console.error("not good");
      }
      console.error(err);
    });
});
