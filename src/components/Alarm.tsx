import React from 'react';
import styled from 'styled-components';

interface AlarmActiveProp {
    isActive: boolean;
}

export interface AlarmProps {
    id: number;
    time: string;
    sound: string;
    message: string;
    isActive: boolean;
}

interface AlarmInnerProps {
    alarm: AlarmProps;
    onStop: (alarmId: number) => void;
    setAlarmRinging: (alarm: AlarmProps | null) => void;
}

const Alarm: React.FC<AlarmInnerProps> = ({alarm, onStop, setAlarmRinging}) => {

    const handleStopAlarm = () => {
        setAlarmRinging(null);
        onStop(alarm.id);
    };

    return (
        <AlarmContainer>
            <AlarmHeader>
                !! Alarm !!
            </AlarmHeader>
            <AlarmActiveState isActive={alarm.isActive}>
                {alarm.isActive ? 'Actif' : 'Inactif'}
            </AlarmActiveState>
            <AlarmDetails>Time: {alarm.time}</AlarmDetails>
            <AlarmDetails>Sound: {alarm.sound}</AlarmDetails>
            <AlarmDetails>Message: {alarm.message}</AlarmDetails>
            <StopButton onClick={handleStopAlarm}>Stop</StopButton>
        </AlarmContainer>
    );
};

export default Alarm;

const AlarmContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin: 1rem;
    border-radius: 5px;
    background-color: #f5f5f5;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const AlarmHeader = styled.h3`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
`;

const AlarmDetails = styled.p`
    margin-bottom: 0.5rem;
`;

const AlarmActiveState = styled.span<AlarmActiveProp>`
    color: ${(props) => (props.isActive ? 'red' : 'green')};
`;

const StopButton = styled.button`
    background-color: #f44336; /* Red */
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s ease-in-out; /* Add hover effect */

    &:hover {
        background-color: #d32f2f; /* Darken red on hover */
    }
`;