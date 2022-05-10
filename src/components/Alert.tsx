import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from 'styled-components';
import Button from './Button';

type AlertProps = {
  closeAlertHandler: () => void;
  text: string;
  title: string;
  confirmText: string;
  cancelText: string;
  visible: boolean;
}

type ComponentProp = {
  disappear: boolean;
}

const Alert = ({ closeAlertHandler, title, text, confirmText, cancelText, visible }: AlertProps) => {
  const [animate, setAnimate] = useState(false); // 애니메이션이 보여지고 있는 상태인가 아닌가.
  const [localVisible, setLocalVislble] = useState(visible); // 현재 상태가 true => false로 전환되고 있다를 감지
  
  useEffect(() => {
    // visible 값이 true => false 바뀌는 시점에 전환
    if(localVisible && !visible) {
      // visible이 true에서 false로 바뀐다
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    // visible 값이 바뀔 때 마다 local값을 동기화 시켜 주겠다.
    setLocalVislble(visible);
  }, [localVisible, visible])

  if(!localVisible && !animate) return null;


  return (
    <BackDrop disappear={!visible}>
      <AlertContainer disappear={!visible}>
        <h2>{title}</h2>
        {text}
        <ButtonGroup>
          <Button color='pink' closeAlertHandler={closeAlertHandler}>{cancelText}</Button>
          <Button closeAlertHandler={closeAlertHandler}>{confirmText}</Button>
        </ButtonGroup>

      </AlertContainer>
    </BackDrop>
  )
}

export default Alert;

Alert.defaultProps = {
  confirmText: '확인',
  cancelText: '취소'
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`
const bounceIn = keyframes`
  0%, 100%, 20%, 40%, 60%, 80% {
    -webkit-transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
    transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
  }
  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    -ms-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }
  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    -ms-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }
  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    -ms-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    -ms-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03)
  }
  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    -ms-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97)
  }
  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
`
const bounceOut = keyframes`
  20% {
    -webkit-transform: scale3d(.9, .9, .9);
    -ms-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }
  50%,
  55% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    -ms-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }
  100% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    -ms-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }
`

const BackDrop = styled.div<ComponentProp>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .6);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  animation-name: ${fadeIn};
  animation-duration: .5s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  ${({disappear}) => disappear && css`
    animation-name: ${fadeOut};
  `}
`



const AlertContainer = styled.div<ComponentProp>`
  width: 30%;
  min-height: 10%;
  padding: 2rem 2rem;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .6);

  animation-name: ${bounceIn};
  -webkit-animation-duration: 1s;
  animation-duration: .5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;

  ${({disappear}) => disappear && css`
    animation-name: ${bounceOut};
  `}
`

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`

