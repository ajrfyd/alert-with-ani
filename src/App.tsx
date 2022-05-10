import React, { useState } from 'react';
import styled from 'styled-components';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(false);

  const openAlertHandler = () => setAlert(true);
  const closeAlertHandler = () => setAlert(false);

  return (
    <Container>
      <button onClick={openAlertHandler}>
        Alert
      </button>
      <Alert closeAlertHandler={closeAlertHandler} text='알림창 입니다' title='Tittle Death' cancelText='Cancel' confirmText='Confirm' visible={alert}/>
    </Container>
  );
}

export default App;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`