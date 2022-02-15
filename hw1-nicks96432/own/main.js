const fileNames = [
	"https://imgur.com/j4JjbTm.png",
	"https://imgur.com/rWeWbQJ.png",
	"https://imgur.com/iQsUDMy.png",
	"https://imgur.com/8bwQRj2.png",
	"https://imgur.com/hx7pYgD.png",
	"https://imgur.com/DbpK1xl.png",
	"https://imgur.com/2y5BU7q.png",
	"https://imgur.com/FPGciXZ.png",
	"https://imgur.com/UUMwqrq.png",
	"https://imgur.com/NiPPHL7.png",
	"https://imgur.com/0jdFrzE.png",
	"https://imgur.com/DEPyYA0.png",
	"https://imgur.com/3Bji4mk.png",
	"https://imgur.com/NOK0eUy.png",
	"https://imgur.com/l9XFCXD.png",
	"https://imgur.com/06VLY4V.png",
	"https://imgur.com/0SOSDnV.png",
	"https://imgur.com/TcnQimX.png",
	"https://imgur.com/l5SRrIA.png",
	"https://imgur.com/DZFmNBS.png",
	"https://imgur.com/JqnaCXw.png",
	"https://imgur.com/Al406Wl.png",
	"https://imgur.com/SCeILqi.png",
	"https://imgur.com/zQ2BXgU.png",
	"https://imgur.com/xYuKeqN.png",
	"https://imgur.com/1nkU5ix.png",
	"https://imgur.com/X9G4thL.png",
	"https://imgur.com/kaDH2mg.png",
	"https://imgur.com/4Ru2rj7.png",
	"https://imgur.com/Xu5FDM8.png",
	"https://imgur.com/qpIhrhw.png",
	"https://imgur.com/wJRpYjw.png",
	"https://imgur.com/dwNfHZE.png",
	"https://imgur.com/zMjv37g.png",
	"https://imgur.com/53sHvhx.png",
	"https://imgur.com/3xIzH7J.png",
	"https://imgur.com/5OEyEZh.png",
	"https://imgur.com/i2Q3Qgk.png",
	"https://imgur.com/VDHA058.png",
	"https://imgur.com/QhbC8AJ.png",
	"https://imgur.com/1Zp9cLD.png",
	"https://imgur.com/UZcWsm7.png",
	"https://imgur.com/vw5k5qw.png",
	"https://imgur.com/38FP4y3.png",
	"https://imgur.com/s7hO11d.png",
	"https://imgur.com/E3KKZNg.png",
	"https://imgur.com/XBdSnhO.png",
	"https://imgur.com/ZdtIdFf.png",
	"https://imgur.com/uJMdgEl.png",
	"https://imgur.com/L4lnyTo.png",
	"https://imgur.com/gtxyrMF.png",
	"https://imgur.com/wmEpMRM.png",
	"https://imgur.com/eJeCKUe.png",
	"https://imgur.com/jKWoG9F.png",
	"https://imgur.com/JljEZLf.png",
	"https://imgur.com/9Yf5o1A.png",
	"https://imgur.com/eT0rjzR.png",
	"https://imgur.com/Tv2yiRX.png",
	"https://imgur.com/f3jtGXw.png",
];

var now = Math.floor(Math.random() * fileNames.length);

let buttons = document.getElementsByClassName("image-viewer__button");
let prev = buttons.item(0),
	next = buttons.item(1);

const clickHandler = function (nowHandler) {
	if (this.className.indexOf("disabled") != -1) return;
	now = nowHandler(now);
	Array.from(buttons).forEach((element) => {
		element.classList.add("disabled");
	});
	const path = fileNames[now];
	let image = new Image();
	let display = document.getElementById("display");
	display.src = "./images/loading.gif";
	image.src = path;
	image.onload = function () {
		display.src = this.src;
		Array.from(document.getElementsByClassName("image-viewer__button")).forEach((element) => {
			element.classList.remove("disabled");
			document.getElementById("source").innerText = "Source:" + path;
		});
	};
};

document.addEventListener(
	"DOMContentLoaded",
	clickHandler.bind(prev || next, (now) => now)
);

prev.onclick = clickHandler.bind(prev, (now) => (now + fileNames.length - 1) % fileNames.length);
next.onclick = clickHandler.bind(next, (now) => (now + 1) % fileNames.length);
document.onkeydown = function (e) {
	if (e.key === "ArrowRight" && next.className.indexOf("disabled") == -1) {
		next.onclick();
	} else if (e.key === "ArrowLeft" && prev.className.indexOf("disabled") == -1) {
		prev.onclick();
	}
};
