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
    '#ecdb54',
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