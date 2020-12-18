const { spawn } = require("child_process");
const { resolve } = require("path");

console.info("Lavalink spawned");

spawn("java", ["-jar", resolve(__dirname, "Lavalink.jar")], {
	stdio: "inherit",
	cwd: process.cwd(),
});
