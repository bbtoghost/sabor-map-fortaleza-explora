
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Medal } from "lucide-react";

interface GamificationSectionProps {
  points: number;
  level: string;
  nextLevelPoints: number;
  achievements: Array<{
    title: string;
    description: string;
    icon: "star" | "medal" | "award";
  }>;
}

const GamificationSection = ({ points, level, nextLevelPoints, achievements }: GamificationSectionProps) => {
  const progressPercentage = (points / nextLevelPoints) * 100;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "star":
        return <Star className="w-5 h-5 text-yellow-500" />;
      case "medal":
        return <Medal className="w-5 h-5 text-primary" />;
      case "award":
        return <Award className="w-5 h-5 text-secondary" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Nível de Explorador</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-primary" />
            <span className="font-medium">{level}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{points} pontos</span>
              <span>{nextLevelPoints - points} para o próximo nível</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-2">
        {achievements.map((achievement, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              {getIcon(achievement.icon)}
              <div>
                <h4 className="font-medium text-sm">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GamificationSection;
