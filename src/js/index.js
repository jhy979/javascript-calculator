import { $, $$ } from "./dom.js";
import {CONSTANTS,ERR_MSG} from "./constants.js"

class Calculator {
  constructor() {
    this.number1 = 0;
    this.number2 = 0;
    this.operator = "";
    this.flag = true;
    this.numberEvent();
    this.operatorEvent();
    this.resultEvent();
    this.reset();
  }

  isValidLength() { 
    return String($("#total").innerText).length >= CONSTANTS.MAX_LENGTH;
  }

  numberEvent() {
    $$(".digit").forEach((digit) => {
      digit.addEventListener("click", (e) => {
        if (this.operator === "") {
          if (this.isValidLength()) {
            alert(ERR_MSG.INVALID_LENGTH);
            return;
          }

          $("#total").innerText =
            Number($("#total").innerText) * 10 + Number(e.target.textContent);
          return;
        }
        if (this.operator !== "" && this.flag) {
          this.flag = false;
          $("#total").innerText = e.target.textContent;
          return;
        }

        if (this.isValidLength()) {
          alert(ERR_MSG.INVALID_LENGTH);
          return;
        }

        $("#total").innerText =
          Number($("#total").innerText) * 10 + Number(e.target.textContent);
      });
    });
  }

  operatorEvent() {
    $$(".operation").forEach((operator) => {
      operator.addEventListener("click", (e) => {
        if (e.target.innerText === "+") {
          this.operator = "+";
          this.number1 = Number($("#total").innerText);
        }
        if (e.target.innerText === "-") {
          this.operator = "-";
          this.number1 = Number($("#total").innerText);
        }
        if (e.target.innerText === "X") {
          this.operator = "X";
          this.number1 = Number($("#total").innerText);
        }
        if (e.target.innerText === "/") {
          this.operator = "/";
          this.number1 = Number($("#total").innerText);
        }
      });
    });
  }

  resultEvent() {
    $(".operations > .operation:last-child").addEventListener("click", (e) => {
      this.number2 = Number($("#total").innerText);
      if (this.operator === "+") {
        $("#total").innerHTML = this.number1 + this.number2;
        this.initializeValue();
      }
      if (this.operator === "-") {
        $("#total").innerHTML = this.number1 - this.number2;
        this.initializeValue();
      }
      if (this.operator === "X") {
        $("#total").innerHTML = this.number1 * this.number2;
        this.initializeValue();
      }
      if (this.operator === "/") {
        if (this.number2 === 0) {
          alert(ERR_MSG.DIVIDE_BY_ZERO);
          this.initializeValue();
          $("#total").innerHTML = 0;
          this.flag = true;
          return;
        }
        $("#total").innerHTML = Math.floor(this.number1 / this.number2);
        this.initializeValue();
      }
    });
  }

  initializeValue() {
    this.number1 = 0;
    this.number2 = 0;
    this.operator = "";
  }

  reset() {
    $(".modifier").addEventListener("click", () => {
      this.initializeValue();
      $("#total").innerHTML = 0;
      this.flag = true;
    });
  }
}

new Calculator();
