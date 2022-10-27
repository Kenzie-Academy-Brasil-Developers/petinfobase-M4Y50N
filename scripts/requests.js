import toast from "./toast.js";
import { getLocalStorage } from "./localStorage.js";

//render posts
const token =
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjU3MTEwMDcsImV4cCI6MTY5NzI0NzAwNywic3ViIjoiMTkwZjVjYWQtYTdiNS00Zjc4LWFiM2YtMzBkMmQ5NDdiMTRiIn0.pVpRmJ0BENyiq0Dli6_me0nVH_v9qoA9ZF2DgEGSAnM",
	baseURL = "http://localhost:3333";

//show all posts
// const AllPosts = async function () {
// 	await fetch(`${baseURL}/posts`, {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: token,
// 		},
// 	})
// 		.then((response) => response.json())
// 		.then((response) => console.log(response));
// };

async function login(body) {
	try {
		const request = await fetch(`${baseURL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (request.ok) {
			const response = await request.json();

			toast(
				"Sucesso!",
				"Login efetuado com sucesso! ",
				"Aguarde você já vai ser redirecionado!",
				"login"
			);

			localStorage.setItem("user", JSON.stringify(response));

			setTimeout(() => {
				window.location.replace("./pages/feed/feed.html");
			}, 3000);
		} else {
			toast("Erro!", "Email ou senha inválidos", "login");
		}
	} catch (err) {
		toast("Erro!", "Algo deu errado");
	}
}

async function register(body) {
	try {
		const request = await fetch(`${baseURL}/users/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (request.ok) {
			const response = await request.json();

			toast(
				"Sucesso!",
				"Cadastro efetuado com sucesso! ",
				"Aguarde você já vai ser redirecionado para página de login!",
				"register"
			);
			setTimeout(() => {
				window.location.replace("/index.html");
			}, 3000);
		} else {
			toast("Erro!", "Email ou Usuário já existentes", "register");
		}
	} catch (err) {
		toast("Erro!", "Algo deu errado");
	}
}

async function posts() {
	try {
		const request = await fetch(`${baseURL}/posts`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		return await request.json();
	} catch (err) {
		toast("Erro!", "Algo deu errado");
	}
}

export { login, register, posts };
