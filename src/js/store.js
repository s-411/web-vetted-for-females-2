import { calculateGrade } from './grading.js';
import { generateId } from './utils.js';

const STORAGE_KEY = 'vetted_profiles';
const SCHEMA_VERSION = 1;

function getDefaultData() {
  return {
    version: SCHEMA_VERSION,
    profiles: {},
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    const data = JSON.parse(raw);
    if (data.version !== SCHEMA_VERSION) {
      return migrateData(data);
    }
    return data;
  } catch (e) {
    console.error('Failed to load data:', e);
    return getDefaultData();
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
}

function migrateData(data) {
  // Future migrations go here
  return { ...getDefaultData(), profiles: data.profiles || {} };
}

export const Store = {
  // Get all profiles (optionally include archived)
  getProfiles(includeArchived = false) {
    const data = loadData();
    const profiles = Object.values(data.profiles);
    if (includeArchived) return profiles;
    return profiles.filter((p) => !p.isArchived);
  },

  // Get archived profiles only
  getArchivedProfiles() {
    const data = loadData();
    return Object.values(data.profiles).filter((p) => p.isArchived);
  },

  // Get single profile by ID
  getProfile(id) {
    const data = loadData();
    return data.profiles[id] || null;
  },

  // Create new profile
  createProfile(name) {
    const data = loadData();
    const id = generateId();
    const now = new Date().toISOString();

    const profile = {
      id,
      name: name.trim(),
      createdAt: now,
      updatedAt: now,
      isArchived: false,
      notes: '',
      greenFlags: [],
      redFlags: [],
      dealbreakers: [],
      investmentStages: [],
      grade: 'C',
      gradeDetails: {
        greenPercent: 0,
        redPercent: 0,
        dealbreakerCount: 0,
        investmentCount: 0,
      },
    };

    data.profiles[id] = profile;
    saveData(data);
    return profile;
  },

  // Update profile name
  updateProfileName(id, name) {
    const data = loadData();
    if (!data.profiles[id]) return null;

    data.profiles[id].name = name.trim();
    data.profiles[id].updatedAt = new Date().toISOString();
    saveData(data);
    return data.profiles[id];
  },

  // Update profile notes
  updateProfileNotes(id, notes) {
    const data = loadData();
    if (!data.profiles[id]) return null;

    data.profiles[id].notes = notes;
    data.profiles[id].updatedAt = new Date().toISOString();
    saveData(data);
    return data.profiles[id];
  },

  // Toggle a flag (green, red, or dealbreaker)
  toggleFlag(id, flagType, flagId, isChecked) {
    const data = loadData();
    const profile = data.profiles[id];
    if (!profile) return null;

    const flagArray = profile[flagType];
    if (isChecked) {
      if (!flagArray.includes(flagId)) {
        flagArray.push(flagId);
      }
    } else {
      const index = flagArray.indexOf(flagId);
      if (index > -1) {
        flagArray.splice(index, 1);
      }
    }

    // Recalculate grade
    const gradeResult = calculateGrade(profile);
    profile.grade = gradeResult.grade;
    profile.gradeDetails = gradeResult.details;
    profile.updatedAt = new Date().toISOString();

    saveData(data);
    return profile;
  },

  // Toggle investment stage (each stage is independent)
  toggleInvestmentStage(id, stageId, isChecked) {
    const data = loadData();
    const profile = data.profiles[id];
    if (!profile) return null;

    // Migrate old data format if needed
    if (!Array.isArray(profile.investmentStages)) {
      profile.investmentStages = [];
    }

    if (isChecked) {
      if (!profile.investmentStages.includes(stageId)) {
        profile.investmentStages.push(stageId);
      }
    } else {
      const index = profile.investmentStages.indexOf(stageId);
      if (index > -1) {
        profile.investmentStages.splice(index, 1);
      }
    }

    // Update grade details with count
    profile.gradeDetails.investmentCount = profile.investmentStages.length;
    profile.updatedAt = new Date().toISOString();

    saveData(data);
    return profile;
  },

  // Archive profile
  archiveProfile(id) {
    const data = loadData();
    if (!data.profiles[id]) return null;

    data.profiles[id].isArchived = true;
    data.profiles[id].updatedAt = new Date().toISOString();
    saveData(data);
    return data.profiles[id];
  },

  // Restore archived profile
  restoreProfile(id) {
    const data = loadData();
    if (!data.profiles[id]) return null;

    data.profiles[id].isArchived = false;
    data.profiles[id].updatedAt = new Date().toISOString();
    saveData(data);
    return data.profiles[id];
  },

  // Permanently delete profile
  deleteProfile(id) {
    const data = loadData();
    if (!data.profiles[id]) return false;

    delete data.profiles[id];
    saveData(data);
    return true;
  },

  // Export all data as JSON string
  exportData() {
    const data = loadData();
    return JSON.stringify(data, null, 2);
  },

  // Import data from JSON string
  importData(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      if (!imported.profiles) {
        throw new Error('Invalid data format');
      }
      saveData({
        version: SCHEMA_VERSION,
        profiles: imported.profiles,
      });
      return true;
    } catch (e) {
      console.error('Failed to import data:', e);
      return false;
    }
  },

  // Clear all data
  clearAllData() {
    saveData(getDefaultData());
  },
};
