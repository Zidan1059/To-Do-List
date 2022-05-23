//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const delteAllBtn = document.querySelector(".footer button");
// onkeyup event
inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value; //getting user entered value
  if (userEnteredValue.trim() != 0) {
    //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active"); //unactive the add button
  }
};
showTasks(); //calling show tasks function

addBtn.onclick = () => {
  let userData = inputBox.value; //getting user entered value
  let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
  if (getLocalStorage == null) {
    //if localstorage is null
    listArr = []; //creating blank array
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
  }
  listArr.push(userData); // pushing or adding user data
  localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming js object into a json string
  showTasks(); //calling show tasks function
  addBtn.classList.remove("active");
};
//function to add task list inside ul
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
  if (getLocalStorage == null) {
    //if localstorage is null
    listArr = []; //creating blank array
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length; //passing the number of pending tasks
  if (listArr.length > 0) {
    //if array length is greater than 0
    delteAllBtn.classList.add("active"); //activate the clear all button
  } else {
    delteAllBtn.classList.remove("active"); //unactivate the clear all button
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick = "deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //addind new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

//delete task function
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //delete or remove the particular indexed li
  //after removing the li again update the whole list
  localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming js object into a json string
  showTasks(); //calling show tasks function
}

delteAllBtn.onclick = () => {
  listArr = []; //empty an array
  //after deleting all tasks again update the whole list
  localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming js object into a json string
  showTasks(); //calling show tasks function
};
