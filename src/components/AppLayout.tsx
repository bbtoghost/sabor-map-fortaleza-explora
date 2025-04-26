
import { Outlet } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { Map, List, MessageSquare, Video, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("map");

  useEffect(() => {
    if (location.pathname === "/home" || location.pathname === "/home/map") {
      setActiveTab("map");
    } else if (location.pathname === "/home/list") {
      setActiveTab("list");
    } else if (location.pathname === "/home/feed") {
      setActiveTab("feed");
    } else if (location.pathname === "/home/videos") {
      setActiveTab("videos");
    } else if (location.pathname === "/profile") {
      setActiveTab("profile");
    }
  }, [location.pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case "map":
        navigate("/home/map");
        break;
      case "list":
        navigate("/home/list");
        break;
      case "feed":
        navigate("/home/feed");
        break;
      case "videos":
        navigate("/home/videos");
        break;
      case "profile":
        navigate("/profile");
        break;
      default:
        navigate("/home");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold text-primary">Me Indica Aí</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content with Outlet */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <div className="border-t bg-background">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full h-16 bg-transparent grid grid-cols-5">
            <TabsTrigger value="map" className="flex flex-col items-center justify-center data-[state=active]:text-primary">
              <Map size={20} />
              <span className="text-xs mt-1">Mapa</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex flex-col items-center justify-center data-[state=active]:text-primary">
              <List size={20} />
              <span className="text-xs mt-1">Lista</span>
            </TabsTrigger>
            <TabsTrigger value="feed" className="flex flex-col items-center justify-center data-[state=active]:text-primary">
              <MessageSquare size={20} />
              <span className="text-xs mt-1">Feed</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex flex-col items-center justify-center data-[state=active]:text-primary">
              <Video size={20} />
              <span className="text-xs mt-1">Vídeos</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col items-center justify-center data-[state=active]:text-primary">
              <User size={20} />
              <span className="text-xs mt-1">Perfil</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default AppLayout;
