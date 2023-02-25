let myName = localStorage.getItem("myName");
let result = document.querySelector("#result");
let nameContainer = document.querySelector(".nameContainer");
let msgContainer = document.querySelector(".msgContainer");
msgContainer.style.display = "none";

const api = window.location.host.includes('127.0.0.1') ?
  "http://localhost:8080/"
  :
  "https://socketio-server-production.up.railway.app/"
  
const socket = io(api);

if (myName) {
  nameContainer.style.display = "none";
  msgContainer.style.display = "block";
}

let getName = () => {
  let name = document.querySelector(".name");
  localStorage.setItem("myName", name.value);
  myName = localStorage.getItem("myName");
  nameContainer.style.display = "none";
  msgContainer.style.display = "block";
};

function showMsg(name, text) {
  return `${name} : ${text} <br>`;
}

socket.on("connection");

socket.on("msgs", (data) => {
  result.innerHTML = "";
  console.log(data);
  if (data.length) {
    data.map((item, index) => {
      result.innerHTML += showMsg(item.myName, item.text);
    });
  }
});

socket.on("msg", (data) => {
  console.log(data);
  result.innerHTML += showMsg(data.myName, data.text);
});
socket.on("delete", (data) => {
  console.log(data);
  result.innerHTML = "";
});

let sendMsg = () => {
  if (!myName) {
    return;
  }
  let msg = document.querySelector(".msg");
  socket.emit("msg", {
    myName: myName,
    text: msg.value,
  });
  msg.value = "";
};

let dlt = () => {
  socket.emit("delete");
};
