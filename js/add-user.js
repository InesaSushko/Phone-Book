class AddUser {
  constructor() {
    this.editFields = ["First Name", "Last Name", "Company"];
    this.editInfo = [
      "add mobile phone",
      "add home phone",
      "add email",
      "add address",
      "add birthday",
      "add social profile",
      "add field"
    ];
    this.url = 'http://easycode-js.herokuapp.com/inesasushko/users';
  }

  header() {
    const header = `<header class="header">
		                <div class="container top-radius">
			                <nav class="user-top-line">
				                <a href="user.html">Cansel</a>
				                <button class = "done-btn">Done</button>
			                </nav>
		                </div>
	                </header>`;
    return header;
  }

  createEditField(arr) {
    let editFieldHTML = ``;
    arr.forEach(e => {
      editFieldHTML += `<div class="edit-field">
							<span href="#" class="add-btn">
                <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
								<input placeholder="${e}"></input>
							</span>
						</div>`;
    });
    return editFieldHTML;
  }

  main() {
    let mainHTML = `<main class="main">
		                <form class="container">
			                <div class="edit-main-info">
				                <div class="edit-foto">
                                <button class="add-foto-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
						            <span>add foto</span></button>
					            </div>
					            <div class="main-info-holder">`;
    mainHTML += this.createEditField(this.editFields);
    mainHTML += `</div>
			</div>
			<div class="scroll-holder">
				<div class="edit-info">`;
    mainHTML += this.createEditField(this.editInfo);
    mainHTML += `<div class="edit-field">
							<button href="#" class="delete-contact">delete contact</button>
						</div>
					</div>
				</div>
			</form>
		</main>`;
    return mainHTML;
  }

//Функция отправки запроса на сервер
  serverRequest(user) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", this.url, true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(user));
    xhr.addEventListener('readystatechange', () =>{
      if(xhr.readyState===4){
        alert(`USER ${(user.fullName).toUpperCase()} HAS BEEN ADDED TO YOUR PHONEBOOK`)
      }
    })
  }

//Функция проверки правильности номера
checkIfNumber(num) {
    return !isNaN(num) && num.length ===10 ? true : false;
  }

//Функция сохранения пользователя
  events(){
    const saveUser = document.querySelector('.done-btn');

    saveUser.addEventListener('click', e =>{
    const inputs = [...document.querySelectorAll('input')];
    const name = inputs[0].value;
    const lastName = inputs[1].value;
    const phone = inputs[3].value;
    const email = inputs[5].value;
      if(!name){
        return alert('Add username');
      };
      if(!phone || !this.checkIfNumber(phone)){
        return alert('Add correct number')
      }
      if(!email) {
        return alert('Add email')
      }

      let user = {fullName : name+' '+lastName, phone, email}

      this.serverRequest(user)
    })
  }

  render() {
    const mainDiv = document.createElement("div");
    mainDiv.innerHTML = this.header() + this.main();
    document.body.prepend(mainDiv);
    this.events();
  }
}

let myNewKeypad = new AddUser();
myNewKeypad.render();
