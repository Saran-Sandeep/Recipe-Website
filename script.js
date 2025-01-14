var modal = document.getElementsByClassName("myModal")[0];
var btnOpenModal = document.getElementsByClassName("btn-read-more")[0];
var btnCloseModal = document.getElementsByClassName("btn-close-modal")[0];

btnOpenModal.onclick = () => {
  modal.classList.remove("hidden");
  modal.classList.add("center-ele");
  console.log("read more clicked");
};

btnCloseModal.onclick = () => {
  modal.classList.remove("center-ele");
  modal.classList.add("hidden");
  console.log("close modal clicked");
};
