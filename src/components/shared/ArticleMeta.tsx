interface ArticleMetaProps {
  date?: string
  expert?: string
}

export default function ArticleMeta({ date = "lipiec 2026", expert = "Piotr Radwański" }: ArticleMetaProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4">
      {date && (
        <time dateTime="2026-07-04" className="flex items-center gap-1">
          {date}
        </time>
      )}
      {expert && (
        <span className="flex items-center gap-1">
          ✍️ {expert}
        </span>
      )}
    </div>
  )
}
