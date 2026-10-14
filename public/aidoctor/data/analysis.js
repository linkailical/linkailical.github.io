/*
 * Offline data-analysis fixtures for AI Doctor.
 *
 * TRIAGE_CASES: hand-labeled expected urgency levels used to validate the
 * rule engine (educational unit tests — not clinical accuracy claims).
 *
 * HOW TO EXTEND: add a case with symptom key, severity, duration, flagIdx
 * (indexes into that symptom's redFlags), and expected level
 * (green|yellow|orange|red). The Analysis view re-runs all cases automatically.
 *
 * Note on orange: in the current knowledge base nearly all flags are marked
 * emergency, so orange is primarily reached via severity === "severe" with
 * no flags selected. Red is reached when any emergency flag is selected.
 */
window.TRIAGE_CASES = [
  // Mild + short + no flags → self-care
  { id: "T01", symptom: "fever", severity: "mild", duration: "short", flagIdx: [], expected: "green",
    note: { en: "Mild fever, short, no red flags", zh: "轻度发热、短时、无红旗" } },
  { id: "T02", symptom: "cough", severity: "mild", duration: "short", flagIdx: [], expected: "green",
    note: { en: "Mild cough baseline", zh: "轻度咳嗽基线" } },
  { id: "T03", symptom: "sore-throat", severity: "mild", duration: "short", flagIdx: [], expected: "green",
    note: { en: "Mild sore throat baseline", zh: "轻度咽痛基线" } },
  { id: "T04", symptom: "dental", severity: "mild", duration: "short", flagIdx: [], expected: "green",
    note: { en: "Mild oral discomfort, no swelling", zh: "轻度口腔不适、无肿胀" } },

  // Moderate or long → routine visit
  { id: "T05", symptom: "fever", severity: "moderate", duration: "short", flagIdx: [], expected: "yellow",
    note: { en: "Moderate severity alone", zh: "仅中等严重度" } },
  { id: "T06", symptom: "headache", severity: "mild", duration: "long", flagIdx: [], expected: "yellow",
    note: { en: "Long duration alone", zh: "仅持续时间长" } },
  { id: "T07", symptom: "dental", severity: "moderate", duration: "med", flagIdx: [], expected: "yellow",
    note: { en: "Ongoing tooth pain → see dentist soon", zh: "持续牙痛 → 尽快看牙医" } },
  { id: "T08", symptom: "rash", severity: "mild", duration: "long", flagIdx: [], expected: "yellow",
    note: { en: "Persistent rash", zh: "皮疹持续" } },

  // Severe, no flags → urgent
  { id: "T09", symptom: "abdominal-pain", severity: "severe", duration: "short", flagIdx: [], expected: "orange",
    note: { en: "Severe pain, no red-flag selected", zh: "剧痛、未选红旗" } },
  { id: "T10", symptom: "cough", severity: "severe", duration: "short", flagIdx: [], expected: "orange",
    note: { en: "Severe cough, no red-flag selected", zh: "重度咳嗽、未选红旗" } },
  { id: "T11", symptom: "dental", severity: "severe", duration: "short", flagIdx: [], expected: "orange",
    note: { en: "Severe dental pain → urgent care", zh: "重度牙痛 → 尽快就医" } },

  // Emergency red flags → red
  { id: "T12", symptom: "fever", severity: "mild", duration: "short", flagIdx: [0], expected: "red",
    note: { en: "Stiff neck with fever", zh: "发热伴颈项强直" } },
  { id: "T13", symptom: "headache", severity: "mild", duration: "short", flagIdx: [0], expected: "red",
    note: { en: "Sudden worst-ever headache", zh: "突发最剧烈头痛" } },
  { id: "T14", symptom: "chest-pain", severity: "mild", duration: "short", flagIdx: [0], expected: "red",
    note: { en: "Chest pressure warning", zh: "胸闷压迫感警示" } },
  { id: "T15", symptom: "breathing", severity: "mild", duration: "short", flagIdx: [2], expected: "red",
    note: { en: "Blue lips / cyanosis", zh: "口唇发绀" } },
  { id: "T16", symptom: "dental", severity: "mild", duration: "short", flagIdx: [0], expected: "red",
    note: { en: "Facial swelling with fever", zh: "面部肿胀伴发热" } },
  { id: "T17", symptom: "dental", severity: "mild", duration: "short", flagIdx: [1], expected: "red",
    note: { en: "Difficulty breathing/swallowing (dental)", zh: "口腔相关呼吸/吞咽困难" } },
  { id: "T18", symptom: "rash", severity: "mild", duration: "short", flagIdx: [0], expected: "red",
    note: { en: "Non-blanching rash", zh: "按压不褪色皮疹" } },

  // Priority: emergency flag beats mild presentation
  { id: "T19", symptom: "fever", severity: "mild", duration: "short", flagIdx: [2], expected: "red",
    note: { en: "Difficulty breathing overrides mild fever", zh: "呼吸困难优先于轻度发热" } },
  { id: "T20", symptom: "headache", severity: "severe", duration: "long", flagIdx: [2], expected: "red",
    note: { en: "Neurologic red flag wins over severity/duration", zh: "神经红旗优先于严重度/时长" } },
];
