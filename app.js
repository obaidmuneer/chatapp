let myName = localStorage.getItem("myName");
let result = document.querySelector("#result");
let nameContainer = document.querySelector(".nameContainer");
let msgContainer = document.querySelector(".msgContainer");
msgContainer.style.display = "none";
const socket = io(`http://localhost:8080/`);

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

socket.on("connection");

socket.on("msgs", (data) => {
  result.innerHTML = "";
  console.log(data);
  if (data.length) {
    data.map((item, index) => {
      result.innerHTML += item.text + " from " + item.myName + "<br>";
    });
  }
});

socket.on("msg", (data) => {
  console.log(data);
  result.innerHTML += data.text + " from " + data.myName + "<br>";
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
