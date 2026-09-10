type IconProps = { className?: string };

export function ShirtIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path
        d="M35 14 L20 24 L8 40 L20 50 L28 42 L28 88 L72 88 L72 42 L80 50 L92 40 L80 24 L65 14 C65 22 58 27 50 27 C42 27 35 22 35 14 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DressIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path
        d="M40 12 L32 22 L34 34 L18 88 L82 88 L66 34 L68 22 L60 12 C60 20 55 25 50 25 C45 25 40 20 40 12 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M34 34 L66 34" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export function PantsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path
        d="M24 12 H76 L79 88 L60 88 L50 40 L40 88 L21 88 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M24 26 H76" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export function SetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path
        d="M30 10 L18 18 L10 30 L18 37 L24 31 L24 58 L76 58 L76 31 L82 37 L90 30 L82 18 L70 10 C70 17 61 22 50 22 C39 22 30 17 30 10 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M28 62 H72 L74 90 H58 L50 68 L42 90 H26 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
