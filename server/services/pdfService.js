import pdf from "pdf-poppler";
import path from "path";

export const convertPDFToImages = async (filePath) => {
  const outputDir = "uploads/images";

  const options = {
    format: "jpeg",
    out_dir: outputDir,
    out_prefix: path.basename(filePath, path.extname(filePath)),
    page: null,

    // 🔥 IMPORTANT: give poppler path manually
    poppler_path: "C:\\poppler\\Library\\bin",
  };

  await pdf.convert(filePath, options);

  return outputDir;
};