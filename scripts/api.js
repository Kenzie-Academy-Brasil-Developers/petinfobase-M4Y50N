//render posts
const token =
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjU3MTEwMDcsImV4cCI6MTY5NzI0NzAwNywic3ViIjoiMTkwZjVjYWQtYTdiNS00Zjc4LWFiM2YtMzBkMmQ5NDdiMTRiIn0.pVpRmJ0BENyiq0Dli6_me0nVH_v9qoA9ZF2DgEGSAnM",
	baseURL = "http://localhost:3333";

const AllPosts = async function () {
	await fetch(`${baseURL}/posts`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	})
		.then((response) => response.json())
		.then((response) => console.log(response));
};

export default AllPosts;
