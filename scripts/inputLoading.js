//Verify input emptyness
function isInputDisable() {
	const input = document.querySelector("#user");

	input.addEventListener("input", () => {
		const btn = document.querySelector("form button");
		btn.classList.remove("disable");
		if (input.value == "") {
			btn.classList.add("disable");
		}
	});
}
//verify input
isInputDisable();
