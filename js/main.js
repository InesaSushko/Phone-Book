class App {
  constructor() {
    this.state = {
      db: {
        users: []
      },
      locals: {
          forms:{
              contact: '',
              number: ''
          }
      }
    };
    this.ui = {
      contacts: new Contacts(this.state),
      keypad: new KeyPad(this.state),
      addUser: new AddUser(this.state)
    };
  }

  router() {
    const content = document.querySelector(".phone-book");
    const links = [...document.querySelectorAll("a")];
    function updateState(state) {
      content.innerHTML = state;
    }
    links.forEach(link => {
      let href = link.getAttribute("href");

      link.addEventListener("click", e => {
        let clickedA = e.currentTarget.href;
        e.preventDefault();
        if (clickedA.includes("index")) {
          this.ui.contacts.render(this.state);
        }
        if (clickedA.includes("keypad")) {
          this.ui.keypad.render(this.state);
        }
        if (clickedA.includes("add-user")) {
          this.ui.addUser.render(this.state);
        }
      });
    });

    window.addEventListener("popstate", event => {
      updateState(event.state);
    });
  }

  render() {
    this.ui.contacts.render();
    this.router();
  }
}

const phoneBook = new App();
phoneBook.render();
