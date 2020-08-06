const { execSync } = require("child_process");

const DEPENDENCIES = require("../../package.json");

const NODE_COMMAND = "npm i --save";
const NODE_COMMAND_DEV = "npm i --save-dev";

const PACKAGES = (prop) => {
  const _dependenciesArr = [];

  for (const key in DEPENDENCIES[prop]) {
    _dependenciesArr.push(key);
  }

  return `${_dependenciesArr.join("@latest ")}@latest`;
};

execSync(`${NODE_COMMAND} ${PACKAGES("dependencies")}`, { stdio: "inherit" });
execSync(`${NODE_COMMAND_DEV} ${PACKAGES("devDependencies")}`, {
  stdio: "inherit",
});
