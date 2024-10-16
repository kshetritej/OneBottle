using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Feedback
{
    public class UpdateFeedbackDTO
    {
        [Required]
        public Guid FeedbackId { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public Guid ProductId { get; set; }

        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
        public int? Rating { get; set; }
        [MaxLength(150, ErrorMessage = "Comment must be less than 150 characters")]
        public string? Comment { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }
}