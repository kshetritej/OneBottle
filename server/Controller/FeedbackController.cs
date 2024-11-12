using Microsoft.AspNetCore.Mvc;
using OneBottle.Data;
using OneBottle.DTOs.Feedback;
using OneBottle.Interfaces;
using OneBottle.Mappers;
using OneBottle.Models;

namespace OneBottle.Controller
{
    [ApiController]
    public class FeedbackController : ControllerBase
    {

        private readonly IFeedbackRepository _feedbackRepository;
        private readonly AppDbContext _context;
        public FeedbackController(IFeedbackRepository feedbackRepository, AppDbContext context)
        {
            _feedbackRepository = feedbackRepository;
            _context = context;
        }

        [HttpGet("/api/feedback")]
        public async Task<IActionResult> GetFeedbacksAsync()
        {
            var feedbacks = await _feedbackRepository.GetFeedbackAsync();
            if (feedbacks == null)
            {
                return NotFound();
            }
            return Ok(feedbacks.Select(f => FeedbackMappers.ToFeedbackDTO(f)));
        }

        [HttpGet("/api/{productId:guid}")]
        public async Task<IActionResult> GetFeedbacksByProductIdAsync(Guid productId)
        {
            var feedbacks = await _feedbackRepository.GetFeedbacksByProductIdAsync(productId);
            if (feedbacks == null)
            {
                return NotFound();
            }
            return Ok(feedbacks.Select(f => FeedbackMappers.ToFeedbackDTO(f)));
        }

        [HttpGet("/api/feedback/user/{userId:guid}")]
        public async Task<IActionResult> GetFeedbackByUserIdAsync(Guid userId)
        {
            var feedbacks = await _feedbackRepository.GetFeedbackByUserIdAsync(userId);
            if (feedbacks == null)
            {
                return NotFound();
            }
            return Ok(feedbacks);
        }


        [HttpPost("/api/feedback")]
        public async Task<IActionResult> AddFeedbackAsync([FromBody] CreateFeedbackDTO feedback)
        {
            var feedbackModel = FeedbackMappers.ToFeedbackModel(feedback);
            await _feedbackRepository.AddFeedbackAsync(feedbackModel);
            return CreatedAtAction(nameof(GetFeedbacksByProductIdAsync), new { feedbackId = feedbackModel.FeedbackId }, feedback.ToFeedbackModel());
        }


        [HttpDelete("/api/feedback/{feedbackId}")]
        public async Task<IActionResult> DeleteFeedbackAsync(Guid feedbackId)
        {
            var feedback = await _feedbackRepository.GetFeedbackByIdAsync(feedbackId);
            if (feedback == null)
            {
                return NotFound();
            }
            await _feedbackRepository.DeleteFeedbackAsync(feedbackId);
            return Ok();
        }
    }
}