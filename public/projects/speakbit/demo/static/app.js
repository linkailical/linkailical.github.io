(() => {
  const $ = (id) => document.getElementById(id);
  const i18n = window.VoiceGraphI18n;
  const t = (key, params) => i18n.t(key, params);

  i18n.applyDocumentTranslations();

  const state = {
    view: "home", // home | detail | graph | evaluation
    projects: [],
    tree: [], // {project, meetings[], open}
    project: null,
    meeting: null,
    result: null,
    testBaseResult: null,
    asr: null,
    transcriptView: "original", // original | concise
    showTranslation: false,
    liveFollowLocale: false,
    liveAsrMode: "stream",
    asrModels: [],
    appConfig: null,
  };

  const pageTitle = $("pageTitle");
  const pageSub = $("pageSub");
  const sideTree = $("sideTree");
  const sideEmpty = $("sideEmpty");
  const projectCount = $("projectCount");
  const recentList = $("recentList");
  const recentEmpty = $("recentEmpty");
  const sideBrandName = $("sideBrandName");
  const icanAsrModel = $("icanAsrModel");
  const icanVoiceModel = $("icanVoiceModel");
  const icanVoiceCount = $("icanVoiceCount");
  const icanAdapter = $("icanAdapter");
  const icanSampleCount = $("icanSampleCount");
  const icanHardwareState = $("icanHardwareState");

  const viewHome = $("viewHome");
  const viewDetail = $("viewDetail");
  const viewGraph = $("viewGraph");
  const viewEvaluation = $("viewEvaluation");

  const detailTitle = $("detailTitle");
  const detailBadge = $("detailBadge");
  const btnRecord = $("btnRecord");
  const btnStop = $("btnStop");
  const audioInputSelect = $("audioInputSelect");
  const asrModelSelect = $("asrModelSelect");
  const liveAsrModeSelect = $("liveAsrModeSelect");
  const fileInput = $("fileInput");
  const recStatus = $("recStatus");
  const meterBar = $("meterBar");
  const captureControls = $("captureControls");
  const meetingHistoryDate = $("meetingHistoryDate");
  const meetingHistoryList = $("meetingHistoryList");
  const meetingHistoryEmpty = $("meetingHistoryEmpty");
  const btnViewOriginal = $("btnViewOriginal");
  const btnViewConcise = $("btnViewConcise");
  const toggleTranslation = $("toggleTranslation");
  const summaryMeetingName = $("summaryMeetingName");
  const summaryMeetingTime = $("summaryMeetingTime");
  const summaryAttendees = $("summaryAttendees");
  const summaryContent = $("summaryContent");
  const summaryActions = $("summaryActions");
  const projectMemoryCurrent = $("projectMemoryCurrent");
  const projectMemoryProposals = $("projectMemoryProposals");
  const btnConfirmProjectMemory = $("btnConfirmProjectMemory");
  const btnCopySummary = $("btnCopySummary");
  const btnDownloadSummary = $("btnDownloadSummary");
  const captureMeter = $("captureMeter");
  const testDataHint = $("testDataHint");
  const testDataHintText = $("testDataHintText");
  const recognitionTopStatus = $("recognitionTopStatus");
  const playback = $("playback");
  const emptyState = $("emptyState");
  const resultView = $("resultView");
  const summaryBrief = $("summaryBrief");
  const resultMeta = $("resultMeta");
  const liveRecognition = $("liveRecognition");
  const recognitionStage = $("recognitionStage");
  const recognitionRunInfo = $("recognitionRunInfo");
  const recognitionProgressBar = $("recognitionProgressBar");
  const speakerRoster = $("speakerRoster");
  const speakerReview = $("speakerReview");
  const speakerReviewHint = $("speakerReviewHint");
  const speakerReviewBadge = $("speakerReviewBadge");
  const speakerReviewList = $("speakerReviewList");
  const speakerReviewActions = $("speakerReviewActions");
  const btnConfirmSpeakers = $("btnConfirmSpeakers");
  const voiceprintEnroll = $("voiceprintEnroll");
  const voiceprintEnrollName = $("voiceprintEnrollName");
  const btnEnrollVoiceprint = $("btnEnrollVoiceprint");
  const meetingQueryForm = $("meetingQueryForm");
  const meetingQueryInput = $("meetingQueryInput");
  const meetingQueryButton = $("meetingQueryButton");
  const meetingQueryOutput = $("meetingQueryOutput");
  const projectConsultantProject = $("projectConsultantProject");
  const projectConsultantMessages = $("projectConsultantMessages");
  const projectConsultantForm = $("projectConsultantForm");
  const projectConsultantInput = $("projectConsultantInput");
  const projectConsultantSend = $("projectConsultantSend");
  const transcript = $("transcript");
  const liveSpeakingRow = $("liveSpeakingRow");
  const liveSpeakingHint = $("liveSpeakingHint");
  const recognitionHistory = $("recognitionHistory");
  const recognitionHistoryList = $("recognitionHistoryList");
  const graphSvg = $("graphSvg");
  const graphLegend = $("graphLegend");
  const btnRunEvaluation = $("btnRunEvaluation");
  const evalProgressBar = $("evalProgressBar");
  const evalProgressText = $("evalProgressText");
  const evalStage = $("evalStage");
  const evalStatusBadge = $("evalStatusBadge");
  const evalSteps = $("evalSteps");
  const evalResults = $("evalResults");
  const evalMetricGrid = $("evalMetricGrid");
  const evalTruthGrid = $("evalTruthGrid");
  const evalSpeakerBars = $("evalSpeakerBars");
  const evalLearningBars = $("evalLearningBars");
  const evalNameBars = $("evalNameBars");

  let mediaRecorder = null;
  let chunks = [];
  let startedAt = 0;
  let meterTimer = null;
  let audioCtx = null;
  let analyser = null;
  let evaluationPollTimer = null;
  let recognitionPollTimer = null;
  let recognitionBusy = false;
  let recognitionCreatePromise = null;
  let activeRecognitionRun = null;
  let recognitionPlaybackEnded = false;
  let recognitionRestartRequested = false;
  let lastPlaybackTime = 0;
  let recognitionLastStatus = null;
  let recognitionLastProcessed = -1;
  let recognitionAdvancePromise = null;
  let lastRecognitionAdvanceAt = 0;
  let lastRecognitionHistoryAt = 0;
  let recognitionLastError = "";
  let livePcmNode = null;
  let liveMuteNode = null;
  let livePcmBuffers = [];
  let livePcmSamples = 0;
  let livePcmSampleRate = 0;
  let livePcmOffsetSamples = 0;
  let liveSilentSamples = 0;
  let liveChunkPeakRms = 0;
  let liveChunkIndex = 0;
  let liveCompletedChunks = 0;
  let liveFailedChunks = 0;
  let liveCaptureActive = false;
  let liveRecordingId = "";
  let liveMeetingId = "";
  let liveUtterances = [];
  let livePendingSegments = new Map();
  let liveNextApplyChunk = 0;
  let liveInFlight = 0;
  let liveChunkPromises = [];
  let liveStreamSessionId = "";
  let liveStreamFeedBuffers = [];
  let liveStreamFeedSamples = 0;
  let liveStreamFeedOffsetS = 0;
  let liveStreamFeedTimer = null;
  let liveChunkFlushTimer = null;
  let liveStreamFeedPromise = Promise.resolve();
  let livePartialText = "";
  let liveStreamStartPromise = null;
  let liveTranslationFailed = false;

  const LIVE_ASR_MODE_KEY = "voice_graph_live_asr_mode";
  const LIVE_ASR_MODEL_KEY = "voice_graph_asr_model";
  const TRANSLATION_ENABLED_KEY = "voice_graph_translation_enabled";
  const VOICEPRINT_SELF_NAME_KEY = "voice_graph_self_display_name";
  const VOICEPRINT_SELF_PERSON_KEY = "voice_graph_self_person_id";
  const DEFAULT_SELF_DISPLAY_NAME = "段世红";
  let asrModelSwitchPromise = null;
  let lastRecordingBlob = null;
  let lastRecordingFilename = "recording.webm";
  let lastRecordingMeetingId = "";

  try {
    const savedTranslation = localStorage.getItem(TRANSLATION_ENABLED_KEY);
    state.showTranslation = savedTranslation == null
      ? true
      : savedTranslation === "true";
  } catch (_) {
    state.showTranslation = true;
  }

  // Live ASR is chunk-based (not token streaming): flush on pause or max duration,
  // then POST each chunk to /live-transcribe. Chunks may run in parallel; results
  // are merged in chunk_index order for stable transcript text.
  const LIVE_MIN_CHUNK_S = 0.9;
  const LIVE_MAX_CHUNK_S = 2.8;
  const LIVE_PERIODIC_FLUSH_S = 2.5;
  const LIVE_SILENCE_S = 0.28;
  const LIVE_SILENCE_RMS = 0.01;
  const LIVE_MIN_PEAK_RMS = 0.006;
  const LIVE_TARGET_RATE = 16000;

  function setStatus(text) {
    recStatus.textContent = text;
  }

  function keepComparisonColumnsPinned() {
    const wrap = document.querySelector(".competitor-table-wrap");
    if (!wrap) return;
    const syncDimensionOffset = () => {
      wrap.style.setProperty("--dimension-scroll-offset", `${wrap.scrollLeft}px`);
    };
    wrap.addEventListener("scroll", syncDimensionOffset, { passive: true });
    syncDimensionOffset();
  }

  async function refreshAudioInputs(activeDeviceId = "") {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
    const previous = activeDeviceId || audioInputSelect.value;
    const devices = await navigator.mediaDevices.enumerateDevices();
    const inputs = devices.filter((device) => device.kind === "audioinput");
    audioInputSelect.innerHTML = `<option value="">${escapeHtml(t("recording.defaultMicrophone"))}</option>`;
    inputs.forEach((device, index) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.textContent = device.label || t("recording.microphoneNumber", { number: index + 1 });
      audioInputSelect.appendChild(option);
    });
    if (previous && inputs.some((device) => device.deviceId === previous)) {
      audioInputSelect.value = previous;
    }
  }

  function microphoneConstraints() {
    const audio = {
      channelCount: { ideal: 1 },
      echoCancellation: { ideal: true },
      noiseSuppression: { ideal: true },
      autoGainControl: { ideal: true },
      sampleRate: { ideal: 16000 },
    };
    if (audioInputSelect.value) audio.deviceId = { exact: audioInputSelect.value };
    return { audio };
  }

  function fmtTime(ms) {
    return i18n.formatDateTime(ms);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function statusLabel(status) {
    return {
      draft: t("status.draft"),
      processing: t("status.processing"),
      ready: t("status.ready"),
      failed: t("status.failed"),
    }[status] || status || t("status.draft");
  }

  function testDataScenarioNumber(entity) {
    const isTestData = entity && (entity.source === "test_data" || entity.project_id === "test_data");
    if (!isTestData) return "";
    const id = String((entity && (entity.meeting_id || entity.session_id)) || "");
    const match = id.match(/^S(\d+)_/);
    return match ? match[1] : "";
  }

  function localizedProjectName(project) {
    if (project && project.project_id === "test_data") return t("testData.projectName");
    const raw = String((project && project.name) || "").trim();
    if (!raw || /^(未命名项目|Unnamed project)$/i.test(raw)) return t("meeting.unnamedProject");
    return raw;
  }

  function localizedMeetingTitle(meeting) {
    const number = testDataScenarioNumber(meeting);
    if (number) return t(`testData.meeting.${number}.title`);
    const raw = String((meeting && meeting.title) || "").trim();
    const stamp = raw.match(/^(?:会议|Meeting)\s+(\d{2}-\d{2}\s+\d{2}:\d{2})$/i);
    if (stamp) return t("meeting.defaultTitle", { stamp: stamp[1] });
    return raw;
  }

  function localizedGeneratedText(value) {
    let out = String(value || "");
    if (!out) return "";
    out = out.replace(/本场共\s*(\d+)\s*人参与[。.]?\s*/g, (_, count) => t("summary.participantCount", { count }));
    out = out.replace(/(\d+)\s+people joined this meeting\.\s*/gi, (_, count) => t("summary.participantCount", { count }));
    out = out.replace(/未知说话人(?:\s+(\d+))?/g, (_, number) => (
      number ? t("result.unknownSpeakerNumber", { number }) : t("result.unknownSpeaker")
    ));
    out = out.replace(/Unknown speaker(?:\s+(\d+))?/gi, (_, number) => (
      number ? t("result.unknownSpeakerNumber", { number }) : t("result.unknownSpeaker")
    ));
    out = out.replace(/\s*提出打通录音摘要与关系图谱流程；/g, t("summary.templatePropose"));
    out = out.replace(/\s*proposed connecting the recording summary with the relationship-graph workflow;\s*/gi, t("summary.templatePropose"));
    out = out.replace(/\s*确认声纹建档与下一步动作。/g, t("summary.templateConfirm"));
    out = out.replace(/\s*confirmed voiceprint enrollment and next steps\./gi, t("summary.templateConfirm"));
    return out;
  }

  function localizedSummaryBrief(text, limit) {
    const localized = localizedGeneratedText(text);
    if (!localized) return "";
    if (!limit || localized.length <= limit) return localized;
    return `${localized.slice(0, limit)}…`;
  }

  function localizedTestDataDescription(entity) {
    const number = testDataScenarioNumber(entity);
    return number ? t(`testData.meeting.${number}.description`) : "";
  }

  function localizedTranscriptSource(meta) {
    if (!meta) return t("result.transcript");
    if (meta.source === "fresh_audio") return t("recognition.waitingPlaybackResult");
    if (meta.source === "reference") return t("testData.referenceTranscript");
    if (meta.source === "asr") {
      return t("testData.realAsrTranscript", { model: meta.model || "Zipformer" });
    }
    return meta.source_label || t("result.transcript");
  }

  function localizedSpeakerLabel(person) {
    const item = person || {};
    if (item.identity_status === "pending") return t("result.speakerAnalyzing");
    if (item.identity_status === "failed") return t("result.speakerIdentityFailed");
    if (item.identity_status === "unavailable") return t("result.unidentifiedSpeaker");

    const raw = String(
      item.display_label || item.display_name || item.canonical_name || item.original_name || "",
    ).trim();
    const unknownMatch = raw.match(/^(?:未知说话人|Unknown speaker)(?:\s+(\d+))?$/i);
    if (unknownMatch) {
      return unknownMatch[1]
        ? t("result.unknownSpeakerNumber", { number: unknownMatch[1] })
        : t("result.unknownSpeaker");
    }
    if (raw === "声音分析中" || raw === "身份识别中") return t("result.speakerAnalyzing");
    if (raw === "声纹识别失败") return t("result.speakerIdentityFailed");
    if (raw === "未识别说话人") return t("result.unidentifiedSpeaker");

    const id = String(item.speaker_id || item.local_id || "");
    const idMatch = id.match(/(?:^|:)spk(\d+)$/);
    if (!raw && idMatch) return t("result.unknownSpeakerNumber", { number: idMatch[1] });
    return raw || id || t("result.unknownSpeaker");
  }

  function isIdentifiedSpeaker(person) {
    const item = person || {};
    if (item.identity_status === "pending" || item.identity_status === "failed" || item.identity_status === "unavailable") {
      return false;
    }
    if (item.unidentified || item.live_unidentified) return false;
    const raw = String(
      item.display_label || item.display_name || item.canonical_name || item.original_name || "",
    ).trim();
    if (!raw) return false;
    if (/^(?:未知说话人|Unknown speaker)(?:\s+(\d+))?$/i.test(raw)) return false;
    if (raw === t("recording.liveSpeaker") || raw === "实时语音" || raw === "Live Audio") return false;
    if (
      raw === t("result.speakerAnalyzing")
      || raw === t("result.speakerIdentityFailed")
      || raw === t("result.unidentifiedSpeaker")
      || raw === "声音分析中"
      || raw === "身份识别中"
      || raw === "声纹识别失败"
      || raw === "未识别说话人"
    ) {
      return false;
    }
    if (String(item.speaker_id || "") === "live_microphone") return false;
    return true;
  }

  function isResolvedVoiceCluster(person) {
    const item = person || {};
    return Boolean(
      item.identity_status === "resolved"
      && item.identity_source === "voice_cluster"
      && String(item.speaker_id || item.local_id || "").trim(),
    );
  }

  function voiceBarsHtml() {
    return `<span class="voice-bars" aria-hidden="true"><i></i><i></i><i></i></span>`;
  }

  function sameSpeakerIdentity(a, b) {
    if (!a || !b) return false;
    const idA = String(a.speaker_id || a.local_id || "").trim();
    const idB = String(b.speaker_id || b.local_id || "").trim();
    if (idA && idB && idA === idB) return true;
    const nameA = String(a.display_label || a.display_name || a.canonical_name || "").trim();
    const nameB = String(b.display_label || b.display_name || b.canonical_name || "").trim();
    return Boolean(nameA && nameB && nameA === nameB);
  }

  function appendUtteranceText(base, extra) {
    const a = String(base || "").trim();
    const b = String(extra || "").trim();
    if (!b) return a;
    if (!a) return b;
    const needsSpace = /[A-Za-z0-9]$/.test(a) && /^[A-Za-z0-9]/.test(b);
    return needsSpace ? `${a} ${b}` : `${a}${b}`;
  }

  function mergeConsecutiveSpeakerUtterances(utterances) {
    const merged = [];
    for (const raw of utterances || []) {
      const utt = { ...raw };
      const last = merged[merged.length - 1];
      if (!last) {
        merged.push(utt);
        continue;
      }
      const clustered = isResolvedVoiceCluster(last) || isResolvedVoiceCluster(utt);
      const mergeUnidentified = !isIdentifiedSpeaker(last)
        && !isIdentifiedSpeaker(utt)
        && (!clustered || (
          isResolvedVoiceCluster(last)
          && isResolvedVoiceCluster(utt)
          && sameSpeakerIdentity(last, utt)
        ));
      const mergeIdentified = isIdentifiedSpeaker(last) && isIdentifiedSpeaker(utt) && sameSpeakerIdentity(last, utt);
      if (mergeUnidentified || mergeIdentified) {
        last.t1 = utt.t1 ?? last.t1;
        last.text = appendUtteranceText(last.text, utt.text);
        last.source_text = appendUtteranceText(last.source_text, utt.source_text);
        if (!last.language && utt.language) last.language = utt.language;
        continue;
      }
      merged.push(utt);
    }
    return merged;
  }

  function speakerWhoHtml(person) {
    if (person.identity_status === "pending") {
      return escapeHtml(localizedSpeakerLabel(person));
    }
    if (isResolvedVoiceCluster(person)) {
      return escapeHtml(localizedSpeakerLabel(person));
    }
    if (!isIdentifiedSpeaker(person)) return voiceBarsHtml();
    return escapeHtml(localizedSpeakerLabel(person));
  }

  function setLiveSpeakingVisible(visible) {
    if (!liveSpeakingRow) return;
    liveSpeakingRow.classList.toggle("hidden", !visible);
    if (!visible) {
      liveSpeakingRow.classList.remove("active", "quiet");
      return;
    }
    liveSpeakingRow.classList.add("quiet");
    liveSpeakingRow.classList.remove("active");
    if (liveSpeakingHint) liveSpeakingHint.textContent = t("recording.speakingQuiet");
  }

  function updateLiveSpeakingLevel(rms) {
    if (!liveSpeakingRow || liveSpeakingRow.classList.contains("hidden")) return;
    const speaking = Number(rms) >= 0.02;
    liveSpeakingRow.classList.toggle("active", speaking);
    liveSpeakingRow.classList.toggle("quiet", !speaking);
    if (liveSpeakingHint) {
      liveSpeakingHint.textContent = speaking ? t("recording.speakingHint") : t("recording.speakingQuiet");
    }
  }

  function setNavActive(which) {
    document.querySelectorAll(".side-item[data-nav]").forEach((el) => {
      el.classList.toggle("active", el.dataset.nav === which);
    });
  }

  function setWorkflowActive(stage) {
    document.querySelectorAll(".workflow-step[data-workflow-stage]").forEach((el) => {
      el.classList.toggle("active", el.dataset.workflowStage === stage);
    });
  }

  function showView(name) {
    state.view = name;
    viewHome.classList.toggle("hidden", name !== "home");
    viewDetail.classList.toggle("hidden", name !== "detail");
    viewGraph.classList.toggle("hidden", name !== "graph");
    viewEvaluation.classList.toggle("hidden", name !== "evaluation");

    if (name === "home") {
      pageTitle.textContent = t("page.home.title");
      pageSub.textContent = t("page.home.subtitle");
      setNavActive("home");
      setWorkflowActive("core");
    } else if (name === "detail" && state.meeting) {
      pageTitle.textContent = localizedMeetingTitle(state.meeting);
      pageSub.textContent = state.project ? t("page.detail.project", { name: localizedProjectName(state.project) }) : "";
      setNavActive("");
      setWorkflowActive("core");
    } else if (name === "graph") {
      pageTitle.textContent = t("page.graph.title");
      pageSub.textContent = t("page.graph.subtitle");
      setNavActive("graph");
      setWorkflowActive("design");
    } else if (name === "evaluation") {
      pageTitle.textContent = t("page.evaluation.title");
      pageSub.textContent = t("page.evaluation.subtitle");
      setNavActive("evaluation");
      setWorkflowActive("test");
    }
    applyEditionBranding();
    if (name === "home" && isIcanEdition()) refreshIcanOverview().catch(console.error);
  }

  async function navigateWorkflowStage(stage) {
    stopRecognitionPolling();
    if (stage === "research") {
      showView("evaluation");
      setWorkflowActive("research");
      await refreshEvaluation();
      $("researchTitle").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (stage === "design") {
      showView("graph");
      await refreshGraphView();
      viewGraph.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (stage === "core") {
      showView(state.meeting ? "detail" : "home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    showView("evaluation");
    await refreshEvaluation();
    viewEvaluation.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function isNetworkFetchError(message) {
    return /Failed to fetch|NetworkError|Load failed/i.test(String(message || ""));
  }

  async function api(path, options) {
    const requestOptions = { ...(options || {}) };
    requestOptions.headers = {
      "Accept-Language": i18n.getLocale(),
      ...((options && options.headers) || {}),
    };
    if (
      window.VoiceWeaveDemoApi
      && typeof window.VoiceWeaveDemoApi.request === "function"
    ) {
      return window.VoiceWeaveDemoApi.request(path, requestOptions);
    }
    const res = await fetch(path, requestOptions);
    if (!res.ok) {
      let detail = res.statusText;
      try {
        const data = await res.json();
        detail = data.detail || JSON.stringify(data);
      } catch (_) {}
      throw new Error(detail);
    }
    return res.json();
  }

  function isIcanEdition() {
    return state.appConfig && state.appConfig.edition === "ican";
  }

  function applyEditionBranding() {
    const ican = isIcanEdition();
    document.body.classList.toggle("edition-ican", Boolean(ican));
    document.body.classList.toggle("edition-speakbit", Boolean(state.appConfig && !ican));
    if (!ican) return;
    if (sideBrandName) sideBrandName.textContent = "智会 Agent";
    document.title = "智会 Agent · 越用越准的会议记忆";
    if (state.view === "home") {
      pageTitle.textContent = "智会 Agent";
      pageSub.textContent = "越用越准 · 持续学习 · 声纹识别 · RK3588 边缘盒子";
    }
  }

  function updateIcanRuntimeCards(health = {}, knowledge = {}) {
    if (!isIcanEdition()) return;
    const asr = health.asr || {};
    const embed = health.speaker_embed || knowledge.speaker_embed || {};
    const evidence = knowledge.evidence || health.evidence || {};
    const adapter = knowledge.active_adapter || {};
    const hardware = state.appConfig.hardware || {};
    if (icanAsrModel && health.asr) {
      icanAsrModel.textContent = asr.runtime_available
        ? `${asr.model || "本地 ASR"} · 就绪`
        : "ASR 不可用";
    }
    if (icanVoiceModel && embed.model_present !== undefined) {
      icanVoiceModel.textContent = embed.model_present ? "3D-Speaker · 就绪" : "声纹模型不可用";
    }
    if (icanVoiceCount) {
      icanVoiceCount.textContent = `${Number(evidence.person_count || 0)} 个声音档案`;
    }
    if (icanAdapter) icanAdapter.textContent = adapter.adapter_id || health.active_adapter || "A_v0";
    if (icanSampleCount) {
      icanSampleCount.textContent = `${Number(evidence.confirmed_samples || 0)} confirmed samples`;
    }
    if (icanHardwareState) {
      const target = hardware.target || "RK3588";
      icanHardwareState.textContent = hardware.connected
        ? `${target} · 已接入`
        : `${target} · 待接入`;
    }
  }

  async function refreshIcanOverview() {
    if (!isIcanEdition()) return;
    const [health, knowledge] = await Promise.all([
      api("/api/health"),
      api("/api/knowledge"),
    ]);
    updateIcanRuntimeCards(health, knowledge);
  }

  async function loadEditionConfig() {
    try {
      state.appConfig = await api("/api/app-config");
      applyEditionBranding();
      await refreshIcanOverview();
    } catch (err) {
      console.warn("edition config unavailable", err);
    }
  }

  async function openIcanGraphSection(sectionId, title, subtitle) {
    stopRecognitionPolling();
    showView("graph");
    await refreshGraphView();
    pageTitle.textContent = title;
    pageSub.textContent = subtitle;
    const section = $(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function askMeetingQuery() {
    const question = String((meetingQueryInput && meetingQueryInput.value) || "").trim();
    const runId = String((meetingQueryButton && meetingQueryButton.dataset.runId) || "").trim();
    if (!question || !state.meeting || !runId) return;
    meetingQueryButton.disabled = true;
    meetingQueryOutput.dataset.state = "loading";
    meetingQueryOutput.textContent = "Agent 正在理解问题并检索本次 ASR 证据……";
    try {
      const payload = await api(
        `/api/test-data/meetings/${encodeURIComponent(state.meeting.meeting_id)}/query`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, run_id: runId }),
        },
      );
      meetingQueryOutput.replaceChildren();
      const answer = document.createElement("p");
      answer.className = "meeting-query-answer";
      answer.textContent = payload.answer || "";
      meetingQueryOutput.append(answer);
      const evidence = (payload.evidence || []).slice(0, 3);
      if (evidence.length) {
        const list = document.createElement("ol");
        list.className = "meeting-query-evidence";
        evidence.forEach((item) => {
          const row = document.createElement("li");
          const meta = document.createElement("b");
          meta.textContent = `${item.time_label || "00:00"} · ${item.speaker || "未知说话人"} · ${item.source || "ASR"}`;
          const text = document.createElement("span");
          text.textContent = item.text || "";
          row.append(meta, text);
          list.append(row);
        });
        meetingQueryOutput.append(list);
      }
      meetingQueryOutput.dataset.state = "answered";
    } catch (err) {
      meetingQueryOutput.textContent = `查询失败：${err.message}`;
      meetingQueryOutput.dataset.state = "error";
    } finally {
      meetingQueryButton.disabled = false;
    }
  }

  function refreshProjectConsultantProjects() {
    if (!projectConsultantProject) return;
    const previous = projectConsultantProject.value;
    projectConsultantProject.replaceChildren();
    state.tree.forEach((node) => {
      const option = document.createElement("option");
      option.value = node.project.project_id;
      option.textContent = `${localizedProjectName(node.project)} · ${t("projectAgent.meetingCount", { count: node.meetings.length })}`;
      projectConsultantProject.append(option);
    });
    const preferred = state.project && state.project.project_id;
    if (preferred && state.tree.some((node) => node.project.project_id === preferred)) {
      projectConsultantProject.value = preferred;
    } else if (previous && state.tree.some((node) => node.project.project_id === previous)) {
      projectConsultantProject.value = previous;
    } else if (state.tree.some((node) => node.project.project_id === "test_data")) {
      projectConsultantProject.value = "test_data";
    }
    if (projectConsultantSend) projectConsultantSend.disabled = !projectConsultantProject.value;
  }

  function renderConsultantMessage(message, { answer = "", evidence = [], error = false } = {}) {
    if (!message) return;
    const body = message.querySelector("div");
    if (!body) return;
    body.replaceChildren();
    const title = document.createElement("strong");
    title.textContent = error ? t("projectAgent.failed") : t("projectAgent.agentName");
    const text = document.createElement("p");
    text.textContent = answer;
    body.append(title, text);
    if (evidence.length) {
      const list = document.createElement("ol");
      list.className = "consultant-evidence";
      evidence.slice(0, 4).forEach((item) => {
        const row = document.createElement("li");
        const meta = document.createElement("b");
        const meetingTitle = item.meeting_title || t("projectAgent.relatedMeeting");
        meta.textContent = `${meetingTitle} · ${item.time_label || "00:00"} · ${item.speaker || t("result.unknownPerson")}`;
        const quote = document.createElement("span");
        quote.textContent = item.text || "";
        row.append(meta, quote);
        list.append(row);
      });
      body.append(list);
    }
    message.classList.toggle("error", error);
  }

  function appendConsultantMessage(role, text) {
    if (!projectConsultantMessages) return null;
    const message = document.createElement("article");
    message.className = `consultant-message ${role}`;
    const avatar = document.createElement("span");
    avatar.className = "consultant-avatar";
    avatar.textContent = role === "user" ? t("projectAgent.youAvatar") : "A";
    const body = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = role === "user" ? t("projectAgent.yourQuestion") : t("projectAgent.agentName");
    const content = document.createElement("p");
    content.textContent = text;
    body.append(title, content);
    message.append(avatar, body);
    projectConsultantMessages.append(message);
    projectConsultantMessages.scrollTop = projectConsultantMessages.scrollHeight;
    return message;
  }

  async function askProjectConsultant() {
    const projectId = String((projectConsultantProject && projectConsultantProject.value) || "").trim();
    const question = String((projectConsultantInput && projectConsultantInput.value) || "").trim();
    if (!projectId || !question || !projectConsultantSend) return;
    appendConsultantMessage("user", question);
    const pending = appendConsultantMessage("agent", t("projectAgent.working"));
    projectConsultantSend.disabled = true;
    projectConsultantInput.disabled = true;
    try {
      const payload = await api(`/api/projects/${encodeURIComponent(projectId)}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      renderConsultantMessage(pending, {
        answer: payload.answer || t("projectAgent.noAnswer"),
        evidence: payload.evidence || [],
      });
      projectConsultantInput.value = "";
    } catch (err) {
      renderConsultantMessage(pending, { answer: err.message, error: true });
    } finally {
      projectConsultantSend.disabled = false;
      projectConsultantInput.disabled = false;
      projectConsultantInput.focus();
      if (projectConsultantMessages) {
        projectConsultantMessages.scrollTop = projectConsultantMessages.scrollHeight;
      }
    }
  }

  async function loadTree() {
    const [data, testData] = await Promise.all([
      api("/api/projects"),
      api("/api/test-data/meetings").catch((err) => {
        console.warn("test_data unavailable", err);
        return null;
      }),
    ]);
    state.projects = data.projects || [];
    projectCount.textContent = String(state.projects.length + (testData ? 1 : 0));

    const openMap = {};
    state.tree.forEach((t) => {
      openMap[t.project.project_id] = t.open;
    });

    const tree = [];
    for (const project of state.projects) {
      const listed = await api(`/api/projects/${project.project_id}/meetings`);
      tree.push({
        project: listed.project || project,
        meetings: listed.meetings || [],
        open: openMap[project.project_id] !== false,
      });
    }
    if (testData) {
      tree.push({
        project: testData.project,
        meetings: testData.meetings || [],
        open: openMap.test_data !== false,
      });
    }
    state.tree = tree;
    renderTree();
    renderRecent();
    refreshProjectConsultantProjects();
  }

  async function deleteMeeting(project, meeting) {
    if (project.project_id === "test_data") {
      alert(t("meeting.testDataNoDelete"));
      return;
    }
    if (!confirm(t("meeting.deleteConfirm", { title: meeting.title }))) return;
    try {
      await api(`/api/meetings/${meeting.meeting_id}`, { method: "DELETE" });
      if (state.meeting && state.meeting.meeting_id === meeting.meeting_id) {
        state.meeting = null;
        showView("home");
      }
      await loadTree();
      setStatus(t("meeting.deleted"));
    } catch (err) {
      alert(t("meeting.deleteFailed", { error: err.message }));
    }
  }

  async function deleteProject(project) {
    if (project.project_id === "test_data") {
      alert(t("meeting.testDataNoDelete"));
      return;
    }
    if (!confirm(t("project.deleteConfirm", { name: project.name }))) return;
    try {
      // Backend only deletes empty projects; cascade meetings first.
      const listed = await api(`/api/projects/${project.project_id}/meetings`);
      for (const m of listed.meetings || []) {
        await api(`/api/meetings/${m.meeting_id}`, { method: "DELETE" });
      }
      await api(`/api/projects/${project.project_id}`, { method: "DELETE" });
      if (state.project && state.project.project_id === project.project_id) {
        state.project = null;
        state.meeting = null;
        showView("home");
      }
      await loadTree();
      setStatus(t("project.deleted"));
    } catch (err) {
      alert(t("meeting.deleteFailed", { error: err.message }));
    }
  }

  function renderTree() {
    sideTree.innerHTML = "";
    sideEmpty.classList.toggle("hidden", state.tree.length > 0);

    state.tree.forEach((node) => {
      const wrap = document.createElement("div");
      wrap.className = "tree-project";

      const pBtn = document.createElement("button");
      pBtn.type = "button";
      pBtn.className = "tree-project-btn";
      if (state.project && state.project.project_id === node.project.project_id && !state.meeting) {
        pBtn.classList.add("active");
      }
      const pActions = document.createElement("span");
      pActions.className = "tree-row-actions";
      pActions.innerHTML = `<span class="badge">${node.meetings.length}</span>`;
      if (node.project.project_id !== "test_data") {
        const delP = document.createElement("button");
        delP.type = "button";
        delP.className = "tree-del";
        delP.title = t("project.delete");
        delP.textContent = t("project.deleteShort");
        delP.addEventListener("click", (ev) => {
          ev.stopPropagation();
          deleteProject(node.project);
        });
        pActions.appendChild(delP);
      }
      pBtn.innerHTML = `<span class="name">${node.open ? "▾" : "▸"} ${escapeHtml(localizedProjectName(node.project))}</span>`;
      pBtn.appendChild(pActions);
      pBtn.addEventListener("click", () => {
        node.open = !node.open;
        state.project = node.project;
        state.meeting = null;
        renderTree();
        showView("home");
        renderRecent(node.project.project_id);
        refreshProjectConsultantProjects();
      });
      wrap.appendChild(pBtn);

      if (node.open) {
        const list = document.createElement("div");
        list.className = "tree-meetings";
        if (!node.meetings.length) {
          const empty = document.createElement("div");
          empty.className = "side-empty";
          empty.style.margin = "4px 0 8px";
          empty.textContent = t("project.noMeetings");
          list.appendChild(empty);
        }
        node.meetings.forEach((m) => {
          const mBtn = document.createElement("button");
          mBtn.type = "button";
          mBtn.className = "tree-meeting-btn";
          if (state.meeting && state.meeting.meeting_id === m.meeting_id) {
            mBtn.classList.add("active");
          }
          const meta = document.createElement("span");
          meta.className = "tree-row-actions";
          meta.innerHTML = `<span class="meta">${statusLabel(m.status)}</span>`;
          if (node.project.project_id !== "test_data") {
            const delM = document.createElement("button");
            delM.type = "button";
            delM.className = "tree-del";
            delM.title = t("meeting.delete");
            delM.textContent = "×";
            delM.addEventListener("click", (ev) => {
              ev.stopPropagation();
              deleteMeeting(node.project, m);
            });
            meta.appendChild(delM);
          }
          mBtn.innerHTML = `<span>${escapeHtml(localizedMeetingTitle(m))}</span>`;
          mBtn.appendChild(meta);
          mBtn.addEventListener("click", () => openMeeting(node.project, m));
          list.appendChild(mBtn);
        });
        wrap.appendChild(list);
      }

      sideTree.appendChild(wrap);
    });
  }

  function renderRecent(filterProjectId) {
    const rows = [];
    state.tree.forEach((node) => {
      if (filterProjectId && node.project.project_id !== filterProjectId) return;
      node.meetings.forEach((m) => {
        rows.push({ project: node.project, meeting: m });
      });
    });
    rows.sort((a, b) => (b.meeting.updated_at || 0) - (a.meeting.updated_at || 0));

    recentList.innerHTML = "";
    recentEmpty.classList.toggle("hidden", rows.length > 0);
    rows.slice(0, 12).forEach(({ project, meeting }) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "list-item";
      const testDataBrief = localizedTestDataDescription(meeting);
      const brief = testDataBrief || (meeting.summary_brief
        ? localizedSummaryBrief(meeting.summary_brief, 88)
        : t("meeting.noSummary"));
      btn.innerHTML = `
        <div>
          <div class="title">${escapeHtml(localizedMeetingTitle(meeting))}</div>
          <div class="meta">${escapeHtml(localizedProjectName(project))} · ${meeting.source === "test_data" ? escapeHtml(t("meeting.localTestFile")) : fmtTime(meeting.updated_at || meeting.created_at)} · ${escapeHtml(brief)}</div>
        </div>
        <span class="badge ${meeting.status || "draft"}">${statusLabel(meeting.status)}</span>
      `;
      btn.addEventListener("click", () => openMeeting(project, meeting));
      recentList.appendChild(btn);
    });
  }

  async function openMeeting(project, meeting) {
    state.project = project;
    state.meeting = meeting;
    detailTitle.textContent = localizedMeetingTitle(meeting);
    detailBadge.className = `badge ${meeting.status || "draft"}`;
    detailBadge.textContent = statusLabel(meeting.status);
    showView("detail");
    renderTree();
    renderMeetingHistory();
    resetDetailUI();
    setStatus(meeting.status === "ready" ? t("status.existingResult") : t("status.standby"));

    try {
      const isTestData = meeting.source === "test_data" || project.project_id === "test_data";
      const endpoint = isTestData
        ? `/api/test-data/meetings/${encodeURIComponent(meeting.meeting_id)}`
        : `/api/meetings/${encodeURIComponent(meeting.meeting_id)}`;
      const data = await api(endpoint);
      state.meeting = data.meeting;
      detailTitle.textContent = localizedMeetingTitle(data.meeting);
      detailBadge.className = `badge ${data.meeting.status || "draft"}`;
      detailBadge.textContent = statusLabel(data.meeting.status);
      renderMeetingHistory();
      if (data.meeting.audio_url) {
        playback.src = data.meeting.audio_url;
      } else if (data.meeting.audio_ref) {
        playback.src = `/api/meetings/${encodeURIComponent(data.meeting.meeting_id)}/audio`;
      }
      if (isTestData) {
        captureControls.classList.add("hidden");
        captureMeter.classList.add("hidden");
        testDataHint.classList.remove("hidden");
        const asrAvailable = Boolean(data.asr && data.asr.runtime_available);
        const streamAsr = Boolean(data.asr && data.asr.live_stream);
        const identityAvailable = Boolean(
          data.speaker_identity && data.speaker_identity.runtime_available,
        );
        testDataHintText.textContent = asrAvailable
          ? identityAvailable
            ? streamAsr
              ? t("recognition.playbackHint")
              : t("recognition.playbackIdentityHint")
            : t("recognition.noIdentityHint")
          : t("recognition.asrUnavailableHint");
        recognitionTopStatus.textContent = asrAvailable ? t("recognition.waitingPlayback") : t("recognition.asrUnavailable");
        state.testBaseResult = data.result;
        const initialResult = {
          ...data.result,
          utterances: [],
          transcript_meta: {
            source: "playback_asr",
            source_label: t("recognition.waitingPlaybackResult"),
            utterance_count: 0,
            speaker_count: 0,
          },
        };
        renderResult({ result: initialResult });
        liveRecognition.classList.remove("hidden");
        recognitionHistory.classList.remove("hidden");
        await loadRecognitionHistory();
      } else if (data.result) {
        renderResult({ result: data.result });
        try {
          const latestMemory = await api(
            `/api/projects/${encodeURIComponent(project.project_id)}/memory`,
          );
          const meetingMemory = {
            ...latestMemory,
            proposals: (latestMemory.proposals || []).filter(
              (proposal) => proposal.meeting_id === meeting.meeting_id,
            ),
          };
          if (state.result) state.result.project_memory = meetingMemory;
          renderProjectMemory(meetingMemory);
        } catch (memoryError) {
          console.warn("project memory unavailable", memoryError);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  function resetDetailUI() {
    emptyState.classList.remove("hidden");
    resultView.classList.add("hidden");
    summaryBrief.textContent = "";
    resultMeta.innerHTML = "";
    speakerRoster.innerHTML = "";
    speakerReview.classList.add("hidden");
    speakerReviewList.innerHTML = "";
    state.result = null;
    state.testBaseResult = null;
    transcript.innerHTML = "";
    resetSummaryPanel();
    renderProjectMemory({});
    playback.removeAttribute("src");
    playback.load();
    captureControls.classList.remove("hidden");
    captureMeter.classList.remove("hidden");
    testDataHint.classList.add("hidden");
    liveRecognition.className = "live-recognition hidden";
    recognitionHistory.classList.add("hidden");
    recognitionHistoryList.innerHTML = "";
    recognitionStage.textContent = t("recognition.waitingPlayback");
    recognitionRunInfo.textContent = t("recognition.independentRun");
    recognitionProgressBar.style.width = "0%";
    recognitionTopStatus.textContent = t("recognition.waitingPlayback");
    stopRecognitionPolling();
    activeRecognitionRun = null;
    recognitionPlaybackEnded = false;
    recognitionRestartRequested = false;
    recognitionBusy = false;
    recognitionCreatePromise = null;
    recognitionLastStatus = null;
    recognitionLastProcessed = -1;
    recognitionLastError = "";
    lastRecognitionAdvanceAt = 0;
    lastRecognitionHistoryAt = 0;
    lastPlaybackTime = 0;
    meterBar.style.width = "0%";
    setLiveSpeakingVisible(false);
    btnRecord.disabled = false;
    btnStop.disabled = true;
    audioInputSelect.disabled = false;
    if (liveAsrModeSelect) liveAsrModeSelect.disabled = false;
    if (asrModelSelect) asrModelSelect.disabled = false;
    btnRecord.classList.remove("live");
    btnRecord.textContent = t("recording.start");
    if (meetingQueryButton && meetingQueryOutput) {
      meetingQueryButton.disabled = true;
      meetingQueryButton.dataset.runId = "";
      meetingQueryOutput.dataset.state = "waiting";
      meetingQueryOutput.textContent = "请选择生成会议，播放并完成识别后查询。";
    }
  }

  function resetSummaryPanel() {
    if (!summaryMeetingName) return;
    summaryMeetingName.textContent = "—";
    summaryMeetingTime.textContent = "—";
    summaryAttendees.textContent = "—";
    summaryContent.textContent = "—";
    summaryActions.textContent = "—";
  }

  function formatMeetingClock(value) {
    const ms = Number(value);
    if (!Number.isFinite(ms) || ms <= 0) return "—";
    const date = new Date(ms > 1e12 ? ms : ms * 1000);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleString(i18n.getLocale() === "en-US" ? "en-US" : "zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatHistoryDay(value) {
    const ms = Number(value);
    if (!Number.isFinite(ms) || ms <= 0) return t("history.unknownDate");
    const date = new Date(ms > 1e12 ? ms : ms * 1000);
    if (Number.isNaN(date.getTime())) return t("history.unknownDate");
    return date.toLocaleDateString(i18n.getLocale() === "en-US" ? "en-US" : "zh-CN", {
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  }

  function renderMeetingHistory() {
    if (!meetingHistoryList) return;
    meetingHistoryList.innerHTML = "";
    const project = state.project;
    const node = (state.tree || []).find((item) => item.project && project && item.project.project_id === project.project_id);
    const meetings = (node && node.meetings) || [];
    meetingHistoryDate.textContent = state.meeting
      ? formatHistoryDay(state.meeting.updated_at || state.meeting.created_at)
      : "";
    if (!meetings.length) {
      meetingHistoryEmpty.classList.remove("hidden");
      return;
    }
    meetingHistoryEmpty.classList.add("hidden");
    meetings
      .slice()
      .sort((a, b) => Number(b.updated_at || b.created_at || 0) - Number(a.updated_at || a.created_at || 0))
      .forEach((meeting) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "meeting-history-item" + (state.meeting && state.meeting.meeting_id === meeting.meeting_id ? " active" : "");
        const clock = formatMeetingClock(meeting.created_at || meeting.updated_at);
        btn.innerHTML = `
          <strong>${escapeHtml(localizedMeetingTitle(meeting))}</strong>
          <span>${escapeHtml(clock)}</span>
        `;
        btn.addEventListener("click", () => openMeeting(project, meeting));
        meetingHistoryList.appendChild(btn);
      });
  }

  function setTranscriptView(mode) {
    state.transcriptView = mode === "concise" ? "concise" : "original";
    if (btnViewOriginal) btnViewOriginal.classList.toggle("active", state.transcriptView === "original");
    if (btnViewConcise) btnViewConcise.classList.toggle("active", state.transcriptView === "concise");
    if (state.result) renderTranscript(state.result);
  }

  function renderSummaryPanel(result) {
    if (!summaryMeetingName) return;
    const meeting = state.meeting || {};
    const speakers = result.speakers || [];
    const summary = result.summary || {};
    const brief = localizedTestDataDescription(result)
      || localizedGeneratedText(summary.brief || "")
      || t("result.noSummary");
    const bySpeaker = summary.by_speaker || {};
    const actions = Array.isArray(summary.actions) ? summary.actions : [];
    const start = meeting.created_at || meeting.updated_at;
    const end = meeting.updated_at || meeting.created_at;
    const duration = Number(result.duration_s || meeting.duration_s || 0);

    summaryMeetingName.textContent = localizedMeetingTitle(meeting) || "—";
    summaryMeetingTime.textContent = duration > 0
      ? t("summary.timeRange", {
          start: formatMeetingClock(start),
          end: formatMeetingClock(end),
          duration: `${Math.max(1, Math.round(duration / 60))} min`,
        })
      : formatMeetingClock(start);
    summaryAttendees.textContent = speakers.length
      ? speakers.map((speaker) => localizedSpeakerLabel(speaker)).join(" · ")
      : t("summary.noAttendees");

    const contentParts = [brief];
    Object.keys(bySpeaker).forEach((name) => {
      const text = String(bySpeaker[name] || "").trim();
      if (text) contentParts.push(`${name}: ${text}`);
    });
    summaryContent.innerHTML = contentParts
      .map((line) => `<p>${escapeHtml(line)}</p>`)
      .join("");
    summaryActions.innerHTML = actions.length
      ? `<ul>${actions.map((item) => `<li>${escapeHtml(localizedGeneratedText(item))}</li>`).join("")}</ul>`
      : `<span>${escapeHtml(t("summary.noActions"))}</span>`;
    if (summaryBrief) summaryBrief.textContent = brief;
  }

  function renderProjectMemory(memory) {
    if (!projectMemoryCurrent || !projectMemoryProposals || !btnConfirmProjectMemory) return;
    const current = Array.isArray(memory && memory.current) ? memory.current : [];
    const proposals = Array.isArray(memory && memory.proposals) ? memory.proposals : [];
    projectMemoryCurrent.innerHTML = current.length
      ? current.map((fact) => `
          <div class="project-memory-fact">
            <span>${escapeHtml(fact.label || fact.fact_key || "—")}</span>
            <strong>${escapeHtml(fact.value || "—")}</strong>
            <small>${escapeHtml(t("projectMemory.version", { version: Number(fact.version || 1) }))}</small>
          </div>
        `).join("")
      : `<p class="project-memory-empty">${escapeHtml(t("projectMemory.emptyCurrent"))}</p>`;
    projectMemoryProposals.innerHTML = proposals.length
      ? proposals.map((proposal) => {
          const evidence = proposal.evidence || {};
          const change = proposal.previous_value
            ? `${proposal.previous_value} → ${proposal.value}`
            : proposal.value;
          return `
            <label class="project-memory-proposal">
              <input type="checkbox" value="${escapeHtml(proposal.proposal_id || "")}" checked />
              <span>
                <strong>${escapeHtml(proposal.label || proposal.fact_key || "—")}：${escapeHtml(change || "—")}</strong>
                <small>${escapeHtml(evidence.text || "")}</small>
                <em>${escapeHtml(evidence.utterance_id || "")} · ${formatTranscriptTime(evidence.t0)}–${formatTranscriptTime(evidence.t1)}</em>
              </span>
            </label>
          `;
        }).join("")
      : `<p class="project-memory-empty">${escapeHtml(t("projectMemory.emptyPending"))}</p>`;
    btnConfirmProjectMemory.disabled = proposals.length === 0;
    btnConfirmProjectMemory.textContent = t("projectMemory.confirm");
  }

  async function confirmProjectMemory() {
    if (!state.project || !btnConfirmProjectMemory) return;
    const proposalIds = Array.from(
      projectMemoryProposals.querySelectorAll('input[type="checkbox"]:checked'),
    ).map((input) => input.value).filter(Boolean);
    if (!proposalIds.length) {
      alert(t("projectMemory.selectOne"));
      return;
    }
    btnConfirmProjectMemory.disabled = true;
    btnConfirmProjectMemory.textContent = t("projectMemory.confirming");
    try {
      const data = await api(`/api/projects/${encodeURIComponent(state.project.project_id)}/memory/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposal_ids: proposalIds, actor: "local-reviewer" }),
      });
      if (state.result) state.result.project_memory = data.memory;
      renderProjectMemory(data.memory || {});
      setStatus(t("projectMemory.confirmed"));
    } catch (err) {
      alert(t("projectMemory.confirmFailed", { error: err.message }));
      btnConfirmProjectMemory.disabled = false;
      btnConfirmProjectMemory.textContent = t("projectMemory.confirm");
    }
  }

  function buildSummaryExportText(result) {
    const meeting = state.meeting || {};
    const summary = (result && result.summary) || {};
    const speakers = (result && result.speakers) || [];
    const utterances = (result && result.utterances) || [];
    const lines = [
      `# ${localizedMeetingTitle(meeting)}`,
      "",
      `${t("summary.meetingTime")}: ${formatMeetingClock(meeting.created_at || meeting.updated_at)}`,
      `${t("summary.attendees")}: ${speakers.map((s) => localizedSpeakerLabel(s)).join(", ") || "—"}`,
      "",
      `## ${t("summary.content")}`,
      localizedTestDataDescription(result) || localizedGeneratedText(summary.brief || "") || t("result.noSummary"),
      "",
    ];
    const bySpeaker = summary.by_speaker || {};
    Object.keys(bySpeaker).forEach((name) => {
      lines.push(`### ${name}`);
      lines.push(String(bySpeaker[name] || "").trim());
      lines.push("");
    });
    const actions = Array.isArray(summary.actions) ? summary.actions : [];
    if (actions.length) {
      lines.push(`## ${t("summary.actions")}`);
      actions.forEach((item) => lines.push(`- ${localizedGeneratedText(item)}`));
      lines.push("");
    }
    lines.push(`## ${t("transcript.title")}`);
    utterances.forEach((utt) => {
      lines.push(`- [${formatTranscriptTime(utt.t0)}] ${localizedSpeakerLabel(utt)}: ${String(utt.text || utt.source_text || "").trim()}`);
    });
    return lines.join("\n");
  }

  async function copySummary() {
    if (!state.result) {
      alert(t("summary.nothingYet"));
      return;
    }
    const text = buildSummaryExportText(state.result);
    try {
      await navigator.clipboard.writeText(text);
      setStatus(t("summary.copied"));
    } catch (err) {
      alert(t("summary.copyFailed", { error: err.message }));
    }
  }

  function downloadSummary() {
    if (!state.result) {
      alert(t("summary.nothingYet"));
      return;
    }
    const text = buildSummaryExportText(state.result);
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const title = localizedMeetingTitle(state.meeting || {}) || "meeting";
    a.href = url;
    a.download = `${title.replace(/[\\/:*?"<>|]+/g, "_")}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus(t("summary.downloaded"));
  }

  function renderTranscript(result) {
    const meta = result.transcript_meta || {};
    let utterances = result.utterances || [];
    if (meta.source === "live_recording") {
      utterances = mergeConsecutiveSpeakerUtterances(utterances);
    }
    const summary = result.summary || {};
    transcript.innerHTML = "";
    transcript.classList.toggle("show-translation", Boolean(state.showTranslation));

    if (state.transcriptView === "concise") {
      const bySpeaker = summary.by_speaker || {};
      const names = Object.keys(bySpeaker);
      if (!names.length && !summary.brief && !utterances.length) {
        transcript.innerHTML = `<div class="transcript-waiting">${escapeHtml(t("result.noSummary"))}</div>`;
        return;
      }
      if (summary.brief) {
        const brief = document.createElement("div");
        brief.className = "utt concise-brief";
        brief.innerHTML = `<div class="utt-copy"><div class="utt-text">${escapeHtml(localizedGeneratedText(summary.brief))}</div></div>`;
        transcript.appendChild(brief);
      }
      if (names.length) {
        names.forEach((name, idx) => {
          const row = document.createElement("div");
          row.className = "utt concise" + (idx % 2 ? " alt" : "");
          row.innerHTML = `
            <div><div class="who">${escapeHtml(name)}</div></div>
            <div class="utt-copy"><div class="utt-text">${escapeHtml(String(bySpeaker[name] || "").trim())}</div></div>
          `;
          transcript.appendChild(row);
        });
        return;
      }
      utterances.slice(0, 8).forEach((utt, idx) => {
        const text = String(utt.text || utt.source_text || "").trim();
        const short = text.length > 80 ? `${text.slice(0, 80)}…` : text;
        const identified = isIdentifiedSpeaker(utt);
        const row = document.createElement("div");
        row.className = "utt concise"
          + (idx % 2 ? " alt" : "")
          + (identified ? "" : " unidentified")
          + (utt.live_unidentified ? " live-bars" : "")
          + (utt.live_partial ? " partial" : "");
        row.innerHTML = `
          <div><div class="who">${speakerWhoHtml(utt)}</div></div>
          <div class="utt-copy"><div class="utt-text">${escapeHtml(short || t("result.noText"))}</div></div>
        `;
        transcript.appendChild(row);
      });
      return;
    }

    if (!utterances.length) {
      const waitingText = meta.source === "live_recording"
        ? liveWaitingText()
        : recognitionLastError && isTestMeeting()
          ? t("result.playbackError", { error: recognitionLastError })
          : t("result.playbackWaiting");
      transcript.innerHTML = `<div class="transcript-waiting">${waitingText}</div>`;
      return;
    }
    utterances.forEach((utt, idx) => {
      const similarity = Number(utt.voice_similarity);
      const voiceDecision = utt.speaker_decision === "same_voice"
        ? t("result.sameVoice", { score: Number.isFinite(similarity) ? `${Math.round(similarity * 100)}%` : "" })
        : utt.speaker_decision === "new_voice"
          ? t("result.newVoice")
          : utt.speaker_decision === "known_voiceprint"
            ? t("result.knownVoice", { score: Number.isFinite(similarity) ? `${Math.round(similarity * 100)}%` : "" })
            : "";
      const mainText = String(utt.text || "").trim();
      const sourceText = String(utt.source_text || "").trim();
      const displayText = mainText || sourceText || t("result.noText");
      const showSource = shouldShowSourceText(utt);
      const langBadge = sourceLanguageBadge(utt);
      const sourceBadge = sourceLanguageBadge(utt);
      const identified = isIdentifiedSpeaker(utt);
      const row = document.createElement("button");
      row.type = "button";
      row.className = "utt"
        + (idx % 2 ? " alt" : "")
        + (identified ? "" : " unidentified")
        + (utt.live_unidentified ? " live-bars" : "")
        + (utt.live_partial || utt.partial ? " partial" : "");
      row.innerHTML = `
        <div>
          <div class="who">${speakerWhoHtml(utt)}</div>
          ${identified && utt.role ? `<div class="role">${escapeHtml(utt.role)}</div>` : ""}
          <div class="meta">${formatTranscriptTime(utt.t0)}–${formatTranscriptTime(utt.t1)}${(utt.partial || utt.live_partial) ? ` · ${escapeHtml(t("recording.partialLabel"))}` : ""}${langBadge !== t("result.original") ? ` · ${escapeHtml(langBadge)}` : ""}${voiceDecision ? ` · ${escapeHtml(voiceDecision)}` : ""}</div>
        </div>
        <div class="utt-copy">
          <div class="utt-text">${escapeHtml(displayText)}</div>
          ${showSource ? `<div class="utt-source"><span>${escapeHtml(sourceBadge)}</span>${escapeHtml(sourceText)}</div>` : ""}
        </div>
      `;
      row.addEventListener("click", () => {
        if (!playback.src) return;
        playback.currentTime = Math.max(0, Number(utt.t0) || 0);
        playback.play().catch(() => {});
      });
      transcript.appendChild(row);
    });
  }

  function renderResult(payload) {
    const result = payload.result || payload;
    state.result = result;
    emptyState.classList.add("hidden");
    resultView.classList.remove("hidden");
    const meta = result.transcript_meta || {};
    const utterances = result.utterances || [];
    const speakers = result.speakers || [];
    resultMeta.innerHTML = `
      <span>${escapeHtml(localizedTranscriptSource(meta))}</span>
      <span>${escapeHtml(t("result.utteranceCount", { count: Number(meta.utterance_count == null ? utterances.length : meta.utterance_count) }))}</span>
      <span>${escapeHtml(t("result.speakerCount", { count: Number(meta.speaker_count == null ? speakers.length : meta.speaker_count) }))}</span>
    `;
    speakerRoster.innerHTML = speakers.map((speaker) => {
      const speakerLabel = localizedSpeakerLabel(speaker);
      return `
      <div class="speaker-chip">
        <span class="speaker-avatar">${escapeHtml(String(speaker.canonical_name || speakerLabel).slice(0, 1))}</span>
        <span><strong>${escapeHtml(speakerLabel)}</strong>${speaker.role ? `<small>${escapeHtml(speaker.role)}</small>` : ""}</span>
      </div>
    `;
    }).join("");
    renderSpeakerReview(result);
    renderSummaryPanel(result);
    renderProjectMemory(result.project_memory || {});
    renderTranscript(result);
  }

  function formatTranscriptTime(value) {
    const total = Math.max(0, Math.floor(Number(value) || 0));
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  }

  function configuredTranslationMode() {
    const asr = state.asr || {};
    if (asr.translation_mode) return asr.translation_mode;
    if (asr.translation_target === "zh-CN") return "en-to-zh";
    if (asr.translation_target === "en") return "zh-to-en";
    return "off";
  }

  function localeFollowTranslationMode() {
    return i18n.getLocale() === "en-US" ? "zh-to-en" : "en-to-zh";
  }

  function requestedTranslationMode() {
    return state.showTranslation ? "follow-locale" : "off";
  }

  function liveFollowLocaleActive() {
    return Boolean(
      state.liveFollowLocale
      && (isRecordingActive() || liveCaptureActive || liveUtterances.length > 0),
    );
  }

  function translationEnabled() {
    return state.showTranslation || configuredTranslationMode() !== "off" || liveFollowLocaleActive();
  }

  function shouldShowSourceText(utterance) {
    const sourceText = String(utterance.source_text || "").trim();
    const mainText = String(utterance.text || "").trim();
    if (!sourceText || sourceText === mainText) return false;
    return Boolean(state.showTranslation || liveFollowLocaleActive());
  }

  function sourceLanguageBadge(utterance) {
    const language = String(utterance.language || "").toLowerCase();
    if (language.includes("zh") || language.includes("yue")) return "ZH";
    if (language.includes("en")) return "EN";
    return t("result.original");
  }

  function liveTranslationTargets() {
    return new Set(
      liveUtterances.map((utterance) => utterance.translation_target).filter(Boolean),
    );
  }

  function liveRecordingLabel() {
    if (liveFollowLocaleActive()) {
      return localeFollowTranslationMode() === "zh-to-en"
        ? t("recording.liveZhEn")
        : t("recording.liveEnZh");
    }
    const asr = state.asr || {};
    if (String(asr.language || "").toLowerCase() === "auto") {
      return t("recording.liveAuto");
    }
    const targets = liveTranslationTargets();
    if (targets.has("zh-CN") && targets.has("en")) return t("recording.liveBilingual");
    if (targets.has("zh-CN")) return t("recording.liveEnZh");
    if (targets.has("en")) return t("recording.liveZhEn");
    const mode = configuredTranslationMode();
    if (mode === "bilingual") return t("recording.liveBilingual");
    if (mode === "en-to-zh") return t("recording.liveEnZh");
    if (mode === "zh-to-en") return t("recording.liveZhEn");
    return t("recording.liveTranscript");
  }

  function liveWaitingText() {
    if (liveFollowLocaleActive()) {
      return localeFollowTranslationMode() === "zh-to-en"
        ? t("recording.zhEnWaiting")
        : t("recording.enZhWaiting");
    }
    if (isLiveStreamMode()) return t("recording.streamWaiting");
    const asr = state.asr || {};
    if (String(asr.language || "").toLowerCase() === "auto") {
      return t("recording.autoWaiting");
    }
    const mode = configuredTranslationMode();
    if (mode === "bilingual") return t("recording.bilingualWaiting");
    if (mode === "en-to-zh") return t("recording.enZhWaiting");
    if (mode === "zh-to-en") return t("recording.zhEnWaiting");
    return t("recording.transcriptWaiting");
  }

  function isRecordingActive() {
    return Boolean(mediaRecorder && mediaRecorder.state === "recording");
  }

  function syncAsrControlDisabled() {
    const disabled = isRecordingActive();
    if (liveAsrModeSelect) liveAsrModeSelect.disabled = disabled;
    if (asrModelSelect) asrModelSelect.disabled = disabled || asrModelSwitchPromise !== null;
    if (toggleTranslation) toggleTranslation.disabled = disabled;
  }

  function asrModelLabel(model) {
    const label = t(model.label_key || model.id);
    return model.deployed ? label : `${label} ${t("asrModel.notDeployed")}`;
  }

  function renderAsrModelSelect(currentModelId) {
    if (!asrModelSelect) return;
    const models = state.asrModels || [];
    asrModelSelect.innerHTML = "";
    const groups = {
      streaming: document.createElement("optgroup"),
      chunk: document.createElement("optgroup"),
    };
    groups.streaming.label = t("asrModel.groupStreaming");
    groups.chunk.label = t("asrModel.groupChunk");
    models.forEach((model) => {
      const option = document.createElement("option");
      option.value = model.id;
      option.textContent = asrModelLabel(model);
      option.title = t(model.hint_key || model.label_key || model.id);
      option.disabled = !model.deployed;
      const group = groups[model.group] || groups.chunk;
      group.appendChild(option);
    });
    Object.values(groups).forEach((group) => {
      if (group.children.length) asrModelSelect.appendChild(group);
    });
    const active = currentModelId || (state.asr && state.asr.model) || "";
    const saved = localStorage.getItem(LIVE_ASR_MODEL_KEY) || "";
    const preferred = [active, saved, "B_80M", "A_14M"].find(
      (id) => models.some((item) => item.id === id && item.deployed),
    );
    if (preferred) asrModelSelect.value = preferred;
    syncAsrControlDisabled();
  }

  async function applyAsrModelSelection(modelId, { persist = true } = {}) {
    if (!modelId || asrModelSwitchPromise) return state.asr;
    const target = (state.asrModels || []).find((item) => item.id === modelId);
    if (!target || !target.deployed) return state.asr;
    if (state.asr && state.asr.model === modelId) {
      if (persist) localStorage.setItem(LIVE_ASR_MODEL_KEY, modelId);
      renderAsrModelSelect(modelId);
      syncLiveAsrModeSelect();
      return state.asr;
    }
    asrModelSwitchPromise = (async () => {
      syncAsrControlDisabled();
      try {
        const data = await api("/api/asr/model", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: modelId }),
        });
        state.asr = data.asr || null;
        if (persist) localStorage.setItem(LIVE_ASR_MODEL_KEY, modelId);
        renderAsrModelSelect(modelId);
        syncLiveAsrModeSelect();
        return state.asr;
      } finally {
        asrModelSwitchPromise = null;
        syncAsrControlDisabled();
      }
    })();
    return asrModelSwitchPromise;
  }

  async function loadAsrCatalogAndApply() {
    try {
      const data = await api("/api/asr/models");
      state.asrModels = data.models || [];
      state.asr = state.asr || null;
      const current = (state.asr && state.asr.model) || data.current || "";
      renderAsrModelSelect(current);
      const saved = localStorage.getItem(LIVE_ASR_MODEL_KEY);
      if (saved && saved !== current) {
        const savedModel = state.asrModels.find((item) => item.id === saved && item.deployed);
        if (savedModel) {
          await applyAsrModelSelection(saved, { persist: true });
          return;
        }
      }
      if (!saved && current === "A_14M") {
        const b80 = state.asrModels.find((item) => item.id === "B_80M" && item.deployed);
        if (b80) {
          await applyAsrModelSelection("B_80M", { persist: true });
          return;
        }
      }
      syncLiveAsrModeSelect();
    } catch (err) {
      console.error(err);
      if (asrModelSelect) {
        asrModelSelect.innerHTML = `<option value="">${escapeHtml(t("recognition.asrUnavailable"))}</option>`;
      }
    }
  }

  async function loadAsrInfo() {
    try {
      const health = await api("/api/health");
      state.asr = health.asr || null;
    } catch (_) {
      state.asr = null;
    }
    renderAsrModelSelect(state.asr && state.asr.model);
    syncLiveAsrModeSelect();
  }

  function supportsLiveStream() {
    return Boolean(state.asr && state.asr.live_stream !== false);
  }

  function supportsLiveChunk() {
    return Boolean(!state.asr || state.asr.live_chunk !== false);
  }

  function syncLiveAsrModeSelect() {
    if (!liveAsrModeSelect) return;
    const streamOption = liveAsrModeSelect.querySelector('option[value="stream"]');
    const chunkOption = liveAsrModeSelect.querySelector('option[value="chunk"]');
    const streamOk = supportsLiveStream();
    const chunkOk = supportsLiveChunk();
    if (streamOption) streamOption.disabled = !streamOk;
    if (chunkOption) chunkOption.disabled = !chunkOk;
    const saved = localStorage.getItem(LIVE_ASR_MODE_KEY);
    let mode = saved || (streamOk ? "stream" : "chunk");
    if (mode === "stream" && !streamOk) mode = "chunk";
    if (mode === "chunk" && !chunkOk && streamOk) mode = "stream";
    state.liveAsrMode = mode;
    liveAsrModeSelect.value = mode;
    localStorage.setItem(LIVE_ASR_MODE_KEY, mode);
  }

  function isLiveStreamMode() {
    return state.liveAsrMode === "stream" && supportsLiveStream();
  }

  function isTestMeeting() {
    return Boolean(state.meeting && state.meeting.source === "test_data");
  }

  function recognitionRunStatusLabel(run) {
    if (!run) return t("recognition.waitingPlayback");
    if (run.asr_status === "failed") return t("recognition.transcriptFailed");
    if (run.transcript_ready) {
      if (run.identity_status === "completed") return t("recognition.allCompleted");
      if (run.identity_status === "failed") return t("recognition.personFailed");
      if (run.identity_status === "unavailable") return t("recognition.personUnavailable");
    }
    if (run.asr_status === "completed") return t("recognition.voiceprintRunning");
    if (run.asr_status === "running") return t("recognition.running");
    return t("recognition.waitingPlayback");
  }

  function stopRecognitionPolling() {
    if (recognitionPollTimer) {
      clearInterval(recognitionPollTimer);
      recognitionPollTimer = null;
    }
  }

  function startRecognitionPolling() {
    stopRecognitionPolling();
    recognitionPollTimer = setInterval(() => {
      if (!playback.paused) {
        requestRecognitionAdvance(false);
      } else {
        recognitionTick(false);
      }
    }, 400);
  }

  async function requestRecognitionAdvance(forceHistory = true) {
    if (!isTestMeeting() || !activeRecognitionRun) return null;
    if (recognitionAdvancePromise) return recognitionAdvancePromise;
    recognitionAdvancePromise = (async () => {
      try {
        const base = `/api/test-data/meetings/${encodeURIComponent(state.meeting.meeting_id)}/recognition-runs/${encodeURIComponent(activeRecognitionRun.run_id)}`;
        const data = await api(`${base}/advance`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playback_time_s: playback.currentTime || 0 }),
        });
        recognitionLastError = "";
        activeRecognitionRun = data.run;
        renderRecognitionRun(data.run);
        const processedChanged = Number(data.run.processed_count || 0) !== recognitionLastProcessed;
        if (data.run.status !== recognitionLastStatus || processedChanged) {
          recognitionLastStatus = data.run.status;
          recognitionLastProcessed = Number(data.run.processed_count || 0);
          if (data.run.status === "completed" || data.run.status === "failed") {
            if (recognitionPlaybackEnded) stopRecognitionPolling();
          }
        }
        const now = Date.now();
        if (forceHistory || now - lastRecognitionHistoryAt > 2000) {
          lastRecognitionHistoryAt = now;
          await loadRecognitionHistory();
        }
        return data.run;
      } catch (err) {
        recognitionLastError = err.message || String(err);
        recognitionTopStatus.textContent = t("recognition.connectionFailed");
        recognitionRunInfo.textContent = recognitionLastError;
        if (state.result && state.result.transcript_meta) {
          renderTranscript(state.result);
        }
        throw err;
      } finally {
        recognitionAdvancePromise = null;
      }
    })();
    return recognitionAdvancePromise;
  }

  async function recognitionTick(advancePlayback = false) {
    if (!isTestMeeting() || !activeRecognitionRun) return;
    if (advancePlayback) {
      await requestRecognitionAdvance(true);
      return;
    }
    if (recognitionBusy) return;
    recognitionBusy = true;
    try {
      const base = `/api/test-data/meetings/${encodeURIComponent(state.meeting.meeting_id)}/recognition-runs/${encodeURIComponent(activeRecognitionRun.run_id)}`;
      const data = await api(base);
      recognitionLastError = "";
      activeRecognitionRun = data.run;
      renderRecognitionRun(data.run);
      const processedChanged = Number(data.run.processed_count || 0) !== recognitionLastProcessed;
      if (data.run.status !== recognitionLastStatus || processedChanged) {
        recognitionLastStatus = data.run.status;
        recognitionLastProcessed = Number(data.run.processed_count || 0);
        if (data.run.status === "completed" || data.run.status === "failed") {
          if (recognitionPlaybackEnded) stopRecognitionPolling();
        }
      }
      const now = Date.now();
      if (now - lastRecognitionHistoryAt > 2000) {
        lastRecognitionHistoryAt = now;
        await loadRecognitionHistory();
      }
    } catch (err) {
      recognitionLastError = err.message || String(err);
      recognitionTopStatus.textContent = t("recognition.connectionFailed");
      recognitionRunInfo.textContent = recognitionLastError;
      if (state.result && state.result.transcript_meta) {
        renderTranscript(state.result);
      }
    } finally {
      recognitionBusy = false;
    }
  }

  function renderRecognitionRun(run, historical = false) {
    if (!run || !state.testBaseResult) return;
    const speakers = (run.speakers || []).map((speaker) => ({
      ...speaker,
      display_name: speaker.display_label || speaker.canonical_name || speaker.original_name,
    }));
    const allUtterances = run.utterances || [];
    const utterances = allUtterances.map((utterance) => ({
      ...utterance,
      identity_status: utterance.identity_status || "pending",
    }));
    const result = {
      ...state.testBaseResult,
      speakers,
      utterances,
      transcript_meta: {
        source: "playback_asr",
        source_label: t("recognition.runSource", {
          kind: historical ? t("recognition.historical") : t("recognition.current"),
          number: run.run_number || "—",
          model: run.model || "ASR",
        }),
        utterance_count: utterances.length,
        speaker_count: speakers.length,
      },
    };
    renderResult({ result });
    const visualStatus = run.asr_status === "failed"
      ? "failed"
      : run.transcript_ready
        ? "completed"
        : run.status || "waiting";
    liveRecognition.classList.remove("hidden", "waiting", "running", "completed", "failed");
    liveRecognition.classList.add(visualStatus);
    recognitionStage.textContent = historical
      ? t("recognition.historyStage", { status: recognitionRunStatusLabel(run) })
      : recognitionRunStatusLabel(run);
    const identityWorker = run.identity_execution === "process" ? t("recognition.identityProcess") : t("recognition.identityBackground");
    const modeLabel = run.recognition_mode === "playback_online" ? t("recognition.onlineMode") : t("recognition.batchMode");
    const asrModeLabel = run.asr_mode === "stream"
      ? t("recognition.asrModeStream")
      : t("recognition.asrModeChunk");
    recognitionRunInfo.textContent = t("recognition.runInfo", {
      mode: modeLabel,
      number: run.run_number || "—",
      asrMode: asrModeLabel,
      asrDone: run.processed_count || 0,
      total: run.total_count || 0,
      worker: identityWorker,
      identityDone: run.identity_processed_count || 0,
      rows: utterances.length,
      model: run.model || "ASR",
    });
    const readyCount = ["failed", "unavailable"].includes(run.identity_status)
      ? Number(run.processed_count || 0)
      : Number(run.identity_processed_count || 0);
    const progress = run.total_count ? Math.round((readyCount / run.total_count) * 100) : 0;
    recognitionProgressBar.style.width = `${progress}%`;
    recognitionTopStatus.textContent = recognitionRunStatusLabel(run);
    if (run.error) recognitionRunInfo.textContent = run.error;
    if (meetingQueryButton && meetingQueryOutput) {
      const queryReady = Boolean(
        isTestMeeting() && run.status === "completed" && run.transcript_ready,
      );
      const nextRunId = queryReady ? String(run.run_id || "") : "";
      const changedRun = meetingQueryButton.dataset.runId !== nextRunId;
      meetingQueryButton.dataset.runId = nextRunId;
      meetingQueryButton.disabled = !queryReady;
      if (changedRun || meetingQueryOutput.dataset.state !== "answered") {
        meetingQueryOutput.dataset.state = queryReady ? "ready" : "waiting";
        meetingQueryOutput.textContent = queryReady
          ? "本次识别结果已就绪，可以查询阶段、风险和下一步。"
          : "请等待本次会议完成转写与声纹分析。";
      }
    }
  }

  async function loadRecognitionHistory() {
    if (!isTestMeeting()) return;
    try {
      const data = await api(`/api/test-data/meetings/${encodeURIComponent(state.meeting.meeting_id)}/recognition-runs`);
      const runs = data.runs || [];
      recognitionHistoryList.innerHTML = "";
      if (!runs.length) {
        recognitionHistoryList.innerHTML = `<div class="transcript-waiting">${escapeHtml(t("recognition.noHistory"))}</div>`;
        return;
      }
      runs.forEach((run) => {
        const modeLabel = run.recognition_mode === "playback_online" ? t("recognition.onlineShort") : t("recognition.batchShort");
        const identityWorker = run.identity_execution === "process" ? t("recognition.identityProcess") : t("recognition.identityBackground");
        const row = document.createElement("button");
        row.type = "button";
        row.className = "recognition-run-row";
        row.innerHTML = `
          <strong>${escapeHtml(t("recognition.historyRow", { mode: modeLabel, number: Number(run.run_number || 0), model: run.model || "ASR" }))}</strong>
          <span>${escapeHtml(t("recognition.historyMeta", { time: fmtTime(run.created_at), asrDone: Number(run.processed_count || 0), total: Number(run.total_count || 0), worker: identityWorker, identityDone: Number(run.identity_processed_count || 0) }))}</span>
          <span class="badge ${run.asr_status === "failed" ? "failed" : run.transcript_ready ? "ready" : "processing"}">${escapeHtml(recognitionRunStatusLabel(run))}</span>
        `;
        row.addEventListener("click", async () => {
          const detail = await api(`/api/test-data/meetings/${encodeURIComponent(state.meeting.meeting_id)}/recognition-runs/${encodeURIComponent(run.run_id)}`);
          renderRecognitionRun(detail.run, true);
        });
        recognitionHistoryList.appendChild(row);
      });
    } catch (err) {
      recognitionHistoryList.innerHTML = `<div class="transcript-waiting">${escapeHtml(t("recognition.historyReadFailed", { error: err.message }))}</div>`;
    }
  }

  async function createRecognitionRun() {
    if (!isTestMeeting()) return;
    // A quick replay or duplicate media `play` event must still create only one
    // persisted recognition run for that playback.
    if (recognitionCreatePromise) return recognitionCreatePromise;
    recognitionCreatePromise = (async () => {
      if (meetingQueryButton && meetingQueryOutput) {
        meetingQueryButton.disabled = true;
        meetingQueryButton.dataset.runId = "";
        meetingQueryOutput.dataset.state = "waiting";
        meetingQueryOutput.textContent = "正在创建新的会议识别任务，请稍候。";
      }
      recognitionTopStatus.textContent = t("recognition.starting");
      const data = await api(
        `/api/test-data/meetings/${encodeURIComponent(state.meeting.meeting_id)}/recognition-runs`,
        { method: "POST" },
      );
      activeRecognitionRun = data.run;
      recognitionPlaybackEnded = false;
      recognitionRestartRequested = false;
      recognitionLastStatus = data.run.status;
      recognitionLastProcessed = Number(data.run.processed_count || 0);
      lastPlaybackTime = playback.currentTime || 0;
      renderRecognitionRun(data.run);
      startRecognitionPolling();
      await loadRecognitionHistory();
      await recognitionTick(true);
      return data.run;
    })();
    try {
      return await recognitionCreatePromise;
    } finally {
      recognitionCreatePromise = null;
    }
  }

  async function handlePlaybackPlay() {
    if (!isTestMeeting()) return;
    const finished = activeRecognitionRun && ["completed", "failed"].includes(activeRecognitionRun.status);
    if (!activeRecognitionRun || recognitionPlaybackEnded || recognitionRestartRequested || finished) {
      try {
        await createRecognitionRun();
      } catch (err) {
        recognitionTopStatus.textContent = t("recognition.startFailed");
        recognitionRunInfo.textContent = err.message;
      }
      return;
    }
    startRecognitionPolling();
    await recognitionTick(true);
  }

  function speakerReasonText(item) {
    if (item.reason === "new_person") return t("speakerReview.reasonNew");
    if (item.reason === "low_confidence") return t("speakerReview.reasonLow");
    return t("speakerReview.reasonHigh");
  }

  function selfDisplayName() {
    return (
      localStorage.getItem(VOICEPRINT_SELF_NAME_KEY)
      || (voiceprintEnrollName && voiceprintEnrollName.value.trim())
      || DEFAULT_SELF_DISPLAY_NAME
    );
  }

  function ensureSelfPersonId() {
    let personId = localStorage.getItem(VOICEPRINT_SELF_PERSON_KEY);
    if (!personId) {
      personId = `person_${(globalThis.crypto && crypto.randomUUID
        ? crypto.randomUUID()
        : `local-${Date.now()}`).replace(/-/g, "").slice(0, 10)}`;
      localStorage.setItem(VOICEPRINT_SELF_PERSON_KEY, personId);
    }
    return personId;
  }

  function syncVoiceprintEnrollPanel() {
    if (!voiceprintEnroll) return;
    const visible = Boolean(lastRecordingBlob);
    voiceprintEnroll.classList.toggle("hidden", !visible);
    if (voiceprintEnrollName) {
      const savedName = localStorage.getItem(VOICEPRINT_SELF_NAME_KEY);
      if (savedName) voiceprintEnrollName.value = savedName;
      else if (!voiceprintEnrollName.value.trim()) voiceprintEnrollName.value = DEFAULT_SELF_DISPLAY_NAME;
    }
    if (btnEnrollVoiceprint) btnEnrollVoiceprint.disabled = !visible;
  }

  async function enrollVoiceprint() {
    if (!lastRecordingBlob) {
      alert(t("voiceprintEnroll.noAudio"));
      return;
    }
    const displayName = (voiceprintEnrollName && voiceprintEnrollName.value.trim()) || DEFAULT_SELF_DISPLAY_NAME;
    if (!displayName) {
      alert(t("voiceprintEnroll.enterName"));
      return;
    }
    localStorage.setItem(VOICEPRINT_SELF_NAME_KEY, displayName);
    const personId = ensureSelfPersonId();
    const previousLabel = btnEnrollVoiceprint ? btnEnrollVoiceprint.textContent : "";
    if (btnEnrollVoiceprint) {
      btnEnrollVoiceprint.disabled = true;
      btnEnrollVoiceprint.textContent = t("voiceprintEnroll.submitting");
    }
    try {
      const audio_base64 = await blobToBase64(lastRecordingBlob);
      const body = {
        display_name: displayName,
        audio_base64,
        filename: lastRecordingFilename,
        person_id: personId,
        meeting_id: lastRecordingMeetingId || null,
        idempotency_key: `enroll:${personId}:${lastRecordingMeetingId || Date.now()}`,
      };
      const data = await api("/api/voiceprints/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const samples = Number((data.person && (data.person.sample_count || data.person.hit_count)) || 1);
      setStatus(t("voiceprintEnroll.done", { name: displayName }));
      if (btnEnrollVoiceprint) {
        btnEnrollVoiceprint.textContent = t("voiceprintEnroll.already", { name: displayName, samples });
      }
      await loadKnowledge();
    } catch (err) {
      console.error(err);
      alert(t("voiceprintEnroll.failed", { error: err.message }));
      if (btnEnrollVoiceprint) btnEnrollVoiceprint.textContent = previousLabel || t("voiceprintEnroll.submit");
    } finally {
      if (btnEnrollVoiceprint && btnEnrollVoiceprint.textContent === t("voiceprintEnroll.submitting")) {
        btnEnrollVoiceprint.textContent = previousLabel || t("voiceprintEnroll.submit");
      }
      syncVoiceprintEnrollPanel();
    }
  }

  function renderSpeakerReview(result) {
    const review = result.speaker_review || {};
    const items = review.items || [];
    const confirmation = result.confirmation || {};
    if (!items.length || !confirmation.proposal_id) {
      speakerReview.classList.add("hidden");
      return;
    }

    speakerReview.classList.remove("hidden");
    const enhanced = review.status === "enhanced" || confirmation.status === "enhanced";
    const required = Number(review.required_count || 0);
    speakerReviewBadge.textContent = enhanced
      ? t("speakerReview.enhanced")
      : required
        ? t("speakerReview.needReview", { count: required })
        : t("speakerReview.allPreselected");
    speakerReviewBadge.className = `review-badge ${enhanced ? "done" : required ? "attention" : ""}`;
    speakerReviewHint.textContent = enhanced
      ? t("speakerReview.enhancedHint", { speakers: review.speaker_count || items.length, corrections: review.correction_count || 0 })
      : required
        ? t("speakerReview.requiredHint", { preaccepted: review.preaccepted_count || 0, required })
        : t("speakerReview.preselectedHint", { count: items.length });

    const candidates = review.candidates || [];
    speakerReviewList.innerHTML = items.map((item, itemIndex) => {
      const confidence = Math.round(Number(item.confidence || 0) * 100);
      const currentId = String(item.speaker_id || "");
      const itemLabel = localizedSpeakerLabel(item);
      const candidateOptions = candidates
        .filter((candidate) => String(candidate.person_id) !== currentId)
        .map((candidate) => `<option value="link:${escapeHtml(candidate.person_id)}">${escapeHtml(t("speakerReview.linkTo", { name: localizedSpeakerLabel(candidate) }))}</option>`)
        .join("");
      const precedingLocalOptions = items
        .slice(0, itemIndex)
        .map((previous) => `<option value="same:${escapeHtml(previous.local_id)}">${escapeHtml(t("speakerReview.sameAs", { name: localizedSpeakerLabel(previous) }))}</option>`)
        .join("");
      const defaultResolution = item.suggested_resolution === "new" ? "new" : "accept";
      const defaultNewName = defaultResolution === "new" ? selfDisplayName() : (itemLabel || "");
      return `
        <div class="speaker-review-row ${item.needs_review ? "needs-review" : ""}" data-local-id="${escapeHtml(item.local_id || "")}">
          <div class="speaker-review-person">
            <strong>${escapeHtml(itemLabel || t("result.unknownPerson"))}</strong>
            <span>${escapeHtml(item.local_id || "")} · ${confidence}%</span>
            <small>${speakerReasonText(item)}</small>
          </div>
          <select class="speaker-resolution" aria-label="${escapeHtml(t("speakerReview.aria", { name: itemLabel }))}">
            <option value="accept" ${defaultResolution === "accept" ? "selected" : ""}>${escapeHtml(t("speakerReview.keep", { name: itemLabel || t("speakerReview.currentPerson") }))}</option>
            ${candidateOptions}
            ${precedingLocalOptions}
            <option value="new" ${defaultResolution === "new" ? "selected" : ""}>${escapeHtml(t("speakerReview.newPerson"))}</option>
            <option value="skip">${escapeHtml(t("speakerReview.skip"))}</option>
          </select>
          <input class="speaker-new-name ${defaultResolution === "new" ? "" : "hidden"}" value="${escapeHtml(defaultNewName)}" placeholder="${escapeHtml(t("speakerReview.namePlaceholder"))}" />
        </div>`;
    }).join("");

    speakerReviewActions.classList.toggle("hidden", enhanced);
    btnConfirmSpeakers.disabled = false;
    btnConfirmSpeakers.textContent = t("speakerReview.confirmCount", { count: items.length });
    speakerReviewList.querySelectorAll(".speaker-resolution").forEach((select) => {
      select.disabled = enhanced;
      select.addEventListener("change", () => {
        const row = select.closest(".speaker-review-row");
        row.querySelector(".speaker-new-name").classList.toggle("hidden", select.value !== "new");
      });
    });
    speakerReviewList.querySelectorAll(".speaker-new-name").forEach((input) => {
      input.disabled = enhanced;
    });
  }

  async function confirmSpeakers() {
    if (!state.meeting || !state.result) return;
    const proposalId = state.result.confirmation && state.result.confirmation.proposal_id;
    if (!proposalId) {
      alert(t("speakerReview.noProposal"));
      return;
    }
    const assignments = [];
    for (const row of speakerReviewList.querySelectorAll(".speaker-review-row")) {
      const select = row.querySelector(".speaker-resolution");
      const value = select.value;
      const assignment = { local_id: row.dataset.localId, resolution: value };
      if (value.startsWith("link:")) {
        assignment.resolution = "link";
        assignment.person_id = value.slice(5);
      } else if (value.startsWith("same:")) {
        assignment.resolution = "same";
        assignment.source_local_id = value.slice(5);
      } else if (value === "new") {
        assignment.display_name = row.querySelector(".speaker-new-name").value.trim();
        if (!assignment.display_name) {
          alert(t("speakerReview.enterName", { id: row.dataset.localId }));
          return;
        }
      }
      assignments.push(assignment);
    }

    btnConfirmSpeakers.disabled = true;
    btnConfirmSpeakers.textContent = t("speakerReview.confirming");
    try {
      const data = await api(`/api/meetings/${state.meeting.meeting_id}/speakers/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposal_id: proposalId,
          assignments,
          actor: "local-reviewer",
          note: t("speakerReview.confirmNote"),
        }),
      });
      state.meeting = data.meeting || state.meeting;
      renderResult(data);
      setStatus(t("speakerReview.confirmed"));
      await loadTree();
    } catch (err) {
      alert(t("speakerReview.confirmFailed", { error: err.message }));
      btnConfirmSpeakers.disabled = false;
      btnConfirmSpeakers.textContent = t("speakerReview.confirmEnhance");
    }
  }

  function drawGraph(graph) {
    const nodes = graph.nodes || [];
    const edges = graph.edges || [];
    const W = 640;
    const H = 360;
    graphSvg.innerHTML = "";
    const people = nodes.filter((n) => n.type === "person");
    const sessions = nodes.filter((n) => n.type === "session");
    const pos = {};
    people.forEach((n, i) => {
      const angle = (Math.PI * 2 * i) / Math.max(people.length, 1) - Math.PI / 2;
      pos[n.id] = { x: W * 0.36 + Math.cos(angle) * 100, y: H * 0.48 + Math.sin(angle) * 90 };
    });
    sessions.forEach((n, i) => {
      pos[n.id] = { x: W * 0.78, y: 70 + i * 58 };
    });
    edges.forEach((e) => {
      const a = pos[e.source];
      const b = pos[e.target];
      if (!a || !b) return;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", a.x);
      line.setAttribute("y1", a.y);
      line.setAttribute("x2", b.x);
      line.setAttribute("y2", b.y);
      line.setAttribute("stroke", e.type === "co_present" ? "#0f6a4f" : "rgba(26,31,28,0.25)");
      line.setAttribute("stroke-width", String(Math.min(5, 1 + (e.weight || 1))));
      graphSvg.appendChild(line);
    });
    nodes.forEach((n) => {
      const p = pos[n.id];
      if (!p) return;
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", p.x);
      circle.setAttribute("cy", p.y);
      circle.setAttribute("r", n.type === "session" ? 14 : 22);
      circle.setAttribute("fill", n.type === "session" ? "#c45c26" : "#0f6a4f");
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", p.x);
      text.setAttribute("y", p.y + (n.type === "session" ? 30 : 38));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#1a1f1c");
      text.setAttribute("font-size", "13");
      text.setAttribute("font-family", "IBM Plex Sans, sans-serif");
      text.textContent = n.type === "session"
        ? t("graph.sessionNode", { id: String(n.id || "").slice(-6) })
        : localizedSpeakerLabel({ display_name: n.label || n.id });
      g.appendChild(circle);
      g.appendChild(text);
      graphSvg.appendChild(g);
    });
    graphLegend.textContent = nodes.length
      ? t("graph.legend", { people: people.length, sessions: sessions.length })
      : t("graph.empty");
  }

  function renderKnowledge(data) {
    const evidence = data.evidence || {};
    const embed = data.speaker_embed || {};
    const stats = $("knowledgeStats");
    if (stats) {
      const cards = [
        [t("knowledge.confirmedSamples"), evidence.confirmed_samples ?? 0],
        [t("knowledge.people"), evidence.person_count ?? 0],
        [t("knowledge.coPresentEdges"), evidence.co_present_edges ?? 0],
        [t("knowledge.voiceprintBackend"), embed.model_present ? (embed.mode || "sherpa") : t("common.unavailable")],
      ];
      stats.innerHTML = cards
        .map(
          ([k, v]) =>
            `<div class="knowledge-stat"><div class="k">${k}</div><div class="v">${v}</div></div>`,
        )
        .join("");
    }

    const table = $("voiceprintTable");
    const people = data.voiceprints || [];
    if (table) {
      if (!people.length) {
        table.innerHTML = `<div class="side-empty">${escapeHtml(t("knowledge.noVoiceprints"))}</div>`;
      } else {
        table.innerHTML = `
          <table class="knowledge-table">
            <thead><tr><th>${escapeHtml(t("knowledge.table.name"))}</th><th>${escapeHtml(t("knowledge.table.samples"))}</th><th>${escapeHtml(t("knowledge.table.prototypes"))}</th><th>${escapeHtml(t("knowledge.table.hits"))}</th><th>${escapeHtml(t("knowledge.table.dimensions"))}</th></tr></thead>
            <tbody>
              ${people
                .map(
                  (p) => `<tr>
                    <td>${escapeHtml(localizedSpeakerLabel(p))}</td>
                    <td>${p.sample_count ?? 0}</td>
                    <td>${p.prototype_count ?? 0}</td>
                    <td>${p.hit_count ?? 0}</td>
                    <td>${p.embedding_dim ?? "—"}</td>
                  </tr>`,
                )
                .join("")}
            </tbody>
          </table>`;
      }
    }

    const active = data.active_adapter || {};
    const params = active.params || {};
    const adapterPanel = $("adapterPanel");
    if (adapterPanel) {
      adapterPanel.innerHTML = [
        ["adapter_id", active.adapter_id || "—"],
        ["kind", params.adapter_kind || "threshold"],
        ["match_threshold", params.match_threshold ?? "—"],
        ["status", active.status || "—"],
        ["LoRA", params.lora_weights || t("common.none")],
      ]
        .map(
          ([k, v]) =>
            `<div class="row"><span>${k}</span><span>${v}</span></div>`,
        )
        .join("");
    }

    const candList = $("candidateList");
    const cands = data.candidates || [];
    if (candList) {
      if (!cands.length) {
        candList.innerHTML = `<div class="side-empty">${escapeHtml(t("knowledge.noCandidates"))}</div>`;
      } else {
        candList.innerHTML = cands
          .map((c) => {
            const p = c.params || {};
            return `<div class="candidate-item">
              <strong>${c.adapter_id}</strong>
              <span>${c.status} · ${p.adapter_kind || "threshold"} · thr=${p.match_threshold ?? "—"}</span>
            </div>`;
          })
          .join("");
      }
    }
    updateIcanRuntimeCards({}, data);
  }

  function renderGmaDemoReport(report, errorText) {
    const box = $("gmaDemoResult");
    if (!box) return;
    box.hidden = false;
    if (errorText) {
      box.innerHTML = `<div class="gma-demo-step fail"><span class="gma-demo-mark">FAIL</span><div><strong>Demo did not complete</strong><small>${escapeHtml(errorText)}</small></div></div>`;
      return;
    }
    const steps = report.steps || [];
    const after = report.after || {};
    box.innerHTML = steps
      .map((step) => {
        const counts = step.counts
          ? `People ${step.counts.people} · samples ${step.counts.samples} · graph ${step.counts.graph_nodes}/${step.counts.graph_edges}`
          : step.matched_person_id
            ? `Matched ${step.matched_person_id}`
            : step.adapter_id
              ? `Checked and ready`
              : "";
        return `<div class="gma-demo-step ${step.ok ? "ok" : "fail"}">
          <span class="gma-demo-mark">${step.ok ? "OK" : "FAIL"}</span>
          <div><strong>${escapeHtml(String(step.id || ""))}. ${escapeHtml(step.title || "")}</strong><small>${escapeHtml(counts)}</small></div>
        </div>`;
      })
      .join("");
    box.insertAdjacentHTML(
      "beforeend",
      `<div class="gma-demo-step ok"><span class="gma-demo-mark">DONE</span><div><strong>${escapeHtml(report.person_name || "")} · ${after.samples || 0} samples</strong><small>${escapeHtml(report.note || "")}</small></div></div>`,
    );
  }

  async function runGettingMoreAccurateDemo() {
    const button = $("btnRunGmaDemo");
    if (!button) return;
    button.disabled = true;
    button.textContent = "Running the two-meeting demo…";
    renderGmaDemoReport({}, "Processing");
    try {
      const report = await api("/api/demo/getting-more-accurate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ include_slow_path: true, person_name: "Jordan" }),
      });
      renderGmaDemoReport(report);
      await refreshGraphView();
      await loadTree();
    } catch (error) {
      renderGmaDemoReport({}, error.message || String(error));
    } finally {
      button.disabled = false;
      button.textContent = "Run the full loop";
    }
  }

  async function refreshGraphView() {
    const [graph, knowledge] = await Promise.all([
      api("/api/graph"),
      api("/api/knowledge"),
    ]);
    drawGraph(graph);
    renderKnowledge(knowledge);
    const g = knowledge.graph || {};
    const people = (graph.nodes || []).filter((n) => n.type === "person").length;
    const sessions = (graph.nodes || []).filter((n) => n.type === "session").length;
    if (graphLegend) {
      graphLegend.textContent = (graph.nodes || []).length
        ? t("graph.legendDetailed", { people, sessions, edges: g.edges ?? 0, coPresent: g.co_present_edges ?? 0 })
        : t("graph.empty");
    }
  }

  function percent(value) {
    return value == null || Number.isNaN(Number(value)) ? null : Number(value) * 100;
  }

  function percentText(value, digits = 1) {
    const result = percent(value);
    return result == null ? "—" : `${result.toFixed(digits)}%`;
  }

  function metricBar(label, value, detail, tone = "green") {
    const numeric = percent(value);
    const width = numeric == null ? 0 : Math.max(0, Math.min(100, numeric));
    return `
      <div class="metric-bar-row">
        <div class="metric-bar-head">
          <span>${label}</span>
          <strong>${numeric == null ? "—" : `${numeric.toFixed(1)}%`}</strong>
        </div>
        <div class="metric-bar-track"><div class="metric-bar-fill ${tone}" style="width:${width}%"></div></div>
        <div class="metric-bar-detail">${detail || ""}</div>
      </div>
    `;
  }

  function renderEvaluationSteps(steps) {
    evalSteps.innerHTML = "";
    (steps || []).forEach((step) => {
      const row = document.createElement("div");
      row.className = `eval-step ${step.status || "pending"}`;
      const dot = document.createElement("span");
      dot.className = "eval-step-dot";
      const content = document.createElement("div");
      const label = document.createElement("div");
      label.className = "eval-step-label";
      label.textContent = t(`evaluation.step.${step.id}`) || step.label || step.id;
      const detail = document.createElement("div");
      detail.className = "eval-step-detail";
      detail.textContent = t(`evaluation.step.${step.status || "pending"}`);
      content.appendChild(label);
      content.appendChild(detail);
      row.appendChild(dot);
      row.appendChild(content);
      evalSteps.appendChild(row);
    });
  }

  function renderEvaluationResult(result) {
    if (!result) {
      evalResults.classList.add("hidden");
      return;
    }
    evalResults.classList.remove("hidden");
    const dataset = result.dataset || {};
    const asr = result.asr || {};
    const speaker = result.speaker || {};
    const names = result.names || {};
    const provenance = result.provenance || {};
    const enhancedSpeaker = speaker.graph_candidate_C_confirmed_enhance || {};
    const enhancedNames = names.graph_candidates_plus_self_intro || {};

    evalMetricGrid.innerHTML = `
      <div class="metric-card">
        <div class="metric-kicker">${escapeHtml(t("evaluation.metric.dataset"))}</div>
        <div class="metric-value">${dataset.segments == null ? "—" : dataset.segments}</div>
        <div class="metric-caption">${escapeHtml(t("evaluation.metric.datasetCaption", { scenarios: dataset.scenarios || 0, speakers: dataset.nominal_speakers || 0 }))}</div>
      </div>
      <div class="metric-card ${asr.status === "not_run" ? "warning" : ""}">
        <div class="metric-kicker">${escapeHtml(t("evaluation.metric.asr"))}</div>
        <div class="metric-value">${asr.cer == null ? "—" : percentText(asr.cer)}</div>
        <div class="metric-caption">${asr.status === "not_run" ? escapeHtml(t("evaluation.metric.asrUnavailable")) : escapeHtml(t("evaluation.metric.asrCaption", { model: asr.model || "Zipformer" }))}</div>
      </div>
      <div class="metric-card emphasis">
        <div class="metric-kicker">${escapeHtml(t("evaluation.metric.speaker"))}</div>
        <div class="metric-value">${percentText(enhancedSpeaker.accuracy)}</div>
        <div class="metric-caption">${escapeHtml(t("evaluation.metric.speakerCaption", { correct: enhancedSpeaker.correct || 0, total: speaker.test_segments || 0 }))}</div>
      </div>
      <div class="metric-card">
        <div class="metric-kicker">${escapeHtml(t("evaluation.metric.names"))}</div>
        <div class="metric-value">${percentText(enhancedNames.f1)}</div>
        <div class="metric-caption">${escapeHtml(t("evaluation.metric.namesCaption", { correct: enhancedNames.tp || 0, total: enhancedNames.reference || 0 }))}</div>
      </div>
    `;

    evalTruthGrid.innerHTML = `
      <article class="eval-truth-item">
        <span class="truth-tag neutral">${escapeHtml(t("evaluation.truth.completionTag"))}</span>
        <strong>${escapeHtml(t("evaluation.truth.completionTitle"))}</strong>
        <p>${escapeHtml(t("evaluation.truth.completionBody"))}</p>
      </article>
      <article class="eval-truth-item">
        <span class="truth-tag upper">${escapeHtml(t("evaluation.truth.textTag"))}</span>
        <strong>${escapeHtml(t("evaluation.truth.textTitle", { correct: enhancedNames.tp || 0, total: enhancedNames.reference || 0 }))}</strong>
        <p>${escapeHtml(t("evaluation.truth.textBody"))}</p>
      </article>
      <article class="eval-truth-item">
        <span class="truth-tag synthetic">${escapeHtml(t("evaluation.truth.syntheticTag"))}</span>
        <strong>${escapeHtml(t("evaluation.truth.syntheticTitle"))}</strong>
        <p>${escapeHtml(t("evaluation.truth.syntheticBody", { segments: dataset.segments || 0, speakers: dataset.nominal_speakers || 0, voices: provenance.tts_voice_slots || 4 }))}</p>
      </article>
      <article class="eval-truth-item">
        <span class="truth-tag real">${escapeHtml(t("evaluation.truth.realTag"))}</span>
        <strong>${escapeHtml(t("evaluation.truth.realTitle"))}</strong>
        <p>${escapeHtml(t("evaluation.truth.realBody", { cer: asr.cer == null ? t("evaluation.truth.notRun") : percentText(asr.cer) }))}</p>
      </article>
      <article class="eval-truth-item">
        <span class="truth-tag synthetic">${escapeHtml(t("evaluation.truth.baselineTag"))}</span>
        <strong>${escapeHtml(t("evaluation.truth.baselineTitle"))}</strong>
        <p>${escapeHtml(t("evaluation.truth.baselineBody"))}</p>
      </article>
      <article class="eval-truth-item">
        <span class="truth-tag pending">${escapeHtml(t("evaluation.truth.pendingTag"))}</span>
        <strong>${escapeHtml(t("evaluation.truth.pendingTitle"))}</strong>
        <p>${escapeHtml(t("evaluation.truth.pendingBody"))}</p>
      </article>
    `;

    const globalResult = speaker.global_ann_first_sample || {};
    const candidateResult = speaker.graph_candidate_C_first_sample || {};
    evalSpeakerBars.innerHTML =
      metricBar(t("evaluation.bar.global"), globalResult.accuracy, t("evaluation.bar.ttsSegments", { correct: globalResult.correct || 0, total: speaker.test_segments || 0 }), "gray") +
      metricBar(t("evaluation.bar.candidate"), candidateResult.accuracy, t("evaluation.bar.ttsSegments", { correct: candidateResult.correct || 0, total: speaker.test_segments || 0 }), "orange") +
      metricBar(t("evaluation.bar.enhanced"), enhancedSpeaker.accuracy, t("evaluation.bar.ttsSegments", { correct: enhancedSpeaker.correct || 0, total: speaker.test_segments || 0 }), "green");

    const buckets = enhancedSpeaker.by_prior_confirmed_samples || {};
    evalLearningBars.innerHTML = ["1", "2", "3+"].map((key) => {
      const bucket = buckets[key] || {};
      return metricBar(t("evaluation.bar.prior", { count: key }), bucket.accuracy, t("evaluation.bar.ttsSegments", { correct: bucket.correct || 0, total: bucket.total || 0 }), key === "3+" ? "green" : "orange");
    }).join("");

    const ruleNames = names.text_rules_only || {};
    evalNameBars.innerHTML =
      metricBar(t("evaluation.bar.textRules"), ruleNames.f1, t("evaluation.bar.recall", { value: percentText(ruleNames.recall) }), "orange") +
      metricBar(t("evaluation.bar.nameEnhanced"), enhancedNames.f1, t("evaluation.bar.nameCaption", { correct: enhancedNames.tp || 0, total: enhancedNames.reference || 0 }), "green");
  }

  function renderEvaluation(snapshot) {
    const progress = Math.max(0, Math.min(100, Number(snapshot.progress || 0)));
    evalProgressBar.style.width = `${progress}%`;
    evalProgressText.textContent = t("evaluation.progress", {
      progress: Math.round(progress),
      elapsed: snapshot.elapsed_s != null ? t("evaluation.elapsed", { seconds: snapshot.elapsed_s }) : "",
    });
    const activeStep = (snapshot.steps || []).find((step) => step.status === "running");
    evalStage.textContent = activeStep
      ? t(`evaluation.step.${activeStep.id}`)
      : snapshot.status === "completed"
        ? t("evaluation.completed")
        : snapshot.status === "failed"
          ? t("status.failed")
          : t("evaluation.waiting");
    const statusMap = {
      idle: [t("evaluation.idle"), "draft"],
      running: [t("evaluation.running"), "processing"],
      completed: [snapshot.cached ? t("evaluation.cached") : t("evaluation.completed"), "ready"],
      failed: [t("status.failed"), "failed"],
    };
    const status = statusMap[snapshot.status] || [snapshot.status || t("common.unknown"), "draft"];
    evalStatusBadge.textContent = status[0];
    evalStatusBadge.className = `badge ${status[1]}`;
    btnRunEvaluation.disabled = snapshot.status === "running";
    btnRunEvaluation.textContent = snapshot.status === "running" ? t("evaluation.testRunning") : t("evaluation.rerun");
    renderEvaluationSteps(snapshot.steps || []);
    renderEvaluationResult(snapshot.result);
    if (snapshot.error) {
      evalStage.textContent = t("evaluation.error", { error: snapshot.error });
    }
  }

  async function refreshEvaluation() {
    try {
      const snapshot = await api("/api/evaluation/test-data");
      renderEvaluation(snapshot);
      if (evaluationPollTimer) {
        clearTimeout(evaluationPollTimer);
        evaluationPollTimer = null;
      }
      if (snapshot.status === "running") {
        evaluationPollTimer = setTimeout(refreshEvaluation, 500);
      }
    } catch (err) {
      evalStage.textContent = t("evaluation.readFailed", { error: err.message });
      btnRunEvaluation.disabled = false;
    }
  }

  async function startEvaluation() {
    btnRunEvaluation.disabled = true;
    evalStage.textContent = t("evaluation.starting");
    try {
      const snapshot = await api("/api/evaluation/test-data/run", { method: "POST" });
      renderEvaluation(snapshot);
      if (evaluationPollTimer) clearTimeout(evaluationPollTimer);
      evaluationPollTimer = setTimeout(refreshEvaluation, 300);
    } catch (err) {
      const msg = String(err && err.message ? err.message : err);
      evalStage.textContent = t("evaluation.startFailed", { error: msg });
      btnRunEvaluation.disabled = false;
      btnRunEvaluation.textContent = t("evaluation.rerun");
      // A network failure usually means the backend is unavailable; keep the original error visible.
      if (/Failed to fetch|NetworkError|Load failed/i.test(msg)) {
        alert(t("evaluation.backendUnavailable"));
        return;
      }
      try {
        await refreshEvaluation();
      } catch (_) {
        /* keep start-failure message */
      }
    }
  }

  async function ensureProject() {
    if (state.project) return state.project;
    if (state.projects.length) {
      state.project = state.projects[0];
      return state.project;
    }
    const name = window.prompt(t("project.createFirst"), t("project.defaultName"));
    if (!name) return null;
    const project = await api("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    await loadTree();
    state.project = project;
    return project;
  }

  async function startMeetingQuick() {
    try {
      const project = await ensureProject();
      if (!project) return;
      const title = window.prompt(t("meeting.titlePrompt"), "") || "";
      const meeting = await api(`/api/projects/${project.project_id}/meetings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      await loadTree();
      // keep project branch open
      const node = state.tree.find((t) => t.project.project_id === project.project_id);
      if (node) node.open = true;
      await openMeeting(project, meeting);
    } catch (err) {
      if (isNetworkFetchError(err.message)) {
        alert(t("evaluation.backendUnavailable"));
        return;
      }
      alert(t("meeting.startFailed", { error: err.message }));
    }
  }

  async function createProject() {
    const name = window.prompt(t("project.createPrompt"), t("project.newDefault"));
    if (!name) return;
    try {
      const project = await api("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      await loadTree();
      state.project = project;
      showView("home");
      renderRecent(project.project_id);
    } catch (err) {
      alert(t("project.createFailed", { error: err.message }));
    }
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        const comma = result.indexOf(",");
        resolve(comma >= 0 ? result.slice(comma + 1) : result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function encodePcmWav(buffers, sampleRate) {
    const sampleCount = buffers.reduce((sum, buffer) => sum + buffer.length, 0);
    const wav = new ArrayBuffer(44 + sampleCount * 2);
    const view = new DataView(wav);
    const writeAscii = (offset, value) => {
      for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i));
    };
    writeAscii(0, "RIFF");
    view.setUint32(4, 36 + sampleCount * 2, true);
    writeAscii(8, "WAVE");
    writeAscii(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeAscii(36, "data");
    view.setUint32(40, sampleCount * 2, true);
    let outputOffset = 44;
    buffers.forEach((buffer) => {
      for (let i = 0; i < buffer.length; i++) {
        const sample = Math.max(-1, Math.min(1, buffer[i]));
        view.setInt16(outputOffset, sample < 0 ? sample * 32768 : sample * 32767, true);
        outputOffset += 2;
      }
    });
    return new Blob([wav], { type: "audio/wav" });
  }

  function hasMeaningfulText(value) {
    return /[A-Za-z0-9\u4e00-\u9fff]/.test(String(value || ""));
  }

  function resampleToRate(buffers, inputRate, outputRate) {
    const total = buffers.reduce((sum, buffer) => sum + buffer.length, 0);
    const input = new Float32Array(total);
    let offset = 0;
    buffers.forEach((buffer) => {
      input.set(buffer, offset);
      offset += buffer.length;
    });
    if (!inputRate || inputRate === outputRate) {
      return { samples: input, sampleRate: outputRate || inputRate };
    }
    const outLength = Math.max(1, Math.round(input.length * outputRate / inputRate));
    const output = new Float32Array(outLength);
    const ratio = input.length / outLength;
    for (let i = 0; i < outLength; i++) {
      const x = i * ratio;
      const i0 = Math.floor(x);
      const i1 = Math.min(input.length - 1, i0 + 1);
      const t = x - i0;
      output[i] = input[i0] * (1 - t) + input[i1] * t;
    }
    return { samples: output, sampleRate: outputRate };
  }

  function renderLiveTranscript() {
    const utterances = mergeConsecutiveSpeakerUtterances(liveUtterances.map((utterance) => {
      const item = { ...utterance };
      // Keep a resolved recording-local voice number; only unresolved audio uses bars.
      if (!isIdentifiedSpeaker(item) && !isResolvedVoiceCluster(item)) {
        item.live_unidentified = true;
        item.unidentified = true;
        item.identity_status = item.identity_status || "unavailable";
        delete item.display_name;
        delete item.display_label;
        delete item.canonical_name;
        if (!item.speaker_id) item.speaker_id = "live_microphone";
      }
      return item;
    }));
    const speakersById = new Map();
    utterances.forEach((utterance) => {
      const speakerId = String(utterance.speaker_id || utterance.local_id || "").trim();
      if (!speakerId || (!isIdentifiedSpeaker(utterance) && !isResolvedVoiceCluster(utterance))) return;
      const previous = speakersById.get(speakerId);
      if (!previous || Number(utterance.voice_confidence || 0) > Number(previous.voice_confidence || 0)) {
        speakersById.set(speakerId, { ...utterance });
      }
    });
    const liveSpeakers = [...speakersById.values()];
    const displayUtterances = [...utterances];
    if (isLiveStreamMode() && liveCaptureActive && hasMeaningfulText(livePartialText)) {
      displayUtterances.push({
        t0: liveStreamFeedOffsetS,
        t1: liveStreamFeedOffsetS,
        text: livePartialText,
        live_unidentified: true,
        live_partial: true,
        unidentified: true,
        identity_status: "unavailable",
        speaker_id: "live_microphone",
      });
    }
    renderResult({
      result: {
        summary: {
          brief: liveFollowLocaleActive()
            ? t("recording.summaryFollowLocale")
            : String((state.asr || {}).language || "").toLowerCase() === "auto"
            ? t("recording.summaryAuto")
            : translationEnabled()
            ? t("recording.summaryTranslated")
            : t("recording.summaryTranscript"),
        },
        speakers: liveSpeakers,
        utterances: displayUtterances,
        transcript_meta: {
          source: "live_recording",
          source_label: liveRecordingLabel(),
          utterance_count: utterances.length,
          speaker_count: liveSpeakers.length,
          live_asr_mode: state.liveAsrMode,
        },
      },
    });
    setLiveSpeakingVisible(true);
    liveRecognition.className = "live-recognition running";
    recognitionStage.textContent = liveRecordingLabel();
    recognitionRunInfo.textContent = liveRecognitionRunInfo();
    recognitionProgressBar.style.width = "100%";
  }

  function liveRecognitionRunInfo() {
    const failures = liveFailedChunks ? t("recording.chunkFailures", { count: liveFailedChunks }) : "";
    if (isLiveStreamMode()) {
      if (liveInFlight > 0 || livePartialText) {
        return t("recording.streamPending", {
          inFlight: liveInFlight,
          utterances: liveUtterances.length,
          failures,
        });
      }
      return t("recording.streamProgress", {
        chunks: liveCompletedChunks,
        utterances: liveUtterances.length,
        failures,
      });
    }
    if (liveInFlight > 0) {
      return t("recording.chunkPending", {
        inFlight: liveInFlight,
        chunks: liveCompletedChunks,
        utterances: liveUtterances.length,
        failures,
      });
    }
    return t("recording.chunkProgress", {
      chunks: liveCompletedChunks,
      utterances: liveUtterances.length,
      failures,
    });
  }

  function applyLiveSegmentsInOrder() {
    let changed = false;
    while (livePendingSegments.has(liveNextApplyChunk)) {
      const segments = livePendingSegments.get(liveNextApplyChunk);
      livePendingSegments.delete(liveNextApplyChunk);
      liveNextApplyChunk += 1;
      liveCompletedChunks += 1;
      (segments || []).forEach((segment) => {
        if (hasMeaningfulText(segment.text) || hasMeaningfulText(segment.source_text)) {
          if (segment.translation_fallback) liveTranslationFailed = true;
          liveUtterances.push(segment);
        }
      });
      changed = true;
    }
    if (changed) renderLiveTranscript();
    else if (liveCaptureActive) updateLiveRecognitionStatus();
  }

  function updateLiveRecognitionStatus() {
    if (!liveCaptureActive && liveInFlight === 0) return;
    liveRecognition.className = "live-recognition running";
    recognitionStage.textContent = liveRecordingLabel();
    recognitionRunInfo.textContent = liveRecognitionRunInfo();
    recognitionProgressBar.style.width = "100%";
  }

  function resetLiveTranscription() {
    if (livePcmNode) {
      livePcmNode.onaudioprocess = null;
      try { livePcmNode.disconnect(); } catch (_) {}
    }
    if (liveMuteNode) {
      try { liveMuteNode.disconnect(); } catch (_) {}
    }
    livePcmNode = null;
    liveMuteNode = null;
    livePcmBuffers = [];
    livePcmSamples = 0;
    livePcmSampleRate = 0;
    livePcmOffsetSamples = 0;
    liveSilentSamples = 0;
    liveChunkPeakRms = 0;
    liveChunkIndex = 0;
    liveCompletedChunks = 0;
    liveFailedChunks = 0;
    liveCaptureActive = false;
    liveRecordingId = "";
    liveMeetingId = "";
    liveUtterances = [];
    livePendingSegments = new Map();
    liveNextApplyChunk = 0;
    liveInFlight = 0;
    liveChunkPromises = [];
    liveStreamSessionId = "";
    liveStreamFeedBuffers = [];
    liveStreamFeedSamples = 0;
    liveStreamFeedOffsetS = 0;
    liveStreamFeedPromise = Promise.resolve();
    liveStreamStartPromise = null;
    livePartialText = "";
    liveTranslationFailed = false;
    state.liveFollowLocale = false;
    if (liveStreamFeedTimer) {
      clearInterval(liveStreamFeedTimer);
      liveStreamFeedTimer = null;
    }
    if (liveChunkFlushTimer) {
      clearInterval(liveChunkFlushTimer);
      liveChunkFlushTimer = null;
    }
  }

  function fallbackStreamToChunkMode() {
    if (!isLiveStreamMode()) return;
    state.liveAsrMode = "chunk";
    if (liveAsrModeSelect) liveAsrModeSelect.value = "chunk";
    localStorage.setItem(LIVE_ASR_MODE_KEY, "chunk");
    if (liveStreamFeedTimer) {
      clearInterval(liveStreamFeedTimer);
      liveStreamFeedTimer = null;
    }
    if (liveStreamFeedSamples > 0) {
      livePcmBuffers.push(...liveStreamFeedBuffers);
      livePcmSamples += liveStreamFeedSamples;
      liveStreamFeedBuffers = [];
      liveStreamFeedSamples = 0;
      flushLivePcm(true);
    }
    if (!liveChunkFlushTimer && liveCaptureActive) {
      liveChunkFlushTimer = setInterval(() => {
        if (!liveCaptureActive || !livePcmSamples || !livePcmSampleRate) return;
        const durationS = livePcmSamples / livePcmSampleRate;
        if (durationS >= 0.45) flushLivePcm(true);
      }, Math.round(LIVE_PERIODIC_FLUSH_S * 1000));
    }
  }

  function ingestLivePcmSamples(copy) {
    if (isLiveStreamMode()) {
      liveStreamFeedBuffers.push(copy);
      liveStreamFeedSamples += copy.length;
      return;
    }
    livePcmBuffers.push(copy);
    livePcmSamples += copy.length;
    let sum = 0;
    for (let i = 0; i < copy.length; i++) sum += copy[i] * copy[i];
    const rms = Math.sqrt(sum / Math.max(1, copy.length));
    liveChunkPeakRms = Math.max(liveChunkPeakRms, rms);
    liveSilentSamples = rms < LIVE_SILENCE_RMS ? liveSilentSamples + copy.length : 0;
    const durationS = livePcmSamples / livePcmSampleRate;
    const silenceS = liveSilentSamples / livePcmSampleRate;
    if (
      durationS >= LIVE_MAX_CHUNK_S
      || (durationS >= LIVE_MIN_CHUNK_S && silenceS >= LIVE_SILENCE_S)
    ) {
      flushLivePcm(true);
    }
  }

  function setupScriptProcessorCapture(source) {
    livePcmNode = audioCtx.createScriptProcessor(4096, 1, 1);
    livePcmNode.onaudioprocess = (event) => {
      if (!liveCaptureActive) return;
      ingestLivePcmSamples(new Float32Array(event.inputBuffer.getChannelData(0)));
    };
    source.connect(livePcmNode);
    liveMuteNode = audioCtx.createGain();
    liveMuteNode.gain.value = 0;
    livePcmNode.connect(liveMuteNode);
    liveMuteNode.connect(audioCtx.destination);
  }

  async function setupAudioWorkletCapture(source) {
    const workletCode = `
      class LiveCaptureProcessor extends AudioWorkletProcessor {
        process(inputs) {
          const ch = inputs[0] && inputs[0][0];
          if (ch && ch.length) this.port.postMessage(ch);
          return true;
        }
      }
      registerProcessor("live-capture-processor", LiveCaptureProcessor);
    `;
    const url = URL.createObjectURL(new Blob([workletCode], { type: "application/javascript" }));
    await audioCtx.audioWorklet.addModule(url);
    URL.revokeObjectURL(url);
    livePcmNode = new AudioWorkletNode(audioCtx, "live-capture-processor", {
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 1,
    });
    livePcmNode.port.onmessage = (event) => {
      if (!liveCaptureActive) return;
      ingestLivePcmSamples(new Float32Array(event.data));
    };
    source.connect(livePcmNode);
    liveMuteNode = audioCtx.createGain();
    liveMuteNode.gain.value = 0;
    livePcmNode.connect(liveMuteNode);
    liveMuteNode.connect(audioCtx.destination);
  }

  function startLiveChunkFlushTimer() {
    if (liveChunkFlushTimer) return;
    liveChunkFlushTimer = setInterval(() => {
      if (!liveCaptureActive || !livePcmSamples || !livePcmSampleRate) return;
      const durationS = livePcmSamples / livePcmSampleRate;
      if (durationS >= 0.45) flushLivePcm(true);
    }, Math.round(LIVE_PERIODIC_FLUSH_S * 1000));
  }

  function pcmFloatToInt16Base64(samples) {
    const pcm = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      const v = Math.max(-1, Math.min(1, samples[i]));
      pcm[i] = v < 0 ? v * 32768 : v * 32767;
    }
    const bytes = new Uint8Array(pcm.buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  function appendLiveStreamSegments(segments) {
    (segments || []).forEach((segment) => {
      if (hasMeaningfulText(segment.text) || hasMeaningfulText(segment.source_text)) {
        if (segment.translation_fallback) liveTranslationFailed = true;
        liveUtterances.push(segment);
        liveCompletedChunks += 1;
      }
    });
  }

  async function startLiveStreamSession() {
    if (!isLiveStreamMode() || !liveMeetingId) return;
    liveStreamStartPromise = api(
      `/api/meetings/${encodeURIComponent(liveMeetingId)}/live-stream/start`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recording_id: liveRecordingId,
          translation_mode: requestedTranslationMode(),
        }),
      },
    ).then((data) => {
      liveStreamSessionId = data.session_id || "";
    }).catch((err) => {
      console.error("live stream start failed", err);
      liveStreamSessionId = "";
      fallbackStreamToChunkMode();
      setStatus(t("recording.streamStartFailed"));
    });
    await liveStreamStartPromise;
  }

  function flushLiveStreamFeed(force = false) {
    if (!liveStreamFeedSamples || !livePcmSampleRate) {
      return liveStreamFeedPromise;
    }
    const minSamples = force ? 1 : Math.floor(livePcmSampleRate * 0.15);
    if (!force && liveStreamFeedSamples < minSamples) return liveStreamFeedPromise;

    if (!liveStreamSessionId) {
      if (liveStreamStartPromise) {
        liveStreamFeedPromise = liveStreamFeedPromise
          .then(() => liveStreamStartPromise)
          .then(() => flushLiveStreamFeed(force));
        return liveStreamFeedPromise;
      }
      return liveStreamFeedPromise;
    }
    const buffers = liveStreamFeedBuffers;
    const sampleCount = liveStreamFeedSamples;
    const offsetS = liveStreamFeedOffsetS;
    liveStreamFeedBuffers = [];
    liveStreamFeedSamples = 0;
    liveStreamFeedOffsetS += sampleCount / livePcmSampleRate;

    const resampled = resampleToRate(buffers, livePcmSampleRate, LIVE_TARGET_RATE);
    const pcmBase64 = pcmFloatToInt16Base64(resampled.samples);
    const sessionId = liveStreamSessionId;
    const meetingId = liveMeetingId;
    const recordingId = liveRecordingId;

    liveInFlight += 1;
    updateLiveRecognitionStatus();
    liveStreamFeedPromise = liveStreamFeedPromise.then(async () => {
      try {
        if (liveStreamStartPromise) await liveStreamStartPromise;
        const data = await api(
          `/api/meetings/${encodeURIComponent(meetingId)}/live-stream/${encodeURIComponent(sessionId)}/feed`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              recording_id: recordingId,
              offset_s: Number(offsetS.toFixed(3)),
              sample_rate: LIVE_TARGET_RATE,
              pcm_base64: pcmBase64,
            }),
          },
        );
        if (recordingId !== liveRecordingId || sessionId !== liveStreamSessionId) return;
        liveCompletedChunks += 1;
        livePartialText = String(data.partial_text || "").trim();
        appendLiveStreamSegments(data.segments || []);
        renderLiveTranscript();
        if (liveCaptureActive) {
          setStatus(liveTranslationFailed
            ? t("recording.translationFailed")
            : livePartialText || liveUtterances.length
              ? t("recording.streamPartial", { count: liveUtterances.length })
              : t("recording.noSpeech"));
        }
      } catch (err) {
        console.error("live stream feed failed", err);
        liveFailedChunks += 1;
        setStatus(t("recording.chunkFailed"));
      } finally {
        liveInFlight = Math.max(0, liveInFlight - 1);
        updateLiveRecognitionStatus();
      }
    });
    return liveStreamFeedPromise;
  }

  async function finishLiveStreamSession() {
    if (liveStreamFeedTimer) {
      clearInterval(liveStreamFeedTimer);
      liveStreamFeedTimer = null;
    }
    await flushLiveStreamFeed(true);
    await liveStreamFeedPromise;
    if (!liveStreamSessionId || !liveMeetingId) return;
    const sessionId = liveStreamSessionId;
    const meetingId = liveMeetingId;
    try {
      const data = await api(
        `/api/meetings/${encodeURIComponent(meetingId)}/live-stream/${encodeURIComponent(sessionId)}/finish`,
        { method: "POST" },
      );
      appendLiveStreamSegments(data.segments || []);
      livePartialText = "";
      renderLiveTranscript();
    } catch (err) {
      console.error("live stream finish failed", err);
    } finally {
      liveStreamSessionId = "";
    }
  }

  async function waitForLiveTranscription() {
    if (isLiveStreamMode()) {
      await finishLiveStreamSession();
      return;
    }
    await Promise.allSettled(liveChunkPromises);
    applyLiveSegmentsInOrder();
  }

  function queueLiveChunk(buffers, sampleRate, offsetS, durationS, peakRms, force = false) {
    const chunkIndex = liveChunkIndex++;
    const recordingId = liveRecordingId;
    const meetingId = liveMeetingId;
    if (durationS < 0.25) return;
    if (!force && peakRms < LIVE_MIN_PEAK_RMS) return;
    const resampled = resampleToRate(buffers, sampleRate, LIVE_TARGET_RATE);
    const wav = encodePcmWav([resampled.samples], resampled.sampleRate);
    liveInFlight += 1;
    updateLiveRecognitionStatus();
    const promise = (async () => {
      try {
        const audio_base64 = await blobToBase64(wav);
        const data = await api(`/api/meetings/${encodeURIComponent(meetingId)}/live-transcribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recording_id: recordingId,
            chunk_index: chunkIndex,
            offset_s: offsetS,
            duration_s: durationS,
            audio_base64,
            translation_mode: requestedTranslationMode(),
          }),
        });
        if (recordingId !== liveRecordingId || meetingId !== liveMeetingId) return;
        livePendingSegments.set(chunkIndex, data.segments || []);
      } catch (err) {
        console.error("live transcription failed", err);
        if (recordingId === liveRecordingId && meetingId === liveMeetingId) {
          liveFailedChunks += 1;
          livePendingSegments.set(chunkIndex, []);
        }
        setStatus(t("recording.chunkFailed"));
      } finally {
        if (recordingId === liveRecordingId && meetingId === liveMeetingId) {
          liveInFlight = Math.max(0, liveInFlight - 1);
          applyLiveSegmentsInOrder();
          if (liveCaptureActive) {
            setStatus(liveTranslationFailed
              ? t("recording.translationFailed")
              : liveUtterances.length
                ? t("recording.transcribed", { count: liveUtterances.length })
                : liveInFlight > 0
                  ? t("recording.chunkPendingShort")
                  : t("recording.noSpeech"));
          }
        }
      }
    })();
    liveChunkPromises.push(promise);
  }

  function flushLivePcm(force = false) {
    if (!livePcmSamples || !livePcmSampleRate) return;
    const durationS = livePcmSamples / livePcmSampleRate;
    if (!force && durationS < LIVE_MIN_CHUNK_S) return;
    const buffers = livePcmBuffers;
    const sampleCount = livePcmSamples;
    const offsetS = livePcmOffsetSamples / livePcmSampleRate;
    const peakRms = liveChunkPeakRms;
    livePcmBuffers = [];
    livePcmSamples = 0;
    liveSilentSamples = 0;
    liveChunkPeakRms = 0;
    livePcmOffsetSamples += sampleCount;
    queueLiveChunk(
      buffers,
      livePcmSampleRate,
      Number(offsetS.toFixed(3)),
      Number(durationS.toFixed(3)),
      peakRms,
      force,
    );
  }

  async function startLivePcmCapture(source) {
    livePcmSampleRate = audioCtx.sampleRate;
    liveCaptureActive = true;
    if (audioCtx.audioWorklet) {
      try {
        await setupAudioWorkletCapture(source);
      } catch (err) {
        console.warn("AudioWorklet capture unavailable, using ScriptProcessor", err);
        setupScriptProcessorCapture(source);
      }
    } else {
      setupScriptProcessorCapture(source);
    }
    if (isLiveStreamMode()) {
      liveStreamFeedTimer = setInterval(() => flushLiveStreamFeed(false), 250);
    } else {
      startLiveChunkFlushTimer();
    }
  }

  function stopLivePcmCapture() {
    liveCaptureActive = false;
    if (liveChunkFlushTimer) {
      clearInterval(liveChunkFlushTimer);
      liveChunkFlushTimer = null;
    }
    if (livePcmNode) {
      if (livePcmNode.port) livePcmNode.port.onmessage = null;
      livePcmNode.onaudioprocess = null;
      try { livePcmNode.disconnect(); } catch (_) {}
      livePcmNode = null;
    }
    if (liveMuteNode) {
      try { liveMuteNode.disconnect(); } catch (_) {}
      liveMuteNode = null;
    }
    if (isLiveStreamMode()) {
      flushLiveStreamFeed(true);
      return;
    }
    flushLivePcm(true);
  }

  function serializeLiveSegments(utterances) {
    return (utterances || []).map((utterance) => ({
      t0: Number(utterance.t0) || 0,
      t1: Number(utterance.t1) || 0,
      text: utterance.text || "",
      source_text: utterance.source_text || "",
      language: utterance.language || "",
      translation_target: utterance.translation_target || null,
      translation_fallback: Boolean(utterance.translation_fallback),
    }));
  }

  async function uploadAndProcess(blob, filename, durationS, recordedSegments = null) {
    if (!state.meeting) {
      setStatus(t("recording.noMeeting"));
      return;
    }
    setStatus(t("recording.analyzing"));
    btnStop.disabled = true;
    btnRecord.disabled = true;
    try {
      const audio_base64 = await blobToBase64(blob);
      const requestBody = {
        filename,
        duration_s: durationS || null,
        audio_base64,
        translation_mode: requestedTranslationMode(),
      };
      if (Array.isArray(recordedSegments)) {
        requestBody.live_segments = serializeLiveSegments(recordedSegments);
        requestBody.recording_id = liveRecordingId || null;
      }
      const data = await api(`/api/meetings/${state.meeting.meeting_id}/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      state.meeting = data.meeting;
      detailBadge.className = `badge ${data.meeting.status || "ready"}`;
      detailBadge.textContent = statusLabel(data.meeting.status);
      renderResult(data);
      setStatus(t("recording.complete"));
      await loadTree();
    } catch (err) {
      console.error(err);
      setStatus(t("recording.failed", { error: err.message }));
    } finally {
      btnRecord.disabled = false;
      audioInputSelect.disabled = false;
      if (liveAsrModeSelect) liveAsrModeSelect.disabled = false;
      if (asrModelSelect) asrModelSelect.disabled = false;
      if (toggleTranslation) toggleTranslation.disabled = false;
    }
  }

  function stopMeter() {
    if (meterTimer) {
      clearInterval(meterTimer);
      meterTimer = null;
    }
    meterBar.style.width = "0%";
    if (audioCtx) {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
  }

  async function startRecording() {
    if (!state.asr) await loadAsrInfo();
    const stream = await navigator.mediaDevices.getUserMedia(microphoneConstraints());
    const audioTrack = stream.getAudioTracks()[0];
    const trackSettings = audioTrack && audioTrack.getSettings ? audioTrack.getSettings() : {};
    await refreshAudioInputs(trackSettings.deviceId || "");
    resetLiveTranscription();
    state.liveFollowLocale = state.showTranslation;
    liveMeetingId = state.meeting.meeting_id;
    liveRecordingId = globalThis.crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : `recording-${Date.now()}`;
    chunks = [];
    mediaRecorder = new MediaRecorder(stream);
    startedAt = performance.now();
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };
    mediaRecorder.onstop = async () => {
      stopLivePcmCapture();
      stopMeter();
      setLiveSpeakingVisible(false);
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunks, { type: mediaRecorder.mimeType || "audio/webm" });
      lastRecordingBlob = blob;
      lastRecordingFilename = `recording-${Date.now()}.webm`;
      lastRecordingMeetingId = state.meeting ? state.meeting.meeting_id : "";
      syncVoiceprintEnrollPanel();
      playback.src = URL.createObjectURL(blob);
      const durationS = Math.max(0.8, (performance.now() - startedAt) / 1000);
      setStatus(t("recording.finalizing"));
      await waitForLiveTranscription();
      const recordedSegments = liveUtterances.map((utterance) => ({ ...utterance }));
      await uploadAndProcess(
        blob,
        `recording-${Date.now()}.webm`,
        durationS,
        recordedSegments,
      );
      state.liveFollowLocale = false;
      btnRecord.classList.remove("live");
      btnRecord.textContent = t("recording.start");
      btnStop.disabled = true;
    };

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    await audioCtx.resume();
    const source = audioCtx.createMediaStreamSource(stream);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    setLiveSpeakingVisible(true);
    meterTimer = setInterval(() => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / data.length);
      meterBar.style.width = `${Math.min(100, Math.round(rms * 280))}%`;
      updateLiveSpeakingLevel(rms);
    }, 80);

    mediaRecorder.start();
    if (isLiveStreamMode()) {
      await startLiveStreamSession();
    }
    await startLivePcmCapture(source);
    renderLiveTranscript();
    btnRecord.classList.add("live");
    btnRecord.textContent = t("recording.recording");
    btnRecord.disabled = true;
    audioInputSelect.disabled = true;
    if (liveAsrModeSelect) liveAsrModeSelect.disabled = true;
    if (asrModelSelect) asrModelSelect.disabled = true;
    if (toggleTranslation) toggleTranslation.disabled = true;
    btnStop.disabled = false;
    const microphoneName = (audioTrack && audioTrack.label) || t("recording.defaultMicrophone");
    setStatus(`${liveRecordingLabel()} · ${microphoneName}`);
  }

  function updatePositioningFigure() {
    const figure = $("pptPositioningFigure");
    const download = $("downloadPositioningFigure");
    if (!figure || !download) return;
    const language = i18n.getLocale() === "en-US" ? "en" : "zh";
    const source = `./static/assets/confirmvoice-positioning-${language}.svg?v=20260821-voiceweave`;
    if (figure.getAttribute("src") !== source) figure.setAttribute("src", source);
    figure.setAttribute("alt", t("comparison.figureAlt"));
    download.setAttribute("href", source);
    download.setAttribute("download", `voiceweave-positioning-${language}.svg`);
  }

  function updateLocaleSwitch() {
    document.querySelectorAll(".locale-option[data-locale]").forEach((button) => {
      const active = button.dataset.locale === i18n.getLocale();
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    updatePositioningFigure();
  }

  async function rerenderForLocale() {
    updateLocaleSwitch();
    syncLiveAsrModeSelect();
    showView(state.view);
    btnRecord.textContent = mediaRecorder && mediaRecorder.state !== "inactive"
      ? t("recording.recording")
      : t("recording.start");
    if (state.meeting) {
      detailTitle.textContent = localizedMeetingTitle(state.meeting);
      detailBadge.textContent = statusLabel(state.meeting.status);
      detailBadge.className = `badge ${state.meeting.status || "draft"}`;
      setStatus(mediaRecorder && mediaRecorder.state !== "inactive"
        ? liveRecordingLabel()
        : state.meeting.status === "ready"
          ? t("status.existingResult")
          : t("status.standby"));
    } else {
      detailTitle.textContent = t("meeting.detail");
      detailBadge.textContent = t("status.draft");
      setStatus(t("status.standby"));
    }
    renderTree();
    renderRecent(state.view === "home" && state.project ? state.project.project_id : undefined);
    await refreshAudioInputs().catch(() => {});
    if (state.view === "detail" && state.result) {
      if (activeRecognitionRun && state.testBaseResult) {
        renderRecognitionRun(activeRecognitionRun);
        await loadRecognitionHistory();
      } else if (liveUtterances.length || liveCaptureActive) {
        renderLiveTranscript();
      } else {
        renderResult({ result: state.result });
      }
    } else if (state.view === "graph") {
      await refreshGraphView();
    } else if (state.view === "evaluation") {
      await refreshEvaluation();
    }
    applyEditionBranding();
  }

  document.querySelectorAll(".locale-option[data-locale]").forEach((button) => {
    button.addEventListener("click", () => i18n.setLocale(button.dataset.locale));
  });
  i18n.onChange(() => {
    rerenderForLocale().catch(console.error);
  });
  updateLocaleSwitch();
  keepComparisonColumnsPinned();

  $("navStartMeeting").addEventListener("click", () => startMeetingQuick());
  $("navNewProject").addEventListener("click", () => createProject());
  $("navProjects").addEventListener("click", async () => {
    stopRecognitionPolling();
    state.meeting = null;
    showView("home");
    await loadTree();
  });
  $("navGraph").addEventListener("click", async () => {
    stopRecognitionPolling();
    showView("graph");
    await refreshGraphView();
  });
  if ($("navPeople")) {
    $("navPeople").addEventListener("click", async () => {
      stopRecognitionPolling();
      showView("graph");
      await refreshGraphView();
    });
  }
  if ($("navVoiceprints")) {
    $("navVoiceprints").addEventListener("click", () => {
      openIcanGraphSection(
        "voiceprintSection",
        "声音管理",
        "管理已确认声纹、样本、原型和识别命中记录",
      ).catch(console.error);
    });
  }
  if ($("navLearning")) {
    $("navLearning").addEventListener("click", () => {
      openIcanGraphSection(
        "continuousLearningPanel",
        "持续学习",
        "确认样本形成候选能力，必须经过评测门才能晋级",
      ).catch(console.error);
    });
  }
  if ($("navHardware")) {
    $("navHardware").addEventListener("click", () => {
      showView("home");
      pageTitle.textContent = "RK3588 边缘盒子";
      pageSub.textContent = "硬件已接入 · 端侧模型与真机指标待验收";
      const card = $("icanHardware");
      if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
  if ($("btnIcanStart")) $("btnIcanStart").addEventListener("click", () => startMeetingQuick());
  if ($("btnIcanVoice")) {
    $("btnIcanVoice").addEventListener("click", () => {
      openIcanGraphSection(
        "voiceprintSection",
        "声音管理",
        "管理已确认声纹、样本、原型和识别命中记录",
      ).catch(console.error);
    });
  }
  if ($("btnVoiceRecord")) $("btnVoiceRecord").addEventListener("click", () => startMeetingQuick());
  if (meetingQueryForm) {
    meetingQueryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      askMeetingQuery();
    });
  }
  document.querySelectorAll("[data-meeting-query]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!meetingQueryInput) return;
      meetingQueryInput.value = button.dataset.meetingQuery || "";
      meetingQueryInput.focus();
      if (meetingQueryButton && !meetingQueryButton.disabled) askMeetingQuery();
    });
  });
  if (projectConsultantForm) {
    projectConsultantForm.addEventListener("submit", (event) => {
      event.preventDefault();
      askProjectConsultant();
    });
  }
  if (projectConsultantProject) {
    projectConsultantProject.addEventListener("change", () => {
      const selected = state.tree.find(
        (node) => node.project.project_id === projectConsultantProject.value,
      );
      if (selected) state.project = selected.project;
      renderTree();
    });
  }
  document.querySelectorAll("[data-project-question], [data-project-question-key]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!projectConsultantInput) return;
      const key = button.dataset.projectQuestionKey;
      projectConsultantInput.value = key ? t(key) : (button.dataset.projectQuestion || "");
      projectConsultantInput.focus();
    });
  });
  if (btnViewOriginal) btnViewOriginal.addEventListener("click", () => setTranscriptView("original"));
  if (btnViewConcise) btnViewConcise.addEventListener("click", () => setTranscriptView("concise"));
  if (toggleTranslation) {
    toggleTranslation.checked = Boolean(state.showTranslation);
    toggleTranslation.addEventListener("change", () => {
      state.showTranslation = Boolean(toggleTranslation.checked);
      try {
        localStorage.setItem(TRANSLATION_ENABLED_KEY, String(state.showTranslation));
      } catch (_) {}
      if (state.result) renderTranscript(state.result);
    });
  }
  if (btnCopySummary) btnCopySummary.addEventListener("click", () => copySummary());
  if (btnDownloadSummary) btnDownloadSummary.addEventListener("click", () => downloadSummary());
  if (btnConfirmProjectMemory) btnConfirmProjectMemory.addEventListener("click", () => confirmProjectMemory());
  const btnRefreshKnowledge = $("btnRefreshKnowledge");
  if (btnRefreshKnowledge) {
    btnRefreshKnowledge.addEventListener("click", () => refreshGraphView());
  }
  const btnRunGmaDemo = $("btnRunGmaDemo");
  if (btnRunGmaDemo) {
    btnRunGmaDemo.addEventListener("click", () => runGettingMoreAccurateDemo());
  }
  $("navEvaluation").addEventListener("click", async () => {
    stopRecognitionPolling();
    showView("evaluation");
    await refreshEvaluation();
  });
  document.querySelectorAll(".workflow-step[data-workflow-stage]").forEach((button) => {
    button.addEventListener("click", () => navigateWorkflowStage(button.dataset.workflowStage));
  });
  btnRunEvaluation.addEventListener("click", () => startEvaluation());
  btnConfirmSpeakers.addEventListener("click", () => confirmSpeakers());
  if (btnEnrollVoiceprint) btnEnrollVoiceprint.addEventListener("click", () => enrollVoiceprint());
  syncVoiceprintEnrollPanel();

  playback.addEventListener("pause", () => {
    if (isTestMeeting() && activeRecognitionRun) {
      recognitionTick(true).catch(console.error);
    }
  });
  playback.addEventListener("play", () => handlePlaybackPlay());
  playback.addEventListener("timeupdate", () => {
    lastPlaybackTime = Math.max(lastPlaybackTime, playback.currentTime || 0);
    if (!isTestMeeting() || playback.paused || !activeRecognitionRun) return;
    const now = Date.now();
    if (now - lastRecognitionAdvanceAt < 320) return;
    lastRecognitionAdvanceAt = now;
    requestRecognitionAdvance(false).catch(() => {});
  });
  playback.addEventListener("seeking", () => {
    const alreadyPlayed = Math.max(
      lastPlaybackTime,
      Number((activeRecognitionRun && activeRecognitionRun.requested_until_s) || 0),
    );
    if (isTestMeeting() && (playback.currentTime || 0) < 0.25 && alreadyPlayed > 0.25) {
      recognitionRestartRequested = true;
    }
  });
  playback.addEventListener("ended", async () => {
    if (!isTestMeeting() || !activeRecognitionRun) return;
    recognitionPlaybackEnded = true;
    await recognitionTick(true);
  });

  btnRecord.addEventListener("click", async () => {
    if (
      window.VoiceWeaveDemoRuntime
      && typeof window.VoiceWeaveDemoRuntime.startRecording === "function"
    ) {
      await window.VoiceWeaveDemoRuntime.startRecording();
      return;
    }
    try {
      await startRecording();
    } catch (err) {
      setStatus(t("recording.unavailable", { error: err.message }));
    }
  });

  btnStop.addEventListener("click", () => {
    if (
      window.VoiceWeaveDemoRuntime
      && typeof window.VoiceWeaveDemoRuntime.stopRecording === "function"
      && window.VoiceWeaveDemoRuntime.stopRecording()
    ) {
      return;
    }
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      btnStop.disabled = true;
      stopLivePcmCapture();
      mediaRecorder.stop();
      setStatus(t("recording.finalizing"));
    }
  });

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    if (
      window.VoiceWeaveDemoRuntime
      && typeof window.VoiceWeaveDemoRuntime.processUpload === "function"
    ) {
      await window.VoiceWeaveDemoRuntime.processUpload(file);
      fileInput.value = "";
      return;
    }
    playback.src = URL.createObjectURL(file);
    let durationS = 12;
    try {
      durationS = await new Promise((resolve) => {
        const a = new Audio();
        a.src = URL.createObjectURL(file);
        a.onloadedmetadata = () => resolve(a.duration || 12);
        a.onerror = () => resolve(12);
      });
    } catch (_) {}
    await uploadAndProcess(file, file.name, durationS);
    fileInput.value = "";
  });

  if (
    window.VoiceWeaveDemoRuntime
    && typeof window.VoiceWeaveDemoRuntime.attach === "function"
  ) {
    window.VoiceWeaveDemoRuntime.attach({
      state,
      loadTree,
      openMeeting,
      renderResult,
      showView,
      setStatus,
      refreshGraphView,
    });
  }

  detailTitle.textContent = t("meeting.detail");
  detailBadge.textContent = t("status.draft");
  btnRecord.textContent = t("recording.start");
  setStatus(t("status.standby"));
  showView("home");
  refreshAudioInputs().catch(() => {});
  if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
    navigator.mediaDevices.addEventListener("devicechange", () => {
      refreshAudioInputs().catch(() => {});
    });
  }
  if (liveAsrModeSelect) {
    liveAsrModeSelect.addEventListener("change", () => {
      state.liveAsrMode = liveAsrModeSelect.value;
      localStorage.setItem(LIVE_ASR_MODE_KEY, state.liveAsrMode);
    });
  }
  if (asrModelSelect) {
    asrModelSelect.addEventListener("change", async () => {
      const previous = (state.asr && state.asr.model) || "";
      try {
        await applyAsrModelSelection(asrModelSelect.value, { persist: true });
      } catch (err) {
        renderAsrModelSelect(previous);
        setStatus(t("asrModel.switchFailed", { error: err.message || String(err) }));
      }
    });
  }
  loadAsrCatalogAndApply().catch(() => loadAsrInfo().catch(() => {}));
  loadEditionConfig().catch(console.error);
  loadTree().catch(console.error);
})();
