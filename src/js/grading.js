import { greenFlags } from '../data/green-flags.js';
import { redFlags } from '../data/red-flags.js';
import { dealbreakers } from '../data/dealbreakers.js';

const GREEN_TOTAL = greenFlags.length; // 20
const RED_TOTAL = redFlags.length; // 23
const DEALBREAKER_TOTAL = dealbreakers.length; // 15

export function calculateGrade(profile) {
  const greenCount = profile.greenFlags.length;
  const redCount = profile.redFlags.length;
  const dealbreakerCount = profile.dealbreakers.length;

  const greenPercent = (greenCount / GREEN_TOTAL) * 100;
  const redPercent = (redCount / RED_TOTAL) * 100;

  const details = {
    greenPercent: Math.round(greenPercent),
    redPercent: Math.round(redPercent),
    dealbreakerCount,
    greenCount,
    redCount,
    greenTotal: GREEN_TOTAL,
    redTotal: RED_TOTAL,
    dealbreakerTotal: DEALBREAKER_TOTAL,
    investmentStage: profile.investmentStage || 0,
  };

  // Grading logic from spec
  // Any 5+ dealbreakers = F
  if (dealbreakerCount >= 5) {
    return { grade: 'F', details };
  }

  // Less than 50% green OR 50%+ red OR 4+ dealbreakers = D
  if (greenPercent < 50 || redPercent >= 50 || dealbreakerCount >= 4) {
    return { grade: 'D', details };
  }

  // 80%+ green, less than 20% red, 0 dealbreakers = A+
  if (greenPercent >= 80 && redPercent < 20 && dealbreakerCount === 0) {
    return { grade: 'A+', details };
  }

  // 70%+ green, less than 30% red, 0 dealbreakers = A
  if (greenPercent >= 70 && redPercent < 30 && dealbreakerCount === 0) {
    return { grade: 'A', details };
  }

  // 60%+ green, less than 40% red, 0-1 dealbreakers = B
  if (greenPercent >= 60 && redPercent < 40 && dealbreakerCount <= 1) {
    return { grade: 'B', details };
  }

  // 50%+ green, less than 50% red, 2-3 dealbreakers = C
  if (greenPercent >= 50 && redPercent < 50 && dealbreakerCount <= 3) {
    return { grade: 'C', details };
  }

  // Default fallback
  return { grade: 'C', details };
}

export function getGradeColor(grade) {
  const colors = {
    'A+': { bg: 'bg-success-bg', text: 'text-success', border: 'border-success' },
    A: { bg: 'bg-success-bg', text: 'text-success', border: 'border-success' },
    B: { bg: 'bg-info-bg', text: 'text-info', border: 'border-info' },
    C: { bg: 'bg-warning-bg', text: 'text-warning', border: 'border-warning' },
    D: { bg: 'bg-error-bg', text: 'text-error', border: 'border-error' },
    F: { bg: 'bg-error-bg', text: 'text-error', border: 'border-error' },
  };
  return colors[grade] || colors['C'];
}

export function getGradeDescription(grade) {
  const descriptions = {
    'A+': 'Exceptional - minimal concerns',
    A: 'Strong candidate - very few concerns',
    B: 'Good potential - some areas to monitor',
    C: 'Notable concerns - proceed carefully',
    D: 'High risk - significant red flags',
    F: 'Not recommended - major dealbreakers',
  };
  return descriptions[grade] || descriptions['C'];
}
