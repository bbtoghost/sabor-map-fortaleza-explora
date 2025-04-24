
import { Ad } from "@/types";

interface AdBannerProps {
  ad: Ad;
}

const AdBanner = ({ ad }: AdBannerProps) => {
  return (
    <div className="rounded-xl overflow-hidden relative">
      <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
        Anúncio
      </div>
      <img
        src={ad.image}
        alt={ad.title}
        className="w-full h-32 object-cover"
      />
      <div className="p-3 bg-card text-card-foreground">
        <h3 className="font-bold text-base">{ad.title}</h3>
        <p className="text-sm text-muted-foreground">{ad.description}</p>
      </div>
    </div>
  );
};

export default AdBanner;
