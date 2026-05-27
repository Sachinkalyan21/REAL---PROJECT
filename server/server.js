const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");

const app = express();

const upload = multer({
  dest: "uploads/",
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Read uploaded PDF
    const dataBuffer = fs.readFileSync(req.file.path);

    // Parse PDF
    const pdfData = await pdf(dataBuffer);

    // Extract text
    const text = pdfData.text;

    console.log(text);

    // ---------------- Extract Data ----------------

    const propertyTypes = [
      ...new Set(
        [...text.matchAll(/(1\s?BHK|2\s?BHK|2\.5\s?BHK|3\s?BHK|3\.5\s?BHK|4\s?BHK)/gi)]
          .map((item) => item[0])
      ),
    ];

    const areas = [
      ...new Set(
        [...text.matchAll(/\b\d{3,4}\b/g)]
          .map((item) => item[0] + " sqft")
      ),
    ].slice(0, 20);

    const phoneNumbers = [
      ...new Set(
        [...text.matchAll(/\d{4}-\d{3}-\d{3}/g)]
          .map((item) => item[0])
      ),
    ];

    const emails = [
      ...new Set(
        [...text.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)]
          .map((item) => item[0])
      ),
    ];

    const websites = [
      ...new Set(
        [...text.matchAll(/www\.[a-zA-Z0-9.-]+\.[a-z]{2,}/gi)]
          .map((item) => item[0])
      ),
    ];

    const result = {
      projectName:
        text.match(/Praneeth\s+[A-Za-z]+/i)?.[0] || "",

      place:
        text.match(/Hyderabad/i)?.[0] || "",

      propertyTypes,

      availableAreas: areas,

      contactDetails: {
        phoneNumbers,
        emails,
        websites,
      },

      reraNumber:
        text.match(/P\d{12}/i)?.[0] || "",

      specifications: {
        flooring: text.includes("vitrified")
          ? "Vitrified Tile Flooring"
          : "",

        lifts:
          text.includes("Schindler") ||
          text.includes("OTIS") ||
          text.includes("Kone")
            ? "Schindler / OTIS / Kone"
            : "",

        powerBackup: text.includes("POWER BACKUP")
          ? "Available"
          : "",

        security: text.includes("security")
          ? "24/7 Security"
          : "",

        solarPower: text.includes("SOLAR POWER")
          ? "Available"
          : "",
      },
    };

    // Delete uploaded file
    fs.unlinkSync(req.file.path);

    // Send JSON response
    return res.status(200).json(result);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error extracting PDF data",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});