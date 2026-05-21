const express = require("express");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT || 4112);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const lesson = {
  id: "ai-api",
  title: "AI API",
  level: "Specialize Later",
  stack: ["Provider APIs", "Prompt engineering", "Safety checks"],
  useCases: ["Assistants", "Automation", "Summarization"],
};

app.get("/api/health", (req, res) =>
  res.json({ success: true, lesson: lesson.id }),
);
app.get("/api/lesson", (req, res) => res.json({ success: true, data: lesson }));
app.post("/api/demo", (req, res) => {
  const prompt = req.body.prompt || "Summarize this paragraph";
  res.json({ success: true, prompt, response: "Demo AI response placeholder" });
});

app.get("/", (req, res) => {
  res
    .type("html")
    .send(
      `<html><head><title>${lesson.title} Lab</title><style>body{font-family:Manrope,Arial,sans-serif;background:#f5f1ea;padding:24px}main{max-width:900px;margin:auto;background:#fff;padding:20px;border-radius:16px}</style></head><body><main><h1>${lesson.title} Lab</h1><p>Practice model abstraction and response safety validation.</p><p><a href='/api/lesson'>GET /api/lesson</a></p></main></body></html>`,
    );
});

app.listen(PORT, () =>
  console.log(`${lesson.title} lab running on http://localhost:${PORT}`),
);
