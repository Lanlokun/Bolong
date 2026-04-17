export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black ${className}`}
      {...props}
    />
  );
}