class User {
  constructor() {
    this.fields = [
      { className: "message", icon: "comment" },
      { className: "call", icon: "earphone" },
      { className: "video", icon: "facetime-video" },
      { className: "mail", icon: "envelope" }
    ];
    this.options = [
      "Notes",
      "Send message",
      "Share contac",
      "Add to favorites",
      "Share my location",
      "Block this caller"
    ];
  }

  header() {
    const header = `<header class="header">
		<div class="container top-radius">
			<div class="user-top-line">
				<a href="index.html">
					<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					Contacts</a>
					<a href="edit-contact.html">Edit</a>
				</div>
			</div>
		</header>`;
    return header;
  }

  createFields() {
    let fieldsHTML = ``;
    this.fields.forEach(elem => {
      let { className } = elem;
      let { icon } = elem;
      fieldsHTML += `<div class="${className}"><div class= "options-icon"><span class="icon glyphicon glyphicon-${icon}" aria-hidden="true"></span></div>
					<span class = "options-text">${className}</span></div>`;
    });
    return fieldsHTML;
  }

  createOptions() {
    let items = ``;
    this.options.forEach(elem => {
      items += `<div class ="options-item"><a href="#">${elem}</a></div>`;
    });
    return items;
  }

  main() {
    let mainHTML = `<div class="container">
				<img src="images/user-face.png" alt="#" class=" user-img img-circle center-block">
				<div class="user-name">User Name</div>
				<div class="options-line">`;
    mainHTML += this.createFields();
    mainHTML += `</div><div class="tel-number">
					<h3>mobile</h3>
					<div></div>
				</div>
				<div class="tel-number">
					<h3>home</h3>
					<div></div>
				</div>
				<div class="options-table">`;
    mainHTML += this.createOptions() + `</div></div>`;
    return mainHTML;
  }

  render() {
    const mainDiv = document.createElement("div");
    mainDiv.innerHTML = this.header() + this.main();
    document.body.prepend(mainDiv);
  }
}

let myNewKeypad = new User();
myNewKeypad.render();
