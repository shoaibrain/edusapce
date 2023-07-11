interface GuardiansProps {
    children?: React.ReactNode
  }
  
  export default function AccountLayout({ children }: GuardiansProps) {
    return (
      <div className="container mx-auto grid items-start gap-10 py-8">
        {children}
      </div>
    )
  }