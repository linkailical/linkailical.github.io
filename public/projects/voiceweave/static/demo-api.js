(function () {
  "use strict";

  const DEMO_PROJECT_ID = "voiceweave-demo";
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
      speaker_id: "demo_person_lin_kai",
      local_id: "spk0",
      display_name: "林楷",
      canonical_name: "林楷",
      role: "产品负责人",
      conf: 0.94,
      matched: true,
      identity_status: "confirmed",
      identity_source: "voiceprint",
    },
    {
      speaker_id: "demo_person_chen_yu",
      local_id: "spk1",
      display_name: "陈雨",
      canonical_name: "陈雨",
      role: "演示负责人",
      conf: 0.91,
      matched: true,
      identity_status: "confirmed",
      identity_source: "voiceprint",
    },
    {
      speaker_id: "demo_person_alex",
      local_id: "spk2",
      display_name: "Alex Chen",
      canonical_name: "Alex Chen",
      role: "国际交流",
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
      text: "大家好，我是林楷。今天确认路演版本的核心流程。",
      source_text: "大家好，我是林楷。今天确认路演版本的核心流程。",
      language: "zh-CN",
      voice_similarity: 0.94,
      speaker_decision: "known_voiceprint",
    },
    {
      utterance_id: "utt-demo-02",
      ...knownSpeakers[2],
      t0: 4.4,
      t1: 9.6,
      text: "现场录音会同步显示英文发言的中文翻译。",
      source_text: "The live transcript will show a Chinese translation while I am speaking.",
      language: "en",
      translation_target: "zh-CN",
      translation_fallback: false,
      voice_similarity: 0.89,
      speaker_decision: "known_voiceprint",
    },
    {
      utterance_id: "utt-demo-03",
      ...knownSpeakers[1],
      t0: 10,
      t1: 15.3,
      text: "我负责展示第一次未知、人工确认、第二次自动命中的过程。",
      source_text: "我负责展示第一次未知、人工确认、第二次自动命中的过程。",
      language: "zh-CN",
      voice_similarity: 0.91,
      speaker_decision: "known_voiceprint",
    },
    {
      utterance_id: "utt-demo-04",
      ...knownSpeakers[0],
      t0: 15.7,
      t1: 21.4,
      text: "所有长期记忆都要经过人工确认，自动猜测不会写入正式声纹库。",
      source_text: "所有长期记忆都要经过人工确认，自动猜测不会写入正式声纹库。",
      language: "zh-CN",
      voice_similarity: 0.96,
      speaker_decision: "known_voiceprint",
    },
    {
      utterance_id: "utt-demo-05",
      ...knownSpeakers[2],
      t0: 21.8,
      t1: 27.5,
      text: "演示结束后，我们导出会议纪要并检查人物关系图。",
      source_text: "After the demo, we will export the notes and inspect the people graph.",
      language: "en",
      translation_target: "zh-CN",
      translation_fallback: false,
      voice_similarity: 0.92,
      speaker_decision: "known_voiceprint",
    },
  ];

  function summaryFor(utterances, complete) {
    const hasAlex = utterances.some((item) => item.speaker_id === "demo_person_alex");
    const hasChen = utterances.some((item) => item.speaker_id === "demo_person_chen_yu");
    const bySpeaker = {};
    if (utterances.some((item) => item.speaker_id === "demo_person_lin_kai")) {
      bySpeaker["林楷"] = "确认路演核心流程，并强调只有人工确认的证据才能进入长期记忆。";
    }
    if (hasAlex) bySpeaker["Alex Chen"] = "验证英文发言可在录音中同步翻译，并提出演示后检查关系图。";
    if (hasChen) bySpeaker["陈雨"] = "负责展示首次未知、人工确认和下一场自动命中的学习闭环。";
    return {
      brief: complete
        ? "路演版已覆盖录音中转写、翻译、发言人识别、会议纪要和确认后持续学习。"
        : utterances.length
          ? "正在根据已定稿发言增量更新会议纪要……"
          : "",
      by_speaker: bySpeaker,
      actions: complete
        ? ["陈雨完成两场“越用越准”演示。", "Alex Chen 检查双语字幕与关系图。"]
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
        source_label: complete ? "录音中实时识别 · Pages 演示数据" : "录音中实时识别 · 正在生成",
        utterance_count: utterances.length,
        speaker_count: speakers.length,
      },
      translation: {
        translation_mode: "follow-locale",
        translation_targets: ["zh-CN"],
        translation_fallback: false,
      },
      project_memory: {
        current: [
          { fact_key: "demo_date", label: "路演日期", value: "9 月 12 日", version: 2 },
          { fact_key: "demo_owner", label: "演示负责人", value: "陈雨", version: 1 },
        ],
        proposals: complete
          ? [{
              proposal_id: "memory_demo_export",
              meeting_id: DEMO_MEETING_ID,
              fact_key: "demo_check",
              label: "路演检查项",
              value: "导出纪要并检查人物关系图",
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
        display_name: "未知说话人 1",
        role: "",
        t0: 0,
        t1: 7.5,
        text: "大家好，我是林楷。第一次见面时系统还没有我的声纹。",
        source_text: "大家好，我是林楷。第一次见面时系统还没有我的声纹。",
        language: "zh-CN",
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
        display_name: "未知说话人 1",
        role: "",
        t0: 8,
        t1: 15.8,
        text: "人工确认后，这段声音才会进入长期库。",
        source_text: "人工确认后，这段声音才会进入长期库。",
        language: "zh-CN",
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
      display_name: "未知说话人 1",
      conf: 0.78,
      identity_status: "resolved",
      identity_source: "voice_cluster",
      unidentified: true,
    }],
    summary: {
      brief: "第一场只形成临时说话人；确认之前不写入长期声纹库。",
      by_speaker: { "未知说话人 1": "自我介绍为林楷，并说明确认后才允许写入长期记忆。" },
      actions: ["人工复核未知说话人 1 的身份。"],
    },
    transcript_meta: { source: "live_recording", source_label: "首次识别 · 待人工确认", utterance_count: 2, speaker_count: 1 },
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
        display_name: "未知说话人 1",
        confidence: 0.78,
        needs_review: true,
        suggested_resolution: "new",
        reason: "new_voice",
      }],
    },
  };

  const projects = [{
    project_id: DEMO_PROJECT_ID,
    name: "VoiceWeave 创新赛演示",
    description: "录音中转写、翻译、发言人识别与确认后持续学习。",
    created_at: now - 86400000 * 8,
    updated_at: now,
  }];

  const meetingsByProject = {
    [DEMO_PROJECT_ID]: [
      {
        meeting_id: DEMO_MEETING_ID,
        project_id: DEMO_PROJECT_ID,
        title: "路演准备会 · 第二场（已学习）",
        status: "ready",
        duration_s: 28,
        summary_brief: "已同步完成转写、翻译和三位发言人识别。",
        source: "demo",
        created_at: now - 3600000,
        updated_at: now,
      },
      {
        meeting_id: "demo-meeting-first",
        project_id: DEMO_PROJECT_ID,
        title: "第一次见面 · 未知声音待确认",
        status: "ready",
        duration_s: 16,
        summary_brief: "首次出现的声音保持未知，人工确认前不进入长期库。",
        source: "demo",
        created_at: now - 86400000,
        updated_at: now - 86400000,
      },
    ],
  };

  const resultsByMeeting = {
    [DEMO_MEETING_ID]: learnedResult(),
    "demo-meeting-first": firstMeetingResult,
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
      translation_target: "zh-CN",
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
    if (gmaCompleted) featured.push({ id: "demo_person_lin_kai", label: "林楷", type: "person" });
    return {
      nodes: [
        ...featured,
        { id: "session_demo_first", label: "第一次见面", type: "session" },
        { id: "session_demo_learned", label: "路演准备会", type: "session" },
      ],
      edges: [
        { source: featured[0].id, target: "session_demo_first", type: "attended", weight: 1 },
        { source: featured[1].id, target: "session_demo_first", type: "attended", weight: 1 },
        { source: featured[1].id, target: "session_demo_learned", type: "attended", weight: 1 },
        { source: featured[2].id, target: "session_demo_learned", type: "attended", weight: 1 },
        { source: featured[0].id, target: featured[1].id, type: "co_present", weight: 2 },
        ...(gmaCompleted ? [{ source: "demo_person_lin_kai", target: "session_demo_learned", type: "attended", weight: 2 }] : []),
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
        display_name: "VoiceWeave · 中学生创新比赛",
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
      const project = { project_id: id, name: body.name || "新建演示项目", description: "仅保存在本次浏览器演示中", created_at: Date.now(), updated_at: Date.now() };
      projects.push(project);
      meetingsByProject[id] = [];
      return clone(project);
    }
    if (path === "/api/test-data/meetings") return null;
    if (parts[0] === "api" && parts[1] === "projects" && parts[3] === "meetings") {
      const projectId = parts[2];
      const project = projects.find((item) => item.project_id === projectId);
      if (!project) throw new Error("演示项目不存在");
      if (method === "GET") return { project: clone(project), meetings: clone(meetingsByProject[projectId] || []) };
      if (method === "POST") {
        const body = bodyFrom(options);
        const meetingId = `demo-meeting-${Date.now()}`;
        const meeting = { meeting_id: meetingId, project_id: projectId, title: body.title || "新的演示会议", status: "draft", duration_s: 0, summary_brief: "点击开始录音运行静态演示", source: "demo", created_at: Date.now(), updated_at: Date.now() };
        meetingsByProject[projectId].unshift(meeting);
        resultsByMeeting[meetingId] = { ...learnedResult({ utterances: [], complete: false }), meeting_id: meetingId, session_id: meetingId, project_id: projectId };
        return clone(meeting);
      }
    }
    if (parts[0] === "api" && parts[1] === "meetings" && parts.length === 3) {
      const meeting = findMeeting(parts[2]);
      if (!meeting) throw new Error("演示会议不存在");
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
      const meeting = findMeeting(parts[2]) || meetingsByProject[DEMO_PROJECT_ID][1];
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
      memory.current.push({ fact_key: "demo_check", label: "路演检查项", value: "导出纪要并检查人物关系图", version: 1 });
      memory.proposals = [];
      return { ok: true, memory };
    }
    if (parts[0] === "api" && parts[1] === "projects" && parts[3] === "query") {
      return {
        answer: "项目已进入路演演示阶段。当前重点是稳定展示录音中转写、双语翻译、发言人识别，以及人工确认后下一场自动命中的闭环。",
        evidence: [
          { meeting_title: "路演准备会 · 第二场（已学习）", time_label: "00:15", speaker: "林楷", text: learnedUtterances[3].source_text, source: "ASR" },
          { meeting_title: "路演准备会 · 第二场（已学习）", time_label: "00:21", speaker: "Alex Chen", text: learnedUtterances[4].source_text, source: "ASR" },
        ],
      };
    }
    if (path === "/api/graph") return graphSnapshot();
    if (path === "/api/knowledge") return knowledgeSnapshot();
    if (path === "/api/demo/getting-more-accurate" && method === "POST") {
      const personName = String(bodyFrom(options).person_name || "林楷");
      await wait(450);
      gmaCompleted = true;
      if (!voiceprintPeople.some((item) => item.person_id === "demo_person_lin_kai")) {
        voiceprintPeople = [...voiceprintPeople, { person_id: "demo_person_lin_kai", display_name: personName, sample_count: 2, prototype_count: 1, hit_count: 1, embedding_dim: 512, identity_scope: "browser_demo_only" }];
      }
      return {
        person_name: personName,
        before: { people: 10, samples: 60 },
        after: { people: 11, samples: 62 },
        note: "Pages 运行的是同构流程模拟；真实声纹推理请使用本地完整版。",
        steps: [
          { id: 1, title: "开始前：未确认不进长期库", ok: true, counts: { people: 10, samples: 60, graph_nodes: 12, graph_edges: 5 } },
          { id: 2, title: "第一场：处理停在待确认", ok: true, counts: { people: 10, samples: 60, graph_nodes: 12, graph_edges: 5 } },
          { id: 3, title: "确认写入：样本和人物进入长期库", ok: true, counts: { people: 11, samples: 61, graph_nodes: 13, graph_edges: 6 } },
          { id: 4, title: "第二场：未再点名即命中已确认人物", ok: true, matched_person_id: "demo_person_lin_kai" },
          { id: 5, title: "再确认：同人样本继续增加", ok: true, counts: { people: 11, samples: 62, graph_nodes: 13, graph_edges: 6 } },
          { id: 6, title: "慢路径：fine_tune → evaluate → promote", ok: true, adapter_id: "A_demo_v2" },
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
      return { ok: true, person: { person_id: body.person_id || "demo_self", display_name: body.display_name || "演示用户", sample_count: 1, hit_count: 1 } };
    }
    throw new Error(`GitHub Pages 演示尚未模拟接口：${method} ${path}`);
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
      elements.run.textContent = active ? "演示运行中…" : "运行录音识别演示";
    }
    if (elements.record) {
      elements.record.disabled = active;
      elements.record.classList.toggle("live", active);
      elements.record.textContent = active ? "录音中 · Pages 演示" : "开始录音";
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
      ? "演示完成 · 已同步转写、翻译、发言人识别和纪要"
      : `录音中 · 已定稿 ${recordingIndex}/${learnedUtterances.length} 段`);
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
    if (!node || !meeting) throw new Error("演示会议未加载");
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
