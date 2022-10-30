//Verify input emptyness
function isInputDisable(elements) {
	elements = [...elements];

	const filteredArray = elements.filter((elem) => {
		return elem.tagName == "INPUT";
	});

	filteredArray.forEach((elem) => {
		elem.addEventListener("input", () => {
			const noEmp = filteredArray.filter((e) => {
				return e.value == "";
			});

			const btn = document.querySelector("form button");
			if (!noEmp.length) {
				btn.classList.remove("disable");
			} else {
				btn.classList.add("disable");
			}
		});
	});
}

function loading() {
	const load = document.querySelector(".loading");
	const btn_sub = document.querySelector(".btn-submit");
	const btn_sub_cont = document.querySelector(".btn-submit .content");

	load.classList.remove("hidden");
	btn_sub.classList.add("disable");
	btn_sub_cont.classList.add("hidden");

	setTimeout(() => {
		load.classList.add("hidden");
		btn_sub.classList.remove("disable");
		btn_sub_cont.classList.remove("hidden");
	}, 1000);
}

export { isInputDisable, loading };
