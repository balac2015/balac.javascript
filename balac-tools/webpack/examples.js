"use strict";

const fs = require("fs");
const path = require("path");

var findInFolder = function (folder, depth) {

    if (fs.existsSync(path.join(folder, "template.md"))) {

        return [folder];
    }

    if (depth > 0) {
        const files = fs.readdirSync(folder);
        const results = [];

        for (const file of files) {
            const innerPath = path.join(folder, file);

            if (fs.statSync(innerPath).isDirectory()) {
                const innerResults = findInFolder(innerPath, depth - 1);

                for (const item of innerResults) {
                    results.push(item);
                }
            }
        }

        return results;
    } else {
        return [];
    }
};

// 结果：[ 'D:\\balac-webpack\\aggressive-merging', ... ]
module.exports = findInFolder(__dirname, 2).sort();
