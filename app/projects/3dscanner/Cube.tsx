// Wireframe cube used as the placeholder art for a space.
export default function Cube({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path d="M24 6l15 8.5v17L24 40 9 31.5v-17z" fill="none" stroke="#e8e8e8" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 14.5L24 23l15-8.5M24 23v17" fill="none" stroke="#e8e8e8" strokeWidth="1.6" strokeLinejoin="round" opacity="0.55" />
      <circle cx="24" cy="23" r="2" fill="#F4E27C" />
    </svg>
  );
}
