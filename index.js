let addBtnDefine = document.getElementById("add-btn-define");
let removeBtnDefine = document.getElementById("remove-btn-define");
let inputDefine = document.getElementById("emoji-input-define");

let addBtnHobby = document.getElementById("add-btn-hobby");
let removeBtnHobby = document.getElementById("remove-btn-hobby");
let inputHobby = document.getElementById("emoji-input-hobby");

let addBtnThxful = document.getElementById("add-btn-thxful");
let removeBtnThxful = document.getElementById("remove-btn-thxful");
let inputThxful = document.getElementById("emoji-input-thxful");

let containerDefine = document.getElementById("container-define");
let containerHobby = document.getElementById("container-hobby");
let containerThxful = document.getElementById("container-thxful");
let alertMsg = document.getElementById("alert-msg");

const emojisDefineFromLocalStorage = JSON.parse(
  localStorage.getItem("defineYourself")
);
const emojisHobbyFromLocalStorage = JSON.parse(
  localStorage.getItem("freeTime")
);
const emojisThxFulFromLocalStorage = JSON.parse(
  localStorage.getItem("thanksFor")
);

let myEmojisDefine = emojisDefineFromLocalStorage || [];
let myEmojisHobby = emojisHobbyFromLocalStorage || [];
let myEmojisThxful = emojisThxFulFromLocalStorage || [];

function load(arrEmoji, resultContainer) {
  if (arrEmoji.length > 0) {
    renderEmojis(arrEmoji, resultContainer);
  }
}

load(myEmojisDefine, containerDefine);
load(myEmojisHobby, containerHobby);
load(myEmojisThxful, containerThxful);

addBtnDefine.addEventListener("click", () => {
  addEmojis(
    inputDefine.value,
    myEmojisDefine,
    containerDefine,
    "defineYourself"
  );
});

removeBtnDefine.addEventListener("click", () => {
  removeEmojis(myEmojisDefine, containerDefine, "defineYourself");
});

addBtnHobby.addEventListener("click", () => {
  addEmojis(inputHobby.value, myEmojisHobby, containerHobby, "freeTime");
});

removeBtnHobby.addEventListener("click", () => {
  removeEmojis(myEmojisHobby, containerHobby, "freeTime");
});

addBtnThxful.addEventListener("click", () => {
  addEmojis(inputThxful.value, myEmojisThxful, containerThxful, "thanksFor");
});

removeBtnThxful.addEventListener("click", () => {
  removeEmojis(myEmojisThxful, containerThxful, "thanksFor");
});

//count emojis with Javascript is not compatible at all with Firefox.For Firefox, we need to use this  polyfill: https://github.com/surferseo/intl-segmenter-polyfill

try {
  // Check if the browser supports Intl Segmenter
  new Intl.Segmenter();
} catch {
  // If not, load the polyfill
  document.write('<script src="intl-segmenter-polyfill.js"></script>');
}

async function loadSegmenter() {
  try {
    return new Intl.Segmenter();
  } catch {
    return new (await IntlSegmenterPolyfillBundled.createIntlSegmenterPolyfill())();
  }
}

function visibleLength(str) {
  return [...new Intl.Segmenter().segment(str)].length;
}

function validInput(inputEmoji) {
  const emojiReg =
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
  let errorAlert = false;

  if (
    inputEmoji.trim() === "" ||
    visibleLength(inputEmoji) > 1 ||
    emojiReg.test(inputEmoji) === false
  ) {
    alertMsg.innerHTML = `Please provide a valid input. Ex: 😺`;
    errorAlert = true;
  }
  return errorAlert;
}

function renderEmojis(arrEmojis, resultContainer) {
  resultContainer.innerHTML = "";
  arrEmojis.forEach((emoji, index) => {
    resultContainer.innerHTML += `${emoji}`;
    arrEmojis[index] = emoji;
  });
}

function addEmojis(inputEmoji, arrEmojis, resultContainer, name) {
  alertMsg.innerHTML = "";
  if (arrEmojis.length >= 3) {
    alertMsg.innerHTML = `Please do not forget that it is up to 3️⃣ emoticons.`;
    return;
  }
  if (validInput(inputEmoji) === false) {
    arrEmojis.push(inputEmoji);
    renderEmojis(arrEmojis, resultContainer);
    localStorage.setItem(name, JSON.stringify(arrEmojis));
  }
}

function removeEmojis(arrEmojis, resultContainer, name) {
  arrEmojis.pop();
  renderEmojis(arrEmojis, resultContainer);
  localStorage.removeItem(name);
  localStorage.setItem(name, JSON.stringify(arrEmojis));
}
