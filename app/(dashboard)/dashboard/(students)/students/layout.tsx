
interface StudentsProps {
    children?: React.ReactNode
  }

  export default function StudentLayout({ children }: StudentsProps) {
    return (
      <div className="container mx-auto grid items-start gap-10 py-8">
        {children}
      </div>
    )
  }
