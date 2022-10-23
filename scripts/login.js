import { login } from "./requests.js";

const eventLogin = () => {
	const form = document.querySelector("form");
	const elements = [...form.elements];

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const body = {};

		elements.forEach((elem) => {
			if (elem.tagName == "INPUT" && elem.value !== "") {
				body[elem.type] = elem.value;
			}
		});

		await login(body);
	});
};

eventLogin();