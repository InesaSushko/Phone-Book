class AddUser {
  constructor(appState) {
    this.state = appState
  }

  header() {
    return `<header class="header">
      <div class="container top-radius">
        <nav class="user-top-line">
          <a href="user.html" class = "cancel">Cancel</a>
          <button class = "done-btn">Done</button>
        </nav>
      </div>
    </header>`;
  }

  createMainInfoHolder() {
    return `<div class="edit-field">
      <span href="#" class="add-btn">
        <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <input type = "text" placeholder="First Name"></input>
      </span>
    </div>
    <div class="edit-field">
      <span href="#" class="add-btn">
        <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <input type = "text" placeholder="Last Name"></input>
      </span>
    </div>
    <div class="edit-field">
      <span href="#" class="add-btn">
        <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <input type = "text" placeholder="Company"></input>
      </span>
    </div>`;
  }

  createEditInfo() {
    return `<div class="edit-field">
      <span href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <input type = "text" placeholder="add mobile phone"></input>
      </span>
    </div>
    <div class="edit-field">
      <span href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <input type = "text" placeholder="add home phone"></input>
      </span>
    </div>
    <div class="edit-field">
      <span href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <input type = "text" placeholder="add email"></input>
      </span>
    </div>
    <div class="edit-field">
      <span href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <input type = "text" placeholder="add address"></input>
      </span>
    </div>
    <div class="edit-field">
      <span href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <input type = "text" placeholder="add birthaday"></input>
      </span>
    </div>
    <div class="edit-field">
      <span href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <input type = "text" placeholder="add social profile"></input>
      </span>
    </div>
    <div class="edit-field">
      <span href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <input type = "text" placeholder="add field"></input>
      </span>
    </div>
    <div class="edit-field">
      <span href="#" class="delete-contact">delete contact</span>
    </div>`;
  }

  main() {
    return `<main class="main">
      <form class="container">
        <div class = "edit-main-info">
          <div class = "edit-foto">
            <button class="add-foto-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
              <span>add foto</span>
            </button>
          </div>
          <div class="main-info-holder">
            ${this.createMainInfoHolder()}
          </div>
        </div>
        <div class="scroll-holder">
          <div class = "edit-info">
            ${this.createEditInfo()}
          </div>
        </div>
      </form>
    </main>`
  }

  //Функция отправки запроса на сервер
  serverRequest(user) {
    api.postRequest(user)
  }

  //Функция проверки правильности номера
  checkIfNumber(num) {
    return !isNaN(num) && num.length === 10 ? true : false;
  }

  //Функция сохранения пользователя
  events() {
    const saveUser = document.querySelector(".done-btn");
    const cancelBtn = document.querySelector('.cancel');

    saveUser.addEventListener("click", e => {
      const inputs = [...document.querySelectorAll("input")];
      let user = {
        fullName: `${inputs[0].value} ${inputs[1].value}`,
        phone: inputs[3].value,
        email: inputs[5].value
      };
      if (!user.fullName) {
        return alert("Add username");
      }
      if (!user.phone || !this.checkIfNumber(user.phone)) {
        return alert("Add correct number");
      }
      if (!user.email) {
        return alert("Add email");
      }

      this.serverRequest(user);
    });

    cancelBtn.addEventListener('click', e =>{
      e.preventDefault();
      new Contacts(this.state).render()
		})
  }

  render() {
    const mainDiv = document.querySelector(".phone-book");
    mainDiv.innerHTML = this.header() + this.main();
    this.events();
  }
}


