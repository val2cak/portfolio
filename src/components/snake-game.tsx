'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import Button from './button';
import { translate } from '../locales/translate';

const GRID_SIZE = 20;

type Point = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const SnakeGame = () => {
  const [snake, setSnake] = useState<Point[]>([
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [food, setFood] = useState<Point>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);

  const gameAreaRef = useRef<HTMLDivElement>(null);

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
      return;
    }

    newSnake.unshift(snakeHead);

    if (snakeHead.x === food.x && snakeHead.y === food.y) {
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
      const interval = setInterval(moveSnake, 60);
      return () => clearInterval(interval);
    }
  }, [isGameRunning, snake, direction]);

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
  };

  const startGame = () => {
    setIsGameRunning(true);
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
    }
  };

  const pauseGame = () => {
    setIsGameRunning(false);
  };

  const restartGame = () => {
    setSnake([
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ]);
    setDirection('RIGHT');
    generateFood();
    setGameOver(false);
    setIsGameRunning(true);
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
    }
  };

  const { game, restart, start, pause } = translate.game;

  return (
    <div className='flex flex-col gap-8'>
      {gameOver && (
        <div className='absolute place-self-center font-minecraft uppercase flex justify-center items-center text-4xl font-bold text-red'>
          {game}
        </div>
      )}
      <div
        ref={gameAreaRef}
        className='game-area grid grid-cols-20 grid-rows-20'
        onKeyDown={handleKeyPress}
        tabIndex={0}
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
      </div>
      {gameOver && (
        <div className='flex justify-center items-center'>
          <Button text={restart} handleOnClick={restartGame} />
        </div>
      )}

      {!isGameRunning && !gameOver && (
        <div className='flex justify-center items-center'>
          <Button text={start} handleOnClick={startGame} />
        </div>
      )}

      {isGameRunning && !gameOver && (
        <div className='flex justify-center items-center'>
          <Button text={pause} handleOnClick={pauseGame} />
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
