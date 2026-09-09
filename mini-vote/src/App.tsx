import type { Candidate } from './types';
import { CandidateCard } from './components/CandidateCard';

import {useState} from 'react';
import './App.css';

const CANDIDATES: Candidate[] = [
  { id: 'tea', name: 'お茶' },
  { id: 'coffee', name: 'コーヒー' },
  { id: 'water', name: '水' },
];

export default function App() {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const handleVote = (id: string) => {
    setVotes( (prev) => ({ ...prev, [id]: (prev[id] ?? 0 ) + 1 }));
  };
  return(
    <div className="app">
      <h1 className="app__title">ミニ投票</h1>
      <ul className="app_list">
        {CANDIDATES.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate}
            count={votes[candidate.id] ?? 0} 
            onVote={() => handleVote(candidate.id)}
          />
        ))}
      </ul>
    </div>
  );
}