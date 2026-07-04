const text = "Anki";
const fonts = ["Rubik", "Geist", "Roboto", "Oswald", "DancingScript", "Limelight", "LobsterTwo"];
const title = document.getElementById("animated-title");

// Wrap each character in a span
text.split("").forEach(char => {
  const span = document.createElement("span");
  span.textContent = char;
  title.appendChild(span);
});

const letters = document.querySelectorAll("#animated-title span");

// Global font index, used by the automatic cycling effect
let fontIndex = 0;

// Per-letter offset. A click bumps a letter's own offset by one step,
// so from then on it stays that many fonts ahead of the rest of the
// group during every future shuffle (it doesn't resync).
const letterOffsets = Array.from(letters, () => 0);

function changeFontOneByOne() {
  fontIndex = (fontIndex + 1) % fonts.length;
  let i = 0;

  function nextLetter() {
    if (i < letters.length) {
      const letterFont = fonts[(fontIndex + letterOffsets[i]) % fonts.length];
      letters[i].style.fontFamily = letterFont;
      i++;
      setTimeout(nextLetter, 40); // 40ms per letter
    } else {
      setTimeout(changeFontOneByOne, 2000); // 2s pause after finishing
    }
  }

  nextLetter();
}

// Quick shrink, then a 0.5s pronounced ease-out back to normal size
function bounceLetter(letter) {
  letter.animate(
    [
      { transform: "scale(1)", offset: 0 },
      { transform: "scale(0.75)", offset: 0.08 },
      { transform: "scale(1)", offset: 1 }
    ],
    {
      duration: 500,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)", // strong ease-out (expo-ish)
      fill: "none"
    }
  );
}

// Clicking a letter advances that letter's own font, offset from the
// automatic cycle, and plays the shrink/bounce animation
letters.forEach((letter, i) => {
  letter.style.display = "inline-block"; // required for transform to apply
  letter.style.cursor = "pointer";

  letter.addEventListener("click", () => {
    letterOffsets[i] = (letterOffsets[i] + 1) % fonts.length;
    letter.style.fontFamily = fonts[(fontIndex + letterOffsets[i]) % fonts.length];
    bounceLetter(letter);
  });
});

// Start only after fonts are fully loaded
document.fonts.ready.then(() => {
  changeFontOneByOne();
});