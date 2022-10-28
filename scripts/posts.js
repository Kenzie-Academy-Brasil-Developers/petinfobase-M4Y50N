import { render } from "./render.js";
import { getLocalStorage } from "./localStorage.js";

if (!getLocalStorage()) {
	window.location = "/index.html";
}

render();
