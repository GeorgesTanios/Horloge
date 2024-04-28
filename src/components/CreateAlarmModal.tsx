import React from 'react';
import styled from 'styled-components';
import AlarmForm, {CreateAlarmType} from './AlarmForm.tsx';
import {AlarmProps} from './Alarm.tsx';

interface CreateAlarmModalProps {
    onSubmit: (alarm: CreateAlarmType) => void;
    onCloseModal: () => void;
    isEdit: boolean;
    selectedAlarm: AlarmProps | null;
}

const CreateAlarmModal: React.FC<CreateAlarmModalProps> = ({onSubmit, onCloseModal, isEdit, selectedAlarm}) => {

    return (
        <>
            <Modal>
                <ModalContent>
                    <ModalTitle>
                        <h3>{isEdit ? 'Update Alarm' : 'Create New Alarm'}</h3>
                        <CloseButton className="close" onClick={onCloseModal}>&times;</CloseButton>
                    </ModalTitle>
                    <AlarmForm onSubmit={onSubmit} selectedAlarm={selectedAlarm}/>
                </ModalContent>
            </Modal>
        </>
    );
};

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    height: 390px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.div`
    text-align: center; /* Center align the title */
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`;

const CloseButton = styled.span`
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
`;

export default CreateAlarmModal;