/* import { Skill } from 'src/skill/entities/skill.entity';

export function generateSkillAnalysisPrompt(
  userSkills: Skill[],
  jobSkills: Skill[],
): string {
  return `
    User skills: ${userSkills.map((skill) => skill.name).join(', ')}
    Job required skills: ${jobSkills.map((skill) => skill.name).join(', ')}
    Analyze the match and suggest improvements or training for the user.
  `;
}
 */
export function generateSkillAnalysisPrompt(
  userSkills: { name: string; yearsOfExperience: number }[],
  jobSkills: { name: string; experienceRequired: number }[],
): string {
  return `
    User skills and experience: 
    ${userSkills
      .map(
        (skill) =>
          `${skill.name} (${skill.yearsOfExperience} years of experience)`,
      )
      .join(', ')}

    Job required skills and experience: 
    ${jobSkills
      .map(
        (skill) => `${skill.name} (${skill.experienceRequired} years required)`,
      )
      .join(', ')}

    Analyze the match between the user's skills and the job requirements, 
    and suggest improvements or training for the user to meet or exceed job expectations.
  `;
}
