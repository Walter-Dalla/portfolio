/** Texto com `**destaque**` → número em mono na cor de acento. */
export function Rich({ text }) {
  if (!text) return null
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="hl">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}
