// Function to apply the selected theme
export function applyTheme(theme) {
  if (theme === "night") {
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255",
    );
  }
}

// Function to detect and apply the theme based on user preference
export function detectTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.querySelector("[data-settings-theme]").value = "night";
    applyTheme("night");
  } else {
    document.querySelector("[data-settings-theme]").value = "day";
    applyTheme("day");
  }
}
