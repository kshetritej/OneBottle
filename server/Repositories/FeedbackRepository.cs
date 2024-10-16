using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.Interfaces;
using OneBottle.Models; 

namespace OneBottle.Repositories 
{ 
    public class FeedbackRepository : IFeedbackRepository 
    { 
      private readonly AppDbContext _context; 

      public FeedbackRepository(AppDbContext context) 
      { 
          _context = context; 
      } 

      public async Task<Feedback> GetFeedbackByIdAsync(Guid feedbackId) 
      { 
          return await _context.Feedbacks.FindAsync(feedbackId); 
      } 

      public async Task<IEnumerable<Feedback>> GetFeedbacksByProductIdAsync(Guid productId) 
      { 
          return await _context.Feedbacks.Where(f => f.ProductId == productId).ToListAsync(); 
      } 

      public async Task AddFeedbackAsync(Feedback feedback) 
      { 
          try 
          { 
              await _context.Feedbacks.AddAsync(feedback); 
              await _context.SaveChangesAsync(); 
          } 
          catch (Exception ex) 
          { 
              // Log exception here 
              throw new Exception("An error occurred while adding feedback.", ex); 
          } 
      } 

      public async Task UpdateFeedbackAsync(Feedback feedback) 
      { 
          try 
          { 
              _context.Feedbacks.Update(feedback); 
              await _context.SaveChangesAsync(); 
          }  
          catch (Exception ex)  
          {  
              // Log exception here  
              throw new Exception("An error occurred while updating feedback.", ex);  
          }  
      }  

      public async Task DeleteFeedbackAsync(Guid feedbackId)  
      {  
          var feedback = await GetFeedbackByIdAsync(feedbackId);  
          if (feedback != null)  
          {  
              try  
              {  
                  _context.Feedbacks.Remove(feedback);  
                  await _context.SaveChangesAsync();  
              }  
              catch (Exception ex)  
              {  
                  // Log exception here  
                  throw new Exception("An error occurred while deleting feedback.", ex);  
              }  
          }  
      }  
   }  
}