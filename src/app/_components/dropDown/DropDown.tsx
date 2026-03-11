import userImage from '../../../assets/image/male-avatar-boy-face-man-user-9.svg'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Image from 'next/image'
import Link from 'next/link'

export function DropdownMenuBasic({logout}: { logout: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image alt='user' width={40} height={40} src={userImage} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>

          <DropdownMenuItem>
            <Link href={'/profile'}> Profile </Link>

         </DropdownMenuItem>
          <DropdownMenuItem>
            <span onClick={logout} className="cursor-pointer ">Logout</span>
          </DropdownMenuItem>
   
        </DropdownMenuGroup>
      
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
