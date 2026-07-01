function Button({ children, onClick, variant = "primary", className = "" }) {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white",
    success: "bg-emerald-600 hover:bg-emerald-500 text-white",
    danger: "bg-red-600 hover:bg-red-500 text-white",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white",
    purple: "bg-purple-600 hover:bg-purple-500 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-5 py-3 font-bold transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;