interface Props {
  className?: string
}

/** A transmission-pylon mark: reads as physical infrastructure (grid towers,
 *  the lattice steel this site tracks) while its silhouette doubles as the
 *  "A" in infraAnalysis. Line-based to match the lucide iconography elsewhere. */
export default function Logo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3 4 21" />
      <path d="M12 3 20 21" />
      <path d="M9 3h6" />
      <path d="M7.5 12.5h9" />
      <path d="M6 17.5h12" />
      <circle cx="12" cy="3" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}
