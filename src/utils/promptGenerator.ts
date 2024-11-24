export function generateSkillAnalysisPrompt(userSkills, jobSkills): string {
  return `
    User skills: ${userSkills.map((skill) => skill.name).join(', ')}
    Job required skills: ${jobSkills.map((skill) => skill.name).join(', ')}
    Analyze the match and suggest improvements or training for the user.
  `;
}
