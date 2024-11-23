import { AnimatePresence, motion } from 'framer-motion'
import { AppSidebar } from './Sidebar'
import { Header } from './Header'
import { SidebarProvider } from '@/components/ui/sidebar'

export function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-r border-border"
          >
            <AppSidebar />
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

