import React from 'react';
import { TEntry } from '../../types';
import HealthRatingBar from '../HealthRatingBar';

const EntryDetails: React.FC<{ entry: TEntry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return (
                <div>
                    <strong>discharge</strong>:
                    <p>
                        {entry.discharge.date} {entry.discharge.criteria}
                    </p>
                </div>
            );
        case 'HealthCheck':
            return <HealthRatingBar rating={entry.healthCheckRating} showText={true} />;
        case 'OccupationalHealthcare':
            return (
                <div>
                    <p>employer: {entry.employerName}</p>
                    <p>
                        sick leave start: {entry.sickLeave?.startDate} end: {entry.sickLeave?.endDate}
                    </p>
                </div>
            );
    }
};

export default EntryDetails;
