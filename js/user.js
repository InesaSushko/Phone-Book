class User {
  constructor(appState) {
    this.state = appState
  }

  header() {
    return `<header class="header">
			<div class="container top-radius">
				<div class="user-top-line">
					<a href="index.html" class = "contacts">
						<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>Contacts</a>
					<a href="edit-contact.html" class = "edit">Edit</a>
				</div>
			</div>
		</header>`;
  }

  createFields() {
    return  `<div class="message">
			<div class= "options-icon">
				<span class="icon glyphicon glyphicon-comment" aria-hidden="true"></span>
			</div>
			<span class = "options-text">message</span>
		</div>
		<div class="call">
			<div class= "options-icon">
				<span class="icon glyphicon glyphicon-earphone" aria-hidden="true"></span>
			</div>
			<span class = "options-text">call</span>
		</div>
		<div class="video">
			<div class= "options-icon">
				<span class="icon glyphicon glyphicon-facetime-video" aria-hidden="true"></span>
			</div>
			<span class = "options-text">video</span>
		</div>
		<div class="mail">
			<div class= "options-icon">
				<span class="icon glyphicon glyphicon-envelope" aria-hidden="true"></span>
			</div>
			<span class = "options-text">mail</span>
		</div>`
  }

  createOptions() {
    return `<div class ="options-item"><a href="#">Notes</a></div>
			<div class ="options-item"><a href="#">Send message</a></div>
			<div class ="options-item"><a href="#">Share contact</a></div>
			<div class ="options-item"><a href="#">Add to favorites</a></div>
			<div class ="options-item"><a href="#">Share my location</a></div>
			<div class ="options-item"><a href="#">Block this caller</a></div>`
  }

  main() {
    return `<div class="container"><img src="images/user-face.png" alt="#" class=" user-img img-circle center-block">
			<div class="user-name">${this.state.locals.firstName} ${this.state.locals.lastName}</div>
			<div class="options-line">
				${this.createFields()}
			</div>
			<div class="tel-number"><h3>mobile</h3><div>
			${this.state.locals.number}
		</div>
		<div class="options-table">${this.createOptions()}</div></div>`;
  }

	events() {
		const editButton = document.querySelector('.edit');
		const contactsButton = document.querySelector('.contacts') 

		editButton.addEventListener('click', e =>{
			e.preventDefault()
			new EditContact(this.state).render()
		})

		contactsButton.addEventListener('click', e =>{
			e.preventDefault()
			new Contacts(this.state).render()
		})
	}

  render() {
    const mainDiv = document.querySelector(".phone-book");
    mainDiv.innerHTML = this.header() + this.main();
		this.events();
  }
}



