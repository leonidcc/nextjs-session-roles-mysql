
import Link from 'next/link'

export default function Nav({title, logo, children}){
  return (
    <nav className="bg-primary  py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/dashboard">
          <strong className="text-white">
            HELLO DASH
          </strong>
         </Link>
         <div className="text-white">
           {children}
         </div>

      </div>
  </nav>
  )
}
