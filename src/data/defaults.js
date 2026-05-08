import { 
  DEFAULT_TASKS, 
  DEFAULT_IDEAS, 
  DEFAULT_PROJECTS,
  DEFAULT_SKILLS,
  DEFAULT_SCHEDULE
} from './user-config';

export { DEFAULT_TASKS, DEFAULT_PROJECTS };

export const DEFAULT_IDEAS_LIST = DEFAULT_IDEAS.map((text, i) => ({
  id: i + 1,
  text,
  type: 'Note',
  date: new Date().toISOString(),
  platform: 'LinkedIn'
}));

export const DEFAULT_STUDY_LOG = DEFAULT_SKILLS.map(skill => ({
  skill: skill.name,
  hours: skill.pct, // mapped to hours for now or just tracking progress
  level: skill.pct > 50 ? 'Advanced' : 'Intermediate',
  lastActive: 'Today'
}));

export const FIXED_SCHEDULE_BLOCKS = DEFAULT_SCHEDULE;

export const DEFAULT_ACTIVITY_LOG = [];
export const DEFAULT_STREAK = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];
export const DEFAULT_CONTENT_CAL = [];
export const DEFAULT_SESSIONS = 0;
export const DEFAULT_WEEKLY = {};
