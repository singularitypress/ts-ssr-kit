const { execSync } = require("child_process");
const { platform } = require("os");
const path = require("path");

execSync(
  `${platform() === "win32" ? "rmdir /Q /S" : "rm -rf"} ${path.resolve(
    "node_modules",
  )}`,
  { stdio: "inherit" },
);
execSync(
  `${platform() === "win32" ? "del" : "rm -rf"} ${path.resolve(
    "package-lock.json",
  )}`,
  { stdio: "inherit" },
);
