'use client';
import { useState, useEffect } from 'react';


interface TicTacToeProps {
  isOpen: boolean;
  onClose: () => void;
  onGameComplete?: (didWin: boolean) => void;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ isOpen, onClose, onGameComplete }) => {
  const [board, setBoard] = useState<Array<string>>(Array(9).fill(''));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (squares: string[]): [string | null, number[] | null] => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], combo];
      }
    }
    return [null, null];
  };

  const isBoardFull = (squares: string[]): boolean => {
    return squares.every(square => square !== '');
  };

  const handleClick = (index: number) => {
    if (board[index] || !isPlayerTurn || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const [win, line] = checkWinner(newBoard);
    if (win) {
      setGameOver(true);
      setWinner('X');
      setWinningLine(line);
      onGameComplete?.(true);
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameOver(true);
      setWinner(null);
      onGameComplete?.(false);
      return;
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        const emptyCells = board.reduce((acc: number[], cell, idx) => 
          cell === '' ? [...acc, idx] : acc, []);
        
        if (emptyCells.length > 0) {
          const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          const newBoard = [...board];
          newBoard[randomIndex] = 'O';
          setBoard(newBoard);

          const [win, line] = checkWinner(newBoard);
          if (win) {
            setGameOver(true);
            setWinner('O');
            setWinningLine(line);
            onGameComplete?.(false);
          } else if (isBoardFull(newBoard)) {
            setGameOver(true);
            setWinner(null);
            onGameComplete?.(false);
          }
        }
        setIsPlayerTurn(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameOver]);

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
    setWinningLine(null);
  };

  if (!isOpen) return null;

  const getCellBackground = (index: number, value: string) => {
    if (!value) return 'bg-gradient-to-br from-white/5 to-white/10';
    if (winningLine?.includes(index)) {
      return value === 'X' 
        ? 'bg-gradient-to-br from-blue-500/30 to-blue-600/30 border-blue-400/50' 
        : 'bg-gradient-to-br from-red-500/30 to-red-600/30 border-red-400/50';
    }
    return value === 'X'
      ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20'
      : 'bg-gradient-to-br from-red-500/20 to-red-600/20';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" style={{ pointerEvents: 'auto' }}>
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/20 w-[90%] max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Tic Tac Toe
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Game Status */}
        <div className="text-center mb-4">
          <p className={`text-lg font-semibold transition-colors duration-300
            ${gameOver 
              ? winner 
                ? winner === 'X' 
                  ? 'text-blue-400'
                  : 'text-red-400'
                : 'text-purple-400'
              : isPlayerTurn 
                ? 'text-blue-400'
                : 'text-red-400'
            }`}
          >
            {gameOver 
              ? winner 
                ? `${winner === 'X' ? 'You won! 🎉' : 'Computer won!'}`
                : 'It\'s a draw! 🤝'
              : `${isPlayerTurn ? 'Your turn 👉' : 'Computer\'s turn... 🤖'}`
            }
          </p>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!isPlayerTurn || gameOver}
              className={`
                w-full aspect-square rounded-xl
                ${getCellBackground(index, cell)}
                border border-white/10
                flex items-center justify-center
                text-4xl font-bold
                transition-all duration-300
                transform hover:scale-105
                ${!cell && !gameOver && isPlayerTurn ? 'hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : ''}
                ${cell === 'X' ? 'text-blue-400' : 'text-red-400'}
                group
              `}
            >
              {cell && (
                <span className="transform transition-all duration-300 group-hover:scale-110">
                  {cell}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={resetGame}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white 
                     hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300
                     border border-white/10 hover:border-white/20 transform hover:scale-105
                     shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                     font-semibold"
          >
            New Game 🎮
          </button>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 text-white 
                     hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300
                     border border-white/10 hover:border-white/20 transform hover:scale-105
                     shadow-lg hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]
                     font-semibold"
          >
            Exit ✖️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
