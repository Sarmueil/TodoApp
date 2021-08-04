//get my elements from the html filr and save in javascript variables..
const form = document.querySelector(".form-container")
const alert = document.querySelector(".alert")
const input = document.getElementById("input")
const submitBtn = document.querySelector(".submit-btn")
const container = document.querySelector(".list-container")
const list = document.querySelector(".todo-list")
const clearBtn = document.querySelector(".clear-btn")

//event status
let editStatus = false;
let editElement;
let editId = "";

//Setting up my form request...
//when the form listen to request on submit...so events are planned to happen.... i want the display alert function to run certain if conditions.
clearBtn.addEventListener("click", clearItems);
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(elem => {
      list.removeChild(elem);
    })
  }
  //to rrmove the container
  container.classList.remove("show-container")
  displayAlert("empty", "danger")
  setBackToDefault();
}
//to delete items added tothe list

function deleteItems(e) {
  const selected = e.currentTarget.parentElement.parentElement
  list.removeChild(selected)
  const id = selected.dataset.id
  //this is to ensure that the class show conatiner class disappears when the delete button is clicked
  //const items = document.querySelectorAll(".grocery-item");
  if (list.children.length === 1) {
    container.classList.remove("show-container")
  }
  displayAlert("You removed a schedule", "danger")
}
//using data sets on ids
//The dataset read-only property of the HTMLElement interface provides read/write access to custom data attributes (data-*) on elements.
//to edit items 
function editItems(e) {
  const selected = e.currentTarget.parentElement.parentElement
  //treversing the dom tree. the parent container is the item added and the siblings are the btn container and the title.
  editElement = e.currentTarget.parentElement.previousElementSibling
  //assigning anything listed to the dom
  input.value = editElement.innerHTML
  submitBtn.textContent = "edit"
  //acessing the id of the current value input....using the data set id
  editId = selected.dataset.id  //ß???
  console.log(editId)
  editStatus = true;
}
//THE MAIN FORM
form.addEventListener("submit", function (e) {
  e.preventDefault(); //to prevent some default behaviour
  //get the input stored to a const variable..  
  const value = input.value;
  console.log(value);
  //for local storage identification 
  const id = new Date().getTime().toString();
  //to check for the current value of the input
  if (value !== "" && editStatus === false) {
    //console.log("add item to list")
    //creating the article div and setting it to the display element variables...
    const displayElement = document.createElement("article");
    displayElement.classList.add("grocery-item");
    const attr = document.createAttribute("data-id")
    attr.value = id;
    //some sort of appending the data-id atribute to the display element 
    displayElement.setAttributeNode(attr);
    //puting it on the HTML DOM. the goal is set dynamically...so that as much as i add items to the list it get updated
    displayElement.innerHTML = `<p class="title">${value}</p>
                                <div class="btn-container">
                                    <button type="button" class="edit-btn">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" class="delete-btn">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>`;
    //getting the delete and edit btn sine they are dynamically added
    const deleteBtn = displayElement.querySelector(".delete-btn")
    deleteBtn.addEventListener("click", deleteItems)

    const editBtn = displayElement.querySelector(".edit-btn")
    editBtn.addEventListener("click", editItems)
    //append to the list class ....the list variable is like  a container for the list
    list.appendChild(displayElement)
    //display alert properties..
    displayAlert("you have added a schedule to the list", "success")
    //visibility of the container
    container.classList.add("show-container")
    // i need to invoke two functions....
    //set back to default....and add to local storage,
    setBackToDefault()
    // addToLocalStorage();

  } else if (value !== "" && editStatus === true) {
    editElement.innerHTML = value;
    //put back to an emoty string....
    setBackToDefault();
    displayAlert("Edited sucessfully", "success")
  } else {
    displayAlert("try to enter a value", "danger");
  }
})
//to control what gets displayed on the alert div...to set both the text and the class list which basically controls the color and background color of the text
function displayAlert(text, color) {
  alert.textContent = text;
  alert.classList.add(`alert-${color}`);
  //To control the disapperance  of the alert div with the set time out function...
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${color}`)
  }, 1000)
}
function setBackToDefault() {
  input.value = " "
  editStatus = false
  editId = ""
  submitBtn.textContent = "Submit"
}
function addToLocalStorage(id, value) {
  console.log("added to storage")
}
function removeFromLocalStorage(id) {
  console.log("removed from loacal storage")
}
//To control the disapperance  of the alert div
