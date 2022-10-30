import { register } from "./requests.js";
import { isInputDisable, loading } from "./inputLoading.js";

const eventRegister = () => {
	const form = document.querySelector("form");
	const elements = [...form.elements];

	isInputDisable(form.elements);

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const body = {};

		elements.forEach((elem) => {
			if (elem.tagName == "INPUT" && elem.value !== "") {
				body[elem.id] = elem.value;
			}
		});

		isInputDisable(form.elements);

		loading();

		await register(body);
	});
};

eventRegister();
