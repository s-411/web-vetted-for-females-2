// Red Flags - Warning signs in a relationship
// isDefault: true = included by default, false = optional (user can add)

export const redFlags = [
  // DEFAULT FLAGS (17)
  { id: 'rf-1', label: 'Inconsistent communication (hot and cold)', icon: 'sync_problem', isDefault: true },
  { id: 'rf-2', label: 'Avoids making plans in advance', icon: 'event_busy', isDefault: true },
  { id: 'rf-3', label: 'Vague about what he\'s looking for', icon: 'help_outline', isDefault: true },
  { id: 'rf-4', label: 'Talks badly about all his exes', icon: 'thumb_down', isDefault: true },
  { id: 'rf-5', label: 'Love bombing early (excessive gifts, "I\'ve never felt this way")', icon: 'local_florist', isDefault: true },
  { id: 'rf-6', label: 'Future faking (big promises, no follow-through)', icon: 'hourglass_empty', isDefault: true },
  { id: 'rf-7', label: 'Deflects or gets defensive when you raise concerns', icon: 'block', isDefault: true },
  { id: 'rf-8', label: 'Gaslighting (makes you question your own memory/perception)', icon: 'psychology_alt', isDefault: true },
  { id: 'rf-9', label: 'No close friendships', icon: 'person_off', isDefault: true },
  { id: 'rf-10', label: 'Still entangled with an ex', icon: 'link', isDefault: true },
  { id: 'rf-11', label: 'Hides his phone or gets weird about it', icon: 'phonelink_lock', isDefault: true },
  { id: 'rf-12', label: 'Only available on his schedule', icon: 'event_note', isDefault: true },
  { id: 'rf-13', label: 'Dismisses your feelings as "overreacting"', icon: 'sentiment_dissatisfied', isDefault: true },
  { id: 'rf-14', label: 'Financially irresponsible (always broke, bad with money)', icon: 'money_off', isDefault: true },
  { id: 'rf-15', label: 'Excessive drinking or substance use', icon: 'local_bar', isDefault: true },
  { id: 'rf-16', label: 'Anger issues (road rage, snapping at service workers)', icon: 'mood_bad', isDefault: true },
  { id: 'rf-17', label: 'Different person around his friends vs. with you', icon: 'theater_comedy', isDefault: true },

  // OPTIONAL FLAGS (user can add these)
  { id: 'rf-18', label: 'Pressures you sexually', icon: 'warning', isDefault: false },
  { id: 'rf-19', label: 'Compares you to other women', icon: 'compare', isDefault: false },
  { id: 'rf-20', label: 'Keeps you separate from his life', icon: 'visibility_off', isDefault: false },
  { id: 'rf-21', label: 'Makes you feel anxious or on edge around him', icon: 'error_outline', isDefault: false },
  { id: 'rf-22', label: 'Doesn\'t introduce you to anyone important', icon: 'person_remove', isDefault: false },
  { id: 'rf-23', label: 'Takes without giving (time, energy, effort)', icon: 'balance', isDefault: false },
  { id: 'rf-24', label: 'Constantly checks your location or whereabouts', icon: 'location_searching', isDefault: false },
  { id: 'rf-25', label: 'Makes "jokes" that are actually insults', icon: 'sentiment_neutral', isDefault: false },
  { id: 'rf-26', label: 'Refuses to meet your friends or family', icon: 'group_off', isDefault: false },
  { id: 'rf-27', label: 'Always the victim in every story', icon: 'person_alert', isDefault: false },
  { id: 'rf-28', label: 'Moves too fast (talks marriage/kids very early)', icon: 'speed', isDefault: false },
  { id: 'rf-29', label: 'Secretive about finances or work', icon: 'visibility_off', isDefault: false },
  { id: 'rf-30', label: 'Makes decisions without consulting you', icon: 'gavel', isDefault: false },
];

// Helper to get default flags only
export const getDefaultRedFlags = () => redFlags.filter(f => f.isDefault);

// Helper to get optional flags only
export const getOptionalRedFlags = () => redFlags.filter(f => !f.isDefault);
