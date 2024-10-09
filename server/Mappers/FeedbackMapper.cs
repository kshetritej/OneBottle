using OneBottle.DTOs;
using OneBottle.DTOs.Feedback;
using OneBottle.Models;

namespace OneBottle.Mappers
{
    public static class FeedbackMappers
    {
        public static Feedback ToFeedbackDTO(this FeedbackDTO feedback)
        {
            return new Feedback
            {
                UserId = feedback.UserId,
                ProductId = feedback.ProductId,
                Rating = feedback.Rating,
                Comment = feedback.Comment,
                Date = feedback.Date
            };
        }
    }
}