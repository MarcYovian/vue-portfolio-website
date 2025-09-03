import * as outlineIcons from "@heroicons/vue/24/outline";
import * as solidIcons from "@heroicons/vue/24/solid";

function toPascalCase(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

const iconMap = {
  outline: {},
  solid: {},
};

for (const key in outlineIcons) {
  const iconName = key.replace("Icon", "");
  iconMap.outline[toPascalCase(iconName)] = outlineIcons[key];
}

for (const key in solidIcons) {
  const iconName = key.replace("Icon", "");
  iconMap.solid[toPascalCase(iconName)] = solidIcons[key];
}

export function resolveIcon(name) {
  if (!name || typeof name !== "string") return null;

  const parts = name.split("-");
  const style = parts[1] === "o" ? "outline" : "solid";
  const iconName = toPascalCase(parts.slice(2).join("-"));

  return iconMap[style][iconName] || null;
}
