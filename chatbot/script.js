const chatbox = document.getElementById("chatbox");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userText = input.value;
  addMessage(userText, "user");
  input.value = "";

  addMessage("Pensando...", "bot");

  // Aqui você trocaria pela chamada real de API
  const response = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });
  const data = await response.json();

  // Remove o "Pensando..."
  chatbox.removeChild(chatbox.lastChild);

  addMessage(data.reply, "bot");
});

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}
