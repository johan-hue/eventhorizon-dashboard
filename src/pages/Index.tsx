import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { NewsPage } from '@/pages/NewsPage';
import { EventsPage } from '@/pages/EventsPage';
import { CreateUserPage } from '@/pages/CreateUserPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
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
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 md:pl-0">
        {renderPage()}
      </div>
    </div>
  );
};

export default Index;
