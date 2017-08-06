class EditContact {
  constructor(appState) {
    this.state = appState;
  }

  header() {
    return `<header class="header">
      <div class="container top-radius">
        <nav class="user-top-line">
          <a href="user.html" class = "cancel">Cancel</a>
          <button  type = "submit" form = "edit-contact" formaction="#" formmethod="get" class = "done-btn">Done</button>
        </nav>
      </div>
    </header>`;
  }

  createField(param) {
    return param.reduce((innerHTML, e) => {
      return (innerHTML += `<div class="edit-field" >
        <span class="add-btn" >
          <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
          <input type = "text" placeholder="${e}"></input></span></div>`);
    }, ``);
  }

  main() {
    const editInfo = [
      "add  home phone",
      "add email",
      "add address",
      "add birthday",
      "add social profile",
      "add field"
    ];
    return `<main class="main">
      <div class="container">
        <form><div class="edit-main-info">
          <div class="edit-foto">
            <img src="images/user-face-mini.png" alt="#" class=" user-img img-circle center-block">
          </div>
          <div class="main-info-holder">
            <div class="edit-field">
              <span class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
              <span contenteditable = "true">${this.state.locals.firstName}</span></span>
            </div>
            <div class="edit-field"><span class="add-btn">
              <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
              <span contenteditable = "true">${this.state.locals.lastName}</span></span>
            </div>
            <div class="edit-field">
              <span class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
              <span contenteditable = "true">${this.state.locals.number}</span></span>
            </div>
          </div></div>
          <div class="scroll-holder"><div class="edit-info"><div class="edit-field"><button href="#" class="delete-btn">
            <span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span><span>phone</span>
            <span></span></button></div>${this.createField(editInfo)}
            <div class="edit-field"><button href="#" class="delete-contact">delete contact</button></div>
          </div></div>
        </form>
      </div>
    </main>`;
  }

  events() {
    const doneBtn = document.querySelector(".done.btn");
    const cancelBtn = document.querySelector(".cancel");

    cancelBtn.addEventListener("click", e => {
      e.preventDefault();
      new Contacts(this.state).render();
    });
  }

  render() {
    const mainDiv = document.querySelector(".phone-book");
    mainDiv.innerHTML = this.header() + this.main();
    this.events();
  }
}
