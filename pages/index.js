import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";

export default function App() {
  const [options, setOptions] = useState(null)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    const json = localStorage.getItem('memorygamehighscore')
    const savedScore = JSON.parse(json)
    if (savedScore) {
      setHighScore(savedScore)
    }
  }, [])

  return (
    <div>
      <div className="container">
        <h1>Jogo da Memória</h1>
        <div>Maior Pontuação: {highScore}</div>
        <div>
          {options === null ? (
            <>
              <button onClick={() => setOptions(6)}>Fácil</button>
              <button onClick={() => setOptions(10)}>Médio</button>
              <button onClick={() => setOptions(16)}>Difícil</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  const prevOptions = options
                  setOptions(null)
                  setTimeout(() => {
                    setOptions(prevOptions)
                  }, 5)
                }}
              >
                Reiniciar
              </button>
              <button onClick={() => setOptions(null)}>Menu</button>
            </>
          )}
        </div>
      </div>
      <style jsx global>
  {`
    body {
      text-align: center;
      font-family: -apple-system, sans-serif;
    }
    .container {
      width: 1060px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    button {
      background: #00ad9f;
      border-radius: 4px;
      font-weight: 700;
      color: #fff;
      border: none;
      padding: 7px 15px;
      margin-left: 8px;
      cursor: pointer;
    }
    button:hover {
      background: #008378;
    }
    button:focus {
      outline: 0;
    }
    #cards {
      width: 1060px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
    }
    .card {
      width: 160px;
      height: 160px;
      margin-bottom: 20px;
    }
    .card:not(:nth-child(6n)) {
      margin-right: 20px;
    }

    .c {
      position: absolute;
      max-width: 160px;
      max-height: 160px;
      width: 50ch;
      height: 50ch;
      cursor: pointer;
      will-change: transform, opacity;
    }

    .front,
    .back {
      background-size: cover;
    }

    .back {
      background-image: url(data:image/jpeg;base64,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);
    }

    .front {
      background-image: url(https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop);
    }
  `}
</style>

      {options ? (
        <MemoryGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <h2>Escolha uma dificuldade!</h2>
      )}
    </div>
  )
}

function MemoryGame({options, setOptions, highScore, setHighScore}) {
  const [game, setGame] = useState([])
  const [flippedCount, setFlippedCount] = useState(0)
  const [flippedIndexes, setFlippedIndexes] = useState([])

  const colors = [
    'url(data:image/png;base64,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)',
    '#e34132',
    '#944743',
    '#dbb2d1',
    '#ec9787',
    '#00a68c',
    '#645394',
    '#6c4f3d',
    '#ebe1df',
    '#bc6ca7',
    '#bfd833',
  ]

  useEffect(() => {
    const newGame = []
    for (let i = 0; i < options / 2; i++) {
      const firstOption = {
        id: 2 * i,
        colorId: i,
        color: colors[i],
        flipped: false,
      }
      const secondOption = {
        id: 2 * i + 1,
        colorId: i,
        color: colors[i],
        flipped: false,
      }

      newGame.push(firstOption)
      newGame.push(secondOption)
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5)
    setGame(shuffledGame)
  }, [])

  useEffect(() => {
    const finished = !game.some(card => !card.flipped)
    if (finished && game.length > 0) {
      setTimeout(() => {
        const bestPossible = game.length
        let multiplier
  
        if (options === 6) {
          multiplier = 1
        } else if (options === 10) {
          multiplier = 2.5
        } else if (options === 16) {
          multiplier = 1
        }
  
        const pointsLost = multiplier * (0.66 * flippedCount - bestPossible)
  
        let score
        if (pointsLost < 100) {
          score = 100 - pointsLost
        } else {
          score = 0
        }
  
        if (score > highScore) {
          setHighScore(score)
          const json = JSON.stringify(score)
          localStorage.setItem('memorygamehighscore', json)
        }
  
        const newGame = confirm('Você ganhou! Pontuação: ' + score + '! Novo Jogo?')
        if (newGame) {
          const gameLength = game.length
          setOptions(null)
          setTimeout(() => {
            setOptions(gameLength)
          }, 5)
        } else {
          setOptions(null)
        }
      }, 500)
    }
  }, [game])

  if (flippedIndexes.length === 2) {
    const match = game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId
  
    if (match) {
      const newGame = [...game]
      newGame[flippedIndexes[0]].flipped = true
      newGame[flippedIndexes[1]].flipped = true
      setGame(newGame)
  
      const newIndexes = [...flippedIndexes]
      newIndexes.push(false)
      setFlippedIndexes(newIndexes)
    } else {
      const newIndexes = [...flippedIndexes]
      newIndexes.push(true)
      setFlippedIndexes(newIndexes)
    }
  }

  if (game.length === 0) return <div>loading...</div>
  else {
    return (
      <div id="cards">
        {game.map((card, index) => (
          <div className="card" key={index}>
            <Card
              id={index}
              color={card.color}
              game={game}
              flippedCount={flippedCount}
              setFlippedCount={setFlippedCount}
              flippedIndexes={flippedIndexes}
              setFlippedIndexes={setFlippedIndexes}
            />
          </div>
        ))}
      </div>
    )
  }
}

function Card({
  id,
  color,
  game,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
}) {
  const [flipped, set] = useState(false)
  const {transform, opacity} = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: {mass: 5, tension: 500, friction: 80},
  })

  useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        set(state => !state)
        setFlippedCount(flippedCount + 1)
        setFlippedIndexes([])
      }, 1000)
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedCount(flippedCount + 1)
      setFlippedIndexes([])
    }
  }, [flippedIndexes])

  const onCardClick = () => {
    if (!game[id].flipped && flippedCount % 3 === 0) {
      set(state => !state)
      setFlippedCount(flippedCount + 1)
      const newIndexes = [...flippedIndexes]
      newIndexes.push(id)
      setFlippedIndexes(newIndexes)
    } else if (
      flippedCount % 3 === 1 &&
      !game[id].flipped &&
      flippedIndexes.indexOf(id) < 0
    ) {
      set(state => !state)
      setFlippedCount(flippedCount + 1)
      const newIndexes = [...flippedIndexes]
      newIndexes.push(id)
      setFlippedIndexes(newIndexes)
    }
  }

  return (
    <div onClick={onCardClick}>
      <a.div
        className="c back"
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      />
      <a.div
        className="c front"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          background: color,
        }}
      />
    </div>
  )
}