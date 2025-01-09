

export const userSkills = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Test User',
    },
    skill: {
      id: '1',
      name: 'Test Skill',
    },
    yearsOfExperience: 5,
  },
];

export const userSkillId = 'some-user-skill-id';

export const userId = 'user-id';
export const skillId = 'skill-id';

export const createUserSkillDto = {
  userSkillId,
  userId,
  skillId,
  yearsOfExperience: 5,
};

export const updateUserSkillDto = { yearsOfExperience: 6 };