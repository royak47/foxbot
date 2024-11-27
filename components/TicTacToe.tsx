'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TicTacToeProps {
  isOpen: boolean;
  onClose: () => void;
  onGameComplete?: (didWin: boolean) => void;
  gamesLeft: number;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ isOpen, onClose, onGameComplete, gamesLeft }) => {
  const [board, setBoard] = useState<Array<string>>(Array(9).fill(''));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [remainingGames, setRemainingGames] = useState(gamesLeft);

  // Reset game when isOpen changes
  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen]);

  useEffect(() => {
    setRemainingGames(gamesLeft);
  }, [gamesLeft]);

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

  const handleGameComplete = (playerWon: boolean) => {
    setShowPopup(true);
    setRemainingGames(prev => prev - 1);
    onGameComplete?.(playerWon);
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
      handleGameComplete(true);
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameOver(true);
      setWinner(null);
      handleGameComplete(false);
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
            handleGameComplete(false);
          } else if (isBoardFull(newBoard)) {
            setGameOver(true);
            setWinner(null);
            handleGameComplete(false);
          }
        }
        setIsPlayerTurn(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameOver, checkWinner, handleGameComplete]);

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
    setWinningLine(null);
    setShowPopup(false);
  };

  const handleClose = () => {
    resetGame();
    onClose();
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
    <main className="relative w-full min-h-screen max-w-md mx-auto overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/space.png"
          alt="Space Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 min-h-screen pb-20">
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
                  : 'text-white/60'
                }`}
              >
              </p>
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  disabled={!!cell || gameOver || !isPlayerTurn}
                  className={`w-full aspect-square rounded-xl border border-white/10 
                             flex items-center justify-center text-2xl font-bold transition-all duration-300
                             ${getCellBackground(index, cell)}
                             ${!cell && !gameOver && isPlayerTurn ? 'hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : ''}
                             ${!isPlayerTurn && !cell ? 'cursor-not-allowed' : ''}`}
                >
                  {!showPopup && cell === 'X' && (
                    <span className="text-blue-400">X</span>
                  )}
                  {!showPopup && cell === 'O' && (
                    <span className="text-red-400">O</span>
                  )}
                </button>
              ))}
            </div>

            {/* Action Buttons - Only show when game is not over */}
            {!showPopup && (
              <div className="flex gap-3">
                <button
                  onClick={resetGame}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-xl
                           hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300"
                >
                  Play Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-white/5 to-white/10 text-white/60 font-semibold py-2 px-4 rounded-xl
                           border border-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
                >
                  Exit
                </button>
              </div>
            )}

            {/* Result Popup */}
            {showPopup && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center animate-fadeIn">
                <div className="relative w-[90%] max-w-sm">
                  {/* Background Image */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <Image
                      src="/space.png"
                      alt="Space Background"
                      fill
                      className="object-cover"
                      priority
                      quality={100}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-3xl 
                                border border-white/20 shadow-2xl transform transition-all duration-500 animate-scaleIn">
                    <div className="text-center">
                      {/* Result Icon */}
                      <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4
                                  ${winner === 'X' 
                                    ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/50' 
                                    : winner === 'O'
                                      ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/50'
                                      : 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/50'
                                  }`}>
                        {winner === 'X' ? (
                          <span className="text-3xl text-blue-400 animate-bounce">🏆</span>
                        ) : winner === 'O' ? (
                          <span className="text-3xl text-red-400 animate-bounce">😢</span>
                        ) : (
                          <span className="text-3xl text-purple-400 animate-bounce">🤝</span>
                        )}
                      </div>

                      {/* Result Text */}
                      <h3 className={`text-2xl font-bold mb-2
                                  ${winner === 'X' 
                                    ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
                                    : winner === 'O'
                                      ? 'bg-gradient-to-r from-red-400 to-red-600'
                                      : 'bg-gradient-to-r from-purple-400 to-purple-600'
                                  } text-transparent bg-clip-text`}>
                        {winner === 'X' 
                          ? 'You Won!' 
                          : winner === 'O' 
                            ? 'You Lost!' 
                            : "It's a Draw!"}
                      </h3>
                      
                      <p className="text-white/60 mb-6">
                        {winner === 'X' 
                          ? '+20 BabyLiger Tokens!' 
                          : 'Better luck next time!'}
                      </p>

                      {/* Games Left Counter */}
                      <p className="text-sm text-white/40 mb-6">
                        Games left today: {remainingGames}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={resetGame}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold 
                                  py-3 px-6 rounded-xl hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] 
                                  transition-all duration-300 transform hover:scale-105 active:scale-95"
                        >
                          Play Again
                        </button>
                        <button
                          onClick={handleClose}
                          className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold 
                                  py-3 px-6 rounded-xl hover:shadow-[0_0_15px_rgba(107,114,128,0.5)] 
                                  transition-all duration-300 transform hover:scale-105 active:scale-95"
                        >
                          Exit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TicTacToe;
