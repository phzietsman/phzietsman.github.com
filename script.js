
var Typer = {
	text: null,
	accessCountimer: null,
	index: 0, // current cursor position
	speed: 3, // speed of the Typer
	file: "", //file, must be setted

	root: "",


	init: function () {// inizialize Hacker Typer
		$.get(Typer.file, function (data) {// get the text file
			Typer.text = data;// save the textfile in Typer.text
			Typer.text = Typer.text.slice(0, Typer.text.length - 1);
		});
	},

	content: function () {
		return $("#console").html();// get console content
	},

	write: function (str) {// append to console content
		$("#console").append(str);
		return false;
	},

	addText: function (key) {//Main function to add the code
		if (Typer.text) { // otherway if text is loaded
			var cont = Typer.content(); // get the console content

			Typer.index += Typer.speed;	// add to the index the speed

			var text = Typer.text.substring(0, Typer.index);	// parse the text for stripping html enities
			text = text.replace(/~/g, this.root);

			var rtn = new RegExp("\n", "g"); // newline regex

			$("#console").html(text.replace(rtn, "<br/>"));// replace newline chars with br, tabs with 4 space and blanks with an html blank
			window.scrollBy(0, 50); // scroll to make sure bottom is always visible
		}

	}
}

Typer.speed = 3;
Typer.file = "stream.txt";
Typer.root = "<span id='a'>paul@zietsman</span>:<span id='b'>~</span>"
Typer.init();

var timer = setInterval("t();", 30);

function t() {
	Typer.addText();
	if (Typer.index > Typer.text.length) {
		clearInterval(timer);
	}
}

