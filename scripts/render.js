import { posts } from "./requests.js";
import { hamburger as Hamburger } from "./animation.js";
import { addEventClick } from "./modal.js";
import whichMonth from "./months.js";

function renderNav() {
	const navbar = document.querySelector(".navbar");
	navbar.innerHTML = "";

	const divLogo = document.createElement("div"),
		h1 = document.createElement("h1");

	h1.classList.add("logo");
	h1.textContent = "PetInfo";

	divLogo.appendChild(h1);

	const hamburger = document.createElement("div");
	hamburger.className = "hamburger open";

	const divLinks = document.createElement("div"),
		links = document.createElement("links"),
		btn = document.createElement("button"),
		divAvatar = document.createElement("div"),
		avatar = document.createElement("img");

	links.className = "links hidden";
	btn.textContent = "Criar Publicação";
	divAvatar.classList.add("avatar");
	avatar.src = "#";
	avatar.alt = "Avatar";

	divLinks.appendChild(links);
	divAvatar.appendChild(avatar);
	links.append(btn, divAvatar);

	navbar.append(divLogo, hamburger, divLinks);
	Hamburger();
}

export async function render() {
	//render navbar
	renderNav();

	const [allPosts, user] = [...(await posts())];

	const ul = document.querySelector("#posts");
	ul.innerHTML = "";

	allPosts.forEach((x) => {
		const li = document.createElement("li");
		li.classList.add("post");
		li.dataset.postId = x.id;

		const post_head = document.createElement("div");
		post_head.classList.add("post-head");

		const profile = document.createElement("div");
		profile.classList.add("profile");
		const img = document.createElement("img");
		img.src = user.avatar;
		const avatar = document.querySelector(".avatar img");
		avatar.src = user.avatar;
		const name = document.createElement("div");
		name.classList.add("post-user");
		name.textContent = x.user.username;
		profile.append(img, name);

		const pipe = document.createElement("span");

		const post_data = document.createElement("div");
		post_data.classList.add("post-data");
		const date = new Date(Date.parse(x.createdAt)),
			monthIndex = date.getMonth(date),
			year = date.getFullYear(date);

		const month = whichMonth(monthIndex);
		post_data.textContent = `${month} de ${year}`;

		const post_ger = document.createElement("div");
		post_ger.classList.add("post-ger");
		const btn1 = document.createElement("button"),
			btn2 = document.createElement("button");
		btn1.textContent = "Editar";
		addEventClick(btn1);
		btn1.dataset.edit = x.id;
		btn2.textContent = "Excluir";
		addEventClick(btn2);
		post_ger.append(btn1, btn2);

		x.user.id == user.id
			? post_head.append(profile, pipe, post_data, post_ger)
			: post_head.append(profile, pipe, post_data);

		const post_body = document.createElement("div");
		post_body.classList.add("post-body");
		const title = document.createElement("h3");
		title.textContent = x.title;
		const content = document.createElement("p");
		content.textContent = x.content;
		post_body.append(title, content);

		const post_acc = document.createElement("div");
		post_acc.classList.add("post-acc");
		post_acc.textContent = "Acessar Publicação";
		post_acc.dataset.show = x.id;
		addEventClick(post_acc);

		li.append(post_head, post_body, post_acc);

		ul.appendChild(li);
	});
}
