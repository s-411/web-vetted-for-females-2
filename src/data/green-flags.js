// Green Flags - Positive indicators in a relationship
// isDefault: true = included by default, false = optional (user can add)

export const greenFlags = [
  // DEFAULT FLAGS (17)
  { id: 'gf-1', label: 'Consistent communication (texts back reliably, doesn\'t disappear)', icon: 'chat', isDefault: true },
  { id: 'gf-2', label: 'Makes concrete plans in advance (not "let\'s hang sometime")', icon: 'event', isDefault: true },
  { id: 'gf-3', label: 'Introduces you to his friends', icon: 'groups', isDefault: true },
  { id: 'gf-4', label: 'Introduces you to his family', icon: 'family_restroom', isDefault: true },
  { id: 'gf-5', label: 'Has close male friendships', icon: 'people', isDefault: true },
  { id: 'gf-6', label: 'Healthy relationship with his mother (close but not enmeshed)', icon: 'favorite', isDefault: true },
  { id: 'gf-7', label: 'Takes accountability when he\'s wrong', icon: 'handshake', isDefault: true },
  { id: 'gf-8', label: 'Remembers details you\'ve told him', icon: 'psychology', isDefault: true },
  { id: 'gf-9', label: 'Shows up when he says he will', icon: 'schedule', isDefault: true },
  { id: 'gf-10', label: 'Asks about your life and listens', icon: 'hearing', isDefault: true },
  { id: 'gf-11', label: 'Has long-term goals and works toward them', icon: 'trending_up', isDefault: true },
  { id: 'gf-12', label: 'Financially stable/responsible', icon: 'account_balance', isDefault: true },
  { id: 'gf-13', label: 'Respects your boundaries without pushback', icon: 'shield', isDefault: true },
  { id: 'gf-14', label: 'Comfortable with emotional conversations', icon: 'sentiment_satisfied', isDefault: true },
  { id: 'gf-15', label: 'Happy to define the relationship', icon: 'verified', isDefault: true },
  { id: 'gf-16', label: 'Plans dates, not just "hanging out"', icon: 'restaurant', isDefault: true },
  { id: 'gf-17', label: 'Speaks well of past relationships (or neutrally)', icon: 'thumb_up', isDefault: true },

  // OPTIONAL FLAGS (user can add these)
  { id: 'gf-18', label: 'Has his own hobbies and interests', icon: 'interests', isDefault: false },
  { id: 'gf-19', label: 'Supports your goals and ambitions', icon: 'star', isDefault: false },
  { id: 'gf-20', label: 'Consistent behavior (same person in public and private)', icon: 'verified_user', isDefault: false },
  { id: 'gf-21', label: 'Initiates affection and physical touch', icon: 'favorite_border', isDefault: false },
  { id: 'gf-22', label: 'Apologizes sincerely without making excuses', icon: 'healing', isDefault: false },
  { id: 'gf-23', label: 'Celebrates your successes genuinely', icon: 'celebration', isDefault: false },
  { id: 'gf-24', label: 'Maintains friendships with women (not just romantic interests)', icon: 'diversity_3', isDefault: false },
  { id: 'gf-25', label: 'Open about his past and history', icon: 'history', isDefault: false },
  { id: 'gf-26', label: 'Makes you feel calm, not anxious', icon: 'spa', isDefault: false },
  { id: 'gf-27', label: 'Takes care of his physical health', icon: 'fitness_center', isDefault: false },
  { id: 'gf-28', label: 'Good with children/animals', icon: 'pets', isDefault: false },
  { id: 'gf-29', label: 'Shares household responsibilities willingly', icon: 'home', isDefault: false },
  { id: 'gf-30', label: 'Values education and continuous learning', icon: 'school', isDefault: false },
];

// Helper to get default flags only
export const getDefaultGreenFlags = () => greenFlags.filter(f => f.isDefault);

// Helper to get optional flags only
export const getOptionalGreenFlags = () => greenFlags.filter(f => !f.isDefault);
