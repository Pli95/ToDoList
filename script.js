function addNewList() {
  let verticalNav = document.getElementById("collapsibleNavbar");
  let verticalNavContent = document.getElementById("v-pills-tabContent");
  let addList = document.getElementById('addList').value;
  let anchor = document.createElement('a');
  anchor.setAttribute('class', 'nav-link');
  anchor.setAttribute('data-toggle', 'pill');
  anchor.setAttribute('href', '#' + addList.replace(/\s/g, ""));
  anchor.setAttribute('role', 'tab');
  anchor.setAttribute('aria-selected', 'false');
  // anchor.setAttribute('id', addList);
  let closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('class', 'close');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.setAttribute('id', 'close');
  let spanClose = document.createElement('span');
  let listName = document.createTextNode(addList);
  let spanList = document.createElement('span');
  spanClose.setAttribute('aria-hidden', 'true');
  spanClose.innerHTML = "&times";
  spanList.appendChild(listName);
  anchor.appendChild(spanList);
  closeButton.appendChild(spanClose);
  anchor.appendChild(closeButton);
  verticalNav.appendChild(anchor);
  let contentElement = document.createElement('div');
  contentElement.setAttribute('class', 'tab-pane fade');
  contentElement.setAttribute('role', 'tabpanel');
  contentElement.setAttribute('id', addList.replace(/\s/g, ""));
  verticalNavContent.appendChild(contentElement);
  //add actual page
  let pageElements = `<div class="heading">
        <h3>${listName}</h3>
        <button class="btn" id="addListItem"><i class="fas fa-plus-circle" onclick="addListItems()"></i></button>
      </div>
      <ul>
      </ul>`;
  contentElement.insertAdjacentHTML("afterbegin", pageElements);

  document.getElementById("addList").value="";
  deleteElements();
}

function deleteElements() {
  let closeBtns = document.getElementsByClassName("close");

  for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener("click", function () {
      let idName = this.previousElementSibling.textContent;
      document.getElementById(idName).parentElement.removeChild(document.getElementById(idName))
      this.parentElement.parentElement.removeChild(this.parentElement);
    });
  }
}

// function addListItems() {
//   let listItem = `<li>
//           <div class="input-group mb-3">
//             <div class="input-group-prepend">
//               <div class="input-group-text checkbox-circle">
//                 <input type="checkbox" id="checkbox">
//                 <label for="checkbox"></label>
//               </div>
//             </div>
//             <input type="text" class="form-control">
//             <button type="button" class="close" aria-label="Close" id="closeListItem">
//               <span aria-hidden="true" class="">&times</span>
//             </button>
//           </div>
//         </li>`;
//   let ul = this.parentElement.nextSibling;
//   ul.insertAdjacentHTML("beforeend", listItem);
//   console.log("done")
// }

document.getElementById("addList")
  .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("addListButton").click();
    }
  });
