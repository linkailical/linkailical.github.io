const steps = [
  {
    image: "./media/01-home.png",
    alt: "SpeakBit meeting home with three Cultural Night meetings",
    label: "Meeting home",
    kicker: "STEP 1 · BEGIN",
    title: "Start from the meeting home",
    body: "The student sees recent Cultural Night meetings and chooses where to begin.",
    notice: "the sample meetings and their completion status.",
  },
  {
    image: "./media/02-recording.png",
    alt: "SpeakBit recording a sample Cultural Night meeting",
    label: "Recording started",
    kicker: "STEP 2 · RECORD",
    title: "Start the meeting recording",
    body: "SpeakBit begins listening. A visible recording state makes it clear that the meeting is still in progress.",
    notice: "the recording status and the first finalized segments.",
  },
  {
    image: "./media/02-recording.png",
    alt: "Live transcript and speaker names appearing during recording",
    label: "Live processing",
    kicker: "STEP 3 · WATCH",
    title: "Follow the result while people speak",
    body: "New sentences appear with timestamps, translations, and speaker names. The meeting summary updates at the same time.",
    notice: "Jordan and Maya beside the words they spoke.",
  },
  {
    image: "./media/03-complete.png",
    alt: "Completed SpeakBit transcript, translation, speakers, and meeting summary",
    label: "Meeting complete",
    kicker: "STEP 4 · REVIEW",
    title: "Review the complete meeting",
    body: "When recording stops, the transcript, translation, three speakers, action items, and current project facts are ready together.",
    notice: "the complete five-line transcript and synchronized notes.",
  },
  {
    image: "./media/03-complete.png",
    alt: "Completed meeting shown beside the guided recording replay",
    label: "Recording replay",
    kicker: "STEP 5 · REPLAY",
    title: "Replay the recording and inspect the process",
    body: "Press play above. The walkthrough follows the audio through transcript, translation, speaker matching, and notes. Pausing the audio also pauses this guided progress.",
    notice: "each transcript card appearing when its words are played.",
    playback: true,
  },
  {
    image: "./media/04-confirm.png",
    alt: "SpeakBit speaker review with Unknown speaker 1 named Jordan",
    label: "Speaker confirmation",
    kicker: "STEP 6 · CONFIRM",
    title: "A person confirms the unknown voice",
    body: "The first meeting keeps a new voice unknown until someone reviews it, enters Jordan, and chooses Confirm & Learn.",
    notice: "Create new person, the name Jordan, and the confirmation button.",
  },
  {
    image: "./media/05-learned.png",
    alt: "SpeakBit meeting result after the speaker has been confirmed",
    label: "Confirmed identity",
    kicker: "STEP 7 · REMEMBER",
    title: "The confirmed name is available next time",
    body: "Only the checked identity is reused. In the next meeting, SpeakBit can label Jordan automatically and keep the new evidence connected to that person.",
    notice: "Speakers confirmed and knowledge updated.",
  },
];

const stepButtons = [...document.querySelectorAll(".step-button")];
const stepImage = document.getElementById("stepImage");
const stepCounter = document.getElementById("stepCounter");
const screenLabel = document.getElementById("screenLabel");
const stepKicker = document.getElementById("stepKicker");
const stepTitle = document.getElementById("stepTitle");
const stepBody = document.getElementById("stepBody");
const stepNotice = document.getElementById("stepNotice");
const previousStep = document.getElementById("previousStep");
const nextStep = document.getElementById("nextStep");
const restartWalkthrough = document.getElementById("restartWalkthrough");
const playbackLab = document.getElementById("playbackLab");
const sampleAudio = document.getElementById("sampleAudio");
const restartReplay = document.getElementById("restartReplay");
const replayProgress = document.getElementById("replayProgress");
const replayStatus = document.getElementById("replayStatus");
const pipelineSteps = [...document.querySelectorAll(".pipeline-step")];
const transcriptRows = [...document.querySelectorAll(".replay-transcript article")];

let activeStep = 0;

