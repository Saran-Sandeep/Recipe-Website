const loadHTML = (url, elementId) => {
  fetch(url)
    .then((respone) => respone.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading the HTML:", error);
    });
};

window.onload = () => {
  loadHTML("./common/header.html", "header");
  loadHTML("./common/footer.html", "footer");
};
