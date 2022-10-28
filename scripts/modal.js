import { render } from "./render.js";
import { editPost as EditPost } from "./requests.js";

const body = document.querySelector("body");

function openModal() {
	const modalContainer = document.createElement("div");
	modalContainer.className = "modal-container hidden";

	const modal = document.createElement("div");
	modal.classList.add("modal");

	modalContainer.appendChild(modal);

	body.appendChild(modalContainer);
}

function showPost(post) {
	const profileContent = post.querySelector(".profile").innerHTML,
		dataContent = post.querySelector(".post-data").textContent;

	const titleContent = post.querySelector("h3").textContent,
		contentContent = post.querySelector("p").textContent;

	const profile = document.createElement("div"),
		span = document.createElement("span"),
		data = document.createElement("div"),
		title = document.createElement("h3"),
		content = document.createElement("p");

	profile.classList.add("profile");
	profile.innerHTML = profileContent;

	data.classList.add("post-data");
	data.innerHTML = dataContent;

	title.textContent = titleContent;
	content.textContent = contentContent;

	const close = document.createElement("div");
	close.addEventListener("click", () => {
		const modalContainer = document.querySelector(".modal-container");
		modalContainer.classList.add("hidden");

		modalContainer.querySelector(".modal").innerHTML = "";
	});
	close.classList.add("close-modal");
	close.textContent = "X";

	const post_head = document.createElement("div"),
		post_body = document.createElement("div");

	post_head.classList.add("post-head");
	post_body.classList.add("post-body");

	post_head.append(profile, span, data, close);
	post_body.append(title, content);

	return [post_head, post_body];
}

function editPost(post) {
	const titleContent = post.querySelector("h3").textContent,
		contentContent = post.querySelector("p").textContent;

	const edit = document.createElement("div"),
		labelTitle = document.createElement("h3"),
		labelContent = document.createElement("h3"),
		inputTitle = document.createElement("input"),
		textArea = document.createElement("textarea"),
		btnCancel = document.createElement("button"),
		btnSave = document.createElement("button");

	edit.classList.add("edit");
	edit.textContent = "Edição";

	const close = document.createElement("div");
	close.addEventListener("click", () => {
		const modalContainer = document.querySelector(".modal-container");
		modalContainer.classList.add("hidden");

		modalContainer.querySelector(".modal").innerHTML = "";
	});
	close.classList.add("close-modal");
	close.textContent = "X";

	inputTitle.type = "text";
	inputTitle.id = "edit-titulo";
	inputTitle.name = "edit-titulo";
	inputTitle.value = titleContent;

	textArea.name = "edit-content";
	textArea.id = "edit-content";

	labelTitle.textContent = "Título do Post";
	labelContent.textContent = "Conteúdo do Post";
	inputTitle.value = titleContent;
	textArea.textContent = contentContent;

	btnCancel.textContent = "Cancelar";
	btnCancel.addEventListener("click", () => {
		const modalContainer = document.querySelector(".modal-container");
		modalContainer.classList.add("hidden");

		modalContainer.querySelector(".modal").innerHTML = "";
	});
	btnSave.textContent = "Salvar Alterações";
	btnSave.addEventListener("click", async () => {
		const body = {},
			id = post.dataset["postId"];
		body["title"] = document.querySelector("#edit-titulo").value;
		body["content"] = textArea.value;

		await EditPost(body, id);

		const modalContainer = document.querySelector(".modal-container");
		modalContainer.classList.add("hidden");

		modalContainer.querySelector(".modal").innerHTML = "";

		render();
	});

	const post_head = document.createElement("div"),
		post_body = document.createElement("div"),
		post_footer = document.createElement("div");

	post_head.classList.add("post-head");
	post_body.classList.add("post-body");
	post_footer.classList.add("post-footer");

	post_head.append(edit, close);
	post_body.append(labelTitle, inputTitle, labelContent, textArea);
	post_footer.append(btnCancel, btnSave);

	return [post_head, post_body, post_footer];
}

function addEventClick(element) {
	element.addEventListener("click", (event) => {
		openModal();
		const modalContainer = document.querySelector(".modal-container");
		modalContainer.classList.remove("hidden");

		const modal = document.querySelector(".modal");
		const eventTarget = event.target;
		if (eventTarget.dataset["show"]) {
			const post = event.target.parentNode;
			modal.append(...showPost(post));
		} else if (eventTarget.dataset["edit"]) {
			const post = event.target.parentNode.parentNode.parentNode;
			modal.append(...editPost(post));
			auto_grow(document.querySelector("#edit-content"));
		}
	});
}

//grow text area
function auto_grow(element) {
	element.style.height = "5px";
	element.style.height = element.scrollHeight + "px";
}

export { openModal, addEventClick };
