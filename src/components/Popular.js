import { useEffect, useState } from "react"
import styled from "styled-components"

import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"

function Popular() {
  const [popular, setPopular] = useState([])

  useEffect(() => {
    getPopular()
  }, [])

  const getPopular = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
    )
    const data = await api.json()
    console.log(data.recipes)
    setPopular(data.recipes)
  }

  if (popular) {
    return (
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                </Card>
              </SplideSlide>
            )
          })}
        </Splide>
      </Wrapper>
    )
  }

  return <div></div>
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position:relative;
  img {
    border-radius: 2rem;
    overflow: hidden;
    position:absolute;
    left:0;
    width:100%;
    height:100%;
    object-fit:cover:
  }
  p{ 
    position:absolute;
    left:0;
    bottom:0; tranform:translate(-50%, 0)
    text-align:Center;
    font-weight:600;
    width:100%;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
`

export default Popular
