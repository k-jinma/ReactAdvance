import type { Candidate } from '../types';

type Props = {
    candidate: Candidate;
    count: number;
    onVote: () => void;
}

export function CandidateCard({ candidate, count, onVote }: Props){ //Props型からキーcandidateの値を取り出す
    return (
        <li className="card">
            <span className="card__name">{candidate.name}</span>
            <span className="card__count">{count} 票</span>
            <button type="button" onClick={onVote}>+1票</button>
        </li>
    );
}