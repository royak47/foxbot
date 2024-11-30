'use client';
import { useState, useEffect } from 'react';

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
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical columns
    [0, 4, 8], [2, 4, 6] // Diagonal lines
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

  const findBestMove = (squares: string[]): number => {
    // First, try to win
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      const line = [squares[a], squares[b], squares[c]];
      const oCount = line.filter(x => x === 'O').length;
      const emptyCount = line.filter(x => x === '').length;
      
      if (oCount === 2 && emptyCount === 1) {
        return combo[line.findIndex(x => x === '')];
      }
    }

    // Second, block player from winning
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      const line = [squares[a], squares[b], squares[c]];
      const xCount = line.filter(x => x === 'X').length;
      const emptyCount = line.filter(x => x === '').length;
      
      if (xCount === 2 && emptyCount === 1) {
        return combo[line.findIndex(x => x === '')];
      }
    }

    // Third, try to create a fork (two potential winning moves)
    const emptyCells = squares.reduce((acc: number[], cell, idx) => 
      cell === '' ? [...acc, idx] : acc, []);
    
    for (const cell of emptyCells) {
      const testBoard = [...squares];
      testBoard[cell] = 'O';
      let winningPaths = 0;
      
      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        const line = [testBoard[a], testBoard[b], testBoard[c]];
        const oCount = line.filter(x => x === 'O').length;
        const emptyCount = line.filter(x => x === '').length;
        
        if (oCount === 2 && emptyCount === 1) {
          winningPaths++;
        }
      }
      
      if (winningPaths >= 2) {
        return cell;
      }
    }

    // Fourth, take center if available
    if (squares[4] === '') {
      return 4;
    }

    // Fifth, take corners
    const corners = [0, 2, 6, 8].filter(i => squares[i] === '');
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // Finally, take any available edge
    const edges = [1, 3, 5, 7].filter(i => squares[i] === '');
    if (edges.length > 0) {
      return edges[Math.floor(Math.random() * edges.length)];
    }

    // If nothing else, take random empty cell
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        const bestMove = findBestMove(board);
        if (bestMove !== -1) {
          const newBoard = [...board];
          newBoard[bestMove] = 'O';
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
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, gameOver, board]);

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

  const getCellBackground = (index: number, value: string) => {
    if (!value) return 'bg-gradient-to-br from-[#FFF5E1] to-[#FFE4BC] hover:from-[#FFE4BC] hover:to-[#FFD7A8] border-[#DEB887] hover:border-[#D2691E]';
    if (winningLine?.includes(index)) {
      return value === 'X' 
        ? 'bg-gradient-to-br from-[#E6A4B4] to-[#F4B8C5] border-[#D14D72]' 
        : 'bg-gradient-to-br from-[#B4C8EA] to-[#C5D5F4] border-[#4D77D1]';
    }
    return value === 'X'
      ? 'bg-gradient-to-br from-[#F8C8DC] to-[#FFD7E5] border-[#E6A4B4]'
      : 'bg-gradient-to-br from-[#D8E3F8] to-[#E5EEFF] border-[#B4C8EA]';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#FFF8DC] to-[#FFDAB9] p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 border-4 border-[#DEB887]/50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#8B4513]">Tic Tac Toe</h2>
          <div className="flex items-center gap-2">
            <span className="text-[#8B4513] text-sm">Games left: {remainingGames}</span>
            <button
              onClick={handleClose}
              className="text-[#8B4513] hover:text-[#A0522D] text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!isPlayerTurn || gameOver}
              className={`w-full aspect-square rounded-2xl border-4 flex items-center justify-center text-3xl font-bold 
                         transition-all duration-300 hover:scale-[1.02] hover:shadow-lg 
                         ${getCellBackground(index, cell)}
                         disabled:opacity-80 disabled:cursor-not-allowed`}
            >
              {cell && (
                <span className={`${cell === 'X' ? 'text-[#D14D72]' : 'text-[#4D77D1]'} drop-shadow-md`}>
                  {cell}
                </span>
              )}
            </button>
          ))}
        </div>

        {showPopup && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center animate-fadeIn">
            <div className="relative w-[90%] max-w-sm bg-gradient-to-br from-[#FFF8DC] to-[#FFDAB9] p-8 rounded-3xl border-4 border-[#DEB887] shadow-2xl">
              {/* Result Icon */}
              <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6
                            ${winner === 'X' 
                              ? 'bg-gradient-to-br from-[#F8C8DC] to-[#FFD7E5] border-4 border-[#E6A4B4]' 
                              : winner === 'O'
                                ? 'bg-gradient-to-br from-[#D8E3F8] to-[#E5EEFF] border-4 border-[#B4C8EA]'
                                : 'bg-gradient-to-br from-[#FFF5E1] to-[#FFE4BC] border-4 border-[#DEB887]'
                            }`}>
                {winner === 'X' ? (
                  <span className="text-4xl animate-bounce">🏆</span>
                ) : winner === 'O' ? (
                  <span className="text-4xl animate-bounce">😢</span>
                ) : (
                  <span className="text-4xl animate-bounce">🤝</span>
                )}
              </div>

              {/* Result Text */}
              <h3 className="text-2xl font-bold text-center mb-3 text-[#8B4513]">
                {winner === 'X' 
                  ? 'Congratulations! You Won!' 
                  : winner === 'O' 
                    ? 'You Lose!' 
                    : "It's a Draw!"}
              </h3>
              
              <p className="text-center text-[#A0522D] mb-6">
                {winner === 'X' 
                  ? '+20 BabyLiger Tokens!' 
                  : 'Better luck next time!'}
              </p>

              {/* Games Left Counter */}
              <p className="text-center text-[#8B4513] mb-6">
                Games left today: {remainingGames}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={resetGame}
                  disabled={remainingGames <= 0}
                  className={`flex-1 bg-gradient-to-r from-[#F8C8DC] to-[#FFD7E5] text-[#D14D72] font-bold 
                          py-3 px-6 rounded-xl border-4 border-[#E6A4B4] hover:shadow-lg
                          transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                          ${remainingGames <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Play Again
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 bg-gradient-to-r from-[#D8E3F8] to-[#E5EEFF] text-[#4D77D1] font-bold 
                          py-3 px-6 rounded-xl border-4 border-[#B4C8EA] hover:shadow-lg
                          transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
