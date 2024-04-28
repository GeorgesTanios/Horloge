import React from 'react';
import styled from 'styled-components';
import {AlarmProps} from './Alarm.tsx';

interface AlarmItemActiveProp {
    active: boolean;
}

interface AlarmItemProps {
    alarm: AlarmProps;
    onToggle: (alarmId: number) => void;
    onEdit: (alarmId: number) => void;
    onDelete: (alarmId: number) => void;
}

const AlarmItem: React.FC<AlarmItemProps> = ({alarm, onToggle, onEdit, onDelete}) => {

    const handleToggle = () => onToggle(alarm.id); // Function to toggle the alarm's active state
    const handleEdit = () => onEdit(alarm.id); // Function to enter edit mode
    const handleDelete = () => onDelete(alarm.id); // Function to delete the alarm

    return (
        <AlarmContainer>
            <AlarmInfo>
                <TimeText>{alarm.time}</TimeText>
                {/*<ActiveStatus active={alarm.isActive}>Active</ActiveStatus>*/}
                <ToggleSwitch onClick={handleToggle} active={alarm.isActive}/>
                <EditButton onClick={handleEdit}>Edit</EditButton>
                <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </AlarmInfo>
        </AlarmContainer>
    );
};

const AlarmContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
`;

const AlarmInfo = styled.div`
    display: flex;
    flex: 1; /* Allow AlarmInfo to grow and fill remaining space */
    justify-content: space-between;
    align-items: center;
`;

const TimeText = styled.span`
    font-size: 18px;
    font-weight: bold;
    width: 60px;
    text-align: right;
    margin-right: 10px;
`;

// const ActiveStatus = styled.span<AlarmItemActiveProp>`
//     margin-left: 10px;
//     padding: 5px 10px;
//     border-radius: 5px;
//     background-color: ${(props) => (props.active ? '#4caf50' : '#f44336')}; // Green for active, red for inactive
//     color: white;
// `;

const ToggleSwitch = styled.input.attrs<AlarmItemActiveProp>({
    type: 'checkbox',
})`
    appearance: none;
    width: 40px;
    height: 24px;
    background-color: ${(props) => (props.active ? '#4caf50' : '#ccc')};
    border-radius: 24px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:checked {
        /* Remove redundant background color change */
    }

    &::after {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        margin: 2px;
        background-color: white;
        border-radius: 50%;
        transition: transform 0.2s ease;
        transform: ${(props) => (props.active ? 'translateX(16px)' : 'translateX(0)')};
    }

    &:checked::after {
        //transform: translateX(16px); /* Move the knob to the right when checked */
        transform: ${(props) => (props.active ? 'translateX(16px)' : 'translateX(0)')};
    }
`;

const EditButton = styled.button`
    background-color: #3f51b5; /* Blue */
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px; /* Add spacing between buttons */
    transition: background-color 0.2s ease-in-out; /* Add hover effect */

    &:hover {
        background-color: #28377d; /* Darken blue on hover */
    }
`;

const DeleteButton = styled.button`
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

export default AlarmItem;
