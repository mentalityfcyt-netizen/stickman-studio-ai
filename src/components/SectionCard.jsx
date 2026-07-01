import { useState } from "react";
import CopyButton from "./CopyButton";

function SectionCard({ title, content }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-lg">
      <div
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center justify-between"
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="text-slate-400">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="mt-4">
          <CopyButton text={content} />

          <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-950/70 p-5 font-sans leading-7 text-slate-200">
            {content || "Nothing generated yet."}
          </pre>
        </div>
      )}
    </div>
  );
}

export default SectionCard;