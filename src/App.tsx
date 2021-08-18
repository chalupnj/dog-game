import { useState } from "react";
import styled, { css } from "styled-components";
import { darken } from "polished";

import Start from "./Start";
import Gameplay from "./Gameplay";
import End from "./End";
import dogsArray from "./dogs";
import winBackground from "./images/confetti1.svg";

export const buttonColor = "#44cee1";

const Container = styled.div<{ showBackground: boolean }>`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 32px;
  width: 100%;

  ${({ showBackground }) =>
    showBackground &&
    css`
      background: top / cover repeat-y url(${winBackground});
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    `}

  @media (max-width: 576px) {
    padding: 24px;
    box-sizing: border-box;
  }
`;

export const Title = styled.div`
  background-color: #ffffff;
  font-family: "Poppins", "Roboto", sans-serif;
  font-size: 40px;
  line-height: 54px;

  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 36px;
  }

  @media (max-width: 576px) {
    font-size: 24px;
    line-height: 28px;
  }
`;

export const Subtitle = styled.div`
  background-color: #ffffff;
  color: #535252;
  font-family: "Roboto", "Ariel", sans-serif;
  font-size: 20px;
  line-heitght: 36px;
  margin: 16px;
  text-align: center;
  width: 50%;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 20px;
    width: 90%;
  }
`;

export const Button = styled.button`
  background-color: ${buttonColor};
  border: 2px solid ${buttonColor};
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-family: "Poppins", "Roboto", sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 24px;
  margin: 40px;
  outline: none;
  padding: 16px 48px;

  :focus,
  :hover {
    background-color: ${darken(0.15, buttonColor)};
    border-color: ${darken(0.15, buttonColor)};
  }

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
    margin: 24px;
    padding: 12px 48px;
  }
`;

export type GamePhase = "start" | "gameplay" | "end";
export interface Dog {
  image: string;
  name: string;
}

const App = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>("end");
  const [win, setWin] = useState<boolean>(true);
  const [dog, setDog] = useState<Dog>(
    dogsArray.sort(() => 0.5 - Math.random())[0]
  );
  const maxIncorrectGuesses = 6;
  console.log({ showBackground: gamePhase === "end" && win });
  return (
    <Container showBackground={gamePhase === "end" && win}>
      {gamePhase === "start" && <Start setGamePhase={setGamePhase} />}
      {gamePhase === "gameplay" && (
        <Gameplay
          dog={dog}
          maxIncorrectGuesses={maxIncorrectGuesses}
          setGamePhase={setGamePhase}
          setWin={setWin}
        />
      )}
      {gamePhase === "end" && (
        <End dog={dog} setDog={setDog} setGamePhase={setGamePhase} win={win} />
      )}
    </Container>
  );
};

export default App;
