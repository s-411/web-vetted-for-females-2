// Criteria Store - Manages user preferences for evaluation criteria
// Handles enabled/disabled state and custom items

const CRITERIA_STORAGE_KEY = 'vetted_criteria';

function getDefaultCriteria() {
  return {
    version: 1,
    // IDs of items that are enabled (if null, use defaults from data files)
    enabledGreenFlags: null,
    enabledRedFlags: null,
    enabledDealbreakers: null,
    enabledInvestment: null,
    // Custom items added by the user
    customGreenFlags: [],
    customRedFlags: [],
    customDealbreakers: [],
    customInvestment: [],
    // Importance weights per criterion (1-5, default 3)
    weightsGreenFlags: {},
    weightsRedFlags: {},
    weightsDealbreakers: {},
    weightsInvestment: {},
  };
}

function loadCriteria() {
  try {
    const raw = localStorage.getItem(CRITERIA_STORAGE_KEY);
    if (!raw) return getDefaultCriteria();
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load criteria:', e);
    return getDefaultCriteria();
  }
}

function saveCriteria(data) {
  try {
    localStorage.setItem(CRITERIA_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save criteria:', e);
  }
}

export const CriteriaStore = {
  // Get enabled item IDs for a category
  // Returns null if using defaults, or an array of enabled IDs
  getEnabledIds(category) {
    const data = loadCriteria();
    const key = `enabled${category.charAt(0).toUpperCase() + category.slice(1)}`;
    return data[key];
  },

  // Set enabled item IDs for a category
  setEnabledIds(category, ids) {
    const data = loadCriteria();
    const key = `enabled${category.charAt(0).toUpperCase() + category.slice(1)}`;
    data[key] = ids;
    saveCriteria(data);
  },

  // Toggle a single item on/off
  toggleItem(category, itemId, allDefaultIds) {
    const data = loadCriteria();
    const key = `enabled${category.charAt(0).toUpperCase() + category.slice(1)}`;

    // If null (using defaults), initialize with all default IDs
    if (data[key] === null) {
      data[key] = [...allDefaultIds];
    }

    const index = data[key].indexOf(itemId);
    if (index > -1) {
      data[key].splice(index, 1);
    } else {
      data[key].push(itemId);
    }

    saveCriteria(data);
    return data[key];
  },

  // Check if an item is enabled
  isEnabled(category, itemId, defaultIds) {
    const enabledIds = this.getEnabledIds(category);
    if (enabledIds === null) {
      // Using defaults - check if it's in the default list
      return defaultIds.includes(itemId);
    }
    return enabledIds.includes(itemId);
  },

  // Get custom items for a category
  getCustomItems(category) {
    const data = loadCriteria();
    const key = `custom${category.charAt(0).toUpperCase() + category.slice(1)}`;
    return data[key] || [];
  },

  // Add a custom item
  addCustomItem(category, item) {
    const data = loadCriteria();
    const key = `custom${category.charAt(0).toUpperCase() + category.slice(1)}`;

    if (!data[key]) data[key] = [];

    const newItem = {
      id: `custom-${category}-${Date.now()}`,
      label: item.label,
      icon: item.icon || 'edit',
      isCustom: true,
      ...(item.explanation && { explanation: item.explanation }),
      ...(item.description && { description: item.description }),
    };

    data[key].push(newItem);

    // Also add to enabled list
    const enabledKey = `enabled${category.charAt(0).toUpperCase() + category.slice(1)}`;
    if (data[enabledKey] === null) {
      // Initialize enabled list if needed - custom items are enabled by default
    } else {
      data[enabledKey].push(newItem.id);
    }

    saveCriteria(data);
    return newItem;
  },

  // Remove a custom item
  removeCustomItem(category, itemId) {
    const data = loadCriteria();
    const key = `custom${category.charAt(0).toUpperCase() + category.slice(1)}`;

    if (!data[key]) return false;

    const index = data[key].findIndex(item => item.id === itemId);
    if (index > -1) {
      data[key].splice(index, 1);

      // Also remove from enabled list
      const enabledKey = `enabled${category.charAt(0).toUpperCase() + category.slice(1)}`;
      if (data[enabledKey]) {
        const enabledIndex = data[enabledKey].indexOf(itemId);
        if (enabledIndex > -1) {
          data[enabledKey].splice(enabledIndex, 1);
        }
      }

      saveCriteria(data);
      return true;
    }
    return false;
  },

  // Reset a category to defaults
  resetCategory(category) {
    const data = loadCriteria();
    const enabledKey = `enabled${category.charAt(0).toUpperCase() + category.slice(1)}`;
    const customKey = `custom${category.charAt(0).toUpperCase() + category.slice(1)}`;
    const weightsKey = `weights${category.charAt(0).toUpperCase() + category.slice(1)}`;

    data[enabledKey] = null;
    data[customKey] = [];
    data[weightsKey] = {};

    saveCriteria(data);
  },

  // Reset all criteria to defaults
  resetAll() {
    saveCriteria(getDefaultCriteria());
  },

  // Export criteria settings
  exportCriteria() {
    return JSON.stringify(loadCriteria(), null, 2);
  },

  // Import criteria settings
  importCriteria(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      saveCriteria(imported);
      return true;
    } catch (e) {
      console.error('Failed to import criteria:', e);
      return false;
    }
  },

  // Get the importance weight for a criterion (1-5, default 3)
  getWeight(category, criterionId) {
    const data = loadCriteria();
    const key = `weights${category.charAt(0).toUpperCase() + category.slice(1)}`;
    const weights = data[key] || {};
    return weights[criterionId] ?? 3; // Default weight is 3
  },

  // Set the importance weight for a criterion (1-5)
  setWeight(category, criterionId, weight) {
    const data = loadCriteria();
    const key = `weights${category.charAt(0).toUpperCase() + category.slice(1)}`;

    if (!data[key]) data[key] = {};

    // Clamp weight to 1-5
    const clampedWeight = Math.max(1, Math.min(5, weight));

    if (clampedWeight === 3) {
      // Remove from storage if default value (saves space)
      delete data[key][criterionId];
    } else {
      data[key][criterionId] = clampedWeight;
    }

    saveCriteria(data);
    return clampedWeight;
  },

  // Get all weights for a category as { id: weight } map
  getAllWeights(category) {
    const data = loadCriteria();
    const key = `weights${category.charAt(0).toUpperCase() + category.slice(1)}`;
    return data[key] || {};
  },
};
