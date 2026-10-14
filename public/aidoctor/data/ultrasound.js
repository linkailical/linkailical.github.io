/*
 * B-ultrasound learning module data (data-driven & extensible).
 *
 * Add a comparison: push to `comparisons` with two images + findings.
 * Add a teaching card: push to `learn`.
 * Add a quiz item: push to `quiz`.
 * Keep image licenses honest (CC0 / CC BY etc.).
 */
window.ULTRASOUND = {
  intro: {
    en: "Learn to read B-mode ultrasound: how it works, what 'bright vs dark' means, and how normal compares with abnormal. Educational only — not a diagnosis.",
    zh: "学习读懂 B 型超声：成像原理、'亮与暗'的含义，以及正常与异常的对比。仅供学习，非诊断。",
  },

  // ---- Read-the-image teaching cards ----
  learn: [
    {
      title: { en: "How ultrasound makes an image", zh: "超声如何成像" },
      body: {
        en: "A probe sends high-frequency sound waves into the body. Tissues reflect echoes; the machine measures echo strength and return time to paint a grayscale cross-section.",
        zh: "探头把高频声波送入体内，组织反射回声；机器按回声强弱与返回时间画出灰度切面。",
      },
    },
    {
      title: { en: "Echogenicity: bright vs dark", zh: "回声：亮与暗" },
      body: {
        en: "Hyperechoic = bright (strong reflectors, e.g. bone, fat, stones). Hypoechoic = darker. Anechoic = black (fluid, e.g. a cyst or full bladder).",
        zh: "高回声=亮（强反射，如骨、脂肪、结石）；低回声=较暗；无回声=黑（液体，如囊肿或充盈膀胱）。",
      },
    },
    {
      title: { en: "Two key artifacts", zh: "两种关键伪像" },
      body: {
        en: "Acoustic shadow: a dark band behind a strong reflector (e.g. a stone). Posterior enhancement: a brighter band behind a fluid structure (e.g. a cyst).",
        zh: "声影：强反射物（如结石）后方的暗带。后方增强：液性结构（如囊肿）后方的亮带。",
      },
    },
    {
      title: { en: "How to scan an image", zh: "读图步骤" },
      body: {
        en: "Note orientation & depth, find the organ, judge its echogenicity vs normal, look for focal lesions, then check for shadow/enhancement clues.",
        zh: "先看方位与深度，找到器官，判断其回声相对正常如何，寻找局灶病变，再看声影/后方增强等线索。",
      },
    },
  ],

  // ---- Normal vs abnormal comparisons ----
  comparisons: [
    {
      topic: { en: "Liver: normal vs fatty (steatosis)", zh: "肝脏：正常 vs 脂肪肝（脂肪变）" },
      left:  { img: "assets/ultrasound/normal-liver.jpg", label: { en: "Normal liver", zh: "正常肝" },
               find: { en: "Even, mid-gray echotexture; vessel walls clearly seen.", zh: "回声均匀、中等灰度；血管壁清晰可见。" } },
      right: { img: "assets/ultrasound/focal-steatosis.jpg", label: { en: "Fatty change", zh: "脂肪变" },
               find: { en: "Brighter (hyperechoic) liver; deeper detail fades.", zh: "肝实质更亮（高回声）；深部细节减弱。" } },
      teach: { en: "Fat makes the liver more reflective, so it looks brighter than normal.", zh: "脂肪使肝更易反射声波，故比正常更亮。" },
    },
    {
      topic: { en: "Gallbladder: normal vs cholecystitis", zh: "胆囊：正常 vs 胆囊炎" },
      left:  { img: "assets/ultrasound/normal-liver.jpg", label: { en: "Normal reference", zh: "正常参照" },
               find: { en: "Thin walls, clear anechoic (black) fluid inside.", zh: "壁薄，内部为清晰无回声（黑）的液体。" } },
      right: { img: "assets/ultrasound/cholecystitis.jpg", label: { en: "Cholecystitis", zh: "胆囊炎" },
               find: { en: "Thickened wall and surrounding changes.", zh: "胆囊壁增厚及周围改变。" } },
      teach: { en: "Wall thickening is a key sign of inflammation.", zh: "胆囊壁增厚是炎症的关键征象。" },
    },
    {
      topic: { en: "Aorta: normal caliber vs aneurysm", zh: "主动脉：正常管径 vs 动脉瘤" },
      left:  { img: "assets/ultrasound/normal-liver.jpg", label: { en: "Normal reference", zh: "正常参照" },
               find: { en: "Vessel within normal diameter.", zh: "血管直径正常。" } },
      right: { img: "assets/ultrasound/aaa-axial.jpg", label: { en: "Abdominal aortic aneurysm", zh: "腹主动脉瘤" },
               find: { en: "Abnormally widened vessel (aneurysm).", zh: "血管异常增宽（动脉瘤）。" } },
      teach: { en: "An aorta measuring ≥3 cm is considered aneurysmal.", zh: "主动脉直径 ≥3 cm 即视为动脉瘤。" },
    },
  ],

  // ---- Understanding quiz ----
  quiz: [
    { q: { en: "On ultrasound, a fluid-filled cyst usually appears…", zh: "超声上，含液囊肿通常表现为……" },
      options: [ { en: "Bright (hyperechoic)", zh: "亮（高回声）" }, { en: "Black (anechoic)", zh: "黑（无回声）" }, { en: "Striped", zh: "条纹状" } ],
      answer: 1, why: { en: "Clear fluid reflects almost no echoes, so it looks black.", zh: "清亮液体几乎不反射回声，故呈黑色。" } },
    { q: { en: "A bright stone often casts a … behind it.", zh: "明亮的结石后方常出现……" },
      options: [ { en: "Posterior enhancement", zh: "后方增强" }, { en: "Acoustic shadow", zh: "声影" }, { en: "Nothing", zh: "什么都没有" } ],
      answer: 1, why: { en: "Strong reflectors block sound, leaving a dark shadow behind.", zh: "强反射物挡住声波，后方留下暗影。" } },
    { q: { en: "A fatty liver tends to look … than a normal liver.", zh: "脂肪肝相比正常肝往往……" },
      options: [ { en: "Brighter", zh: "更亮" }, { en: "Darker", zh: "更暗" }, { en: "The same", zh: "一样" } ],
      answer: 0, why: { en: "Fat is more reflective, so the liver appears brighter.", zh: "脂肪反射更强，故肝显得更亮。" } },
  ],

  credit: 'Ultrasound images by Mikael Häggström, CC0, via Wikimedia Commons.',
};
