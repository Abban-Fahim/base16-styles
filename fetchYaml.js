const fs = require("fs");
const fetch = require("node-fetch");

// Fetch all yaml files and write /yaml
fs.readFile("./schemes.yaml", async (err, data) => {
	const string = data.toString();
	const schemes = string.split("\n");

	for (let i = 2; i < schemes.length - 1; i++) {
		const parsedData = schemes[i].split(" ");
		console.log(i);
		let name = parsedData[0].slice(0, parsedData[0].length - 1);
		let repo = parsedData[1].slice(19, parsedData[1].length - 1);
		let fileUrl = "";
		if (name === "purpledream") {
			fileUrl = `https://raw.githubusercontent.com/${repo}/master/${name}.yml`;
		} else if (name.startsWith("equilibrium") || name.startsWith("vice")) {
			fileUrl = `https://raw.githubusercontent.com/${repo}/main/${name}.yaml`;
		} else {
			fileUrl = `https://raw.githubusercontent.com/${repo}/master/${name}.yaml`;
		}

		let file = await fetch(fileUrl);
		let fileText = await file.text();

		if (fileText === "404: Not Found") {
			console.log(fileUrl, "bruh");
		}

		fs.writeFileSync("./yaml/" + name + ".yaml", fileText);
	}
});
