import { useState } from "react";

function BottomTabs({ sections }) {
  const [activeTab, setActiveTab] = useState("script");

  const tabs = [
    { id: "script", label: "📜 Script", content: sections?.script },
    { id: "voice", label: "🎙 Voice", content: sections?.voiceNotes },
    { id: "camera", label: "📷 Camera", content: sections?.cameraDirections },
    { id: "music", label: "🎵 Music", content: sections?.musicAndSound },
    { id: "thumbnail", label: "🔥 Thumbnail", content: sections?.thumbnailIdea },
    { id: "metadata", label: "📈 Metadata", content: sections?.youtubeMetadata },
  ];

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <div className="mb-5 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-4 py-3 font-bold transition ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <pre className="whitespace-pre-wrap rounded-xl bg-slate-950 p-5 font-sans leading-7 text-slate-200">
        {activeContent || "Generate an AI Director Package first."}
      </pre>
    </div>
  );
}

export default BottomTabs;