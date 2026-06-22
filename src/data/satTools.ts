// SAT study-tool content: vocabulary flashcards + quick-reference cards.
// Bilingual { en, zh }; word forms / formulas stay in English like the test.

export type Bil = { en: string; zh: string };

export interface Flashcard { word: string; pos: string; def: Bil; example: string; }

// High-frequency Digital SAT "words in context" vocabulary.
export const SAT_VOCAB: Flashcard[] = [
  { word: "ambiguous", pos: "adj.", def: { en: "open to more than one interpretation; unclear.", zh: "模棱两可的；含糊不清的。" }, example: "The poem's ambiguous ending lets readers reach different conclusions." },
  { word: "arbitrary", pos: "adj.", def: { en: "based on random choice, not reason or system.", zh: "随意的；武断的。" }, example: "The rule seemed arbitrary, with no clear reason behind it." },
  { word: "candid", pos: "adj.", def: { en: "honest and direct, even when awkward.", zh: "坦率的；直言不讳的。" }, example: "She gave a candid assessment of the project's flaws." },
  { word: "coherent", pos: "adj.", def: { en: "logically connected and easy to follow.", zh: "条理清晰的；连贯的。" }, example: "A coherent argument moves smoothly from claim to evidence." },
  { word: "concise", pos: "adj.", def: { en: "saying much in few words.", zh: "简洁的；言简意赅的。" }, example: "The concise summary covered the study in three sentences." },
  { word: "nuance", pos: "n.", def: { en: "a subtle difference in meaning or tone.", zh: "细微差别。" }, example: "Translators must capture the nuance of each word." },
  { word: "plausible", pos: "adj.", def: { en: "seeming reasonable or probable.", zh: "看似合理的；可信的。" }, example: "Her explanation was plausible but lacked proof." },
  { word: "pragmatic", pos: "adj.", def: { en: "dealing with things practically, not idealistically.", zh: "务实的；讲求实际的。" }, example: "He took a pragmatic approach, fixing what could be fixed." },
  { word: "scrutinize", pos: "v.", def: { en: "to examine closely and critically.", zh: "仔细审查；详细检查。" }, example: "Reviewers scrutinized the data for errors." },
  { word: "substantiate", pos: "v.", def: { en: "to support a claim with evidence.", zh: "证实；用证据支持。" }, example: "The author substantiates the theory with experiments." },
  { word: "undermine", pos: "v.", def: { en: "to weaken or damage gradually.", zh: "逐渐削弱；动摇。" }, example: "Missing data undermines the study's conclusion." },
  { word: "mitigate", pos: "v.", def: { en: "to make less severe or serious.", zh: "减轻；缓和。" }, example: "Planting trees can mitigate urban heat." },
  { word: "advocate", pos: "v./n.", def: { en: "to publicly support; a supporter of a cause.", zh: "（动）倡导；（名）拥护者。" }, example: "She advocates for cleaner energy policies." },
  { word: "ambivalent", pos: "adj.", def: { en: "having mixed or contradictory feelings.", zh: "矛盾的；好恶参半的。" }, example: "He felt ambivalent about moving away." },
  { word: "paradox", pos: "n.", def: { en: "a statement that seems contradictory yet may be true.", zh: "悖论；自相矛盾的说法。" }, example: "It is a paradox that the more we learn, the more we realize we don't know." },
  { word: "empirical", pos: "adj.", def: { en: "based on observation or experiment, not theory.", zh: "经验的；以观察/实验为依据的。" }, example: "Empirical evidence supported the hypothesis." },
  { word: "inevitable", pos: "adj.", def: { en: "certain to happen; unavoidable.", zh: "不可避免的；必然的。" }, example: "Change is inevitable as technology advances." },
  { word: "novel", pos: "adj.", def: { en: "new and original; not seen before.", zh: "新颖的；新奇的。" }, example: "The team proposed a novel solution to the problem." },
  { word: "prevalent", pos: "adj.", def: { en: "widespread; common in a particular area or time.", zh: "普遍的；盛行的。" }, example: "Smartphones are prevalent among students." },
  { word: "skeptical", pos: "adj.", def: { en: "not easily convinced; having doubts.", zh: "持怀疑态度的。" }, example: "Scientists remained skeptical until the result was repeated." },
  { word: "concede", pos: "v.", def: { en: "to admit something is true, often reluctantly.", zh: "（勉强）承认；让步。" }, example: "She conceded that the critics had a point." },
  { word: "discern", pos: "v.", def: { en: "to perceive or recognize clearly.", zh: "辨别；看出。" }, example: "It was hard to discern the author's true intent." },
  { word: "tedious", pos: "adj.", def: { en: "too long, slow, or dull; tiresome.", zh: "冗长乏味的；令人厌烦的。" }, example: "Copying the data by hand was tedious work." },
  { word: "viable", pos: "adj.", def: { en: "capable of working successfully; feasible.", zh: "可行的；切实可行的。" }, example: "Solar power is now a viable option for many homes." },
];

