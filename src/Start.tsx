import styled from "styled-components";

import { Title, Subtitle, Button, GamePhase } from "./App";
import dogWelcomePhoto from "./images/dog-welcome-photo.png";

const ImageContainer = styled.div`
  width: 30%;
`;

const Image = styled.img`
  width: 100%;
`;

interface Props {
  setGamePhase: (gamePhase: GamePhase) => void;
}

const Start = ({ setGamePhase }: Props) => (
  <>
    <Title>Take the Dog for a Walk</Title>
    <Subtitle>A less violent take on the classic Hangman game</Subtitle>
    <Button onClick={() => setGamePhase("gameplay")} tabIndex={0}>
      PLAY
    </Button>
    <ImageContainer>
      <Image src={dogWelcomePhoto} alt="Dog welcome photo" />
    </ImageContainer>
  </>
);

export default Start;
