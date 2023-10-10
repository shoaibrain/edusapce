
interface TeachersPageProps {
    children?: React.ReactNode
  }

  export default function TeacherLayout({ children }: TeachersPageProps) {
    return (
      <div className="container mx-auto grid items-start gap-10 py-8">
        {children}
      </div>
    )
  }
