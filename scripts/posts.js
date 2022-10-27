import { posts } from "./requests.js";
import { hamburger } from "./animation.js";

hamburger();

export async function render() {
	const [allPosts, user] = [...(await posts())];

	console.log(allPosts, user);

	const ul = document.querySelector("#posts");

	allPosts.forEach((x) => {
		const li = document.createElement("li");
		li.classList.add("post");

		const post_head = document.createElement("div");
		post_head.classList.add("post-head");

		const profile = document.createElement("div");
		profile.classList.add("profile");
		const img = document.createElement("img");
		img.src = user.avatar;
		const name = document.createElement("div");
		name.classList.add("post-user");
		name.textContent = x.user.username;
		profile.append(img, name);

		const post_data = document.createElement("div");
		post_data.classList.add("post-data");
		post_data.textContent = x.createdAt.substring(0, 7);

		const post_ger = document.createElement("div");
		post_ger.classList.add("post-ger");
		const btn1 = document.createElement("button"),
			btn2 = document.createElement("button");
		btn1.textContent = "Editar";
		btn2.textContent = "Excluir";
		post_ger.append(btn1, btn2);

		x.user.id == user.id
			? post_head.append(profile, post_data, post_ger)
			: post_head.append(profile, post_data);

		const post_body = document.createElement("div");
		post_body.classList.add("post-body");
		const title = document.createElement("h3");
		title.textContent = x.title;
		post_body.append(title, x.content);
		// post_body.textContent = x.content;

		const post_acc = document.createElement("div");
		post_acc.classList.add("post-acc");
		post_acc.textContent = "Acessar Publicação";

		li.append(post_head, post_body, post_acc);

		ul.appendChild(li);
	});
}

render();
