
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    points: number;
  };
  onLogout: () => void;
}

const ProfileHeader = ({ user, onLogout }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    onLogout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
    navigate("/login");
  };

  const pointsToNextReward = 300 - user.points;
  const progressPercentage = (user.points / 300) * 100;

  return (
    <>
      <div className="relative bg-primary h-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/60 to-primary"></div>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleBack}
          className="absolute top-4 left-4 bg-background/40 backdrop-blur-sm text-white hover:bg-background/60 z-10"
        >
          <ArrowLeft size={20} />
        </Button>
      </div>

      <div className="px-4 -mt-16 relative z-10">
        <div className="bg-card rounded-xl shadow-lg p-4 flex flex-col items-center">
          <Avatar className="w-24 h-24 border-4 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-bold mt-2">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>

          <Button 
            variant="destructive" 
            className="mt-6 w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da conta
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
