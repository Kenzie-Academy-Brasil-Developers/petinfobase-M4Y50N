//hamburger
export async function hamburger() {
	document.querySelector(".hamburger").addEventListener("click", (x) => {
		document.querySelector(".links").classList.toggle("hidden");
		document.querySelector(".hamburger").classList.toggle("open");
		document.querySelector(".hamburger").classList.toggle("close");
	});
}
