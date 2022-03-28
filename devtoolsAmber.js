function handleShown() {
  console.log("panel is being shown");
};

function handleHidden() {
  console.log("panel is being hidden");
};

browser.devtools.panels.create(
  "Amber",
  "AmberIcon.svg",
  "helios.html"
).then((newPanel) => {
  console.log(newPanel);
  newPanel.onShown.addListener(handleShown);
  newPanel.onHidden.addListener(handleHidden);
});