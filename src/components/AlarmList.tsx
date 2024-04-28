import React from 'react';
import {AlarmProps} from './Alarm.tsx';
import styled from 'styled-components';
import AlarmItem from './AlarmItem.tsx'; // Import AlarmItem and Modal components

interface AlarmListProps {
    alarms: AlarmProps[] | null;
    onToggle: (alarmId: number) => void;
    onEdit: (alarmId: number) => void;
    onDelete: (alarmId: number) => void;
}

const AlarmList: React.FC<AlarmListProps> = ({alarms, onToggle, onEdit, onDelete}) => {

    return (
        <>
            <AlarmListContainer>
                {alarms?.map((alarm) => (
                    <AlarmItem
                        key={alarm.id}
                        alarm={alarm}
                        onToggle={onToggle}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </AlarmListContainer>

        </>
    );
};

const AlarmListContainer = styled.div`
    display: flex;
    flex-direction: column; /* Stack alarms vertically */
    width: 100%; /* Stretch to full width */
    background-color: #f5f5f5; /* Light gray background */
    border-radius: 5px; /* Rounded corners */
    padding: 15px; /* Inner padding */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    margin-bottom: 20px; /* Add some margin for spacing */

    /* Add animation for new alarms entering the list (optional) */
    animation: enterList 0.3s ease-in-out forwards;

    @keyframes enterList {
        from {
            opacity: 0;
            transform: translateY(20px); /* Slide up from below */
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export default AlarmList;
