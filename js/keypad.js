class KeyPad {
  constructor(appState) {
    this.state = appState
  }

  header() {
    return `<header class="header">
      <div class="container top-radius">
        <h2>Keypad</h2>
      </div>
    </header>`;
  }

  main() {
    return `<main class="main">
      <div class="container">
		    <div class="number">
		      <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
		      <span class ="numbers">${this.state.locals.forms.number}</span>
		      <span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>
		    </div>
        <div class="keypad-holder">
				  <button class="key">1</button>
				  <button class="key">2</button>
				  <button class="key">3</button>
				  <button class="key">4</button>
			  	<button class="key">5</button>
			  	<button class="key">6</button>
		  		<button class="key">7</button>
		  		<button class="key">8</button>
		  		<button class="key">9</button>
		  		<button class="key">*</button>
		  		<button class="key">0</button>
		  		<button class="key">#</button>
		  		<button class="key"> <span class="glyphicon glyphicon-earphone" aria-hidden="true"></span></button>
        </div>
      </main>`;   
  }

//formating number
  formatNumber(newNum, numbers) {
    let numLength = numbers.textContent.length;
    if (numLength < 14) {
      if (numLength === 0) {
        numbers.textContent += "(";
      }
      if (numLength === 4) {
        numbers.textContent += ")";
      }
      if (numLength === 8 || numLength === 11) {
        numbers.textContent += "-";
      }
      numbers.textContent += newNum;
      phoneBook.state.locals.forms.number = numbers.textContent;
    }
  }

//очищает поле ввода номера
  clearNumber(numbers) {
    numbers.textContent = numbers.textContent.slice(0, numbers.textContent.length - 1);
    phoneBook.state.locals.forms.number = numbers.textContent;
    if (numbers.textContent.length === 1) {
      numbers.textContent = "";
    }
  }

  events() {
    const numbers = document.querySelector(".number>.numbers");
    const keys = document.querySelector(".keypad-holder");
    const deleteNum = document.querySelector(".glyphicon-circle-arrow-left");

    keys.addEventListener("click", e => {
      if (e.target.className == "key") {
        this.formatNumber(e.toElement.innerText, numbers);
      }
    });

    deleteNum.addEventListener("click", e => {
      this.clearNumber(numbers);
    });

    document.body.addEventListener("keydown", e => {
      if (/[0-9#*]/.test(e.key)) {
        this.formatNumber(e.key, numbers);
      }
      if (e.key === "Backspace") {
        this.clearNumber(numbers);
      }
    });
  }

  render() {
    const mainDiv = document.querySelector(".phone-book");
    mainDiv.innerHTML =  this.header() + this.main();
    this.events()
  }
}



