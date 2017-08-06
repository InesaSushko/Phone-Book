class Api {
  constructor(url) {
    this.url = url;
  }

  requestUsers() {
    return fetch(this.url).then(data => data.json()).then(data => data)

  }

  postRequest(user) {
    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(data =>
      alert(
        `USER ${user.fullName.toUpperCase()} HAS BEEN ADDED TO YOUR PHONEBOOK`
      )
    );
  }
}

const api = new Api(`http://easycode-js.herokuapp.com/inesasushko/users`);
