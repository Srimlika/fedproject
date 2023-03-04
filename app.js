const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
mongoose.connect("mongodb://localhost/file_mapping_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const fileMappingSchema = new mongoose.Schema({
  originalName: String,
  requestedName: String,
});

const FileMapping = mongoose.model("FileMapping", fileMappingSchema);
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/:requestedName", async (req, res) => {
  const { requestedName } = req.params;
  const fileMapping = await FileMapping.findOne({ requestedName });
  if (!fileMapping) {
    return res.status(404).send("File not found");
  }

  const filePath = path.join(__dirname, "public", fileMapping.originalName);
  res.sendFile(filePath);
});

app.listen(3000, () => console.log("Server started on port 3000"));
