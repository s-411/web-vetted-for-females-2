// Investment Stages - Milestones showing relationship progression
// isDefault: true = included by default, false = optional (user can add)

export const investmentStages = [
  // DEFAULT STAGES (10)
  {
    stage: 1,
    id: 'inv-1',
    label: 'Consistent daily communication',
    description: 'He texts or calls you every day. Communication is reliable and you\'re not left wondering when you\'ll hear from him.',
    isDefault: true,
  },
  {
    stage: 2,
    id: 'inv-2',
    label: 'Makes plans 3+ days in advance',
    description: 'He plans dates ahead of time rather than last-minute invites. Shows he\'s thinking about you and prioritizing time together.',
    isDefault: true,
  },
  {
    stage: 3,
    id: 'inv-3',
    label: 'You\'ve met his close friends',
    description: 'He\'s introduced you to his friend group. He\'s not keeping you separate from his social life.',
    isDefault: true,
  },
  {
    stage: 4,
    id: 'inv-4',
    label: 'He\'s met your close friends',
    description: 'He\'s made an effort to meet and spend time with your friends. He cares about being part of your life.',
    isDefault: true,
  },
  {
    stage: 5,
    id: 'inv-5',
    label: 'Deleted dating apps together',
    description: 'You\'ve both agreed to delete dating apps. You\'re both off the market and investing in each other exclusively.',
    isDefault: true,
  },
  {
    stage: 6,
    id: 'inv-6',
    label: 'Defined the relationship (exclusive)',
    description: 'You\'ve had the conversation and agreed you\'re in an exclusive relationship. No ambiguity about your status.',
    isDefault: true,
  },
  {
    stage: 7,
    id: 'inv-7',
    label: 'You\'ve met his family',
    description: 'He\'s introduced you to his parents, siblings, or other important family members. He sees you as part of his future.',
    isDefault: true,
  },
  {
    stage: 8,
    id: 'inv-8',
    label: 'He\'s met your family',
    description: 'He\'s made an effort to meet your family. He\'s invested in your whole life, not just the parts that are convenient.',
    isDefault: true,
  },
  {
    stage: 9,
    id: 'inv-9',
    label: 'Discusses future together (travel, living, goals)',
    description: 'He talks about the future and includes you in it. Whether it\'s trips, living together, or long-term goals, he sees you as part of his future.',
    isDefault: true,
  },
  {
    stage: 10,
    id: 'inv-10',
    label: 'Integrated into each other\'s lives',
    description: 'Your lives are meaningfully intertwined. You have routines together, know each other\'s schedules, and have become part of each other\'s daily life.',
    isDefault: true,
  },

  // OPTIONAL STAGES (user can add these)
  {
    stage: 11,
    id: 'inv-11',
    label: 'Has a key to your place (or vice versa)',
    description: 'You\'ve exchanged keys, showing trust and practical integration into each other\'s daily lives.',
    isDefault: false,
  },
  {
    stage: 12,
    id: 'inv-12',
    label: 'Discussed finances openly',
    description: 'You\'ve had honest conversations about money, debts, and financial goals. Financial transparency is a sign of trust.',
    isDefault: false,
  },
  {
    stage: 13,
    id: 'inv-13',
    label: 'Traveled together (trip away)',
    description: 'You\'ve taken a trip together and navigated the challenges of travel as a team.',
    isDefault: false,
  },
  {
    stage: 14,
    id: 'inv-14',
    label: 'Weathered a conflict well',
    description: 'You\'ve had a disagreement and resolved it in a healthy way. This shows you can handle challenges together.',
    isDefault: false,
  },
  {
    stage: 15,
    id: 'inv-15',
    label: 'Discussed long-term compatibility (kids, marriage, lifestyle)',
    description: 'You\'ve had serious conversations about your future and whether your visions align.',
    isDefault: false,
  },
];

// Helper to get default stages only
export const getDefaultInvestmentStages = () => investmentStages.filter(s => s.isDefault);

// Helper to get optional stages only
export const getOptionalInvestmentStages = () => investmentStages.filter(s => !s.isDefault);
