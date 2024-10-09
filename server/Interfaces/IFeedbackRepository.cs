using OneBottle.DTOs.Feedback;
using OneBottle.Models;
namespace OneBottle.Interfaces
{
    public interface IFeedbackRepository
    {
        Task<List<Feedback>> GetAllFeedbackAsync();
        Task<Feedback> GetFeedbackByIdAsync(Guid feedbackId);
        Task CreateFeedbackAsync(FeedbackDTO feedback);
        Task<Feedback> UpdateFeedbackAsync(Guid feedbackId, Guid userId, UpdateFeedbackDTO feedback);
        Task<Feedback> DeleteFeedback(Guid feedbackId, Guid userId);
    }
}