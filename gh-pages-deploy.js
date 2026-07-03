/* eslint-disable no-console */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// Deploys the built site to the gh-pages branch WITHOUT touching the
// current branch, its index, or the working tree. It builds into dist/,
// snapshots that folder with a temporary git index, creates a commit
// object from it, and force-pushes that commit to origin/gh-pages.
const run = (cmd, opts = {}) =>
  execSync(cmd, { stdio: ["ignore", "pipe", "inherit"], ...opts })
    .toString()
    .trim();

try {
  console.log("Building...");
  execSync("npm run build", { stdio: "inherit" });

  const folderName = fs.existsSync("dist") ? "dist" : "build";
  if (!fs.existsSync(path.join(folderName, "index.html"))) {
    throw new Error(`${folderName}/index.html not found — build failed?`);
  }
  if (!fs.existsSync(path.join(folderName, "CNAME"))) {
    console.warn("Warning: no CNAME in build output — custom domain may reset");
  }

  // temporary index so the real one is never modified
  const tmpIndex = path.resolve(".git", "gh-pages-index");
  fs.rmSync(tmpIndex, { force: true });
  const env = { ...process.env, GIT_INDEX_FILE: tmpIndex };

  console.log(`Snapshotting ${folderName}/ ...`);
  run(`git --work-tree ${folderName} add --all`, { env });
  const tree = run("git write-tree", { env });
  const commit = run(`git commit-tree ${tree} -m "deploy"`, { env });

  console.log("Pushing to origin/gh-pages...");
  execSync(`git push origin ${commit}:refs/heads/gh-pages --force`, {
    stdio: "inherit",
  });

  fs.rmSync(tmpIndex, { force: true });
  console.log("Deployed. GitHub Pages will publish shortly.");
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
