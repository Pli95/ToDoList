function addNewList() {
  let verticalNav = document.getElementById("v-pills-tab");
  let verticalNavContent = document.getElementById("v-pills-tabContent")
  let addList = document.getElementById('addList').value;
  let anchor = document.createElement('a');
  anchor.setAttribute('class', 'nav-link');
  anchor.setAttribute('data-toggle', 'pill');
  anchor.setAttribute('href', '#' + addList);
  anchor.setAttribute('role', 'tab');
  anchor.setAttribute('aria-selected', 'false');
  let closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('class', 'close');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.setAttribute('id', 'close')
  let spanClose = document.createElement('span');
  let listName = document.createTextNode(addList);
  let spanList = document.createElement('span');
  spanClose.setAttribute('aria-hidden', 'true');
  spanClose.innerHTML = "&times";
  closeButton.appendChild(spanClose);
  anchor.appendChild(closeButton);
  spanList.appendChild(listName);
  anchor.appendChild(spanList);
  verticalNav.appendChild(anchor);
  let contentElement = document.createElement('div');
  contentElement.setAttribute('class', 'tab-pane fade');
  contentElement.setAttribute('role', 'tabpanel');
  contentElement.setAttribute('id', addList);
  verticalNavContent.appendChild(contentElement);
  deleteElements();

  return false;
}

function deleteElements() {
  document.getElementById('addList').value = '';
  let closeBtns = document.getElementsByClassName("close");

  for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener("click", function () {
      this.parentElement.style.display = 'none';
    });
  }
}

document.getElementById("addList")
  .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("addListButton").click();
    }
  });
