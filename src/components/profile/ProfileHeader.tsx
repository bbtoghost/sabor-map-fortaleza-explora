
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ProfileHeaderProps {
  user: {
    name: string;
    avatar: string;
    email: string;
    bio?: string;
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      linkedin?: string;
    };
  };
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20" />
      <div className="absolute -bottom-16 left-4">
        <Avatar className="w-32 h-32 border-4 border-background">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-20 px-4">
        {isEditing ? (
          <Input 
            defaultValue={user.name}
            className="text-2xl font-bold mb-1"
          />
        ) : (
          <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
        )}
        <p className="text-muted-foreground mb-4">{user.email}</p>
        <div className="flex gap-2">
          {user.socialLinks?.instagram && (
            <Button variant="ghost" size="icon" className="hover:text-pink-500">
              <Instagram className="h-5 w-5" />
            </Button>
          )}
          {user.socialLinks?.facebook && (
            <Button variant="ghost" size="icon" className="hover:text-blue-600">
              <Facebook className="h-5 w-5" />
            </Button>
          )}
          {user.socialLinks?.linkedin && (
            <Button variant="ghost" size="icon" className="hover:text-blue-500">
              <Linkedin className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
