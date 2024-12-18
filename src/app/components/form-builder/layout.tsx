import 'survey-core/defaultV2.min.css';
import 'survey-creator-core/survey-creator-core.min.css';

export default function FormBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen">
      {children}
    </div>
  )
}