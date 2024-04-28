import React, {useState} from 'react';
import styled from 'styled-components';
import {AlarmProps} from './Alarm.tsx';

export interface CreateAlarmType {
    time: string;
    sound: string;
    message: string;
    isActive: boolean;
}

interface AlarmFormProps {
    onSubmit: (alarm: CreateAlarmType) => void;
    selectedAlarm: AlarmProps | null;
}

const timeFormatRegex = /^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; // Regex for valid time format

const AlarmForm: React.FC<AlarmFormProps> = ({onSubmit, selectedAlarm}) => {
    const [time, setTime] = useState(selectedAlarm ? selectedAlarm.time : '');
    const [sound, setSound] = useState(selectedAlarm ? selectedAlarm.sound : 'Default Sound');
    const [message, setMessage] = useState(selectedAlarm ? selectedAlarm.message : 'Default message');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newAlarm: CreateAlarmType = {
            time,
            sound,
            message,
            isActive: !!selectedAlarm?.isActive,
        };

        const isValid = timeFormatRegex.test(time);
        setErrorMessage(isValid ? '' : 'Invalid time format (HH:MM)'); // Set error message

        if (!isValid) {
            alert('Invalid time format (HH:MM)');
        } else {
            onSubmit(newAlarm);
            // Reset form values
            setTime('');
            setSound('');
            setMessage('');
        }
    };

    const handleSetTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTime(newTime);

        // Validate time format
        const isValid = timeFormatRegex.test(newTime);
        setErrorMessage(isValid ? '' : 'Invalid time format (HH:MM)'); // Set error message
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormItem>
                <Label htmlFor="time">Time: </Label>
                <Input
                    type="text"
                    id="time"
                    style={{border: errorMessage ? '1px solid red' : '1px solid #ccc'}}
                    value={time} onChange={(e) => handleSetTime(e)}
                />
            </FormItem>
            {errorMessage && <StyledErrorMessage className="error">{errorMessage}</StyledErrorMessage>}

            <FormItem>
                <Label htmlFor="sound">Sound: </Label>
                <Input type="text" id="sound" value={sound} onChange={(e) => setSound(e.target.value)}/>
            </FormItem>

            <FormItem>
                <Label htmlFor="message">Message: </Label>
                <TextArea id="message" value={message} onChange={(e) => setMessage(e.target.value)}/>
            </FormItem>

            <Button type="submit">{selectedAlarm !== null ? 'Edit Alarm' : 'Add Alarm'}</Button>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;
    //background-color: #f5f5f5; /* Light gray background */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    width: 100%; /* Make the form responsive */
    max-width: 450px; /* Set a maximum width for larger screens */
    margin: auto; /* Center the form horizontally */
`;

const FormItem = styled.div`
    margin-bottom: 15px; /* Adjust spacing between form items */
    display: flex; /* Align labels and inputs horizontally */
`;

const Label = styled.label`
    width: 80px; /* Fixed label width for consistency */
    text-align: right; /* Align label text to the right */
    font-weight: bold;
    margin-right: 10px /* Make labels stand out */
`;

const Input = styled.input`
    flex: 1; /* Allow inputs to grow and fill remaining space */
    padding: 5px; /* Add some padding for better usability */
    border: 1px solid #ccc; /* Basic border for inputs */
    border-radius: 5px; /* Rounded corners for a smoother look */
    font-size: 16px; /* Consistent font size */
`;

const TextArea = styled.textarea`
    flex: 1; /* Allow textarea to grow and fill remaining space */
    padding: 5px; /* Add some padding for better usability */
    border: 1px solid #ccc; /* Basic border for textarea */
    border-radius: 5px; /* Rounded corners for a smoother look */
    font-size: 16px; /* Consistent font size */
    min-height: 80px; /* Set a minimum height for the textarea */
`;

const Button = styled.button`
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.2s ease-in-out; /* Add a smooth hover effect */

    &:hover {
        background-color: #3e8e41; /* Darker green on hover */
    }
`;

const StyledErrorMessage = styled.p`
    color: red;
    font-size: 0.8rem;
    margin-top: 0;
    padding-left: 6rem;
`;

export default AlarmForm;
