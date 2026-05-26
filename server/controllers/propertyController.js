import pdf from "pdf-poppler";
import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import Property from "../models/Property.js";

// ✅ ✅ ✅ ADD HERE
const extractPropertyDetails = (text) => {
  // full function
};

// ✅ CONTROLLER
export const uploadBrochure = async (req, res) => {
  try {
    // your OCR code...

    const extractedData = extractPropertyDetails(fullText);

    const savedProperty = await Property.create(extractedData);

    res.status(201).json(savedProperty);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};