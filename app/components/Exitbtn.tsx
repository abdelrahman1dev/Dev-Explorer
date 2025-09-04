import { LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Exitbtn() {
  return (
    <div>
      <Link href="/">
      <button className="p-1 bg-white/20 rounded border border-gray-500 cursor-pointer flex gap-3 transition-all items-center justify-center"  ><LogOut  className='opacity-50'/></button>
      </Link>
    </div>
  )
}

export default Exitbtn
