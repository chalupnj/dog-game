import { useState } from "react";
import styled from "styled-components";
import { darken } from "polished";

import Start from "./Start";
import Gameplay from "./Gameplay";
import End from "./End";
import dogsArray from "./dogs";

export const buttonColor = "#44cee1";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px;
  width: 100%;
`;

export const Title = styled.div`
  background-color: #ffffff;
  font-family: "Poppins", "Roboto", sans-serif;
  font-size: 40px;
  line-height: 54px;
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
  outline: none;
  padding: 16px 48px;
  margin: 40px;

  :focus,
  :hover {
    background-color: ${darken(0.15, buttonColor)};
    border-color: ${darken(0.15, buttonColor)};
  }
`;

export type GamePhase = "start" | "gameplay" | "end";
export interface Dog {
  image: string;
  name: string;
}

const App = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>("start");
  const [win, setWin] = useState<boolean>(false);
  const [dog, setDog] = useState<Dog>(
    dogsArray.sort(() => 0.5 - Math.random())[0]
  );
  const maxIncorrectGuesses = 6;

  return (
    <Container>
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
