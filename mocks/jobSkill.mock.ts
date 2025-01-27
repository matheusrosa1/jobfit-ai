export const jobSkillId = 'some-job-skill-id';

export const jobId = 'job-id';

export const skillId = 'skill-id';

export const createJobSkillDto = {
  jobSkillId,
  jobId,
  skillId,
  experienceRequired: 5,
};

export const jobSkills = [
  {
    id: jobSkillId,
    job: {
      id: jobId,
      title: 'Software Engineer',
      description: 'A software engineer is a person who applies the principles of software engineering to the design, development, maintenance, testing, and evaluation of computer software.',
      company: 'Google',
      location: 'Mountain View, CA',
      jobType: 'remote',
      salaryRange: '100000-150000',
      postedAt: '2021-01-01T00:00:00Z',
    },
    skill: {
      id: skillId,
      name: 'JavaScript',
    },
  }
];

export const updateJobSkillDto = { experienceRequired: 6 };