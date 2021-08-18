import styled from "styled-components";

import { Title, Subtitle, Button, GamePhase, Dog } from "./App";
import dogsArray from "./dogs";

const ImageContainer = styled.div`
  width: 30%;

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
`;

interface Props {
  dog: Dog;
  setDog: any;
  setGamePhase: (gamePhase: GamePhase) => void;
  win: boolean;
}

const End = ({ dog, setDog, setGamePhase, win }: Props) => {
  const handleClick = () => {
    setDog(dogsArray.sort(() => 0.5 - Math.random())[0]);
    setGamePhase("start");
  };

  return (
    <>
      <Title>{win ? "Congratulations!!" : "Uh oh!"}</Title>
      <Subtitle>
        {win
          ? `You won the game and ${dog.name
              .split("")[0]
              .toUpperCase()}${dog.name.substring(1)} gets to go on a walk!`
          : `You lost the game and ${dog.name
              .split("")[0]
              .toUpperCase()}${dog.name.substring(
              1
            )} doesn’t get to go on a walk 😥`}
      </Subtitle>
      <Button onClick={handleClick} tabIndex={0}>
        PLAY AGAIN
      </Button>
      <ImageContainer>
        <Image src={dog.image} alt="Dog photo" />
      </ImageContainer>
    </>
  );
};

export default End;
