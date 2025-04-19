const startBtn = document.getElementById("start-button");
const startSound = document.getElementById("start-sound");
const clickSound = document.getElementById("click-sound");
const quizScreen = document.getElementById("quiz-screen");
const titleScreen = document.getElementById("title-screen");
const resultScreen = document.getElementById("result-screen");
const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-button");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const restartBtn = document.getElementById("restart-button");

const questionImages = [
  "q1.png",
  "q2.png",
  "q3.png",
  "q4.png",
  "q5.png"
];

const questions = [
  {
    text: "What’s your game-day energy like?",
    options: [
      { label: "A", text: "🧠📣I'm the brain of the squad — calling the shots!" },
      { label: "B", text: "⚡🏃Fast and fierce — nobody's catching you" },
      { label: "C", text: "👐✨Always ready for that epic catch" },
      { label: "D", text: "💪🛡No one's getting past me — blocking like a boss" },
      { label: "E", text: "👀🕵️ “I read the play like a book and shut it down!" }
    ]
  },
  {
    text: "If you had a *superpower* what would it be?",
    options: [
      { label: "A", text: "🧠🎯Mind control — outsmart every opponent" },
      { label: "B", text: "🚀🌀 Super speed — blink and I'm gone" },
      { label: "C", text: "🕸🧲 Spidey hands — I catch everything" },
      { label: "D", text: "🧱🦍 Mega strength — I’m unmovable" },
      { label: "E", text: "🔍🎮 Super vision — I predict moves like a boss" }
    ]
  },
  {
    text: "What’s your go-to move on the field?",
    options: [
      { label: "A", text: "🗣🗺 “Call the play, make the throw — I got this" },
      { label: "B", text: "💨👟 “Spin, juke, dash — I’m untouchable”" },
      { label: "C", text: "🕺🌟 “Jump, snatch, land — highlight reel!”" },
      { label: "D", text: "🧱⛓ “Block ‘em, stop ‘em, protect my team”" },
      { label: "E", text: "🚧🤯 “Read, react, BOOM — tackle made”" }
    ]
  },
  {
    text: "Pick your sideline snack:(be honest)",
    options: [
      { label: "A", text: "🍌📋 Banana + game plan" },
      { label: "B", text: "🍬🥤 Sour patch + sports drink = hyper mode" },
      { label: "C", text: "🍪🌟 One cookie per catch" },
      { label: "D", text: "🥩💪 Meat. Protein. Gains." },
      { label: "E", text: "🧃🧠 Juice box + analyzing film" }
    ]
  },
  {
    text: "Which play would get you hyped the most?",
    options: [
      { label: "A", text: "🎯💥 Hitting a perfect pass and hearing the crowd go “OOOOHHH!”" },
      { label: "B", text: "🏁😤 Dodging 3 defenders like it’s Mario Kart IRL" },
      { label: "C", text: "🕶🔥 Mossing someone in the end zone" },
      { label: "D", text: "🧱🛑 Holding the line so hard they give up and go home" },
      { label: "E", text: "🧠🚨 Reading a play, making the tackle, then walking off like beastmode" }
    ]
  }
];

const results = {
  A: {
    title: "🧠 The Field General (Quarterback Vibes)",
    description: "📞✨ You’re the boss out there. You think quick, lead strong, and have main character energy. Whether you’re calling plays or throwing dimes, the team counts on you to make things happen."
  },
  B: {
    title: "⚡The Human Rocket (Running Back Vibes)",
    description: "💨💥 Zoom zoom! You’ve got wheels, jukes, and the guts to go full send through tight spaces. You’re fast, fearless, and definitely the type to turn a short run into a touchdown."
  },
  C: {
    title: "🕶 The Catch Machine (Wide Receiver Vibes)",
    description: "🙌🎯 Big plays? That’s your thing. You leap, snag, and sparkle with every highlight. You’ve got sticky hands, hops, and a flair for the dramatic. Your motto: “Throw it up, I got it.”"
  },
  D: {
    title: "🧱 The Wall (Lineman Vibes)",
    description: "🧊🛡 Ain’t nobody getting through you. You’re built tough, hit hard, and protect your team like it’s your job (because it kinda is). You may not always get the spotlight — but without you, the play falls apart."
  },
  E: {
    title: "🎮 The Play Reader (Defensive Beast Vibes)",
    description: "🔍🧠 You’re the football detective. You read offenses like they’re spoilers and shut plays down before they even get started. You’ve got quick instincts, strong tackles, and elite “did-you-see-that” energy."
  }
};

let currentQuestion = 0;
let answers = [];

startBtn.addEventListener("click", function () {
  titleScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();

  // Defer sound slightly to avoid blocking rendering
  setTimeout(() => {
    const sound = document.getElementById("start-sound");
    if (sound) {
      sound.play().catch(err => {
        console.warn("Start sound blocked:", err);
      });
    }
  }, 100);
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  answers = [];
  resultScreen.classList.add("hidden");
  titleScreen.classList.remove("hidden");
});

function showQuestion() {
  questionContainer.innerHTML = "";
  nextBtn.classList.add("hidden");

  // Show the question image
  document.getElementById("question-image").src = questionImages[currentQuestion];

  const q = questions[currentQuestion];
  const qEl = document.createElement("h2");
  qEl.textContent = q.text;
  questionContainer.appendChild(qEl);

  // ✅ Create a wrapper for stacked answer buttons
  const answersWrapper = document.createElement("div");
  answersWrapper.classList.add("answer-container");

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.classList.add("answer-button");

    btn.addEventListener("click", () => {
  clickSound.play();

  const allButtons = answersWrapper.querySelectorAll(".answer-button");
  allButtons.forEach(b => b.classList.remove("selected"));

  btn.classList.add("selected");
  answers[currentQuestion] = opt.label;
  nextBtn.classList.remove("hidden");
});

    answersWrapper.appendChild(btn);
  });

  questionContainer.appendChild(answersWrapper);
}

function showResults() {
  const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  answers.forEach(a => counts[a]++);

  const max = Math.max(...Object.values(counts));
  const topLetters = Object.keys(counts).filter(key => counts[key] === max);

  const titleEl = document.getElementById("result-title");
  const descEl = document.getElementById("result-description");
  const imageContainer = document.getElementById("result-image-container");

  // Clear any previous images
  imageContainer.innerHTML = "";

  if (topLetters.length === 1) {
    const top = topLetters[0];
    titleEl.textContent = results[top].title;
    descEl.textContent = results[top].description;

    const img = document.createElement("img");
    img.src = `r${["A", "B", "C", "D", "E"].indexOf(top) + 1}.png`;
    img.alt = results[top].title;
    img.classList.add("result-image");
    imageContainer.appendChild(img);
  } else {
    // Multiple top results
    const titles = topLetters.map(letter => results[letter].title).join(" + ");
    const descriptions = topLetters.map(letter => results[letter].description).join(" ");

    titleEl.textContent = `🎭 You're a mix of: ${titles}`;
    descEl.textContent = descriptions;

    topLetters.forEach(letter => {
      const img = document.createElement("img");
      img.src = `r${["A", "B", "C", "D", "E"].indexOf(letter) + 1}.png`;
      img.alt = results[letter].title;
      img.classList.add("result-image");
      imageContainer.appendChild(img);
    });
  }

  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}
