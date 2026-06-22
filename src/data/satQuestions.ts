// AUTO-PORTED from satStudy/data/*.js — the canonical source.
// If you edit the SAT bank/lessons, edit them in the satStudy repo and re-port.
// Bilingual values are { en, zh }; question stems stay English (it is an English exam).

export type Bil = { en: string; zh: string };

export interface SatQuestion {
  id: string; section: "rw" | "math"; skill: string;
  difficulty: 1 | 2 | 3; passage?: string; stem: string;
  choices: string[]; answer: number; explain: Bil;
}

export const SAT_QUESTIONS: SatQuestion[] = [
  {
    "id": "rw-info-1",
    "section": "rw",
    "skill": "rw-info",
    "difficulty": 1,
    "passage": "Honeybees communicate the location of food through a 'waggle dance.' The angle of the dance relative to vertical encodes the direction of the food relative to the sun, and the duration of the waggle encodes the distance.",
    "stem": "Which choice best states the main idea of the text?",
    "choices": [
      "Honeybees encode both direction and distance to food in a dance.",
      "Honeybees can only find food when the sun is visible.",
      "The waggle dance is the fastest way bees travel.",
      "Bees prefer food that is far from the hive."
    ],
    "answer": 0,
    "explain": {
      "en": "The text says the angle encodes direction and the duration encodes distance — choice A captures both. B, C and D add claims the text never makes (visibility of the sun, travel speed, food preference).",
      "zh": "原文说角度编码方向、时长编码距离——A 同时涵盖两者。B、C、D 都加入了原文未提及的说法（太阳可见性、移动速度、食物偏好）。"
    }
  },
  {
    "id": "rw-info-2",
    "section": "rw",
    "skill": "rw-info",
    "difficulty": 2,
    "passage": "Archaeologists once assumed the city was abandoned after a drought. Recent excavations, however, uncovered well-maintained granaries and repaired walls dating to the supposed period of collapse.",
    "stem": "Which choice best describes what the new evidence implies?",
    "choices": [
      "The city may have remained active during the period once thought to be its collapse.",
      "The drought never actually occurred.",
      "The granaries were built long after the city was abandoned.",
      "Archaeologists no longer study the city."
    ],
    "answer": 0,
    "explain": {
      "en": "Maintained granaries and repaired walls suggest ongoing activity, undercutting the abandonment assumption — A. B overreaches (the text doesn't deny the drought); C contradicts the dating; D is unsupported.",
      "zh": "维护良好的粮仓与修补的城墙说明城市仍在运作，动摇了“被废弃”的假设——选 A。B 过度（原文未否认干旱）；C 与断代矛盾；D 无依据。"
    }
  },
  {
    "id": "rw-info-3",
    "section": "rw",
    "skill": "rw-info",
    "difficulty": 2,
    "passage": "A researcher claims that urban gardens measurably cool their neighborhoods.",
    "stem": "Which finding, if true, would most directly support the researcher's claim?",
    "choices": [
      "Blocks with gardens averaged 2°C cooler than nearby blocks without them.",
      "Residents reported enjoying the gardens.",
      "Gardens increased local property values.",
      "More people walked past blocks with gardens."
    ],
    "answer": 0,
    "explain": {
      "en": "The claim is specifically about cooling, so direct temperature data (A) supports it. Enjoyment, property values and foot traffic are on-topic but don't measure temperature.",
      "zh": "论点明确是“降温”，因此直接的温度数据（A）能支持它。喜爱程度、房价、人流量虽相关，却没测量温度。"
    }
  },
  {
    "id": "rw-info-4",
    "section": "rw",
    "skill": "rw-info",
    "difficulty": 3,
    "passage": "The novelist rarely described settings in detail. Instead, she trusted readers to supply the scenery themselves, believing that an imagined room is more vivid than a described one.",
    "stem": "It can reasonably be inferred that the novelist valued",
    "choices": [
      "the reader's active imagination over exhaustive description.",
      "historical accuracy above all else.",
      "long, ornate descriptions of rooms.",
      "writing only about places she had visited."
    ],
    "answer": 0,
    "explain": {
      "en": "'Trusted readers to supply the scenery' and 'imagined room is more vivid' point to valuing the reader's imagination (A). C directly contradicts the text; B and D are never mentioned.",
      "zh": "“信任读者自行补足场景”和“想象的房间更生动”表明她重视读者的想象（A）。C 与原文直接矛盾；B、D 从未提及。"
    }
  },
  {
    "id": "rw-info-5",
    "section": "rw",
    "skill": "rw-info",
    "difficulty": 1,
    "passage": "Unlike most owls, which hunt at night, the burrowing owl is often active during the day.",
    "stem": "According to the text, the burrowing owl differs from most owls in that it",
    "choices": [
      "is frequently active in daytime.",
      "cannot see in the dark.",
      "does not hunt at all.",
      "lives underground year-round."
    ],
    "answer": 0,
    "explain": {
      "en": "The contrast 'unlike most owls, which hunt at night' sets up that this owl is active by day (A). The text says nothing about poor night vision (B), not hunting (C), or year-round burrowing (D).",
      "zh": "对比句“unlike most owls, which hunt at night”表明这种猫头鹰白天活动（A）。原文未提及夜视差（B）、不捕猎（C）或终年穴居（D）。"
    }
  },
  {
    "id": "rw-craft-1",
    "section": "rw",
    "skill": "rw-craft",
    "difficulty": 1,
    "passage": "The bridge's design was so ______ that engineers from other countries traveled to study it.",
    "stem": "Which choice completes the text with the most logical and precise word?",
    "choices": [
      "innovative",
      "ordinary",
      "fragile",
      "expensive"
    ],
    "answer": 0,
    "explain": {
      "en": "Engineers traveling to study it implies the design was notably new — 'innovative' (A). 'Ordinary' contradicts that; 'fragile' and 'expensive' aren't reasons others would come to learn from it.",
      "zh": "工程师远道来研究，说明设计相当新颖——“innovative”（A）。“ordinary”与之矛盾；“fragile”“expensive”都不是别人来学习的理由。"
    }
  },
  {
    "id": "rw-craft-2",
    "section": "rw",
    "skill": "rw-craft",
    "difficulty": 2,
    "passage": "Early critics dismissed the painter's loose brushwork as careless. Today, that same looseness is ______ as a deliberate break from rigid academic technique.",
    "stem": "Which choice completes the text with the most logical and precise word?",
    "choices": [
      "celebrated",
      "ignored",
      "concealed",
      "regretted"
    ],
    "answer": 0,
    "explain": {
      "en": "The contrast with early dismissal ('Today, that same looseness') signals a positive reappraisal — 'celebrated' (A). The other words don't fit a reversal from criticism to praise.",
      "zh": "与早期否定形成对比（“Today, that same looseness”）表明正面的重新评价——“celebrated”（A）。其余词不符合从批评到赞誉的转变。"
    }
  },
  {
    "id": "rw-craft-3",
    "section": "rw",
    "skill": "rw-craft",
    "difficulty": 2,
    "passage": "The author opens the article with a vivid anecdote about a single patient before presenting national statistics on the disease.",
    "stem": "What is the most likely purpose of opening with the anecdote?",
    "choices": [
      "To give a human face to the data that follows.",
      "To argue that statistics are unreliable.",
      "To entertain readers with an unrelated story.",
      "To conclude the author's argument."
    ],
    "answer": 0,
    "explain": {
      "en": "A personal story before statistics typically humanizes the issue (A). The anecdote precedes, not concludes (D); nothing suggests it attacks statistics (B) or is unrelated (C).",
      "zh": "在统计数据前讲个人故事通常是为了让议题更有人情味（A）。轶事在前而非作结（D）；没有迹象表明它否定统计（B）或与主题无关（C）。"
    }
  },
  {
    "id": "rw-craft-4",
    "section": "rw",
    "skill": "rw-craft",
    "difficulty": 3,
    "passage": "Text 1: A linguist argues that children learn grammar mainly by imitating the speech around them.\nText 2: Another linguist notes that children routinely produce sentences they have never heard, such as 'I goed,' which no adult models.",
    "stem": "How would the author of Text 2 most likely respond to the claim in Text 1?",
    "choices": [
      "By arguing that imitation alone cannot explain novel errors children invent.",
      "By agreeing that imitation fully explains grammar learning.",
      "By denying that children make grammatical errors.",
      "By suggesting children do not learn grammar at all."
    ],
    "answer": 0,
    "explain": {
      "en": "Text 2's example ('I goed') is something children invent, not imitate, challenging Text 1 — A. B agrees with the opposing view; C and D contradict Text 2's own observation.",
      "zh": "文本2的例子（“I goed”）是儿童自创而非模仿，正好反驳文本1——A。B 赞同对立观点；C、D 与文本2自身的观察矛盾。"
    }
  },
  {
    "id": "rw-craft-5",
    "section": "rw",
    "skill": "rw-craft",
    "difficulty": 1,
    "passage": "Although the recipe looked complicated, the steps were actually quite ______ once she read them carefully.",
    "stem": "Which choice completes the text with the most logical and precise word?",
    "choices": [
      "straightforward",
      "confusing",
      "expensive",
      "dangerous"
    ],
    "answer": 0,
    "explain": {
      "en": "'Although ... complicated ... actually quite' signals a contrast, so the blank means easy — 'straightforward' (A). 'Confusing' repeats the first idea instead of contrasting it.",
      "zh": "“Although … complicated … actually quite”表示对比，故空白意为“容易”——“straightforward”（A）。“confusing”是重复前意而非对比。"
    }
  },
  {
    "id": "rw-express-1",
    "section": "rw",
    "skill": "rw-express",
    "difficulty": 1,
    "passage": "The factory cut its energy use by 30%. ______, it reduced its waste output by half.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "Additionally",
      "However",
      "Nevertheless",
      "In contrast"
    ],
    "answer": 0,
    "explain": {
      "en": "Both sentences list improvements, so an additive transition fits — 'Additionally' (A). 'However,' 'Nevertheless' and 'In contrast' all signal opposition, which there isn't.",
      "zh": "两句都在列举改进，应用递进——“Additionally”（A）。“However”“Nevertheless”“In contrast”都表转折，而此处并无转折。"
    }
  },
  {
    "id": "rw-express-2",
    "section": "rw",
    "skill": "rw-express",
    "difficulty": 2,
    "passage": "The medicine relieved symptoms within hours. ______, it did nothing to address the underlying cause of the illness.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "However",
      "Therefore",
      "Likewise",
      "For example"
    ],
    "answer": 0,
    "explain": {
      "en": "The second sentence contrasts a benefit with a limitation, so a contrast word fits — 'However' (A). 'Therefore' implies cause/effect; 'Likewise' implies similarity; 'For example' implies illustration.",
      "zh": "第二句把好处与局限对比，应用转折词——“However”（A）。“Therefore”表因果；“Likewise”表相似；“For example”表举例。"
    }
  },
  {
    "id": "rw-express-3",
    "section": "rw",
    "skill": "rw-express",
    "difficulty": 2,
    "passage": "While researching, a student takes these notes:\n• The river flooded in 1931 and 1998.\n• Both floods followed unusually heavy spring rains.\n• The 1998 flood caused more damage than the 1931 flood.",
    "stem": "The student wants to emphasize a shared cause of the two floods. Which choice best uses the notes to accomplish this goal?",
    "choices": [
      "Both the 1931 and 1998 floods followed unusually heavy spring rains.",
      "The 1998 flood caused more damage than the 1931 flood.",
      "The river flooded in 1931 and again in 1998.",
      "Heavy spring rains are common in the region."
    ],
    "answer": 0,
    "explain": {
      "en": "The goal is a shared cause; only A names the common cause (heavy spring rains) of both floods. B emphasizes a difference, C just lists dates, and D drifts from the notes.",
      "zh": "目标是“共同原因”；只有 A 指出两次洪水的共同原因（春季暴雨）。B 强调差异，C 仅列日期，D 偏离了笔记。"
    }
  },
  {
    "id": "rw-express-4",
    "section": "rw",
    "skill": "rw-express",
    "difficulty": 3,
    "passage": "Notes:\n• Solar panels were once too costly for most homes.\n• Manufacturing improvements cut prices by over 80% since 2010.\n• Many homeowners now install them to save money.",
    "stem": "The student wants to explain why home solar has become widespread. Which choice best accomplishes this goal?",
    "choices": [
      "Because manufacturing improvements cut prices by over 80% since 2010, many homeowners now install solar panels to save money.",
      "Solar panels were once too costly for most homes.",
      "Manufacturing has improved in many industries.",
      "Some homeowners are interested in solar panels."
    ],
    "answer": 0,
    "explain": {
      "en": "Explaining 'why it became widespread' needs the cause (price drop) linked to the effect (more installs) — A does both. B gives only the old state; C is too general; D is vague and weak.",
      "zh": "解释“为何普及”需把原因（降价）与结果（更多安装）联系起来——A 二者兼具。B 只给旧状况；C 太笼统；D 含糊无力。"
    }
  },
  {
    "id": "rw-express-5",
    "section": "rw",
    "skill": "rw-express",
    "difficulty": 1,
    "passage": "She trained for months. ______, she finished the marathon in record time.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "As a result",
      "Nevertheless",
      "In contrast",
      "For instance"
    ],
    "answer": 0,
    "explain": {
      "en": "Training led to the strong finish — a cause/effect link, so 'As a result' (A). The others signal contrast or example, which don't match.",
      "zh": "训练带来好成绩——因果关系，故用“As a result”（A）。其余表转折或举例，均不符。"
    }
  },
  {
    "id": "rw-conv-1",
    "section": "rw",
    "skill": "rw-conv",
    "difficulty": 1,
    "passage": "The museum opened a new wing ______ it now displays modern sculpture.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      ", and",
      ",",
      " and which",
      "; which"
    ],
    "answer": 0,
    "explain": {
      "en": "Two independent clauses joined need a comma + conjunction — ', and' (A). A lone comma (B) is a comma splice; the other options create grammatically broken or redundant joins.",
      "zh": "两个独立分句相连需“逗号 + 连词”——“, and”（A）。单逗号（B）是逗号粘连；其余选项造成语法错误或冗余。"
    }
  },
  {
    "id": "rw-conv-2",
    "section": "rw",
    "skill": "rw-conv",
    "difficulty": 2,
    "passage": "The collection of rare coins ______ kept in a locked vault.",
    "stem": "Which choice conforms to the conventions of Standard English?",
    "choices": [
      "is",
      "are",
      "were",
      "have been"
    ],
    "answer": 0,
    "explain": {
      "en": "The subject is 'collection' (singular) — 'of rare coins' is just a modifier — so the verb is singular: 'is' (A). The plural verbs agree with 'coins,' which is not the real subject.",
      "zh": "主语是“collection”（单数）——“of rare coins”只是修饰语——故动词用单数“is”（A）。复数动词是与并非真正主语的“coins”一致。"
    }
  },
  {
    "id": "rw-conv-3",
    "section": "rw",
    "skill": "rw-conv",
    "difficulty": 2,
    "passage": "Marie Curie, the first person to win two Nobel Prizes ______ remains a scientific icon.",
    "stem": "Which choice conforms to the conventions of Standard English?",
    "choices": [
      ",",
      "",
      ";",
      ":"
    ],
    "answer": 0,
    "explain": {
      "en": "'the first person to win two Nobel Prizes' is non-essential information set off by commas; the sentence already has the opening comma, so it needs a closing comma (A). Omitting it (B) leaves the pair unbalanced.",
      "zh": "“the first person to win two Nobel Prizes”是非限定信息，应由成对逗号隔开；句首已有逗号，故需收尾逗号（A）。省略（B）会使成对逗号不平衡。"
    }
  },
  {
    "id": "rw-conv-4",
    "section": "rw",
    "skill": "rw-conv",
    "difficulty": 3,
    "passage": "By the time the storm reached the coast, residents ______ already evacuated.",
    "stem": "Which choice conforms to the conventions of Standard English?",
    "choices": [
      "had",
      "have",
      "has",
      "having"
    ],
    "answer": 0,
    "explain": {
      "en": "An action completed before another past event takes the past perfect — 'had evacuated' (A). 'Have/has' are present perfect; 'having' isn't a finite verb and can't stand as the predicate.",
      "zh": "在另一过去事件之前完成的动作用过去完成时——“had evacuated”（A）。“have/has”是现在完成时；“having”非限定动词，不能作谓语。"
    }
  },
  {
    "id": "rw-conv-5",
    "section": "rw",
    "skill": "rw-conv",
    "difficulty": 1,
    "passage": "Each of the students ______ responsible for one section of the report.",
    "stem": "Which choice conforms to the conventions of Standard English?",
    "choices": [
      "is",
      "are",
      "were",
      "be"
    ],
    "answer": 0,
    "explain": {
      "en": "'Each' is singular, so the verb is singular — 'is' (A). The phrase 'of the students' doesn't change the subject's number.",
      "zh": "“Each”是单数，故动词用单数“is”（A）。“of the students”不改变主语的单复数。"
    }
  },
  {
    "id": "math-algebra-1",
    "section": "math",
    "skill": "math-algebra",
    "difficulty": 1,
    "stem": "If 2x + 5 = 17, what is the value of x?",
    "choices": [
      "6",
      "11",
      "7.5",
      "22"
    ],
    "answer": 0,
    "explain": {
      "en": "Subtract 5: 2x = 12. Divide by 2: x = 6.",
      "zh": "两边减 5：2x = 12。再除以 2：x = 6。"
    }
  },
  {
    "id": "math-algebra-2",
    "section": "math",
    "skill": "math-algebra",
    "difficulty": 1,
    "stem": "A line passes through (0, 3) and has slope 2. What is its equation?",
    "choices": [
      "y = 2x + 3",
      "y = 3x + 2",
      "y = 2x − 3",
      "y = 0.5x + 3"
    ],
    "answer": 0,
    "explain": {
      "en": "Slope-intercept form y = mx + b with m = 2 and b = 3 (the y-intercept) gives y = 2x + 3.",
      "zh": "斜截式 y = mx + b，m = 2，b = 3（y 截距），得 y = 2x + 3。"
    }
  },
  {
    "id": "math-algebra-3",
    "section": "math",
    "skill": "math-algebra",
    "difficulty": 2,
    "stem": "If 3x − y = 7 and x + y = 5, what is x?",
    "choices": [
      "3",
      "2",
      "4",
      "1"
    ],
    "answer": 0,
    "explain": {
      "en": "Add the equations to eliminate y: (3x − y) + (x + y) = 7 + 5 ⇒ 4x = 12 ⇒ x = 3.",
      "zh": "两式相加消去 y：(3x − y) + (x + y) = 7 + 5 ⇒ 4x = 12 ⇒ x = 3。"
    }
  },
  {
    "id": "math-algebra-4",
    "section": "math",
    "skill": "math-algebra",
    "difficulty": 2,
    "stem": "For what value of k does the system y = 2x + 1 and y = kx + 4 have NO solution?",
    "choices": [
      "2",
      "4",
      "1",
      "−2"
    ],
    "answer": 0,
    "explain": {
      "en": "No solution means parallel lines: same slope, different intercept. The first slope is 2, so k = 2 (intercepts 1 ≠ 4 keeps them parallel, not identical).",
      "zh": "无解意味两线平行：斜率相同、截距不同。第一条斜率为 2，故 k = 2（截距 1 ≠ 4，保证平行而非重合）。"
    }
  },
  {
    "id": "math-algebra-5",
    "section": "math",
    "skill": "math-algebra",
    "difficulty": 3,
    "stem": "If −3x + 2 > 11, which describes all solutions?",
    "choices": [
      "x < −3",
      "x > −3",
      "x < 3",
      "x > 3"
    ],
    "answer": 0,
    "explain": {
      "en": "Subtract 2: −3x > 9. Divide by −3 AND flip the sign: x < −3. Forgetting to flip gives the trap x > −3.",
      "zh": "减 2：−3x > 9。除以 −3 并变号：x < −3。忘记变号会得到陷阱 x > −3。"
    }
  },
  {
    "id": "math-advanced-1",
    "section": "math",
    "skill": "math-advanced",
    "difficulty": 1,
    "stem": "What are the solutions to x² − 9 = 0?",
    "choices": [
      "x = 3 or x = −3",
      "x = 9",
      "x = 3 only",
      "x = −9 or x = 9"
    ],
    "answer": 0,
    "explain": {
      "en": "x² = 9, so x = ±3. A difference of squares (x−3)(x+3) = 0 gives both roots; taking only the positive root is the common trap.",
      "zh": "x² = 9，故 x = ±3。平方差 (x−3)(x+3) = 0 给出两根；只取正根是常见陷阱。"
    }
  },
  {
    "id": "math-advanced-2",
    "section": "math",
    "skill": "math-advanced",
    "difficulty": 2,
    "stem": "Solve x² + 2x − 8 = 0.",
    "choices": [
      "x = 2 or x = −4",
      "x = −2 or x = 4",
      "x = 2 or x = 4",
      "x = −2 or x = −4"
    ],
    "answer": 0,
    "explain": {
      "en": "Factor into (x − 2)(x + 4) = 0, since −2·4 = −8 and −2 + 4... use 2 and −4: 2·(−4) = −8, 2 + (−4) = −2 ✓. So x = 2 or x = −4.",
      "zh": "因式分解为 (x − 2)(x + 4) = 0：2·(−4) = −8，2 + (−4) = −2 ✓。故 x = 2 或 x = −4。"
    }
  },
  {
    "id": "math-advanced-3",
    "section": "math",
    "skill": "math-advanced",
    "difficulty": 2,
    "stem": "Simplify x⁵ · x³.",
    "choices": [
      "x⁸",
      "x¹⁵",
      "x²",
      "2x⁸"
    ],
    "answer": 0,
    "explain": {
      "en": "When multiplying powers with the same base, add exponents: 5 + 3 = 8, so x⁸. Multiplying the exponents (x¹⁵) is the trap.",
      "zh": "同底数幂相乘，指数相加：5 + 3 = 8，得 x⁸。把指数相乘（x¹⁵）是陷阱。"
    }
  },
  {
    "id": "math-advanced-4",
    "section": "math",
    "skill": "math-advanced",
    "difficulty": 3,
    "stem": "How many real solutions does x² + 4x + 5 = 0 have?",
    "choices": [
      "0",
      "1",
      "2",
      "Infinitely many"
    ],
    "answer": 0,
    "explain": {
      "en": "Discriminant b² − 4ac = 16 − 20 = −4 < 0, so there are no real solutions.",
      "zh": "判别式 b² − 4ac = 16 − 20 = −4 < 0，故无实数解。"
    }
  },
  {
    "id": "math-advanced-5",
    "section": "math",
    "skill": "math-advanced",
    "difficulty": 3,
    "stem": "The function f(x) = a(x − 2)² + 3 has its vertex at which point?",
    "choices": [
      "(2, 3)",
      "(−2, 3)",
      "(2, −3)",
      "(3, 2)"
    ],
    "answer": 0,
    "explain": {
      "en": "Vertex form a(x − h)² + k has vertex (h, k). Here h = 2, k = 3, so (2, 3). Note the sign: (x − 2) means h = +2.",
      "zh": "顶点式 a(x − h)² + k 的顶点为 (h, k)。此处 h = 2，k = 3，故 (2, 3)。注意符号：(x − 2) 表示 h = +2。"
    }
  },
  {
    "id": "math-data-1",
    "section": "math",
    "skill": "math-data",
    "difficulty": 1,
    "stem": "What is 20% of 150?",
    "choices": [
      "30",
      "20",
      "75",
      "130"
    ],
    "answer": 0,
    "explain": {
      "en": "20% = 0.20, and 0.20 × 150 = 30.",
      "zh": "20% = 0.20，0.20 × 150 = 30。"
    }
  },
  {
    "id": "math-data-2",
    "section": "math",
    "skill": "math-data",
    "difficulty": 2,
    "stem": "A price rises from $50 to $65. What is the percent increase?",
    "choices": [
      "30%",
      "15%",
      "23%",
      "65%"
    ],
    "answer": 0,
    "explain": {
      "en": "Percent change = (new − old)/old = (65 − 50)/50 = 15/50 = 0.30 = 30%. Dividing by the new price instead of the original is the trap.",
      "zh": "百分比变化 = (新 − 旧)/旧 = (65 − 50)/50 = 15/50 = 0.30 = 30%。除以新价而非原价是陷阱。"
    }
  },
  {
    "id": "math-data-3",
    "section": "math",
    "skill": "math-data",
    "difficulty": 2,
    "stem": "A car travels 180 miles in 3 hours. At this rate, how far in 5 hours?",
    "choices": [
      "300 miles",
      "240 miles",
      "360 miles",
      "270 miles"
    ],
    "answer": 0,
    "explain": {
      "en": "Rate = 180/3 = 60 mph. In 5 hours: 60 × 5 = 300 miles.",
      "zh": "速率 = 180/3 = 60 英里/小时。5 小时：60 × 5 = 300 英里。"
    }
  },
  {
    "id": "math-data-4",
    "section": "math",
    "skill": "math-data",
    "difficulty": 2,
    "stem": "The data set is 4, 8, 8, 10, 20. What is the median?",
    "choices": [
      "8",
      "10",
      "9",
      "12"
    ],
    "answer": 0,
    "explain": {
      "en": "Sorted, the middle (3rd of 5) value is 8. The mean is 10, which is the trap because the outlier 20 pulls the mean up.",
      "zh": "排序后，中间（5 个中的第 3 个）值为 8。平均数是 10，是陷阱，因为离群值 20 把平均数拉高了。"
    }
  },
  {
    "id": "math-data-5",
    "section": "math",
    "skill": "math-data",
    "difficulty": 3,
    "stem": "A $200 item is increased by 10%, then the new price is decreased by 10%. What is the final price?",
    "choices": [
      "$198",
      "$200",
      "$202",
      "$180"
    ],
    "answer": 0,
    "explain": {
      "en": "Up 10%: 200 × 1.10 = 220. Down 10%: 220 × 0.90 = 198. The percentages apply to different bases, so you don't return to $200.",
      "zh": "升 10%：200 × 1.10 = 220。降 10%：220 × 0.90 = 198。两次百分比的基数不同，故不会回到 200 美元。"
    }
  },
  {
    "id": "math-geo-1",
    "section": "math",
    "skill": "math-geo",
    "difficulty": 1,
    "stem": "Two angles of a triangle measure 50° and 60°. What is the third angle?",
    "choices": [
      "70°",
      "80°",
      "110°",
      "90°"
    ],
    "answer": 0,
    "explain": {
      "en": "Angles of a triangle sum to 180°: 180 − 50 − 60 = 70°.",
      "zh": "三角形内角和为 180°：180 − 50 − 60 = 70°。"
    }
  },
  {
    "id": "math-geo-2",
    "section": "math",
    "skill": "math-geo",
    "difficulty": 1,
    "stem": "A circle has radius 5. What is its area? (Use π.)",
    "choices": [
      "25π",
      "10π",
      "5π",
      "50π"
    ],
    "answer": 0,
    "explain": {
      "en": "Area = πr² = π(5)² = 25π. Confusing it with circumference 2πr = 10π is the trap.",
      "zh": "面积 = πr² = π(5)² = 25π。与周长 2πr = 10π 混淆是陷阱。"
    }
  },
  {
    "id": "math-geo-3",
    "section": "math",
    "skill": "math-geo",
    "difficulty": 2,
    "stem": "A right triangle has legs of length 6 and 8. What is the hypotenuse?",
    "choices": [
      "10",
      "14",
      "48",
      "100"
    ],
    "answer": 0,
    "explain": {
      "en": "c = √(6² + 8²) = √(36 + 64) = √100 = 10 (a 3-4-5 triangle scaled by 2).",
      "zh": "c = √(6² + 8²) = √(36 + 64) = √100 = 10（即 3-4-5 三角形放大 2 倍）。"
    }
  },
  {
    "id": "math-geo-4",
    "section": "math",
    "skill": "math-geo",
    "difficulty": 2,
    "stem": "In a right triangle, the side opposite angle θ is 3 and the hypotenuse is 5. What is sin θ?",
    "choices": [
      "3/5",
      "4/5",
      "3/4",
      "5/3"
    ],
    "answer": 0,
    "explain": {
      "en": "SOH: sin θ = opposite/hypotenuse = 3/5. 4/5 would be cosine, 3/4 tangent.",
      "zh": "SOH：sin θ = 对边/斜边 = 3/5。4/5 是余弦，3/4 是正切。"
    }
  },
  {
    "id": "math-geo-5",
    "section": "math",
    "skill": "math-geo",
    "difficulty": 3,
    "stem": "A sector of a circle has a central angle of 90° and the circle's radius is 4. What is the sector's area? (Use π.)",
    "choices": [
      "4π",
      "16π",
      "8π",
      "2π"
    ],
    "answer": 0,
    "explain": {
      "en": "The sector is 90/360 = 1/4 of the circle. Full area = π(4)² = 16π, so the sector = 16π × 1/4 = 4π.",
      "zh": "扇形是整圆的 90/360 = 1/4。整圆面积 = π(4)² = 16π，故扇形 = 16π × 1/4 = 4π。"
    }
  }
];
