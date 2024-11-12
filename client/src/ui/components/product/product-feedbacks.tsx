import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select"
import { Button } from "../../../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { useForm } from "react-hook-form"
import { Textarea } from "../../../components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "../../../hooks/use-toast"

const reviews = [
  {
    id: 1,
    userName: "Jennie Goose",
    userImage: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "A simple sweater but makes the user seem neat and beautiful, the material is soft, but when worn it often wrinkles because of sitting for too long.",
    likes: 6,
    dislikes: 0,
  },
]
const reviewSchema = z.object({
  review: z.string().min(10, "Review is too short. Try adding more details."),
});
export default function Feedbacks() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: "",
    }
  });

  function onSubmit(data: any) {
    const username = "Tej"
    if (!username || username.length < 3) {
      toast({
        title: "Error adding review.",
        description: "User must be logged in to leave a review.",
        variant: "destructive"
      })
      return;
    }
    console.log("submitted dat", { ...data, username: username });
    toast({
      title: "Review added!",
      variant: "success"
    })
  }

  return (
    <Card className="mx-auto  border-none shadow-none py-8">
      <Card className="border-none">
        <CardHeader className="mx-auto flex flex-row items-center justify-between">
          <CardTitle className="text-lg md:text-xl">Leave a review.</CardTitle>
        </CardHeader>
        <CardContent >
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Textarea {...register("review")} placeholder="Leave a nice comment." rows={5} />
            {errors.review && <span className="text-red-500">{errors.review.message} </span>}
            <div>
              <Button type="submit">Post Review</Button>
            </div>
          </form>
        </CardContent>

      </Card>
      <CardHeader className="mx-auto flex flex-row items-center justify-between">
        <CardTitle className="text-lg md:text-xl">Previous Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        {reviews.map((review) => (
          <div key={review.id} className="mb-6 last:mb-0">
            <div className="flex items-center mb-2">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={review.userImage} alt={review.userName} />
                <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{review.userName}</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-2">{review.comment}</p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <MessageSquare className="w-4 h-4 mr-2" />
                Reply
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ThumbsUp className="w-4 h-4 mr-2" />
                {review.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ThumbsDown className="w-4 h-4 mr-2" />
                {review.dislikes}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}