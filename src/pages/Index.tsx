import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dashboard } from '@/pages/Dashboard';
import { NewsPage } from '@/pages/NewsPage';
import { EventsPage } from '@/pages/EventsPage';
import { CreateUserPage } from '@/pages/CreateUserPage';
import { Home, Newspaper, Calendar, UserPlus, User } from 'lucide-react';

export default function Index() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'INICIO', icon: Home },
    { id: 'news', label: 'NOTICIAS', icon: Newspaper },
    { id: 'events', label: 'EVENTOS', icon: Calendar },
    { id: 'create-user', label: 'CREAR USUARIOS', icon: UserPlus },
  ];

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'news':
        return <NewsPage />;
      case 'events':
        return <EventsPage />;
      case 'create-user':
        return <CreateUserPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Navigation Header */}
      <header className="dashboard-gradient text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Administrador</h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className={`nav-item gap-2 text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 ${
                      isActive ? 'bg-primary-foreground/30 shadow-md' : ''
                    }`}
                    onClick={() => setCurrentPage(item.id)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            {/* Profile Icon */}
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-primary-foreground/30 transition-colors animate-fade-in">
              <User className="h-5 w-5" />
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden mt-4 flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={`nav-item gap-2 text-primary-foreground hover:bg-primary-foreground/20 ${
                    isActive ? 'bg-primary-foreground/30' : ''
                  }`}
                  onClick={() => setCurrentPage(item.id)}
                >
                  <Icon className="h-3 w-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="animate-fade-in">
        {renderCurrentPage()}
      </main>
    </div>
  );
}
