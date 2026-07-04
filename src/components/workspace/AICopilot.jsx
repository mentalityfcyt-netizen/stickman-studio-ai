import { useState } from "react";
import { Card, Button, Textarea } from "../ui";

function AICopilot({ onSend, loading }) {
  const [message, setMessage] = useState("");

  async function handleSend() {
    if (!message.trim()) return;

    await onSend(message);

    setMessage("");
  }

  return (
    <Card className="h-full">
      <h2 className="mb-4 text-2xl font-bold">
        🤖 VidoForge AI Producer
      </h2>

      <p className="mb-5 text-slate-400">
        Ask me to improve scenes, rewrite scripts, change styles, shorten videos,
        or generate new ideas.
      </p>

      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        placeholder="Example: Rewrite Scene 4 in a Netflix documentary style..."
      />

      <Button
        onClick={handleSend}
        className="mt-5 w-full"
      >
        {loading ? "Thinking..." : "Send"}
      </Button>
    </Card>
  );
}

export default AICopilot;