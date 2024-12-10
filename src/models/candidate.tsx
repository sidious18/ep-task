export type Candidate = {
  id?: number
  firstName: string
  lastName: string
  age: number
  address: string
  jobTitle: string
}

export const getCandidateJob = (id: number) => {
  const candidate = JSON.parse(localStorage.getItem(`candidate_${id}`) as string);
  const jobs = JSON.parse(localStorage.getItem(`jobs_${id}`) as string);
  return {
    ...candidate,
    experience: jobs,
  }
}

export const loadAllCandidates = (): Candidate[] => {
  const candidates: Candidate[] = [];
  let id = 0;

  while (true) {
    const candidateData = localStorage.getItem(`candidate_${id}`);
    if (!candidateData) {
      localStorage.setItem('last_candidate_index', `${id - 1}`);
      break;
    }

    const candidate = getCandidateJob(id);
    candidates.push(candidate);

    id++;
  }

  return candidates;
};

export const addCandidate = (candidate: Candidate) => {
  const newIndex = (Number(localStorage.getItem('last_candidate_index')) || 0) + 1;
  localStorage.setItem(`candidate_${newIndex}`, JSON.stringify({id: newIndex, ...candidate}));
  localStorage.setItem('last_candidate_index', `${newIndex}`);
}