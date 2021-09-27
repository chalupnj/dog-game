import { useEffect, useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "react-use";

import { Title, Subtitle, Dog, GamePhase } from "./App";
import leashGraphic from "./images/leash-graphic.svg";
import leashGraphicRotated from "./images/leash-graphic-rotated.svg";
import alphabet from "./alphabet";

const Subcontainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageRevealContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 2;
  flex-direction: column;

  @media (max-width: 576px) {
    flex-direction: row;
  }
`;

const LeashImageContainer = styled.div`
  display: flex;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 250px;
  }
`;

const DogImageContainer = styled.div<{ revealAmount: number }>`
  padding: 0 24px;
  position: relative;
  max-width: 400px;

  &:after {
    background-color: #fff;
    bottom: 0;
    content: "";
    height: ${({ revealAmount }) => 100 - revealAmount}%;
    left: 0;
    position: absolute;
    width: 100%;
  }

  @media (max-width: 768px) {
    max-width: 45%;
  }

  @media (max-width: 576px) {
    max-width: 70%;
    padding: 0;
  }
`;

const Image = styled.img`
  display: flex;
  width: 100%;
`;

const GuessContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding: 48px;

  @media (max-width: 768px) {
    align-items: center;
    box-sizing: border-box;
    max-width: 100%;
    padding: 0;
  }
`;

const AnswerSpaces = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 32px;
  margin: 8px 0;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 550px) {
    font-size: 28px;
  }

  @media (max-width: 576px) {
    font-size: 22px;
    margin: 4px 0;
  }
`;

const Space = styled.div`
  border-bottom: 2px solid #000000;
  height: 38px;
  margin: 4px 8px;
  text-align: center;
  text-transform: uppercase;
  width: 48px;

  @media (max-width: 768px) {
    height: 38px;
    margin: 8px 4px;
    width: 36px;
  }

  @media (max-width: 550px) {
    margin: 8px 4px;
    width: 30px;
  }

  @media (max-width: 576px) {
    height: 28px;
    width: 20px;
  }
`;

const Spacer = styled.div`
  height: 44px;

  @media (max-width: 768px) {
    height: 39px;
  }

  @media (max-width: 576px) {
    height: 37px;
  }
`;

const FeedbackMessage = styled.div<{ correct: boolean }>`
  color: ${({ correct }) => (correct ? "green" : "red")};
  font-size: 24px;
  margin: 8px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 576px) {
    font-size: 18px;
  }
`;

const AlphabetContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const AlphabetHeader = styled.div`
  font-size: 24px;
  margin: 8px 8px 8px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 576px) {
    font-size: 18px;
  }
`;

const AlphabetButton = styled.button`
  align-items: center;
  background-color: #fff;
  border: 2px solid #000000;
  display: flex;
  font-size: 32px;
  height: 64px;
  justify-content: center;
  margin: 8px;
  text-transform: uppercase;
  width: 64px;

  :disabled {
    border-color: #b7b7b7;
    color: #b7b7b7;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    height: 54px;
    width: 54px;
  }

  @media (max-width: 576px) {
    font-size: 20px;
    height: 42px;
    margin: 4px;
    width: 42px;
  }
`;

interface Props {
  dog: Dog;
  maxIncorrectGuesses: number;
  setWin: (win: boolean) => void;
  setGamePhase: (gamePhase: GamePhase) => void;
}

interface Answer {
  letter: string;
  show: boolean;
}

const getSpaces = (dogName: string, guesses: string[]) =>
  dogName.split("").map((currentLetter) => ({
    letter: currentLetter,
    show: guesses.includes(currentLetter),
  }));

const Gameplay = ({
  dog,
  maxIncorrectGuesses,
  setGamePhase,
  setWin,
}: Props) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const [answer, setAnswer] = useState<Answer[]>(getSpaces(dog.name, guesses));
  const { width } = useWindowSize();

  const leash = width <= 576 ? leashGraphicRotated : leashGraphic;

  console.log({ width });
  console.log({ leash });

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (!guesses.includes(key.toLowerCase())) {
      setGuesses([...guesses, key.toLowerCase()]);
    }
  };

  useEffect(() => {
    if (guesses.length > 0 && !dog.name.includes(guesses[guesses.length - 1])) {
      setIncorrectGuesses((count) => count + 1);
    }
  }, [dog, guesses, setIncorrectGuesses]);

  useEffect(() => {
    if (incorrectGuesses >= maxIncorrectGuesses) {
      setWin(false);
      setGamePhase("end");
    }
  }, [incorrectGuesses, maxIncorrectGuesses, setGamePhase, setWin]);

  useEffect(() => {
    if (guesses.length > 0 && dog.name.includes(guesses[guesses.length - 1])) {
      setAnswer(getSpaces(dog.name, guesses));
    }
  }, [dog, getSpaces, guesses, setAnswer]);

  useEffect(() => {
    const showEverything = Boolean(!answer.find(({ show }) => !show));
    if (showEverything) {
      setWin(true);
      setGamePhase("end");
    }
  }, [answer, setGamePhase, setWin]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const correctGuess = dog.name.includes(guesses[guesses.length - 1]);

  return (
    <>
      <Title>Take the Dog for a Walk</Title>
      <Subtitle>
        Guess which dog wants a walk. After six wrong guesses, they'll run away!
      </Subtitle>
      <Subcontainer>
        <ImageRevealContainer>
          <LeashImageContainer>
            <Image src={leash} alt="Empty leash" />
          </LeashImageContainer>
          <DogImageContainer
            revealAmount={(incorrectGuesses / maxIncorrectGuesses) * 100}
          >
            <Image src={dog.image} alt="Dog photo" />
          </DogImageContainer>
        </ImageRevealContainer>
        <GuessContainer>
          <AnswerSpaces>
            {answer.map(({ letter, show }, index) => (
              <Space key={`${letter}-${index}`}>{show && letter}</Space>
            ))}
          </AnswerSpaces>
          {guesses.length > 0 ? (
            <FeedbackMessage correct={correctGuess}>
              {guesses[guesses.length - 1].toUpperCase()} is{" "}
              {correctGuess ? "CORRECT!" : "INCORRECT!"}
            </FeedbackMessage>
          ) : (
            <Spacer />
          )}
          <AlphabetHeader>Guess a letter:</AlphabetHeader>
          <AlphabetContainer>
            {alphabet.map((letter) => (
              <AlphabetButton
                disabled={guesses.includes(letter)}
                key={letter}
                onClick={() => setGuesses([...guesses, letter])}
              >
                {letter}
              </AlphabetButton>
            ))}
          </AlphabetContainer>
        </GuessContainer>
      </Subcontainer>
    </>
  );
};

export default Gameplay;
