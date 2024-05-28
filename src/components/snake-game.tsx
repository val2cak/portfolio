'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import Button from './button';
import { translate } from '../locales/translate';
import { getHighScore, setHighScore } from '../services/local-storage';
import {
  gameColors,
  GRID_SIZE,
  snakeSpeeds,
} from '../constants/snake-game-items';
import { Direction, Point, Speed } from '../types/snake-game-types';

const SnakeGame = () => {
  const {
    game,
    hint,
    restart,
    start,
    pause,
    snakeSpeed,
    snakeScore,
    snakeHighScore,
    snakeGame,
  } = translate.game;

  const [snake, setSnake] = useState<Point[]>([
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [food, setFood] = useState<Point>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<Speed>(snakeSpeeds[0]);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScoreState] = useState<number>(0);
  const [color, setColor] = useState(gameColors.start);

  const gameAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHighScore = getHighScore();
    setHighScoreState(savedHighScore);
  }, []);

  const generateFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);

    setFood({ x, y });
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const snakeHead = { ...newSnake[0] };

    if (direction === 'UP') {
      snakeHead.y -= 1;
    }
    if (direction === 'DOWN') {
      snakeHead.y += 1;
    }
    if (direction === 'LEFT') {
      snakeHead.x -= 1;
    }
    if (direction === 'RIGHT') {
      snakeHead.x += 1;
    }

    if (
      snakeHead.x < 0 ||
      snakeHead.x >= GRID_SIZE ||
      snakeHead.y < 0 ||
      snakeHead.y >= GRID_SIZE ||
      newSnake.some(
        (snakePart) =>
          snakePart.x === snakeHead.x && snakePart.y === snakeHead.y
      )
    ) {
      setGameOver(true);
      setIsGameRunning(false);
      setColor(gameColors.restart);
      if (score > highScore) {
        setHighScore(score);
        setHighScoreState(score);
      }
      return;
    }

    newSnake.unshift(snakeHead);

    if (snakeHead.x === food.x && snakeHead.y === food.y) {
      setScore(score + 1);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  useEffect(() => {
    generateFood();
  }, []);

  useEffect(() => {
    if (isGameRunning) {
      const interval = setInterval(moveSnake, speed.speed);
      return () => clearInterval(interval);
    }
  }, [isGameRunning, snake, direction, speed]);

  useEffect(() => {
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (gameAreaRef.current && isGameRunning) {
      gameAreaRef.current.focus();
    }
  }, [isGameRunning]);

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN' && !gameOver) {
      setDirection('UP');
    }
    if (event.key === 'ArrowDown' && direction !== 'UP' && !gameOver) {
      setDirection('DOWN');
    }
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT' && !gameOver) {
      setDirection('LEFT');
    }
    if (event.key === 'ArrowRight' && direction !== 'LEFT' && !gameOver) {
      setDirection('RIGHT');
    }
    if (event.key === 'Enter') {
      gameOver ? restartGame() : isGameRunning ? pauseGame() : startGame();
    }
    if (event.key >= '1' && event.key <= '7') {
      const speedSetting = snakeSpeeds.find(
        (item) => item.id === parseInt(event.key)
      );
      if (speedSetting) {
        setSpeed(speedSetting);
      }
    }
  };

  const startGame = () => {
    setIsGameRunning(true);
    setColor(gameColors.pause);
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
    }
  };

  const pauseGame = () => {
    setIsGameRunning(false);
    setColor(gameColors.start);
  };

  const restartGame = () => {
    setSnake([
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ]);
    setDirection('RIGHT');
    setScore(0);
    generateFood();
    setGameOver(false);
    setIsGameRunning(true);
    setColor(gameColors.pause);
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
    }
  };

  return (
    <div className='flex flex-col'>
      <h1 className='font-minecraft uppercase text-xl place-self-center mb-2'>
        {snakeGame}
      </h1>

      <div
        style={{ backgroundColor: color }}
        className='flex justify-between items-center font-bold uppercase p-4 rounded-sm mb-4 text-light'
      >
        <div>
          {snakeSpeed} {speed.id}
        </div>
        <div>
          {snakeScore} {score}
        </div>
        <div>
          {snakeHighScore} {highScore}
        </div>
      </div>

      <div
        ref={gameAreaRef}
        className='game-area grid grid-cols-20 grid-rows-20 relative border'
        onKeyDown={handleKeyPress}
        tabIndex={0}
        style={{ borderColor: color }}
      >
        {Array.from({ length: GRID_SIZE }).map((_, y) => (
          <div className='flex justify-center items-center' key={y}>
            {Array.from({ length: GRID_SIZE }).map((_, x) => (
              <div
                key={x}
                className={`w-5 h-5 border border-light border-opacity-30 ${
                  snake.some(
                    (snakePart) => snakePart.x === x && snakePart.y === y
                  ) && 'bg-yellow'
                } ${food.x === x && food.y === y && 'bg-red'}`}
              ></div>
            ))}
          </div>
        ))}
        {gameOver && (
          <div
            style={{ color: color }}
            className='absolute place-self-center font-minecraft uppercase flex justify-center items-center text-4xl font-bold'
          >
            {game}
          </div>
        )}
      </div>

      <div className='flex flex-col uppercase opacity-70 items-center text-[14px] mt-2 mb-4'>
        {hint}
      </div>

      {gameOver ? (
        <div className='flex justify-center items-center mt-2'>
          <Button
            text={restart}
            handleOnClick={restartGame}
            style={{
              borderColor: gameColors.restart,
              color: gameColors.restart,
            }}
          />
        </div>
      ) : isGameRunning ? (
        <div className='flex justify-center items-center mt-2'>
          <Button
            text={pause}
            handleOnClick={pauseGame}
            style={{
              borderColor: gameColors.pause,
              color: gameColors.pause,
            }}
          />
        </div>
      ) : (
        <div className='flex justify-center items-center mt-2'>
          <Button
            text={start}
            handleOnClick={startGame}
            style={{
              borderColor: gameColors.start,
              color: gameColors.start,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
