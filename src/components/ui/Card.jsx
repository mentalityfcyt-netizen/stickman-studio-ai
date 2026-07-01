function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;