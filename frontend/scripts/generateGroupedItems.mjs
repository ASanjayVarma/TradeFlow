// node generateGroupedItems.mjs


import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";

// Get the current script's directory and ensure the path is correct for Windows
const __dirname = dirname(new URL(import.meta.url).pathname);

// Normalize the path to avoid extra slashes
const normalizedDirname = __dirname.replace(/^\/+/, "");

// Load items.json
const itemsFilePath = join(normalizedDirname, "../src/data/items.json");
console.log("Items file path:", itemsFilePath);

const rawData = readFileSync(itemsFilePath, "utf-8");
const storeItems = JSON.parse(rawData);

// Compute grouped items
const groupedItems = storeItems.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item);
  return acc;
}, {});

// Write to groupedItems.json
const groupedItemsFilePath = join(
  normalizedDirname,
  "../src/data/groupedItems.json"
);
console.log("Grouped items file path:", groupedItemsFilePath);

writeFileSync(groupedItemsFilePath, JSON.stringify(groupedItems, null, 2));

console.log(
  `✅ groupedItems.json generated successfully at ${groupedItemsFilePath}`
);
