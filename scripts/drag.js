let dragged;
const draggableItems = [...document.querySelectorAll(".favorite")];

const handleDragStart = (e) => {
  console.log("dragstart");
  e.dataTransfer.setData("text/plain", null);
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("special", "panda");
  dragged = e.target;
  dragged.style.opacity = "0.5";
  dragged.style.scale = "1.2";
};

const handleDragEnd = () => {
  dragged.style.opacity = "";
  dragged.style.scale = "";
  // dragged.classList.remove("")
};
const handleDragOver = (e) => {
  e.preventDefault();
  console.log("dragover");
};

const handleDragEnter = (e) => {
  const { target } = e;
  target.classList.contains("dropzone") ? (target.style.border = "dashed") : "";
};

const handleDragLeave = (e) => {
  target.classList.contains("dropzone") ? (target.style.border = "") : "dashed";
};

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const { target } = e;

  if (target.className === "dropzone") {
    const dZone = target;
    // const txt = dZone.textContent.trim();
    console.log("data", e.dataTransfer.getData("special"));
    // const number = txt[txt.length - 1];
    dZone.style.border = "";
    dragged.parentNode.removeChild(dragged);
    dZone.appendChild(dragged);
    // dragged.textContent = `Dropped in (${number})`;
  }
};

export const loadDraggableItems = () => {
  draggableItems.map((item) => {
    item.setAttribute("draggable", true);
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("dragleave", false, handleDragLeave);
    item.addEventListener("dragenter", handleDragEnter);
    item.addEventListener("drop", handleDrop);
  });
};
