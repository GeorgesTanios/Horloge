import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Alarm, {AlarmProps} from './Alarm.tsx';
import CreateAlarmModal from './CreateAlarmModal.tsx';
import AlarmList from './AlarmList.tsx';
import Clock from './Clock.tsx';
import axios from 'axios';
import {CreateAlarmType} from './AlarmForm.tsx';
import {formatAlarmTimeWithoutZero} from '../utils/time.tsx';

interface CreatEditAlarmDataType {
    message: string;
    alarm: AlarmProps;
}

const ClockComponent: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [alarms, setAlarms] = useState<AlarmProps[]>([]); // State to store alarms
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedAlarm, setSelectedAlarm] = useState<AlarmProps | null>(null); // State to store the selected alarm for editing
    const [selectedChangeAlarmActive, setSelectedChangeAlarmActive] = useState<AlarmProps | null>(null); // State to store the selected alarm for editing the active
    const [alarmRinging, setAlarmRinging] = useState<AlarmProps | null>(null); // State to store the selected alarm for editing

    useEffect(() => {
        // Fetch alarms on component mount
        const fetchAlarms = async () => {
            try {
                const response = await axios.get<AlarmProps[]>('http://localhost:3000/api/alarms'); // Replace with your backend URL
                setAlarms(response.data);
            } catch (error) {
                console.error('Error fetching alarms:', error);
            }
        };

        fetchAlarms();
    }, []);

    // Function to handle editing an alarm
    const handleEdit = (alarmId: number) => {
        setIsEdit(true);
        const foundAlarm = alarms?.find((alarm) => alarm.id === alarmId) || null;
        if (foundAlarm) {
            setSelectedAlarm(foundAlarm);
            setShowModal(true);
        }
    };

    // Function to handle toggling active alarm
    const handleToggle = (alarmId: number) => {
        setIsEdit(true);
        const foundAlarm = alarms?.find((alarm) => alarm.id === alarmId) || null;
        if (foundAlarm) {
            const newAlarmActiveChange = {
                id: foundAlarm.id,
                message: foundAlarm?.message ?? '',
                time: foundAlarm?.time ?? '',
                sound: foundAlarm?.sound ?? '',
                isActive: foundAlarm?.isActive ? false : true // when toggle switch the active if it was true switch it to false...
            }
            setSelectedAlarm(foundAlarm);
            setSelectedChangeAlarmActive(newAlarmActiveChange);
        }
    };

    // Function to Stop the Ringing Alarm
    const handleStopAlarm = (alarmId: number) => {
        handleToggle(alarmId);
    };

    // This useEffect to Edit isActive after toggle the button
    useEffect(() => {
        if (selectedChangeAlarmActive !== null) {
            createEditAlarm(selectedChangeAlarmActive);
            setSelectedChangeAlarmActive(null);
        }
    }, [selectedChangeAlarmActive]);

    // Function to handle deleting an alarm
    const handleDelete = async (alarmId: number) => {
        // Implement logic to delete the alarm from the database
        try {
            const response = await axios.delete(`http://localhost:3000/api/alarms/${alarmId}`);

            if (response.status === 201) {
                console.log('Alarm deleted successfully');
                setAlarms(alarms.filter((alarm) => alarm.id !== alarmId));
            } else {
                console.error('Failed to delete alarm:', response.data);
            }
        } catch (error) {
            console.error('Error deleting alarm:', error);
        }
    };

    const openAlarmModal = () => {
        setShowModal(true);
    };

    const closeAlarmModal = () => {
        setShowModal(false);
        setSelectedAlarm(null);
        setIsEdit(false);
    }

    const createEditAlarm = async (newAlarm: CreateAlarmType | null) => {
        try {
            if (isEdit) {
                const response = await axios.put<CreatEditAlarmDataType>(`http://localhost:3000/api/alarms/${selectedAlarm?.id}`, newAlarm); // Send POST request with newAlarm data
                if (response.data?.alarm) {
                    const alarmIndex = alarms.findIndex((alarm: AlarmProps) => alarm.id === selectedAlarm?.id);

                    if (alarmIndex !== -1) {
                        // Create a copy of the items state
                        const updatedAlarms = [...alarms];

                        // Update the item at the specific index with the new data
                        updatedAlarms[alarmIndex] = response.data?.alarm;

                        // Update the state with the modified items array
                        setAlarms(updatedAlarms);
                        setSelectedAlarm(null);
                    } else {
                        console.error('Item with ID', selectedAlarm?.id, 'not found');
                    }
                }
                setIsEdit(false);
            } else {
                const response = await axios.post<CreatEditAlarmDataType>('http://localhost:3000/api/alarms', newAlarm); // Send POST request with newAlarm data
                if (response.data?.alarm) {
                    setAlarms([...alarms, response.data?.alarm]);
                }
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error creating alarm:', error);
        }
    };

    // Checking the ringing Alarm
    useEffect(() => {
        const timer: number = setInterval(() => {
            const newDate = new Date();
            const hours = newDate.getHours();
            const minutes = newDate.getMinutes();
            const timeTest = `${hours}:${minutes}:00`;
            // console.log('the alarm rining is : ', alarmRinging);

            const foundAlarm: AlarmProps | undefined = alarms?.find((alarm) => {
                    const formatedTime = formatAlarmTimeWithoutZero(alarm.time);
                    return `${formatedTime}:00` === timeTest && alarm.isActive;
                }
            );

            if (foundAlarm) {
                setAlarmRinging(foundAlarm);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [alarms]);

    return (
        <>
            <MainClock>
                <ClockMainContainer>
                    <Clock/>
                    {alarmRinging !== null ?
                        <Alarm alarm={alarmRinging} onStop={handleToggle} setAlarmRinging={setAlarmRinging}/>
                        : <></>
                    }
                </ClockMainContainer>
                <AddAlarmButton onClick={openAlarmModal}>Add Alarm</AddAlarmButton>
                <AlarmList alarms={alarms} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleStopAlarm}/>
            </MainClock>

            {showModal &&
                <CreateAlarmModal onCloseModal={closeAlarmModal} onSubmit={createEditAlarm} isEdit={isEdit}
                                  selectedAlarm={selectedAlarm}/>
            }
        </>
    );
};

export default ClockComponent;

const ClockMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    min-height: 40vh;
    padding: 20px;

    @media (min-width: 768px) {
        /* Adjust layout for larger screens */
        flex-direction: row;  /* Switch to horizontal layout for tablets and desktops */
        justify-content: space-around; /* Distribute items with some space between them */
    }
`;

const MainClock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: space-between; /* Distribute elements horizontally */
    width: 100%; /* Stretch to full width */
`

const AddAlarmButton = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 5px;
`;