export type Job = {
  candidateID: number;
  jobTitle: string;
  period: { start: string; end: string };
  technologies: string[];
  description: string;
};

export type JobForm = {
  jobTitle: string
  description: string
  technologies: string
  periodStart?: string
  periodEnd?: string
}

export const addCandidateJobs = (jobs: JobForm[]) => {
  const newIndex = (Number(localStorage.getItem('last_candidate_index')) || 0) + 1;
  const jobsToSave = jobs.map((job) => ({
    candidateID: newIndex,
    jobTitle: job.jobTitle,
    description: job.description,
    technologies: job.technologies.split(' '),
    period: {
      start: job.periodStart,
      end: job.periodEnd,
    }
  }))
  localStorage.setItem(`jobs_${newIndex}`, JSON.stringify(jobsToSave));
}

export const addCompanyJobs = (jobs: JobForm[]) => {
  const newIndex = (Number(localStorage.getItem('last_company_index')) || 0) + 1;
  const jobsToSave = jobs.map((job) => ({
    candidateID: newIndex,
    jobTitle: job.jobTitle,
    description: job.description,
    technologies: job.technologies.split(' '),
  }))
  localStorage.setItem(`company_vacancies_${newIndex}`, JSON.stringify(jobsToSave));
}