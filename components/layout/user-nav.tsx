'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import PaymentPage from '@/components/payment'

import { UserButton, useUser } from '@clerk/nextjs';



export function UserNav() {
  
  const { user } = useUser();

 
  
  
    return (
      <DropdownMenu>
        <PaymentPage />
        
          
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <UserButton />
          </Button>
       
        
      </DropdownMenu>
    );
  
}
