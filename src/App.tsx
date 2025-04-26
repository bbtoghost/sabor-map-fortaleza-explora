
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/Home";
import MapView from "./components/MapView";
import ListView from "./components/ListView";
import FeedView from "./components/FeedView";
import VideosView from "./components/VideosView";
import UserProfilePage from "./pages/UserProfile";
import RestaurantDetailPage from "./pages/RestaurantDetail";

const App = () => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<AppLayout />}>
              <Route path="/home" element={<HomePage />}>
                <Route path="map" element={<MapView />} />
                <Route path="list" element={<ListView />} />
                <Route path="feed" element={<FeedView />} />
                <Route path="videos" element={<VideosView />} />
              </Route>
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
