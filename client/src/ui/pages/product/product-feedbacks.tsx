import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select"
import { Button } from "../../../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"

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
  {
    id: 2,
    userName: "Guy Hawkins",
    userImage: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "Nice colour looks like oversized shirt and fitting is just right.",
    likes: 0,
    dislikes: 0,
  },
]

export default function Feedbacks() {
  const [sortBy, setSortBy] = useState("latest")

  return (
    <Card className="w-full max-w-3xl border-none shadow-none py-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg md:text-xl">Reviews</CardTitle>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
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
                      className={`w-4 h-4 ${
                        i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
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