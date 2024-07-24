
"use client"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2nn3u8pF4Jc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';

export default function Component() {
  return (
    <>
    <div className='mb-4'>
     <Heading title="Buyer Chat Section" description="Use our AI-Integrated restate tools and make ease of using the Platform"   />
     </div>
        <Separator />
    <div className="flex h-[600px] w-full max-w-[1200px] rounded-lg border">
      <div className="flex flex-col border-r bg-background p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Users</h3>
          <Button variant="ghost" size="icon">
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Add user</span>
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            <Link href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted" prefetch={false}>
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Olivia Davis</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
              <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500" />
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted" prefetch={false}>
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Alex Chen</p>
                <p className="text-xs text-muted-foreground">Offline</p>
              </div>
              <div className="flex h-3 w-3 items-center justify-center rounded-full bg-red-500" />
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted" prefetch={false}>
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
              <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500" />
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted" prefetch={false}>
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Sarah Adams</p>
                <p className="text-xs text-muted-foreground">Offline</p>
              </div>
              <div className="flex h-3 w-3 items-center justify-center rounded-full bg-red-500" />
            </Link>
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col flex-1">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>OD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Olivia Davis</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <PhoneIcon className="h-4 w-4" />
                <span className="sr-only">Call</span>
              </Button>
              <Button variant="ghost" size="icon">
                <VideoIcon className="h-4 w-4" />
                <span className="sr-only">Video call</span>
              </Button>
              <Button variant="ghost" size="icon">
                <MoveHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </div>
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>OD</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="rounded-md bg-muted p-3">
                  <p>
                    Hey there! I just wanted to check in and see how the project is going. Do you have any updates for
                    me?
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">2:39 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-4 justify-end">
              <div className="flex-1 space-y-2">
                <div className="rounded-md bg-primary p-3 text-primary-foreground">
                  <p>
                    Hi Olivia, the project is going well! Were on track to have the MVP ready by the end of the week.
                    Ill send you an update later today.
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">2:41 PM</p>
              </div>
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-start gap-4">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>OD</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="rounded-md bg-muted p-3">
                  <p>Sounds good, Im looking forward to the update!</p>
                </div>
                <p className="text-xs text-muted-foreground">2:42 PM</p>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              className="min-h-[48px] w-full rounded-2xl resize-none border border-neutral-400 p-4 pr-16 shadow-sm"
            />
           
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  )
}