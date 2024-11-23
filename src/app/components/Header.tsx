'use client'

import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { AppSidebar } from './Sidebar'
import ThemeButton from './ThemeButton'

export function Header() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between p-4 border-b border-border bg-card text-card-foreground">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-auto w-auto"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <Menu className="!h-6 !w-6" />
          </Button>
        </div>
        <ThemeButton />
      </header>
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-background/80"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>
          <div className="absolute inset-y-0 left-0 w-3/4 max-w-xs bg-card border-r">
            <AppSidebar
              isOpen={isMobileSidebarOpen}
              onClose={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}