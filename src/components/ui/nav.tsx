"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Users, User, LogOut } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

const navItems = [
    { href: "/companies", label: "Companies", icon: Building2 },
    { href: "/clients", label: "Clients", icon: Users },
]

export function Nav() {
    const pathname = usePathname()
    const { user, logout } = useAuth()

    if (pathname === '/') {
        return null;
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .slice(0, 2)
            .map(n => n[0])
            .join('')
            .toUpperCase();
    }

    return (
        <header className="w-full px-8 pt-4 rounded-lg bg-gray-950">
            <div className="w-full bg-[#12151A]">
                <div className="flex h-14 items-center justify-between rounded-lg px-4">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center h-14 pr-4">
                            <Image
                                src="/nomada_digital.png"
                                width={50}
                                height={40}
                                alt="Nomada Digital Logo"
                                className="object-contain h-12"
                                priority
                            />
                        </div>
                        <div className="flex gap-2">
                            {navItems.map((item) => (
                                <Button
                                    key={item.href}
                                    variant="ghost"
                                    asChild
                                    className={cn(
                                        "gap-2 text-muted-foreground hover:text-primary",
                                        pathname === item.href && "text-slate-100"
                                    )}
                                >
                                    <Link href={item.href}>
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground mr-2">
                            {user?.name}
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>
                                            {user?.name ? getInitials(user.name) : 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuItem className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    {user?.name}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={logout}
                                    className="flex items-center gap-2 text-red-600"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}