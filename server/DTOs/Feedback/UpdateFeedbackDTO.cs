namespace OneBottle.DTOs.Feedback
{
    public class UpdateFeedbackDTO
    {
        public Guid FeedbackId { get; set; }
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public int? Rating { get; set; }
        public string? Comment { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }
}