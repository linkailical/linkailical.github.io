/*
 * Dental image dataset manifest (data-driven & extensible).
 *
 * HOW TO EXTEND:
 *   1. Drop a new image file into  aidoctor/assets/
 *   2. Add one entry to `items` below with its class, source, author and license.
 *   3. (Optional) add a new class to `classes`.
 * The Dataset view in the app renders straight from this file — no code changes needed.
 *
 * Licensing note: only add images you have the right to use (CC0 / CC BY / CC BY-SA
 * with attribution, or your own photos). Keep the `license` and `author` fields honest.
 */
window.DENTAL_DATASET = {
  name: { en: "Dental Reference Dataset (starter)", zh: "牙科参考数据集（起始集）" },
  description: {
    en: "A small, openly-licensed starter set of dental photos for education and annotation. Designed to be extended with more images or imported public datasets.",
    zh: "一个小型、开放授权的牙科照片起始集，用于科普与标注。可继续添加图片或导入公开数据集。",
  },

  classes: [
    { key: "healthy",    label: { en: "Healthy teeth",            zh: "健康牙齿" } },
    { key: "caries",     label: { en: "Dental caries (cavities)", zh: "龋齿（蛀牙）" } },
    { key: "gingivitis", label: { en: "Gingivitis (gum inflammation)", zh: "牙龈炎" } },
  ],

  items: [
    {
      file: "assets/healthy-teeth.jpg", classKey: "healthy",
      title: "Full set upper teeth", author: "Roquex", license: "CC0",
      url: "https://commons.wikimedia.org/wiki/File:Full_set_upper_teeth.jpg",
    },
    {
      file: "assets/dental-caries.jpg", classKey: "caries",
      title: "Dental Caries", author: "Ickyvickywiki", license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Dental_Caries_.jpg",
    },
    {
      file: "assets/gingivitis.jpg", classKey: "gingivitis",
      title: "Gingivită", author: "Geaninamiu", license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Gingivit%C4%83.jpg",
    },
  ],

  // Larger public datasets you can import/annotate later (not bundled here).
  related: [
    { name: "Tufts Dental Database (TDD)", note: { en: "Panoramic X-rays with expert segmentation.", zh: "全景 X 光 + 专家分割标注。" }, url: "http://tdd.ece.tufts.edu/" },
    { name: "DENTEX (MICCAI 2023)", note: { en: "Panoramic X-ray tooth detection & disease labels.", zh: "全景 X 光牙齿检测与疾病标注。" }, url: "https://huggingface.co/datasets/ibrahimhamamci/DENTEX" },
    { name: "Roboflow Universe — dental", note: { en: "Open intraoral/X-ray sets, exportable as COCO/YOLO.", zh: "开放口内/X光集，可导出 COCO/YOLO。" }, url: "https://universe.roboflow.com/search?q=dental" },
  ],
};
