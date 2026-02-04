import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inquiries = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post("/api/inquiries", (req, res) => {
  const { name, email, project, message } = req.body;

  if (!name || !email || !project || !message) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  const record = {
    id: Date.now(),
    name,
    email,
    project,
    message,
    receivedAt: new Date().toISOString()
  };

  inquiries.push(record);

  return res.status(201).json({
    message: "Thanks! Your inquiry has been received.",
    id: record.id
  });
});

app.get("/api/inquiries", (_req, res) => {
  res.json(inquiries);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Mphemba Construction site running on port ${port}`);
});
