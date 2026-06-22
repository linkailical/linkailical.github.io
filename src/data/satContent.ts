// AUTO-PORTED from satStudy/data/*.js — the canonical source.
// If you edit the SAT bank/lessons, edit them in the satStudy repo and re-port.
// Bilingual values are { en, zh }; question stems stay English (it is an English exam).

export type Bil = { en: string; zh: string };

export interface SatSection { key: string; icon: string; label: Bil; blurb: Bil; }
export interface SatLessonBlock { h: Bil; body: Bil; }
export interface SatExample { q: Bil; sol: Bil; }
export interface SatSkill {
  key: string; section: string; label: Bil; summary: Bil;
  lesson: SatLessonBlock[]; examples: SatExample[]; tips: Bil[];
}
export interface SatContent { sections: SatSection[]; skills: SatSkill[]; }

export const SAT_CONTENT: SatContent = {
  "sections": [
    {
      "key": "rw",
      "icon": "📖",
      "label": {
        "en": "Reading & Writing",
        "zh": "阅读与写作"
      },
      "blurb": {
        "en": "54 questions · two modules · short passages with one question each.",
        "zh": "54 题 · 两个模块 · 每段短文对应一道题。"
      }
    },
    {
      "key": "math",
      "icon": "➗",
      "label": {
        "en": "Math",
        "zh": "数学"
      },
      "blurb": {
        "en": "44 questions · two modules · calculator allowed throughout.",
        "zh": "44 题 · 两个模块 · 全程可用计算器。"
      }
    }
  ],
  "skills": [
    {
      "key": "rw-info",
      "section": "rw",
      "label": {
        "en": "Information & Ideas",
        "zh": "信息与观点"
      },
      "summary": {
        "en": "Find central ideas, locate textual evidence, and draw logical inferences from a passage.",
        "zh": "把握中心思想、定位文本证据、并从短文中做出合理推断。"
      },
      "lesson": [
        {
          "h": {
            "en": "Central ideas & details",
            "zh": "主旨与细节"
          },
          "body": {
            "en": "The main idea is the single point the whole text supports. Details are there to back it up — never pick a choice that is true but too narrow, or broader than the text actually shows.",
            "zh": "主旨是全文共同支持的那一个观点。细节用来支撑主旨——不要选虽然正确但过窄、或超出原文范围的选项。"
          }
        },
        {
          "h": {
            "en": "Command of evidence",
            "zh": "证据运用"
          },
          "body": {
            "en": "Some questions give you a claim and ask which quotation, data point, or finding best supports it. Match the specific wording of the claim to the answer; a choice that is on-topic but doesn't prove the exact claim is a trap.",
            "zh": "有些题给出一个论点，问哪句引文、数据或发现最能支持它。把论点的具体措辞与答案对应起来；与主题相关但不能证明该具体论点的选项是陷阱。"
          }
        },
        {
          "h": {
            "en": "Inferences",
            "zh": "推断"
          },
          "body": {
            "en": "Fill the blank or complete the logic using only what the passage implies. The right answer is the one that must be true given the text — not merely plausible in real life.",
            "zh": "仅依据原文暗示来填空或补全逻辑。正确答案是根据文本必然成立的那一个——而非现实中只是看似合理。"
          }
        }
      ],
      "examples": [
        {
          "q": {
            "en": "A passage describes a study, then says 'However, the sample was small.' What does this signal?",
            "zh": "一段短文描述了一项研究，随后写道“However, the sample was small.”这暗示什么？"
          },
          "sol": {
            "en": "A limitation — the author is qualifying the result, so an inference about cautious/uncertain conclusions fits.",
            "zh": "一个局限——作者在限定结论，因此关于“需谨慎/结论不确定”的推断最贴切。"
          }
        }
      ],
      "tips": [
        {
          "en": "Answer from the text, not your own knowledge.",
          "zh": "依据文本作答，而非自己的背景知识。"
        },
        {
          "en": "Eliminate choices with extreme words (always, never, proves) unless the text is that strong.",
          "zh": "排除含绝对词（always、never、proves）的选项，除非原文确实如此强烈。"
        }
      ]
    },
    {
      "key": "rw-craft",
      "section": "rw",
      "label": {
        "en": "Craft & Structure",
        "zh": "技巧与结构"
      },
      "summary": {
        "en": "Words in context, text structure & purpose, and connections between paired texts.",
        "zh": "语境词义、文本结构与目的、以及成对文本之间的联系。"
      },
      "lesson": [
        {
          "h": {
            "en": "Words in context",
            "zh": "语境词义"
          },
          "body": {
            "en": "Read the sentence, predict your own word for the blank, then pick the choice closest to it. The tested word is usually common but used in a precise way — context decides, not the dictionary's first meaning.",
            "zh": "读句子，先自己预测空白处的词，再选最接近的选项。考查的词通常常见但用法精确——由语境决定，而非词典的第一个释义。"
          }
        },
        {
          "h": {
            "en": "Purpose & structure",
            "zh": "目的与结构"
          },
          "body": {
            "en": "Ask: why did the author write this sentence/paragraph? Choices describe a function (to illustrate, to qualify, to contrast). Pick the verb that matches what the text actually does.",
            "zh": "自问：作者为何写这句/这段？选项描述其功能（举例、限定、对比）。选出与文本实际作用相符的动词。"
          }
        },
        {
          "h": {
            "en": "Cross-text connections",
            "zh": "跨文本联系"
          },
          "body": {
            "en": "Two short texts on one topic. Identify each author's stance first, then how Text 2 would respond to Text 1 (agree, complicate, counter).",
            "zh": "围绕一个主题的两段短文。先判断各作者的立场，再看文本2会如何回应文本1（赞同、使之复杂、反驳）。"
          }
        }
      ],
      "examples": [
        {
          "q": {
            "en": "'The findings were ______ , overturning decades of assumptions.' Best fit?",
            "zh": "“The findings were ______ , overturning decades of assumptions.” 哪个最贴切？"
          },
          "sol": {
            "en": "Something like 'revolutionary' — the second half (overturning assumptions) defines the strength of the blank.",
            "zh": "类似 “revolutionary”——后半句（推翻假设）界定了空白处的强度。"
          }
        }
      ],
      "tips": [
        {
          "en": "Cover the choices, predict the word yourself first.",
          "zh": "先遮住选项，自己预测词义。"
        },
        {
          "en": "For purpose questions, answer 'what does it DO', not 'what does it SAY'.",
          "zh": "目的题要回答“它起什么作用”，而非“它说了什么”。"
        }
      ]
    },
    {
      "key": "rw-express",
      "section": "rw",
      "label": {
        "en": "Expression of Ideas",
        "zh": "观点表达"
      },
      "summary": {
        "en": "Rhetorical synthesis (use notes to meet a goal) and transitions between ideas.",
        "zh": "修辞综合（用笔记达成目标）与观点之间的过渡。"
      },
      "lesson": [
        {
          "h": {
            "en": "Transitions",
            "zh": "过渡词"
          },
          "body": {
            "en": "Decide the logical relationship between the two sentences first: addition (moreover), contrast (however), cause/effect (therefore), example (for instance). Then pick the transition that matches — ignore choices that sound nice but signal the wrong relationship.",
            "zh": "先判断两句之间的逻辑关系：递进（moreover）、转折（however）、因果（therefore）、举例（for instance）。再选匹配的过渡词——排除听起来顺但逻辑关系错误的选项。"
          }
        },
        {
          "h": {
            "en": "Rhetorical synthesis",
            "zh": "修辞综合"
          },
          "body": {
            "en": "You're given bullet notes and a stated goal (e.g. 'emphasize a difference'). The answer is the sentence that uses the notes AND accomplishes that specific goal. Many choices are factually true but ignore the goal.",
            "zh": "题目给出要点笔记和明确目标（如“强调一处差异”）。答案是既用到笔记又达成该具体目标的句子。许多选项事实正确却没达成目标。"
          }
        }
      ],
      "examples": [
        {
          "q": {
            "en": "Goal: emphasize a similarity between two species. How do you choose?",
            "zh": "目标：强调两个物种之间的相似点。如何选择？"
          },
          "sol": {
            "en": "Pick the sentence that directly states what they share; reject ones that list a contrast or an unrelated fact.",
            "zh": "选直接说明二者共同点的句子；排除列出差异或无关事实的选项。"
          }
        }
      ],
      "tips": [
        {
          "en": "Underline the goal in the prompt before reading choices.",
          "zh": "先在题干中划出“目标”，再看选项。"
        },
        {
          "en": "Test a transition by reading both sentences with it inserted.",
          "zh": "把过渡词代入两句一起读来检验。"
        }
      ]
    },
    {
      "key": "rw-conv",
      "section": "rw",
      "label": {
        "en": "Standard English Conventions",
        "zh": "标准英语规范"
      },
      "summary": {
        "en": "Grammar: sentence boundaries, punctuation, subject-verb agreement, verb tense, pronouns, modifiers.",
        "zh": "语法：句子边界、标点、主谓一致、时态、代词、修饰语。"
      },
      "lesson": [
        {
          "h": {
            "en": "Sentence boundaries",
            "zh": "句子边界"
          },
          "body": {
            "en": "Two independent clauses cannot be joined by a comma alone (comma splice). Fix with a period, a semicolon, or a comma + FANBOYS conjunction (for, and, nor, but, or, yet, so).",
            "zh": "两个独立分句不能仅用逗号连接（逗号粘连）。用句号、分号，或“逗号 + FANBOYS 连词”（for, and, nor, but, or, yet, so）来修正。"
          }
        },
        {
          "h": {
            "en": "Agreement & tense",
            "zh": "一致与时态"
          },
          "body": {
            "en": "The verb must agree with its real subject — ignore words between them. Keep tense consistent with the rest of the passage unless the meaning demands a change.",
            "zh": "动词须与真正的主语一致——忽略中间插入的词。除非语义需要，时态应与全文保持一致。"
          }
        },
        {
          "h": {
            "en": "Punctuation with modifiers",
            "zh": "修饰语与标点"
          },
          "body": {
            "en": "Non-essential information goes inside a matching pair of commas (or dashes). Don't put a single comma between a subject and its verb.",
            "zh": "非限定信息放在成对的逗号（或破折号）之间。不要在主语和谓语之间放单个逗号。"
          }
        }
      ],
      "examples": [
        {
          "q": {
            "en": "'The data, which took years to collect ___ finally published.' What goes in the blank?",
            "zh": "“The data, which took years to collect ___ finally published.” 空白处填什么？"
          },
          "sol": {
            "en": "A closing comma + 'was' (', was'): close the non-essential clause, then a singular verb agreeing with 'data' treated as a unit.",
            "zh": "收尾逗号 + “was”（“, was”）：先收尾非限定从句，再用与作为整体的“data”一致的单数动词。"
          }
        }
      ],
      "tips": [
        {
          "en": "If choices differ only in punctuation, the question is about boundaries.",
          "zh": "若选项只在标点上不同，考点就是句子边界。"
        },
        {
          "en": "Cross out clauses between commas to find the real subject.",
          "zh": "划掉逗号间的从句，找出真正的主语。"
        }
      ]
    },
    {
      "key": "math-algebra",
      "section": "math",
      "label": {
        "en": "Algebra",
        "zh": "代数"
      },
      "summary": {
        "en": "Linear equations & inequalities in one or two variables, and systems of linear equations.",
        "zh": "一元/二元线性方程与不等式，以及线性方程组。"
      },
      "lesson": [
        {
          "h": {
            "en": "Linear equations",
            "zh": "线性方程"
          },
          "body": {
            "en": "A line is y = mx + b: m is the slope (rate of change), b is the y-intercept (value when x = 0). Slope between two points = (y₂−y₁)/(x₂−x₁).",
            "zh": "直线为 y = mx + b：m 是斜率（变化率），b 是 y 截距（x=0 时的值）。两点间斜率 = (y₂−y₁)/(x₂−x₁)。"
          }
        },
        {
          "h": {
            "en": "Systems",
            "zh": "方程组"
          },
          "body": {
            "en": "Solve by substitution or elimination. No solution ⇒ same slope, different intercept (parallel). Infinitely many ⇒ the two equations are multiples of each other.",
            "zh": "用代入法或消元法求解。无解 ⇒ 斜率相同、截距不同（平行）。无穷多解 ⇒ 两方程互为倍数。"
          }
        },
        {
          "h": {
            "en": "Inequalities",
            "zh": "不等式"
          },
          "body": {
            "en": "Solve like equations, but flip the sign when multiplying or dividing by a negative number.",
            "zh": "解法同方程，但乘除负数时要变号。"
          }
        }
      ],
      "examples": [
        {
          "q": {
            "en": "If 3x − 6 = 12, find x.",
            "zh": "若 3x − 6 = 12，求 x。"
          },
          "sol": {
            "en": "Add 6: 3x = 18, so x = 6.",
            "zh": "两边加 6：3x = 18，故 x = 6。"
          }
        }
      ],
      "tips": [
        {
          "en": "Translate words to an equation before solving.",
          "zh": "先把文字转成方程再求解。"
        },
        {
          "en": "Check 'no solution / infinitely many' by comparing slopes.",
          "zh": "通过比较斜率判断“无解/无穷多解”。"
        }
      ]
    },
    {
      "key": "math-advanced",
      "section": "math",
      "label": {
        "en": "Advanced Math",
        "zh": "高等数学"
      },
      "summary": {
        "en": "Quadratics, exponential expressions, polynomials, and working with functions.",
        "zh": "二次函数、指数式、多项式，以及函数的运用。"
      },
      "lesson": [
        {
          "h": {
            "en": "Quadratics",
            "zh": "二次函数"
          },
          "body": {
            "en": "ax² + bx + c = 0. Factor when possible, else use the quadratic formula x = (−b ± √(b²−4ac)) / 2a. The vertex of y = a(x−h)² + k is (h, k).",
            "zh": "ax² + bx + c = 0。能因式分解就分解，否则用求根公式 x = (−b ± √(b²−4ac)) / 2a。y = a(x−h)² + k 的顶点是 (h, k)。"
          }
        },
        {
          "h": {
            "en": "Discriminant",
            "zh": "判别式"
          },
          "body": {
            "en": "b²−4ac tells you the number of real solutions: positive ⇒ 2, zero ⇒ 1, negative ⇒ 0.",
            "zh": "b²−4ac 决定实根个数：正 ⇒ 2 个，零 ⇒ 1 个，负 ⇒ 0 个。"
          }
        },
        {
          "h": {
            "en": "Exponents",
            "zh": "指数"
          },
          "body": {
            "en": "xᵃ·xᵇ = xᵃ⁺ᵇ ; (xᵃ)ᵇ = xᵃᵇ ; x⁻ᵃ = 1/xᵃ ; growth/decay is modeled by y = a·bˣ.",
            "zh": "xᵃ·xᵇ = xᵃ⁺ᵇ；(xᵃ)ᵇ = xᵃᵇ；x⁻ᵃ = 1/xᵃ；增长/衰减用 y = a·bˣ 建模。"
          }
        }
      ],
      "examples": [
        {
          "q": {
            "en": "Solve x² − 5x + 6 = 0.",
            "zh": "解 x² − 5x + 6 = 0。"
          },
          "sol": {
            "en": "Factor (x−2)(x−3) = 0 ⇒ x = 2 or x = 3.",
            "zh": "因式分解 (x−2)(x−3) = 0 ⇒ x = 2 或 x = 3。"
          }
        }
      ],
      "tips": [
        {
          "en": "Try factoring first; it's faster than the formula when it works.",
          "zh": "先尝试因式分解；可行时比公式更快。"
        },
        {
          "en": "For 'how many solutions', reach for the discriminant.",
          "zh": "遇到“有几个解”，想到判别式。"
        }
      ]
    },
    {
      "key": "math-data",
      "section": "math",
      "label": {
        "en": "Problem-Solving & Data Analysis",
        "zh": "问题解决与数据分析"
      },
      "summary": {
        "en": "Ratios, rates, percentages, units, probability, and reading tables/graphs.",
        "zh": "比例、速率、百分比、单位、概率，以及读表/读图。"
      },
      "lesson": [
        {
          "h": {
            "en": "Percentages",
            "zh": "百分比"
          },
          "body": {
            "en": "'p percent of n' = (p/100)·n. Percent change = (new − old)/old × 100%. A p% increase then a p% decrease does NOT return to the start.",
            "zh": "“n 的 p%” = (p/100)·n。百分比变化 = (新 − 旧)/旧 × 100%。先升 p% 再降 p% 不会回到原值。"
          }
        },
        {
          "h": {
            "en": "Ratios & rates",
            "zh": "比与速率"
          },
          "body": {
            "en": "Set up a proportion a/b = c/d and cross-multiply. Watch units — convert before comparing (e.g. minutes vs hours).",
            "zh": "建立比例 a/b = c/d 并交叉相乘。注意单位——比较前先换算（如分钟与小时）。"
          }
        },
        {
          "h": {
            "en": "Statistics",
            "zh": "统计"
          },
          "body": {
            "en": "Mean = sum/count; median = middle value when sorted. The mean is pulled toward outliers; the median resists them.",
            "zh": "平均数 = 总和/个数；中位数 = 排序后的中间值。平均数会被离群值拉动；中位数则不受影响。"
          }
        }
      ],
      "examples": [
        {
          "q": {
            "en": "A $40 item is discounted 25%. New price?",
            "zh": "一件 40 美元的商品打 75 折（降 25%）。现价？"
          },
          "sol": {
            "en": "25% of 40 = 10, so 40 − 10 = $30.",
            "zh": "40 的 25% = 10，故 40 − 10 = 30 美元。"
          }
        }
      ],
      "tips": [
        {
          "en": "Underline the units in the question and in your answer — they must match.",
          "zh": "划出题目和答案中的单位——必须一致。"
        },
        {
          "en": "For percent change, always divide by the ORIGINAL value.",
          "zh": "百分比变化要除以“原始值”。"
        }
      ]
    },
    {
      "key": "math-geo",
      "section": "math",
      "label": {
        "en": "Geometry & Trigonometry",
        "zh": "几何与三角"
      },
      "summary": {
        "en": "Lines & angles, triangles, circles, area/volume, and right-triangle trig.",
        "zh": "线与角、三角形、圆、面积/体积，以及直角三角形三角函数。"
      },
      "lesson": [
        {
          "h": {
            "en": "Triangles",
            "zh": "三角形"
          },
          "body": {
            "en": "Angles sum to 180°. Right triangles: a² + b² = c². Similar triangles have equal angles and proportional sides.",
            "zh": "内角和为 180°。直角三角形：a² + b² = c²。相似三角形角相等、边成比例。"
          }
        },
        {
          "h": {
            "en": "Circles",
            "zh": "圆"
          },
          "body": {
            "en": "Area = πr², circumference = 2πr. An arc/sector is a fraction (central angle / 360°) of the whole circle.",
            "zh": "面积 = πr²，周长 = 2πr。弧/扇形是整圆的 (圆心角 / 360°) 部分。"
          }
        },
        {
          "h": {
            "en": "Right-triangle trig",
            "zh": "直角三角形三角函数"
          },
          "body": {
            "en": "SOH-CAH-TOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent. Also sin(x) = cos(90°−x).",
            "zh": "SOH-CAH-TOA：sin = 对边/斜边，cos = 邻边/斜边，tan = 对边/邻边。另有 sin(x) = cos(90°−x)。"
          }
        }
      ],
      "examples": [
        {
          "q": {
            "en": "A right triangle has legs 3 and 4. Find the hypotenuse.",
            "zh": "直角三角形两直角边为 3 和 4，求斜边。"
          },
          "sol": {
            "en": "√(3² + 4²) = √25 = 5.",
            "zh": "√(3² + 4²) = √25 = 5。"
          }
        }
      ],
      "tips": [
        {
          "en": "Memorize 3-4-5 and 5-12-13 right triangles to save time.",
          "zh": "记住 3-4-5 和 5-12-13 直角三角形以节省时间。"
        },
        {
          "en": "Reference formulas are given on the test — but knowing them saves lookups.",
          "zh": "考试会提供参考公式——但记住能省去查找时间。"
        }
      ]
    }
  ]
};
