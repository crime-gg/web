class Scrambler {
	constructor(element) {
		this.element = element;
		this.update = this.update.bind(this);
		this.chars = "0!<>-_\\/[]{}—=+*^?#.,~$%1";
	}

	setText(newText) {
		const oldText = this.element.innerText;
		const promise = new Promise((resolve) => this.resolve = resolve);
		const length = Math.max(oldText.length, newText.length);

		this.queue = []

		for (let i = 0; i < length; i++) {
			const to = newText[i] || "";
			const from = oldText[i] || "";

			const start = Math.floor(Math.random() * 40);
			const end = start + Math.floor(Math.random() * 40);

			this.queue.push({
				from, to, start, end
			});
		}

		cancelAnimationFrame(this.frameRequest);

		this.frame = 0;
		this.update();

		return promise;
	}

	update() {
		let output = "", complete = 0;

		for (let i = 0, n = this.queue.length; i < n; i++) {
			let {
				from, to, start, end, char
			} = this.queue[i];

			if (this.frame >= end) {
				complete++;
				output += to;
			} else if (this.frame >= start) {
				if (!char || Math.random() < 0.25) {
					char = this.randomChar();
					this.queue[i].char = char;
				}

				output += char;
			} else {
				output += from;
			}
		}

		this.element.innerHTML = output;

		if (complete === this.queue.length) {
			this.resolve();
		} else {
			this.frameRequest = requestAnimationFrame(this.update);
			this.frame++;
		}
	}

	randomChar() {
		return this.chars[
			Math.floor(Math.random() * this.chars.length)
		];
	}
}

var counter = 0;
const phrases = ["Dread", "Dread"];
const element = document.querySelector(".main-text");
const fx = new Scrambler(element);

const next = () => {
	fx.setText(phrases[counter])
		.then(setTimeout(next, 5000));

	counter = ++counter % phrases.length;
}

next();
