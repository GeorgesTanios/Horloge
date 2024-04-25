import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Clock: React.FC = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = date.toLocaleTimeString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    return (
        <>
            <ClockContainer>
                <p>{formattedTime}</p>
            </ClockContainer>
        </>

    );
};

export default Clock;

const ClockContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #333;
    color: #fff;
    font-size: 3rem;
`;