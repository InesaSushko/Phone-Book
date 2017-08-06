
class Contacts {
  constructor(appState) {
    this.state = appState;
  }

  header() {
    return `<header class="header">
      <div class="container top-radius">
        <h2>Contacts</h2>
      </div>
    </header>`;}

  createForm() {
    return `<form class="form-inline search-form">
      <div class="form-group">
        <label class="sr-only" for="search">Search</label>
        <input type="text" class="form-control" id= "search" placeholder="Search" value = "${this.state.locals.forms.contact}">
      </div>
    </form>`;}

  createContacts() {
    return this.state.db.users
      .map(e => {
        let phone = `(${e.phone.slice(0, 3)}) ${e.phone.slice(
          3,
          6
        )}-${e.phone.slice(6, 8)}-${e.phone.slice(8)}`;
        return `<tr>
          <td>${e.fullName.split(" ")[0]}</td>
          <td>${e.fullName.split(" ")[1]}</td>
          <td>${phone}</td>
        </tr>`;
      })
      .join("");
  }

  main() {
    return `<main><div class="container">
      ${this.createForm()}
        <table class="table table-hover contacts">
          <thead>
            <tr><th>Name</th>
            <th>Last name</th>
            <th>Phone</th></tr>
          </thead>
        <tbody>
          ${this.createContacts()}
        </tbody>
      </table>
    </div>
  </main>`;}

  //filetr users
  filter(keys) {
    const users = [...document.getElementsByTagName("tr")].slice(1);
    users.forEach(user => {
      let eachName = user.children[0].textContent.toLowerCase();
      return eachName.includes(keys.toLowerCase())
        ? (user.style.display = "table")
        : (user.style.display = "none");
    });
    phoneBook.state.locals.forms.contact = keys;
  }

  //sorting
  sorting(users, sortParam) {
    let sortedUsers = users
      .sort((a, b) => {
        let prev = a.children[sortParam].textContent;
        let next = b.children[sortParam].textContent;
        return prev > next ? 1 : -1;
      })
      .map(elem => elem.outerHTML)
      .join("");
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = sortedUsers;
  }

  events() {
    const search = document.querySelector("#search");
    const thead = document.querySelector("thead");
    const users = [...document.getElementsByTagName("tr")].slice(1);
    const th = ["Name", "Last name", "Phone"];
    const tbody = document.querySelector("tbody");

    search.addEventListener("keydown", e => {
      let keys = search.value;
      e.key === "Backspace"
        ? this.filter(keys.slice(0, keys.length - 1))
        : this.filter(keys + e.key);
    });

    thead.addEventListener("click", e => {
      if (e.target.tagName === "TH") {
        let sortParam = th.indexOf(e.target.textContent);
        this.sorting(users, sortParam);
      }
    });

    //saving contact to locals and make users a links to page 'User'
    tbody.addEventListener("click", e => {
      if (e.target.tagName === "TD") {
        let raw = e.target.parentElement;
        this.state.locals.firstName = `${raw.children[0].textContent}`;
        this.state.locals.lastName = `${raw.children[1].textContent}`;
        this.state.locals.number = `${raw.children[2].textContent}`;
      }
      new User(this.state).render();
    });
  }

  renderHTML() {
    const mainDiv = document.querySelector(".phone-book");
    mainDiv.innerHTML = this.header() + this.main();
    this.events();
  }

  render() {
    api.requestUsers().then(data => {
      phoneBook.state.db.users = data;
      this.renderHTML();
    });
  }
}
