const fs = require("fs");
const path = require("path");
const semver = require("semver");

// 获取根目录package.json版本
const rootPackagePath = path.join(__dirname, "../package.json");
const rootPackage = require(rootPackagePath);
const currentVersion = rootPackage.version;

// 自动递增补丁版本
const newVersion = semver.inc(currentVersion, "patch");

// 更新根包版本
rootPackage.version = newVersion;
fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackage, null, 2) + "\n");

// 更新子包版本
const subPackagePath = path.join(__dirname, "../packages/unisdk/package.json");
const subPackage = require(subPackagePath);
subPackage.version = newVersion;
fs.writeFileSync(subPackagePath, JSON.stringify(subPackage, null, 2) + "\n");

console.log(`版本号已更新: ${currentVersion} → ${newVersion}`);
