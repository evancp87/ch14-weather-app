let dragged;
const favItems = document.querySelectorAll(".favourite");

favItems.map((fav) => {
  fav.setAttribute("draggable", true);

  fav.addEventListener("dragstart", handleDragStart);

  const handleDragStart = (e) => {
    console.log("dragstart");
    e.dataTransfer.setData("text/plain", null);
    e.dataTransfer.setData("special", "panda");
    dragged = e.target;
    dragged.style.opacity = "0.5";
    dragged.style.scale = "1.2";
  };

  fav.addEventListener("dragend", handleDragEnd);

  const handleDragEnd = () => {
    dragged.style.opacity = "";
    dragged.style.scale = "";
    // dragged.classList.remove("")
  };

  fav.addEventListener("dragover", handleDragOver);

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("dragover");
  };

  fav.addEventListener("dragleave", false, handleDragLeave);
  fav.addEventListener("dragenter", handleDragEnter);

  const handleDragEnter = (e) => {
    const { target } = e;
    target.classList.contains("dropzone")
      ? (target.style.border = "dashed")
      : "";
  };

  const handleDragLeave = (e) => {
    target.classList.contains("dropzone")
      ? (target.style.border = "")
      : "dashed";
  };

  fav.addEventListener("drop", handleDrop);

  const handleDrop = (e) => {};
});
