function CopyButton({ text }) {
  function copyText() {
    navigator.clipboard.writeText(text || "");
    alert("Copied!");
  }

  return (
    <button
      onClick={copyText}
      className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500"
    >
      📋 Copy
    </button>
  );
}

export default CopyButton;