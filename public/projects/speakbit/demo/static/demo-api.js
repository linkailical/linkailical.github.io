(function () {
  "use strict";

  const DEMO_PROJECT_ID = "speakbit-cultural-night";
  const DEMO_MEETING_ID = "demo-meeting-learned";
  const now = Date.UTC(2026, 8, 3, 17, 30, 0);
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

  const publicSpeakerIds = ["652", "1673", "1993", "2277", "2428", "2803", "3081", "5694", "6295", "7976"];
  let voiceprintPeople = publicSpeakerIds.map((id, index) => ({
    person_id: `public_librispeech_${id}`,
    display_name: `LibriSpeech ${id}`,
    sample_count: 6,
    prototype_count: 1,
    hit_count: 2 + (index % 4),
    embedding_dim: 512,
    identity_scope: "dataset_pseudonym_only",
  }));

  const knownSpeakers = [
    {
      speaker_id: "demo_person_jordan",
      local_id: "spk0",
      display_name: "Jordan",
      canonical_name: "Jordan",
      role: "Project Lead",
      conf: 0.94,
      matched: true,
      identity_status: "confirmed",
      identity_source: "voiceprint",
    },
    {
      speaker_id: "demo_person_ava",
      local_id: "spk1",
      display_name: "Ava",
      canonical_name: "Ava",
      role: "Event Coordinator",
      conf: 0.91,
      matched: true,
      identity_status: "confirmed",
      identity_source: "voiceprint",
    },
    {
      speaker_id: "demo_person_maya",
      local_id: "spk2",
      display_name: "Maya",
      canonical_name: "Maya",
      role: "Design Lead",
      conf: 0.89,
      matched: true,
      identity_status: "confirmed",
      identity_source: "voiceprint",
    },
  ];

  const learnedUtterances = [
    {
      utterance_id: "utt-demo-01",
      ...knownSpeakers[0],
      t0: 0,
      t1: 4.2,
      text: "The cafeteria is already booked. Let's use the auditorium.",
      source_text: "The cafeteria is already booked. Let's use the auditorium.",
      language: "en",
      voice_similarity: 0.94,
      speaker_decision: "known_voiceprint",
    },
    {
      utterance_id: "utt-demo-02",
      ...knownSpeakers[2],
      t0: 4.4,
      t1: 9.6,
      text: "Jordan will take the posters, and we should use packaged food only.",
      source_text: "Jordan will take the posters, and we should use packaged food only.",
      language: "en",
      translation_target: "en",
      translation_fallback: false,
      voice_similarity: 0.89,
      speaker_decision: "known_voiceprint",
    },
    {
      utterance_id: "utt-demo-03",
      ...knownSpeakers[1],
      t0: 10,
      t1: 15.3,
      text: "I'll update the floor plan for the auditorium.",
      source_text: "I'll update the floor plan for the auditorium.",
      language: "en",
      voice_similarity: 0.91,
      speaker_decision: "known_voiceprint",
    },
    {
      utterance_id: "utt-demo-04",
      ...knownSpeakers[0],
      t0: 15.7,
      t1: 21.4,
      text: "Add eighty dollars for lighting. The new budget is two hundred eighty dollars.",
      source_text: "灯光再增加八十美元，新预算是二百八十美元。",
      language: "zh-CN",
      translation_target: "en",
      translation_fallback: false,
      voice_similarity: 0.96,
      speaker_decision: "known_voiceprint",
    },
    {
      utterance_id: "utt-demo-05",
      ...knownSpeakers[2],
      t0: 21.8,
      t1: 27.5,
      text: "I'll confirm the room, owners, food plan, and budget in the final checklist.",
      source_text: "I'll confirm the room, owners, food plan, and budget in the final checklist.",
      language: "en",
      translation_target: "en",
      translation_fallback: false,
      voice_similarity: 0.92,
      speaker_decision: "known_voiceprint",
    },
  ];

  function summaryFor(utterances, complete) {
    const hasMaya = utterances.some((item) => item.speaker_id === "demo_person_maya");
    const hasAva = utterances.some((item) => item.speaker_id === "demo_person_ava");
    const bySpeaker = {};
    if (utterances.some((item) => item.speaker_id === "demo_person_jordan")) {
      bySpeaker.Jordan = "Moved Cultural Night to the auditorium and will verify the final checklist.";
    }
    if (hasMaya) bySpeaker.Maya = "Will update the auditorium floor plan.";
    if (hasAva) bySpeaker.Ava = "Reassigned the posters, changed the food plan, and raised the lighting budget.";
    return {
      brief: complete
        ? "Cultural Night moved to the auditorium; ownership, food, and budget changes are now traceable to their speakers."
        : utterances.length
          ? "Updating the meeting record from finalized transcript segments…"
          : "",
      by_speaker: bySpeaker,
      actions: complete
        ? ["Jordan confirms the final event checklist.", "Maya updates the auditorium floor plan."]
        : [],
    };
  }

  function learnedResult(overrides) {
    const utterances = clone((overrides && overrides.utterances) || learnedUtterances);
    const complete = !overrides || overrides.complete !== false;
    const speakerIds = new Set(utterances.map((item) => item.speaker_id));
    const speakers = knownSpeakers.filter((item) => speakerIds.has(item.speaker_id));
    return {
      session_id: DEMO_MEETING_ID,
      project_id: DEMO_PROJECT_ID,
      meeting_id: DEMO_MEETING_ID,
      duration_s: 28,
      utterances,
      speakers,
      summary: summaryFor(utterances, complete),
      transcript_meta: {
        source: "live_recording",
        source_label: complete ? "Live recognition · Pages demo data" : "Live recognition · generating",
        utterance_count: utterances.length,
        speaker_count: speakers.length,
      },
      translation: {
        translation_mode: "follow-locale",
        translation_targets: ["en"],
        translation_fallback: false,
      },
      project_memory: {
        current: [
          { fact_key: "event_date", label: "Event date", value: "March 22", version: 2 },
          { fact_key: "event_room", label: "Room", value: "Auditorium", version: 2 },
          { fact_key: "poster_owner", label: "Poster owner", value: "Jordan", version: 2 },
          { fact_key: "food_plan", label: "Food plan", value: "Packaged", version: 2 },
          { fact_key: "event_budget", label: "Budget", value: "$280", version: 2 },
        ],
        proposals: complete
          ? [{
              proposal_id: "memory_demo_export",
              meeting_id: DEMO_MEETING_ID,
              fact_key: "final_checklist",
              label: "Final checklist",
              value: "Confirm room, owners, food plan, and budget",
              evidence: { utterance_id: "utt-demo-05", t0: 21.8, t1: 27.5, text: learnedUtterances[4].source_text },
            }]
          : [],
      },
    };
  }

  const firstMeetingResult = {
    session_id: "demo-meeting-first",
    project_id: DEMO_PROJECT_ID,
    meeting_id: "demo-meeting-first",
    duration_s: 16,
    utterances: [
      {
        utterance_id: "utt-first-01",
        speaker_id: "pending:spk0",
        local_id: "spk0",
        display_name: "Unknown speaker 1",
        role: "",
        t0: 0,
        t1: 7.5,
        text: "Hi, I'm Jordan. I'll coordinate the Cultural Night plan.",
        source_text: "Hi, I'm Jordan. I'll coordinate the Cultural Night plan.",
        language: "en",
        conf: 0.78,
        identity_status: "resolved",
        identity_source: "voice_cluster",
        unidentified: true,
        speaker_decision: "new_voice",
      },
      {
        utterance_id: "utt-first-02",
        speaker_id: "pending:spk0",
        local_id: "spk0",
        display_name: "Unknown speaker 1",
        role: "",
        t0: 8,
        t1: 15.8,
        text: "The event is planned for March 15 in the cafeteria.",
        source_text: "The event is planned for March 15 in the cafeteria.",
        language: "en",
        conf: 0.81,
        identity_status: "resolved",
        identity_source: "voice_cluster",
        unidentified: true,
        speaker_decision: "same_voice",
        voice_similarity: 0.88,
      },
    ],
    speakers: [{
      speaker_id: "pending:spk0",
      local_id: "spk0",
      display_name: "Unknown speaker 1",
      conf: 0.78,
      identity_status: "resolved",
      identity_source: "voice_cluster",
      unidentified: true,
    }],
    summary: {
      brief: "Meeting one creates a temporary speaker; no long-term voice memory is written before human confirmation.",
      by_speaker: { "Unknown speaker 1": "Introduced themself as Jordan and set the initial date and room." },
      actions: ["Review and confirm Unknown speaker 1."],
    },
    transcript_meta: { source: "live_recording", source_label: "First recognition · awaiting confirmation", utterance_count: 2, speaker_count: 1 },
    confirmation: { proposal_id: "demo-proposal-first", status: "pending" },
    speaker_review: {
      status: "pending",
      speaker_count: 1,
      required_count: 1,
      preaccepted_count: 0,
      candidates: [],
      items: [{
        speaker_id: "pending:spk0",
        local_id: "spk0",
        display_name: "Unknown speaker 1",
        confidence: 0.78,
        needs_review: true,
        suggested_resolution: "new",
        reason: "new_voice",
      }],
    },
  };

  const projects = [{
    project_id: DEMO_PROJECT_ID,
    name: "Cultural Night",
    description: "SpeakBit demo: transcription, translation, confirmed speakers, and cross-meeting change tracking.",
    created_at: now - 86400000 * 8,
    updated_at: now,
  }];

  const meetingsByProject = {
    [DEMO_PROJECT_ID]: [
      {
        meeting_id: "demo-meeting-date",
        project_id: DEMO_PROJECT_ID,
        title: "Meeting 3 · Final date update",
        status: "ready",
        duration_s: 12,
        summary_brief: "The event date changed from March 15 to March 22; the rest of the confirmed plan remains current.",
        source: "demo",
        created_at: now - 1800000,
        updated_at: now,
      },
      {
        meeting_id: DEMO_MEETING_ID,
        project_id: DEMO_PROJECT_ID,
        title: "Meeting 2 · Plan changes",
        status: "ready",
        duration_s: 28,
        summary_brief: "Room, poster owner, food plan, and budget changes are linked to three speakers.",
        source: "demo",
        created_at: now - 3600000,
        updated_at: now,
      },
      {
        meeting_id: "demo-meeting-first",
        project_id: DEMO_PROJECT_ID,
        title: "Meeting 1 · Baseline and speaker confirmation",
        status: "ready",
        duration_s: 16,
        summary_brief: "A new voice stays unknown until a person confirms Jordan's identity.",
        source: "demo",
        created_at: now - 86400000,
        updated_at: now - 86400000,
      },
    ],
  };

  const resultsByMeeting = {
    [DEMO_MEETING_ID]: learnedResult(),
    "demo-meeting-first": firstMeetingResult,
    "demo-meeting-date": {
      ...learnedResult(),
      session_id: "demo-meeting-date",
      meeting_id: "demo-meeting-date",
      duration_s: 12,
      utterances: [{
        utterance_id: "utt-date-01",
        ...knownSpeakers[2],
        t0: 0,
        t1: 7.8,
        text: "The auditorium is available on March 22, so that is our final event date.",
        source_text: "The auditorium is available on March 22, so that is our final event date.",
        language: "en",
        voice_similarity: 0.93,
        speaker_decision: "known_voiceprint",
      }],
      speakers: [knownSpeakers[2]],
      summary: {
        brief: "The event date changed from March 15 to March 22.",
        by_speaker: { Maya: "Confirmed March 22 as the final event date." },
        actions: ["Jordan updates the final checklist with the March 22 date."],
      },
      transcript_meta: { source: "live_recording", source_label: "Live recognition · confirmed speaker", utterance_count: 1, speaker_count: 1 },
    },
  };

  const evaluationResult = {
    dataset: { scenarios: 10, segments: 158, nominal_speakers: 40 },
    provenance: {
      dataset_kind: "synthetic_tts",
      contains_real_human_speech: false,
      tts_voice_slots: 4,
    },
    asr: { status: "scored", segments: 158, cer: 0.0746216121, model: "B_80M" },
    speaker: {
      test_segments: 118,
      global_ann_first_sample: { correct: 11, accuracy: 0.093220339 },
      graph_candidate_C_first_sample: { correct: 104, accuracy: 0.881355932 },
      graph_candidate_C_confirmed_enhance: {
        correct: 107,
        accuracy: 0.906779661,
        by_prior_confirmed_samples: {
          "1": { correct: 33, total: 39, accuracy: 0.846153846 },
          "2": { correct: 26, total: 28, accuracy: 0.928571429 },
          "3+": { correct: 48, total: 51, accuracy: 0.941176471 },
        },
      },
    },
    names: {
      text_rules_only: { tp: 29, reference: 31, recall: 0.935483871, f1: 0.966666667 },
      graph_candidates_plus_self_intro: { tp: 31, reference: 31, recall: 1, f1: 1 },
    },
  };

  const evaluationSteps = ["data", "asr", "names", "speaker", "report"];
  let evaluationStartedAt = 0;
  let selectedAsrModel = "B_80M";
  let gmaCompleted = false;

  function asrInfo() {
    return {
      backend: "sherpa-onnx",
      model: selectedAsrModel,
      runtime_available: true,
      live_stream: true,
      live_chunk: true,
      language: "auto",
      translation_mode: "follow-locale",
      translation_target: "en",
    };
  }

  function evidenceSnapshot() {
    return {
      confirmed_samples: gmaCompleted ? 62 : 60,
      person_count: gmaCompleted ? 11 : 10,
      co_present_edges: 3,
      related_meeting_edges: 3,
      graph_nodes: (gmaCompleted ? 11 : 10) + 2,
      graph_edges: 6,
      people: clone(voiceprintPeople),
    };
  }

  function knowledgeSnapshot() {
    const evidence = evidenceSnapshot();
    return {
      evidence,
      voiceprints: clone(voiceprintPeople),
      graph: { nodes: evidence.graph_nodes, edges: 6, co_present_edges: 3, related_meeting_edges: 3 },
      active_adapter: {
        adapter_id: gmaCompleted ? "A_demo_v2" : "A_v1",
        status: "active",
        params: { adapter_kind: "threshold", match_threshold: 0.82, lora_weights: null },
      },
      candidates: gmaCompleted
        ? [{ adapter_id: "A_demo_v2", status: "promoted", params: { adapter_kind: "threshold", match_threshold: 0.82 } }]
        : [],
      speaker_embed: { mode: "sherpa", model_present: true },
    };
  }

  function graphSnapshot() {
    const people = voiceprintPeople.map((person) => ({ id: person.person_id, label: person.display_name, type: "person" }));
    const featured = people.slice(0, 4);
    if (gmaCompleted) featured.push({ id: "demo_person_jordan", label: "Jordan", type: "person" });
    return {
      nodes: [
        ...featured,
        { id: "session_demo_first", label: "Meeting 1", type: "session" },
        { id: "session_demo_learned", label: "Meeting 2", type: "session" },
      ],
      edges: [
        { source: featured[0].id, target: "session_demo_first", type: "attended", weight: 1 },
        { source: featured[1].id, target: "session_demo_first", type: "attended", weight: 1 },
        { source: featured[1].id, target: "session_demo_learned", type: "attended", weight: 1 },
        { source: featured[2].id, target: "session_demo_learned", type: "attended", weight: 1 },
        { source: featured[0].id, target: featured[1].id, type: "co_present", weight: 2 },
        ...(gmaCompleted ? [{ source: "demo_person_jordan", target: "session_demo_learned", type: "attended", weight: 2 }] : []),
      ],
    };
  }

  function evaluationSnapshot() {
    if (!evaluationStartedAt) {
      return {
        run_id: "eval_cached_demo",
        status: "completed",
        progress: 100,
        elapsed_s: 66.1,
        cached: true,
        steps: evaluationSteps.map((id) => ({ id, status: "completed" })),
        result: clone(evaluationResult),
        error: null,
      };
    }
    const elapsed = Date.now() - evaluationStartedAt;
    const progress = Math.min(100, Math.round(elapsed / 28));
    const completedSteps = Math.min(evaluationSteps.length, Math.floor(progress / 20));
    const steps = evaluationSteps.map((id, index) => ({
      id,
      status: index < completedSteps ? "completed" : index === completedSteps && progress < 100 ? "running" : "pending",
    }));
    if (progress >= 100) {
      evaluationStartedAt = 0;
      return {
        run_id: "eval_pages_demo",
        status: "completed",
        progress: 100,
        elapsed_s: 2.8,
        cached: false,
        steps: evaluationSteps.map((id) => ({ id, status: "completed" })),
        result: clone(evaluationResult),
        error: null,
      };
    }
    return {
      run_id: "eval_pages_demo",
      status: "running",
      progress,
      elapsed_s: Number((elapsed / 1000).toFixed(1)),
      cached: false,
      steps,
      result: null,
      error: null,
    };
  }

  function bodyFrom(options) {
    if (!options || typeof options.body !== "string") return {};
    try { return JSON.parse(options.body); } catch (_) { return {}; }
  }

  function findMeeting(meetingId) {
    for (const rows of Object.values(meetingsByProject)) {
      const meeting = rows.find((item) => item.meeting_id === meetingId);
      if (meeting) return meeting;
    }
    return null;
  }

  async function request(rawPath, options) {
    await wait(55);
    const method = String((options && options.method) || "GET").toUpperCase();
    const path = String(rawPath || "").split("?", 1)[0];
    const parts = path.split("/").filter(Boolean).map(decodeURIComponent);

    if (path === "/api/app-config") {
      return {
        edition: "speakbit",
        display_name: "SpeakBit · Student Innovation Project",
        legacy_data: false,
        demo_mode: true,
        features: {
          projects: true,
          speaker_confirmation: true,
          knowledge_graph: true,
          evaluation: true,
          project_memory: true,
          meeting_query: true,
          incremental_summary: true,
          live_translation: true,
        },
      };
    }
    if (path === "/api/health") {
      return {
        ok: true,
        edition: "speakbit",
        stage: "github-pages-demo",
        asr: asrInfo(),
        translation: { enabled: true, mode: "follow-locale", model: "Qwen2.5 (local package)" },
        speaker_embed: { mode: "sherpa", model_present: true },
        voiceprint_count: voiceprintPeople.length,
        active_adapter: gmaCompleted ? "A_demo_v2" : "A_v1",
        evidence: evidenceSnapshot(),
      };
    }
    if (path === "/api/asr/models") {
      return {
        current: selectedAsrModel,
        models: [
          { id: "B_80M", group: "streaming", label_key: "asrModel.b80m", hint_key: "asrModel.b80mHint", deployed: true, live_stream: true, live_chunk: true },
          { id: "A_14M", group: "streaming", label_key: "asrModel.a14m", hint_key: "asrModel.a14mHint", deployed: true, live_stream: true, live_chunk: true },
          { id: "SenseVoice_Small_INT8_2024", group: "chunk", label_key: "asrModel.sensevoiceSmall", hint_key: "asrModel.sensevoiceSmallHint", deployed: true, live_stream: false, live_chunk: true },
        ],
      };
    }
    if (path === "/api/asr/model" && method === "PUT") {
      selectedAsrModel = String(bodyFrom(options).model || "B_80M");
      return { ok: true, asr: asrInfo() };
    }
    if (path === "/api/projects" && method === "GET") return { projects: clone(projects) };
    if (path === "/api/projects" && method === "POST") {
      const body = bodyFrom(options);
      const id = `demo-project-${Date.now()}`;
      const project = { project_id: id, name: body.name || "New demo project", description: "Stored only for this browser demo session", created_at: Date.now(), updated_at: Date.now() };
      projects.push(project);
      meetingsByProject[id] = [];
      return clone(project);
    }
    if (path === "/api/test-data/meetings") return null;
    if (parts[0] === "api" && parts[1] === "projects" && parts[3] === "meetings") {
      const projectId = parts[2];
      const project = projects.find((item) => item.project_id === projectId);
      if (!project) throw new Error("Demo project not found");
      if (method === "GET") return { project: clone(project), meetings: clone(meetingsByProject[projectId] || []) };
      if (method === "POST") {
        const body = bodyFrom(options);
        const meetingId = `demo-meeting-${Date.now()}`;
        const meeting = { meeting_id: meetingId, project_id: projectId, title: body.title || "New demo meeting", status: "draft", duration_s: 0, summary_brief: "Select Start Recording to run the browser simulation", source: "demo", created_at: Date.now(), updated_at: Date.now() };
        meetingsByProject[projectId].unshift(meeting);
        resultsByMeeting[meetingId] = { ...learnedResult({ utterances: [], complete: false }), meeting_id: meetingId, session_id: meetingId, project_id: projectId };
        return clone(meeting);
      }
    }
    if (parts[0] === "api" && parts[1] === "meetings" && parts.length === 3) {
      const meeting = findMeeting(parts[2]);
      if (!meeting) throw new Error("Demo meeting not found");
      if (method === "DELETE") return { ok: true };
      return { meeting: clone(meeting), result: clone(resultsByMeeting[meeting.meeting_id]) };
    }
    if (parts[0] === "api" && parts[1] === "meetings" && parts[3] === "process") {
      const meeting = findMeeting(parts[2]);
      const result = { ...learnedResult(), meeting_id: parts[2], session_id: parts[2], project_id: meeting ? meeting.project_id : DEMO_PROJECT_ID };
      if (meeting) {
        meeting.status = "ready";
        meeting.updated_at = Date.now();
        meeting.summary_brief = result.summary.brief;
      }
      resultsByMeeting[parts[2]] = result;
      return { meeting: clone(meeting || meetingsByProject[DEMO_PROJECT_ID][0]), result: clone(result) };
    }
    if (parts[0] === "api" && parts[1] === "meetings" && parts[3] === "speakers" && parts[4] === "confirm") {
      const meeting = findMeeting(parts[2]) || findMeeting("demo-meeting-first");
      const result = learnedResult();
      result.meeting_id = meeting.meeting_id;
      result.session_id = meeting.meeting_id;
      result.confirmation = { proposal_id: "demo-proposal-first", status: "enhanced" };
      result.speaker_review = { status: "enhanced", items: [], speaker_count: 1, correction_count: 1 };
      resultsByMeeting[meeting.meeting_id] = result;
      return { meeting: { ...clone(meeting), status: "ready" }, result: clone(result) };
    }
    if (parts[0] === "api" && parts[1] === "projects" && parts[3] === "memory" && parts.length === 4) {
      return clone(learnedResult().project_memory);
    }
    if (parts[0] === "api" && parts[1] === "projects" && parts[3] === "memory" && parts[4] === "confirm") {
      const memory = learnedResult().project_memory;
      memory.current.push({ fact_key: "final_checklist", label: "Final checklist", value: "Confirm room, owners, food plan, and budget", version: 1 });
      memory.proposals = [];
      return { ok: true, memory };
    }
    if (parts[0] === "api" && parts[1] === "projects" && parts[3] === "query") {
      return {
        answer: "Cultural Night is scheduled for March 22 in the auditorium. Jordan owns the posters, packaged food is required, and the current budget is $280.",
        evidence: [
          { meeting_title: "Meeting 2 · Plan changes", time_label: "00:15", speaker: "Ava", text: learnedUtterances[3].source_text, source: "ASR" },
          { meeting_title: "Meeting 3 · Final date update", time_label: "00:00", speaker: "Maya", text: "The auditorium is available on March 22, so that is our final event date.", source: "ASR" },
        ],
      };
    }
    if (path === "/api/graph") return graphSnapshot();
    if (path === "/api/knowledge") return knowledgeSnapshot();
    if (path === "/api/demo/getting-more-accurate" && method === "POST") {
      const personName = String(bodyFrom(options).person_name || "Jordan");
      await wait(450);
      gmaCompleted = true;
      if (!voiceprintPeople.some((item) => item.person_id === "demo_person_jordan")) {
        voiceprintPeople = [...voiceprintPeople, { person_id: "demo_person_jordan", display_name: personName, sample_count: 2, prototype_count: 1, hit_count: 1, embedding_dim: 512, identity_scope: "browser_demo_only" }];
      }
      return {
        person_name: personName,
        before: { people: 10, samples: 60 },
        after: { people: 11, samples: 62 },
        note: "Pages runs the same interaction flow with simulated data. Use the portable edition for real local voiceprint inference.",
        steps: [
          { id: 1, title: "Before confirmation: long-term memory is unchanged", ok: true, counts: { people: 10, samples: 60, graph_nodes: 12, graph_edges: 5 } },
          { id: 2, title: "Meeting 1: processing pauses for identity review", ok: true, counts: { people: 10, samples: 60, graph_nodes: 12, graph_edges: 5 } },
          { id: 3, title: "Confirm Jordan: add the person and voice sample", ok: true, counts: { people: 11, samples: 61, graph_nodes: 13, graph_edges: 6 } },
          { id: 4, title: "Meeting 2: recognize Jordan without another introduction", ok: true, matched_person_id: "demo_person_jordan" },
          { id: 5, title: "Confirm again: add more evidence for the same person", ok: true, counts: { people: 11, samples: 62, graph_nodes: 13, graph_edges: 6 } },
          { id: 6, title: "Slow path: fine_tune → evaluate → promote", ok: true, adapter_id: "A_demo_v2" },
        ],
      };
    }
    if (path === "/api/evaluation/test-data" && method === "GET") return evaluationSnapshot();
    if (path === "/api/evaluation/test-data/run" && method === "POST") {
      evaluationStartedAt = Date.now();
      return evaluationSnapshot();
    }
    if (path === "/api/voiceprints/enroll" && method === "POST") {
      const body = bodyFrom(options);
      return { ok: true, person: { person_id: body.person_id || "demo_self", display_name: body.display_name || "Demo user", sample_count: 1, hit_count: 1 } };
    }
    throw new Error(`GitHub Pages demo endpoint is not simulated: ${method} ${path}`);
  }

  let bridge = null;
  let recordingTimer = null;
  let recordingIndex = 0;
  let recordingActive = false;

  function demoButtons() {
    return {
      run: document.getElementById("demoRunButton"),
      graph: document.getElementById("demoGraphButton"),
      record: document.getElementById("btnRecord"),
      stop: document.getElementById("btnStop"),
      meter: document.getElementById("meterBar"),
      speaking: document.getElementById("liveSpeakingRow"),
    };
  }

  function updateRecordingControls(active) {
    const elements = demoButtons();
    recordingActive = active;
    document.body.classList.toggle("pages-demo-recording", active);
    if (elements.run) {
      elements.run.disabled = active;
      elements.run.textContent = active ? "Demo running…" : "Run meeting demo";
    }
    if (elements.record) {
      elements.record.disabled = active;
      elements.record.classList.toggle("live", active);
      elements.record.textContent = active ? "Recording · Pages demo" : "Start Recording";
    }
    if (elements.stop) elements.stop.disabled = !active;
    if (elements.speaking) elements.speaking.classList.toggle("hidden", !active);
    if (!active && elements.meter) elements.meter.style.width = "0%";
  }

  function renderRecordingFrame(complete) {
    if (!bridge) return;
    const utterances = learnedUtterances.slice(0, recordingIndex);
    bridge.renderResult({ result: learnedResult({ utterances, complete }) });
    const elements = demoButtons();
    if (elements.meter) elements.meter.style.width = complete ? "0%" : `${35 + (recordingIndex * 13) % 58}%`;
    bridge.setStatus(complete
      ? "Demo complete · transcript, translation, speakers, and notes are synchronized"
      : `Recording · ${recordingIndex}/${learnedUtterances.length} segments finalized`);
  }

  function finishRecordingDemo() {
    if (recordingTimer) {
      clearInterval(recordingTimer);
      recordingTimer = null;
    }
    recordingIndex = learnedUtterances.length;
    renderRecordingFrame(true);
    updateRecordingControls(false);
    const badge = document.getElementById("detailBadge");
    if (badge) {
      badge.textContent = "已完成";
      badge.className = "badge ready";
    }
    window.__VOICEWEAVE_DEMO_LAST_RUN__ = "completed";
  }

  async function runGuidedDemo() {
    if (!bridge || recordingActive) return;
    await bridge.loadTree();
    const node = bridge.state.tree.find((item) => item.project.project_id === DEMO_PROJECT_ID);
    const meeting = node && node.meetings.find((item) => item.meeting_id === DEMO_MEETING_ID);
    if (!node || !meeting) throw new Error("Demo meeting did not load");
    await bridge.openMeeting(node.project, meeting);
    bridge.state.showTranslation = true;
    const toggle = document.getElementById("toggleTranslation");
    if (toggle) toggle.checked = true;
    recordingIndex = 0;
    updateRecordingControls(true);
    renderRecordingFrame(false);
    const detail = document.getElementById("viewDetail");
    if (detail) detail.scrollIntoView({ behavior: "smooth", block: "start" });
    recordingTimer = setInterval(() => {
      recordingIndex += 1;
      if (recordingIndex >= learnedUtterances.length) {
        finishRecordingDemo();
        return;
      }
      renderRecordingFrame(false);
    }, 780);
  }

  async function openGraphDemo() {
    const nav = document.getElementById("navGraph");
    if (nav) nav.click();
    await wait(180);
    const panel = document.getElementById("gmaDemoPanel");
    if (panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function bindDemoControls() {
    const run = document.getElementById("demoRunButton");
    const graph = document.getElementById("demoGraphButton");
    if (run && !run.dataset.bound) {
      run.dataset.bound = "true";
      run.addEventListener("click", () => runGuidedDemo().catch((error) => bridge && bridge.setStatus(error.message)));
    }
    if (graph && !graph.dataset.bound) {
      graph.dataset.bound = "true";
      graph.addEventListener("click", () => openGraphDemo());
    }
  }

  window.VoiceWeaveDemoApi = { request };
  window.VoiceWeaveDemoRuntime = {
    attach(appBridge) {
      bridge = appBridge;
      if (window.VoiceGraphI18n && typeof window.VoiceGraphI18n.setLocale === "function") {
        window.VoiceGraphI18n.setLocale("en-US");
      }
      bridge.state.showTranslation = true;
      bindDemoControls();
      window.__VOICEWEAVE_DEMO_READY__ = true;
      document.dispatchEvent(new CustomEvent("voiceweave-demo-ready"));
    },
    startRecording: runGuidedDemo,
    stopRecording() {
      if (!recordingActive) return false;
      finishRecordingDemo();
      return true;
    },
    async processUpload() {
      await runGuidedDemo();
    },
    runGuidedDemo,
    openGraphDemo,
  };
  document.addEventListener("DOMContentLoaded", bindDemoControls, { once: true });
})();
