import { greenFlags, getDefaultGreenFlags } from '../data/green-flags.js';
import { redFlags, getDefaultRedFlags } from '../data/red-flags.js';
import { dealbreakers, getDefaultDealbreakers } from '../data/dealbreakers.js';
import { CriteriaStore } from './criteria-store.js';

// Get enabled items for a category (filters against CriteriaStore)
function getEnabledItemIds(category, allItems, getDefaultFn) {
  const defaultIds = getDefaultFn().map(i => i.id);
  const customItems = CriteriaStore.getCustomItems(category);

  const enabledBuiltIn = allItems.filter(item =>
    CriteriaStore.isEnabled(category, item.id, defaultIds)
  ).map(i => i.id);

  return [...enabledBuiltIn, ...customItems.map(i => i.id)];
}

// Calculate weighted sum for a set of criterion IDs
function getWeightedSum(category, ids) {
  return ids.reduce((sum, id) => sum + CriteriaStore.getWeight(category, id), 0);
}

export function calculateGrade(profile) {
  // Get enabled criteria IDs
  const enabledGreenFlagIds = getEnabledItemIds('greenFlags', greenFlags, getDefaultGreenFlags);
  const enabledRedFlagIds = getEnabledItemIds('redFlags', redFlags, getDefaultRedFlags);
  const enabledDealbreakerIds = getEnabledItemIds('dealbreakers', dealbreakers, getDefaultDealbreakers);

  // Filter profile's checked items to only count those still in enabled criteria
  const matchedGreenIds = profile.greenFlags.filter(id => enabledGreenFlagIds.includes(id));
  const matchedRedIds = profile.redFlags.filter(id => enabledRedFlagIds.includes(id));
  const matchedDealbreakerIds = profile.dealbreakers.filter(id => enabledDealbreakerIds.includes(id));

  // Calculate weighted totals
  const greenTotalWeight = getWeightedSum('greenFlags', enabledGreenFlagIds);
  const redTotalWeight = getWeightedSum('redFlags', enabledRedFlagIds);
  const dealbreakerTotalWeight = getWeightedSum('dealbreakers', enabledDealbreakerIds);

  // Calculate weighted matches
  const greenMatchedWeight = getWeightedSum('greenFlags', matchedGreenIds);
  const redMatchedWeight = getWeightedSum('redFlags', matchedRedIds);
  const dealbreakerMatchedWeight = getWeightedSum('dealbreakers', matchedDealbreakerIds);

  // Calculate weighted percentages
  const greenPercent = greenTotalWeight > 0 ? (greenMatchedWeight / greenTotalWeight) * 100 : 0;
  const redPercent = redTotalWeight > 0 ? (redMatchedWeight / redTotalWeight) * 100 : 0;

  // For dealbreakers, we still count them but weight affects severity
  // A weight-5 dealbreaker counts more than a weight-1 dealbreaker
  const dealbreakerCount = matchedDealbreakerIds.length;
  // Weighted dealbreaker score (for more nuanced grading)
  const dealbreakerWeightedScore = dealbreakerMatchedWeight;

  const details = {
    greenPercent: Math.round(greenPercent),
    redPercent: Math.round(redPercent),
    dealbreakerCount,
    dealbreakerWeightedScore,
    greenCount: matchedGreenIds.length,
    redCount: matchedRedIds.length,
    greenTotal: enabledGreenFlagIds.length,
    redTotal: enabledRedFlagIds.length,
    dealbreakerTotal: enabledDealbreakerIds.length,
    greenMatchedWeight,
    greenTotalWeight,
    redMatchedWeight,
    redTotalWeight,
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
