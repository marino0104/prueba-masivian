import React, { Component } from 'react';
import comicService from '../services/comicService';

const starRate=[
  {
    position:1,
    rate:1
  },
  {
    position:2,
    rate:2
  },
  {
    position:3,
    rate:3
  },
  {
    position:4,
    rate:4
  },
  {
    position:5,
    rate:5
  }
]
export default class ComicItem extends Component {
  state = {
    lastPost: null,
    randomNumber: null,
    randomPost: {},
    rating:0
  };
  componentDidMount() {
    this.firstService();
  } 
  firstService=()=>{
    comicService.getLastPost().then(res=>{
      this.setState({
        lastPost:res.num,
        randomNumber:(Math.floor(Math.random() * (res.num - 1)) + 1)
      }, ()=>{
        this.getRandomItem();
      })
    })
  }
  getRandomItem=()=>{
    let {randomNumber}=this.state;
    comicService.getRamdomPost(randomNumber).then(res=>{
      this.setState({
        randomPost: res
      })
    })
  }
  handleRate=(rate)=>{
    let starList=document.querySelectorAll('.star-rate li');
    starList.forEach((starItem, i) => {
      starItem.classList.remove('rated');
      if(i<=(rate-1)){
        starItem.classList.add('rated');
      }
    });
    this.setState({
      rating:rate
    })
  }
  render() {
    let {
      randomPost,
      rating
    } = this.state;
    return (
      <div className="container">
        <h1>{randomPost.title}</h1>
        <img src={randomPost.img}/>
        <ul className="star-rate">
          {starRate.map(star=>(
            <li className="star" onClick={()=>this.handleRate(star.rate)}></li>
          )
          )}

        </ul>
        <p className="rate-text">Calificación: {rating} / {starRate.length}</p>
      </div>
    )
  }
}