export interface QuickCard { front: string; back: Bil; }
export interface QuickGroup { key: string; label: Bil; cards: QuickCard[]; }

// Compact formula & grammar reference (the "cheat sheet" you should internalize).
export const SAT_QUICKCARDS: QuickGroup[] = [
  {
    key: "math", label: { en: "Math formulas", zh: "数学公式" },
    cards: [
      { front: "Slope:  m = (y₂ − y₁) / (x₂ − x₁)", back: { en: "Rate of change between two points on a line.", zh: "直线上两点之间的变化率。" } },
      { front: "Line:  y = mx + b", back: { en: "m is the slope; b is the y-intercept (value when x = 0).", zh: "m 为斜率；b 为 y 截距（x=0 时的值）。" } },
      { front: "Quadratic:  x = (−b ± √(b² − 4ac)) / 2a", back: { en: "Solves ax² + bx + c = 0 when it won't factor.", zh: "当 ax² + bx + c = 0 无法因式分解时用它求解。" } },
      { front: "Discriminant:  b² − 4ac", back: { en: ">0 ⇒ 2 real roots, =0 ⇒ 1, <0 ⇒ none.", zh: ">0 ⇒ 两实根，=0 ⇒ 一根，<0 ⇒ 无实根。" } },
      { front: "Vertex form:  y = a(x − h)² + k", back: { en: "Parabola vertex is (h, k).", zh: "抛物线顶点为 (h, k)。" } },
      { front: "Pythagorean:  a² + b² = c²", back: { en: "Right-triangle legs a, b and hypotenuse c.", zh: "直角三角形两直角边 a、b 与斜边 c。" } },
      { front: "Circle:  A = πr²,  C = 2πr", back: { en: "Area and circumference from the radius r.", zh: "由半径 r 求面积与周长。" } },
      { front: "Exponents:  xᵃ·xᵇ = xᵃ⁺ᵇ,  (xᵃ)ᵇ = xᵃᵇ,  x⁻ᵃ = 1/xᵃ", back: { en: "Multiply ⇒ add powers; power of a power ⇒ multiply.", zh: "相乘则指数相加；幂的幂则指数相乘。" } },
      { front: "Percent change:  (new − old) / old × 100%", back: { en: "Always divide by the ORIGINAL value.", zh: "永远除以“原始值”。" } },
      { front: "Trig:  SOH-CAH-TOA", back: { en: "sin = opp/hyp, cos = adj/hyp, tan = opp/adj.", zh: "sin=对边/斜边，cos=邻边/斜边，tan=对边/邻边。" } },
      { front: "Mean & median", back: { en: "Mean = sum/count; median = middle value when sorted.", zh: "平均数=总和/个数；中位数=排序后的中间值。" } },
      { front: "Average speed:  total distance / total time", back: { en: "Not the average of the two speeds.", zh: "不是两个速度的平均值。" } },
    ],
  },
  {
    key: "grammar", label: { en: "Grammar rules", zh: "语法规则" },
    cards: [
      { front: "Comma splice", back: { en: "Two independent clauses can't join with just a comma — use a period, semicolon, or comma + FANBOYS.", zh: "两个独立分句不能只用逗号连接——用句号、分号，或“逗号+FANBOYS”。" } },
      { front: "FANBOYS", back: { en: "Coordinating conjunctions: for, and, nor, but, or, yet, so.", zh: "并列连词：for, and, nor, but, or, yet, so。" } },
      { front: "Semicolon ;", back: { en: "Joins two closely related independent clauses.", zh: "连接两个关系密切的独立分句。" } },
      { front: "Colon :", back: { en: "Introduces a list or explanation after a complete clause.", zh: "在完整分句后引出列举或解释。" } },
      { front: "Subject-verb agreement", back: { en: "Verb agrees with the real subject; ignore words in between.", zh: "动词与真正的主语一致；忽略中间插入的词。" } },
      { front: "its vs it's", back: { en: "its = possessive; it's = it is / it has.", zh: "its=所有格；it's=it is / it has。" } },
      { front: "Non-essential info", back: { en: "Set off extra info with a matching pair of commas or dashes.", zh: "用成对的逗号或破折号隔开附加信息。" } },
      { front: "Pronoun agreement", back: { en: "A pronoun must match its antecedent in number.", zh: "代词在单复数上须与先行词一致。" } },
      { front: "Parallel structure", back: { en: "Items in a series share the same grammatical form.", zh: "并列项应保持相同的语法形式。" } },
      { front: "Misplaced modifier", back: { en: "Put a modifier right next to the word it describes.", zh: "把修饰语紧挨它所修饰的词。" } },
      { front: "Past perfect:  had + past participle", back: { en: "The earlier of two past actions.", zh: "两个过去动作中较早发生的那个。" } },
    ],
  },
];
