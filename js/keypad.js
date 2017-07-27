class KeyPad {
  constructor() {
    this.keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"];
  }

  header() {
    const header = `<header class="header">
		                    <div class="container top-radius">
			                    <h2>Keypad</h2>
		                    </div>
	                    </header>`;
    return header;
  }

  createKeypadHolder() {
    let keypadHTML = `<div class="keypad-holder">`;
    this.keys.forEach(
      elem => (keypadHTML += `<button class="key">${elem}</button>`)
    );
    keypadHTML += `<button class="key"> <span class="glyphicon glyphicon-earphone" aria-hidden="true"></span></button></div>`;
    return keypadHTML;
  }

  main() {
    let mainHTML = `<main class="main">
		                    <div class="container">
			                    <div class="number">
				                    <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
				                    <span class ="numbers"></span>
				                    <span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>
			                    </div>`;
    mainHTML += this.createKeypadHolder();
    mainHTML += `</div></main>`;
    return mainHTML;
  }

  formatNumber(num) {
    const numbers = document.querySelector(".number>.numbers");
    let entered = numbers.textContent.length;
    if (entered < 15) {
      if (entered == 0) {
        numbers.textContent += "(";
      }
      if (entered == 4) {
        numbers.textContent += ") ";
      }
      if (entered == 9 || entered == 12) {
        numbers.textContent += "-";
      }
      numbers.textContent += num;
    }
  }

  mouseClicks() {
    const keys = document.querySelector(".keypad-holder");
    const button = document.querySelector(".glyphicon-circle-arrow-left");
    
    keys.addEventListener("click", e => {
      if (e.target.tagName == "BUTTON") {
        this.formatNumber(e.toElement.innerText);
      }
    });

    button.addEventListener("click", e => {
      this.clearNumber();
    });
  }

  clearNumber() {
    const num = document.querySelector(".number>.numbers");
    num.textContent = num.textContent.slice(0, num.textContent.length - 1);
    if (num.textContent.length === 1) {
      num.textContent = "";
    }
  }

  keypadPress() {
    document.body.addEventListener("keydown", e => {
      if (/[0-9#*]/.test(e.key)) {
        this.formatNumber(e.key);
      }
      if (e.key === "Backspace") {
        this.clearNumber();
      }
    });
  }

  render() {
    const mainDiv = document.createElement("div");
    mainDiv.innerHTML = this.header() + this.main();
    document.body.prepend(mainDiv);
    this.mouseClicks();
    this.keypadPress();
  }
}

let myNewKeypad = new KeyPad();
myNewKeypad.render();
