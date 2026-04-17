export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-5 py-3 rounded-xl bg-black text-white font-medium hover:opacity-90 transition disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}