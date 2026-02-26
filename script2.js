const text = "Anki";
const fonts = ["Geist", "Roboto", "Oswald", "DancingScript", "Limelight", "LobsterTwo"];
const title = document.getElementById("animated-title");

// Wrap each character in a span
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

  function nextLetter() {
    if (i < letters.length) {
      letters[i].style.fontFamily = fonts[fontIndex];
      i++;
      setTimeout(nextLetter, 40); // 40ms per letter
    } else {
      setTimeout(changeFontOneByOne, 2000); // 2s pause after finishing
    }
  }

  nextLetter();
}

// Start only after fonts are fully loaded
document.fonts.ready.then(() => {
  changeFontOneByOne();
});