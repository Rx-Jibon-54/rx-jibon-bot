module.exports = {
  config: {
    name: "fahad",
    version: "1.0",
    author: "Goku",
    countDown: 5,
    role: 0,
    shortDescription: "triggered by 😽",
    longDescription: "sends Fahad video when 😽 emoji is sent",
    category: "no prefix",
  }, 

  onStart: async function(){}, 

  onChat: async function({ event, message }) {
    if (event.body && event.body.includes("😽")) {
      const video = "https://files.catbox.moe/f63r67.mp4";

      return message.reply({
        body: "𝐅𝐀𝐇𝐀𝐃 ✨ 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 🎬",
        attachment: await global.utils.getStreamFromURL(video)
      });
    }
  }
}