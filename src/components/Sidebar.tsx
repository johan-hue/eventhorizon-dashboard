import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  UserPlus, 
  Menu, 
  X,
  Users
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'news',
      label: 'Noticias',
      icon: Newspaper,
    },
    {
      id: 'events',
      label: 'Eventos',
      icon: Calendar,
    },
    {
      id: 'create-user',
      label: 'Crear Usuario',
      icon: UserPlus,
    },
  ];

  const handlePageChange = (pageId: string) => {
    onPageChange(pageId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="dashboard-gradient h-full">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-primary-foreground">
                <Users className="h-8 w-8" />
                <div>
                  <h2 className="text-xl font-bold">LA VOZ DE TODOS</h2>
                  <p className="text-sm text-primary-foreground/80">Admin Panel</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 text-primary-foreground hover:bg-primary-foreground/10",
                      isActive && "bg-primary-foreground/20 text-primary-foreground"
                    )}
                    onClick={() => handlePageChange(item.id)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4">
              <div className="text-center text-xs text-primary-foreground/60">
                Sistema de Gestión Comunitaria
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};