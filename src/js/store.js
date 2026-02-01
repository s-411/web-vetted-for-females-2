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

  // Seed example profiles for demo purposes
  seedExampleProfiles() {
    const data = loadData();

    // Only seed if no profiles exist
    if (Object.keys(data.profiles).length > 0) {
      return false;
    }

    const now = new Date();
    const exampleProfiles = [
      // A+ Profile - Marcus (exceptional)
      {
        id: 'demo-marcus',
        name: 'Marcus',
        createdAt: new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
        isArchived: false,
        notes: 'Met at a friend\'s dinner party. He remembered my coffee order from our first conversation and texted to confirm our second date two days in advance. His friends seem genuinely happy for him.',
        greenFlags: ['gf-1', 'gf-2', 'gf-3', 'gf-4', 'gf-5', 'gf-6', 'gf-7', 'gf-8', 'gf-9', 'gf-10', 'gf-11', 'gf-12', 'gf-13', 'gf-14', 'gf-15', 'gf-16', 'gf-17', 'gf-18', 'gf-19', 'gf-20', 'gf-21', 'gf-22', 'gf-23', 'gf-26'],
        redFlags: [],
        dealbreakers: [],
        investmentStages: ['is-1', 'is-2', 'is-3', 'is-4', 'is-5'],
        grade: 'A+',
        gradeDetails: { greenPercent: 80, redPercent: 0, dealbreakerCount: 0, investmentCount: 5 },
      },
      // A Profile - James (strong candidate)
      {
        id: 'demo-james',
        name: 'James',
        createdAt: new Date(now - 21 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
        isArchived: false,
        notes: 'Dating app match. Great communicator, very respectful. Still early but showing consistent effort. Minor thing - can be a bit of a workaholic.',
        greenFlags: ['gf-1', 'gf-2', 'gf-5', 'gf-7', 'gf-8', 'gf-9', 'gf-10', 'gf-11', 'gf-12', 'gf-13', 'gf-14', 'gf-15', 'gf-16', 'gf-17', 'gf-18', 'gf-19', 'gf-20', 'gf-22', 'gf-26', 'gf-27', 'gf-30'],
        redFlags: ['rf-12'],
        dealbreakers: [],
        investmentStages: ['is-1', 'is-2', 'is-3'],
        grade: 'A',
        gradeDetails: { greenPercent: 70, redPercent: 3, dealbreakerCount: 0, investmentCount: 3 },
      },
      // B Profile - Ryan (good potential)
      {
        id: 'demo-ryan',
        name: 'Ryan',
        createdAt: new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
        isArchived: false,
        notes: 'Friend of a coworker. Sweet guy, puts in effort. Some emotional unavailability to work through - he acknowledged it and is open to growth. Watching how this develops.',
        greenFlags: ['gf-1', 'gf-2', 'gf-5', 'gf-7', 'gf-9', 'gf-10', 'gf-11', 'gf-12', 'gf-13', 'gf-16', 'gf-17', 'gf-18', 'gf-19', 'gf-20', 'gf-27', 'gf-28', 'gf-29', 'gf-30'],
        redFlags: ['rf-3', 'rf-9', 'rf-12'],
        dealbreakers: ['db-14'],
        investmentStages: ['is-1', 'is-2'],
        grade: 'B',
        gradeDetails: { greenPercent: 60, redPercent: 10, dealbreakerCount: 1, investmentCount: 2 },
      },
      // C Profile - Brandon (proceed with caution)
      {
        id: 'demo-brandon',
        name: 'Brandon',
        createdAt: new Date(now - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString(),
        isArchived: false,
        notes: 'Met at gym. Charming but inconsistent. Says all the right things but actions don\'t always match. His drinking concerns me - watching closely.',
        greenFlags: ['gf-1', 'gf-2', 'gf-5', 'gf-8', 'gf-10', 'gf-11', 'gf-16', 'gf-18', 'gf-21', 'gf-27', 'gf-28', 'gf-29', 'gf-30'],
        redFlags: ['rf-1', 'rf-3', 'rf-5', 'rf-6', 'rf-7', 'rf-12', 'rf-14', 'rf-15', 'rf-17', 'rf-25'],
        dealbreakers: ['db-14', 'db-16'],
        investmentStages: ['is-1'],
        grade: 'C',
        gradeDetails: { greenPercent: 50, redPercent: 33, dealbreakerCount: 2, investmentCount: 1 },
      },
      // D Profile - Chad (high risk)
      {
        id: 'demo-chad',
        name: 'Chad',
        createdAt: new Date(now - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString(),
        isArchived: false,
        notes: 'Dating app. Initially seemed great but red flags keep piling up. He love bombed early then pulled back. Makes me feel anxious constantly. Need to end this.',
        greenFlags: ['gf-2', 'gf-11', 'gf-12', 'gf-16', 'gf-18', 'gf-21', 'gf-27'],
        redFlags: ['rf-1', 'rf-3', 'rf-4', 'rf-5', 'rf-6', 'rf-7', 'rf-8', 'rf-11', 'rf-12', 'rf-13', 'rf-17', 'rf-19', 'rf-20', 'rf-21', 'rf-22', 'rf-25'],
        dealbreakers: ['db-1', 'db-4', 'db-8', 'db-14'],
        investmentStages: ['is-1'],
        grade: 'D',
        gradeDetails: { greenPercent: 23, redPercent: 53, dealbreakerCount: 4, investmentCount: 1 },
      },
      // F Profile - Derek (walk away)
      {
        id: 'demo-derek',
        name: 'Derek',
        createdAt: new Date(now - 90 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString(),
        isArchived: false,
        notes: 'Ex\'s friend who pursued me. HUGE MISTAKE. Controlling, manipulative, caught him in multiple lies. He tried to isolate me from my friends. Blocked on everything. Never again.',
        greenFlags: ['gf-2', 'gf-11', 'gf-21'],
        redFlags: ['rf-1', 'rf-3', 'rf-4', 'rf-5', 'rf-6', 'rf-7', 'rf-8', 'rf-9', 'rf-10', 'rf-11', 'rf-12', 'rf-13', 'rf-16', 'rf-17', 'rf-19', 'rf-20', 'rf-21', 'rf-22', 'rf-24', 'rf-25', 'rf-26', 'rf-27'],
        dealbreakers: ['db-1', 'db-3', 'db-4', 'db-8', 'db-10', 'db-11'],
        investmentStages: ['is-1', 'is-2'],
        grade: 'F',
        gradeDetails: { greenPercent: 10, redPercent: 73, dealbreakerCount: 6, investmentCount: 2 },
      },
    ];

    exampleProfiles.forEach(profile => {
      data.profiles[profile.id] = profile;
    });

    saveData(data);
    return true;
  },
};
