const fs = require("fs");
const Mustache = require("mustache");
const yaml = require("yaml");

const cssVar = fs.readFileSync("./templates/css-variables.mustache").toString();
const css = fs.readFileSync("./templates/css.mustache").toString();
const less = fs.readFileSync("./templates/less.mustache").toString();
const sass = fs.readFileSync("./templates/sass.mustache").toString();
const scss = fs.readFileSync("./templates/sass.mustache").toString();
const stylus = fs.readFileSync("./templates/stylus.mustache").toString();
const allFiles = [
	[cssVar, "./css-variables/", ".css"],
	[css, "./css/", ".css"],
	[less, "./less/", ".less"],
	[sass, "./sass/", ".sass"],
	[scss, "./scss/", ".scss"],
	[stylus, "./stylus/", ".styl"],
];

const schemes = fs.readdirSync("./yaml");

for (let i = 0; i < schemes.length; i++) {
	let fileContent = fs.readFileSync("./yaml/" + schemes[i]).toString();
	let parsedContent = yaml.parseDocument(fileContent).toJSON();
	for (let j = 0; j < allFiles.length; j++) {
		let generatedString = Mustache.render(allFiles[j][0], parsedContent);
		fs.writeFileSync(
			allFiles[j][1] + "base16-" + schemes[i].slice(0, schemes[i].length - 5) + allFiles[j][2],
			generatedString
		);
	}
}
