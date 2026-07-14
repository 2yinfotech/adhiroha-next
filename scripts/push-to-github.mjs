import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("git", ["add", "-A"]);

const changeCheck = spawnSync("git", ["diff", "--cached", "--quiet"], {
  stdio: "inherit",
});

if (changeCheck.status === 0) {
  console.log("No changes to push.");
  process.exit(0);
}

if (changeCheck.status !== 1) {
  process.exit(changeCheck.status ?? 1);
}

const customMessage = process.argv.slice(2).join(" ").trim();
const commitMessage = customMessage || `Update ${new Date().toISOString()}`;

run("git", ["commit", "-m", commitMessage]);
run("git", ["push"]);
