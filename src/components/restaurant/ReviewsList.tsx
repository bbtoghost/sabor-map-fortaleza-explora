
import { Badge } from "@/components/ui/badge";
import { Comment } from "@/types";

interface ReviewsListProps {
  comments: Comment[];
  renderStars: (rating: number) => JSX.Element[];
}

export const ReviewsList = ({ comments, renderStars }: ReviewsListProps) => {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="border-b pb-4 last:border-0">
          <div className="flex items-center gap-3">
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{comment.author.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">{renderStars(comment.rating)}</div>
                <span className="text-sm text-muted-foreground">
                  {comment.date}
                </span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mt-3">{comment.text}</p>
          {comment.tags && comment.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {comment.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
