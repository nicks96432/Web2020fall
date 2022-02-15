var cells = document.getElementsByClassName("date");
var input = document.getElementById("cal-input");
var color = document.getElementById("cal-color");
var button = document.getElementById("cal-button");
input.value = "";
color.value = "#b0b0b0";

let dates = document.getElementsByClassName("date");
for (let i = 0; i < dates.length; ++i) {
	dates[i].addEventListener("mousedown", () => {
		let nowDate = document.getElementById("now-date");
		if (nowDate !== null) nowDate.removeAttribute("id");
		dates[i].setAttribute("id", "now-date");
	});
}

button.onclick = () => {
	let text = document.createElement("div");
	text.innerText = input.value;
	text.style.color = color.value;
	let nowDate = document.getElementById("now-date");
	if (nowDate !== null) nowDate.appendChild(text);
};

document.onkeydown = (e) => {
	if (e.key === "Enter") {
		let text = document.createElement("div");
		text.innerText = input.value;
		text.style.color = color.value;
		let nowDate = document.getElementById("now-date");
		if (nowDate !== null) nowDate.appendChild(text);
	}
};

//Sets the page's theme. No need to modify
var themeButton = document.getElementsByClassName("ChooseTheme");
for (var i = 0; i < themeButton.length; ++i) {
	themeButton[i].addEventListener(
		"click",
		(e) => {
			document.body.setAttribute("class", e.target.id);
		},
		false
	);
}