function setStep(index, options = {}) {
  activeStep = Math.max(0, Math.min(steps.length - 1, index));
  const step = steps[activeStep];
  stepButtons.forEach((button, buttonIndex) => {
    const active = buttonIndex === activeStep;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "step" : "false");
  });
  stepCounter.textContent = `Step ${activeStep + 1} of ${steps.length}`;
  screenLabel.textContent = step.label;
  stepKicker.textContent = step.kicker;
  stepTitle.textContent = step.title;
  stepBody.textContent = step.body;
  stepNotice.innerHTML = `<strong>Look for:</strong> ${step.notice}`;
  previousStep.disabled = activeStep === 0;
  nextStep.disabled = activeStep === steps.length - 1;
  nextStep.textContent = activeStep === steps.length - 2 ? "See the result" : "Next step";
  playbackLab.hidden = !step.playback;
  if (!step.playback && !sampleAudio.paused) sampleAudio.pause();

  if (stepImage.getAttribute("src") !== step.image) {
    stepImage.classList.add("changing");
    window.setTimeout(() => {
      stepImage.src = step.image;
      stepImage.alt = step.alt;
      stepImage.classList.remove("changing");
    }, 120);
  } else {
    stepImage.alt = step.alt;
  }

  if (options.focus) {
    document.querySelector(".stage")?.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

function formatTime(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  return `00:${String(Math.floor(safe)).padStart(2, "0")}`;
}

function updateReplay() {
  const duration = Number.isFinite(sampleAudio.duration) && sampleAudio.duration > 0
    ? sampleAudio.duration
    : 16.27;
  const time = sampleAudio.currentTime || 0;
  const ratio = Math.max(0, Math.min(1, time / duration));
  replayProgress.style.width = `${ratio * 100}%`;

  const thresholds = [0, 0.14, 0.32, 0.52, 0.76];
  let currentPipeline = 0;
  thresholds.forEach((threshold, index) => {
    if (ratio >= threshold) currentPipeline = index;
  });
  pipelineSteps.forEach((item, index) => {
    item.classList.toggle("done", index < currentPipeline || sampleAudio.ended);
    item.classList.toggle("active", index === currentPipeline && !sampleAudio.ended && time > 0);
  });

  transcriptRows.forEach((row) => {
    const start = Number(row.dataset.start || 0);
    const end = Number(row.dataset.end || duration);
    row.classList.toggle("ready", time >= start && time > 0);
    row.classList.toggle("active", time >= start && time < end && !sampleAudio.paused);
  });

  if (sampleAudio.ended || ratio >= .999) {
    replayStatus.textContent = "Meeting ready · transcript, translation, speakers, and notes completed";
  } else if (!sampleAudio.paused) {
    const labels = ["Listening to the recording", "Writing the transcript", "Adding the translation", "Matching speaker voices", "Updating meeting notes"];
    replayStatus.textContent = `${labels[currentPipeline]} · ${formatTime(time)} / ${formatTime(duration)}`;
  } else if (time > 0) {
    replayStatus.textContent = `Paused at ${formatTime(time)} · guided processing is paused too`;
  } else {
    replayStatus.textContent = "Press play to start the guided replay";
  }
}

stepButtons.forEach((button) => {
  button.addEventListener("click", () => setStep(Number(button.dataset.step), { focus: true }));
});
previousStep.addEventListener("click", () => setStep(activeStep - 1, { focus: true }));
nextStep.addEventListener("click", () => setStep(activeStep + 1, { focus: true }));
restartWalkthrough.addEventListener("click", () => {
  sampleAudio.pause();
  sampleAudio.currentTime = 0;
  updateReplay();
  setStep(0, { focus: true });
});
restartReplay.addEventListener("click", () => {
  sampleAudio.currentTime = 0;
  sampleAudio.play().catch(() => {});
  updateReplay();
});
["loadedmetadata", "timeupdate", "play", "pause", "ended", "seeking"].forEach((eventName) => {
  sampleAudio.addEventListener(eventName, updateReplay);
});

const requestedStep = Number(new URLSearchParams(window.location.search).get("step"));
const initialStep = Number.isInteger(requestedStep) && requestedStep >= 1 && requestedStep <= steps.length
  ? requestedStep - 1
  : 0;
setStep(initialStep);
updateReplay();
