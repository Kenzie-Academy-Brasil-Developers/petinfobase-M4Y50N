import { posts } from "./requests.js";
import { hamburger } from "./animation.js";

hamburger();

export async function render() {
	const allPosts = await posts();

	console.log(allPosts);

	const ul = document.querySelector("#posts");
	// allPosts.forEach((x) => {
	// 	const li = document.createElement("li");

	// 	li.innerHTML = x.title + "<br/>" + x.content;

	// 	ul.appendChild(li);
	// });
}

render();
