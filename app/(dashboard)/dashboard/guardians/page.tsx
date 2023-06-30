import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return <div>
   <h1>Guardians Account module</h1>
   <p>Module that simulates parent account ledger</p>
   <p>List all the guardians along with their contact info, dues, and payment history</p>
  </div>
}

export default page