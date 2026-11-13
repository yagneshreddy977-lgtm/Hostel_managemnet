import React, { useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import { Star, CheckCircle2 } from 'lucide-react';
import '../components.css';

/**
 * ComplaintFeedbackCard Component
 * Displays the feedback submission form or the existing submitted review.
 */
function ComplaintFeedbackCard({ existingFeedback, onProvideFeedback, complaintId }) {
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onProvideFeedback) {
      onProvideFeedback(complaintId, { rating, comments: feedbackText });
    }
    setFeedbackSubmitted(true);
  };

  const isSubmitted = Boolean(existingFeedback || feedbackSubmitted);
  const displayedRating = existingFeedback?.rating || rating;
  const displayedComments = existingFeedback?.comments || feedbackText || 'No additional comments provided.';

  return (
    <Card 
      title="Student Feedback & Service Rating" 
      subtitle="Rate the speed and quality of maintenance to help us improve campus facilities"
    >
      {isSubmitted ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '24px', 
          backgroundColor: 'var(--color-bg-subtle)',
          borderRadius: 'var(--radius-md)'
        }}>
          <CheckCircle2 size={40} color="var(--color-success)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0' }}>Thank You for Your Feedback!</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '8px 0' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star 
                key={s} 
                size={22} 
                fill={s <= displayedRating ? '#f59e0b' : 'none'} 
                color={s <= displayedRating ? '#f59e0b' : '#cbd5e1'} 
              />
            ))}
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', margin: '8px 0 0 0' }}>
            "{displayedComments}"
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">How satisfied are you with the repair resolution?</label>
            <div style={{ display: 'flex', gap: '8px', margin: '10px 0' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: star <= rating ? '#f59e0b' : '#cbd5e1',
                    transition: 'transform 0.1s ease',
                  }}
                >
                  <Star size={28} fill={star <= rating ? '#f59e0b' : 'none'} />
                </button>
              ))}
              <span style={{ marginLeft: '10px', fontSize: '14px', fontWeight: '600', alignSelf: 'center', color: 'var(--color-text-muted)' }}>
                {rating === 5 ? 'Excellent' : rating === 4 ? 'Good' : rating === 3 ? 'Average' : rating === 2 ? 'Poor' : 'Very Poor'}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="feedback-comment">
              Comments or Suggestions (Optional)
            </label>
            <textarea
              id="feedback-comment"
              className="form-textarea"
              placeholder="The repair was completed promptly and the facility is working properly now, thank you!"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={3}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="success" type="submit">
              Submit Feedback
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}

export default ComplaintFeedbackCard;
