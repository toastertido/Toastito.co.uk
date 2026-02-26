const text = "MY WEBSITE TITLE";

// Use the EXACT font-family names you registered
const fonts = [
  "Roboto",
  "Oswald",
  "DancingScript",
  "Limelight"
  "LobsterTwo"
];

const title = document.getElementById("animated-title");

// Create spans for each character
text.split("").forEach(char => {
  const span = document.createElement("span");
  span.textContent = char;
  title.appendChild(span);
});

const letters = document.querySelectorAll("#animated-title span");

let fontIndex = 0;

function changeFontOneByOne() {
  fontIndex = (fontIndex + 1) % fonts.length;
  let i = 0;

  const interval = setInterval(() => {
    letters[i].style.fontFamily = fonts[fontIndex];
    i++;

    if (i >= letters.length) {
      clearInterval(interval);
    }
  }, 30); // fast per-character change
}

// Change every 2 seconds
setInterval(changeFontOneByOne, 2000);