
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ReviewFormProps {
  showReviewForm: boolean;
  setShowReviewForm: (show: boolean) => void;
  reviewRating: Record<string, number>;
  setReviewRating: (rating: Record<string, number> | ((prev: Record<string, number>) => Record<string, number>)) => void;
  reviewText: string;
  setReviewText: (text: string) => void;
  selectedTags: string[];
  handleTagToggle: (tag: string) => void;
  handleSubmitReview: () => void;
  allTags: string[];
  restaurantName: string;
  renderStars: (rating: number) => JSX.Element[];
}

export const ReviewForm = ({
  showReviewForm,
  setShowReviewForm,
  reviewRating,
  setReviewRating,
  reviewText,
  setReviewText,
  selectedTags,
  handleTagToggle,
  handleSubmitReview,
  allTags,
  restaurantName,
  renderStars,
}: ReviewFormProps) => {
  return (
    <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Avaliar {restaurantName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-4">
            {[
              { key: 'food', label: 'Comidas' },
              { key: 'drinks', label: 'Drinks' },
              { key: 'price', label: 'Preço' },
              { key: 'ambience', label: 'Ambiente' },
              { key: 'service', label: 'Atendimento' },
              { key: 'time', label: 'Tempo' },
              { key: 'infrastructure', label: 'Estrutura' },
            ].map(({ key, label }) => (
              <div key={key}>
                <h3 className="text-sm font-medium mb-2">{label}:</h3>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[reviewRating[key as keyof typeof reviewRating]]}
                    min={1}
                    max={5}
                    step={0.5}
                    onValueChange={([value]) => 
                      setReviewRating((prev) => ({
                        ...prev,
                        [key]: value
                      }))
                    }
                    className="w-full"
                  />
                  <div className="flex ml-2">
                    {renderStars(reviewRating[key as keyof typeof reviewRating])}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Seu comentário:</h3>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Como foi sua experiência?"
              className="min-h-20"
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Selecione as tags que se aplicam:</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTagToggle(tag)}
                >
                  {selectedTags.includes(tag) && <Check className="mr-1 h-3 w-3" />}
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowReviewForm(false)}>Cancelar</Button>
            <Button onClick={handleSubmitReview}>Enviar Avaliação</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
