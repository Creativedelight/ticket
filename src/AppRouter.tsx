import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TicketPurchasePage } from './pages/TicketPurchasePage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { Layout } from './components/Layout';
export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="purchase/:eventId" element={<TicketPurchasePage />} />
          <Route path="confirmation/:ticketId" element={<ConfirmationPage />} />
          <Route path="my-tickets" element={<UserDashboardPage />} />
          
        </Route>
      </Routes>
    </BrowserRouter>;
}