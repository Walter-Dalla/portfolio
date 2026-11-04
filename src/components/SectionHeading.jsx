export function SectionHeading({ eyebrow, title, as: Tag = 'h2', id }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <Tag className="section-title" id={id}>
        {title}
      </Tag>
    </div>
  )
}
