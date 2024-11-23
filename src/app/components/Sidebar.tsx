'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { AppSidebarProps } from '@/types/index'

const menuItems = [
  { name: 'Dashboard', icon: Home, href: '/' },
  { name: 'User Management', icon: Users, href: '/users' },
]

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="h-full bg-card text-card-foreground py-4 px-2 relative">
      <div className="flex items-center justify-between mb-8">
        <div className="text-2xl font-bold">RBAC Dashboard</div>
        {isOpen && (
          <X className="!h-6 !w-6 text-muted-foreground cursor-pointer" onClick={onClose} />
        )}
      </div>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}