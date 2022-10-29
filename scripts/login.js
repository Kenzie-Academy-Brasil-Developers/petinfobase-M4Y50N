import { login } from "./requests.js";
import { isInputDisable, loading } from "./inputLoading.js";

const eventLogin = () => {
	const form = document.querySelector("form");
	const elements = [...form.elements];

	isInputDisable(form.elements);

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const body = {};
		elements.forEach((elem) => {
			if (elem.tagName === "INPUT" && elem.value !== "") {
				body[elem.type] = elem.value;
			}
		});

		isInputDisable(form.elements);

		loading();

		await login(body);
	});
};

eventLogin();
