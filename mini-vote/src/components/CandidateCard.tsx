import type { Candidate } from '../types';

type Props = {
    candidate: Candidate;
}

export function CandidateCard({ candidate }: Props){
    return (
        <li className="card">
            <span className="card__name">{candidate.name}</span>
            <span className="card__count">0 票</span>
        </li>
    );
}