import type { Candidate } from '../types';
import { CandidateCard } from './components/CandidateCard';
import './App.css';

const CANDIDATES: Candidate[] = [
  { id: 'tea', name: 'お茶' },
  { id: 'coffee', name: 'コーヒー' },
  { id: 'water', name: '水' },
];

export default function App() {
  return(
    <div className="app">
      <h1 className="app__title">ミニ投票</h1>
      <ul className="app_list">
        {CANDIDATES.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </ul>
    </div>
  );
}