const { exec } = require("child_process");

const DEPENDENCIES = require("../../package.json");

const NODE_COMMAND = "npm i --save";

const PACKAGES = () => {
	let _dependenciesArr = [];

	for (let key in DEPENDENCIES.dependencies) {
		_dependenciesArr.push(key);
	}

	return `${_dependenciesArr.join("@latest ")}@latest`;
};

exec(`${NODE_COMMAND} ${PACKAGES()}`).stdout.pipe(process.stdout);
