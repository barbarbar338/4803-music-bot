import { spawn } from "child_process";
import Logger from "../src/struct/Logger";

Logger.info("Lavalink spawned");

spawn("java", ["-jar", "Lavalink.jar"], {
	stdio: "inherit",
	cwd: process.cwd(),
});
