import toast from "./toast.js";
import { render } from "./render.js";
import { getLocalStorage } from "./localStorage.js";

//render posts
const token =
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjU3MTEwMDcsImV4cCI6MTY5NzI0NzAwNywic3ViIjoiMTkwZjVjYWQtYTdiNS00Zjc4LWFiM2YtMzBkMmQ5NDdiMTRiIn0.pVpRmJ0BENyiq0Dli6_me0nVH_v9qoA9ZF2DgEGSAnM",
	baseURL = "http://localhost:3333";

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
			toast("Erro!", "Email ou senha inválidos", "", "login");
		}
	} catch (err) {
		toast("Erro!", "Algo deu errado", "", "");
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
			toast("Erro!", "Email ou Usuário já existentes", "", "register");
		}
	} catch (err) {
		toast("Erro!", "Algo deu errado", "", "");
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

		try {
			const userToken = `Bearer ${getLocalStorage().token}`;
			const user = await fetch(`${baseURL}/users/profile`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: userToken,
				},
			});

			return [await request.json(), await user.json()];
		} catch (err) {
			toast("Erro!", "Algo deu errado", "", "posts");
		}
	} catch (err) {
		toast("Erro!", "Algo deu errado");
	}
}

async function editPost(body, id) {
	try {
		const request = await fetch(`${baseURL}/posts/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(body),
		});

		toast(
			"Sucesso!",
			"Post editado com sucesso!",
			"Seu post já está no feed",
			"edit"
		);
		setTimeout(() => {
			render();
		}, 3000);
	} catch (err) {
		toast("Erro!", "Algo deu errado", "", "edit");
	}
}

async function deletePost(id) {
	try {
		const request = await fetch(`${baseURL}/posts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		toast(
			"Sucesso!",
			"Post deletado com sucesso!",
			"Seu post foi apagado",
			"delete"
		);
		setTimeout(() => {
			render();
		}, 3000);
	} catch (err) {
		toast("Erro!", "Algo deu errado", "", "");
	}
}

async function createPost(body) {
	try {
		const request = await fetch(`${baseURL}/posts/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(body),
		});

		const response = await request.json();

		if (request.ok) {
			toast(
				"Sucesso!",
				"Post criado com sucesso!",
				"Sua publicação foi postada",
				"delete"
			);

			setTimeout(() => {
				render();
			}, 3000);
		} else {
			toast("Erro!", "Algo deu errado", "", "");
		}

		return response;
	} catch (err) {
		toast("Erro!", "Algo deu errado", "", "");
	}
}

export { login, register, posts, editPost, deletePost, createPost };
