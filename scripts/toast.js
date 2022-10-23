const toast = (title, message, waitmsg, type) => {
	switch (title) {
		case "Erro!":
			type == "login" ? loginError("Email ou senha inválidos") : type;
			break;
		case "Sucesso!":
			const body = document.querySelector("body");

			const container = document.createElement("div");
			container.classList.add("toast-container");

			const icon = document.createElement("img");
			icon.alt = `Messagem de ${title}`;

			const titleContainer = document.createElement("div");
			titleContainer.classList.add("toast-title");

			if (title == "Sucesso!") {
				container.classList.add("successToast");
				icon.src = "./src/imgs/check.png";
			} else {
				container.classList.add("errorToast");
				icon.src = "./src/imgs/errorIcon.png";
			}

			const h3 = document.createElement("h3");
			h3.innerText = message;

			titleContainer.append(icon, h3);

			const msg = document.createElement("p");
			msg.innerText = waitmsg;

			container.append(titleContainer, msg);

			body.appendChild(container);
	}
};

const loginError = (message) => {
	const validation = document.querySelector(".validation");

	const form = document.querySelector("form");
	const elements = [...form.elements];

	elements.forEach((elem) => {
		if (elem.tagName == "INPUT") {
			elem.classList.add("error");
			validation.classList.remove("hidden");
			validation.textContent = message;
		}
	});
};

export default toast;
