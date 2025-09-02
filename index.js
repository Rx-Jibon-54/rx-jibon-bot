const login = require("ws3-fca");
require("dotenv").config();

// Load bot config
const email = process.env.FB_EMAIL;
const password = process.env.FB_PASSWORD;

if (!email || !password) {
  console.error("❌ Missing FB_EMAIL or FB_PASSWORD in .env file!");
  process.exit(1);
}

// Start login
login({ email, password }, (err, api) => {
  if (err) {
    console.error("❌ Login failed:", err.error || err);
    return;
  }

  console.log("✅ Boss Bot logged in successfully!");

  // Make sure unexpected errors don’t crash bot
  process.on("unhandledRejection", (reason, p) => {
    console.error("⚠️ Unhandled Rejection:", reason);
  });
  process.on("uncaughtException", (err) => {
    console.error("⚠️ Uncaught Exception:", err);
  });

  // Example: Listen for messages
  api.listenMqtt(async (err, message) => {
    if (err) {
      console.error("❌ Listen error:", err);
      return;
    }

    console.log("📩 Message received:", message.body);

    // Simple reply system
    if (message.body && message.body.toLowerCase() === "hi") {
      api.sendMessage("Hello Boss! 👋", message.threadID);
    }

    // Safe getThreadList example
    try {
      const threads = await api.getThreadList(5, null, []);
      if (!threads || !Array.isArray(threads)) {
        console.warn("⚠️ getThreadList returned invalid data:", threads);
      } else {
        console.log("📜 Last 5 threads:", threads.map(t => t.name || t.threadID));
      }
    } catch (e) {
      console.error("❌ Error in getThreadList:", e.message);
    }
  });
});