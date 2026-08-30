import type { Candidate } from '../types';

type Props = {
    candidate: Candidate;
}

export function CandidateCard({ candidate }: Props){ //Props型からキーcandidateの値を取り出す
    return (
        <li className="card">
            <span className="card__name">{candidate.name}</span>
            <span className="card__count">0 票</span>
        </li>
    );
}