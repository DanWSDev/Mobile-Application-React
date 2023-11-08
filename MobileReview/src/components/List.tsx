import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from 'react-router-dom';                   // Libraries 
import Review from "./Review";
import { gameVar } from "./global"

import { gmimage } from "./global"


export type Game = {
    id: number;
    gameName: string;
    gamePrice: number;
    gameDes: string;
    avgRating: number;
    numofReviews: number;                               // Game Object parameters 
    gameImage: string;
    gameid : number;
};


   


    


function List() {

function handler(avgrevs:number,reviews:number, gameid:number,gname:string,gimg:string){
 
    gameVar[1]=avgrevs;
    gameVar[0]=reviews;
    gameVar[2]=gameid ;                 // passing current game values to review 
    gmimage[0] = gimg;
}




    const [games, setGames] = useState<Game[] | null>();
    useEffect(() => {
        const url = 'http://dan-project.ddns.net:8080/games';
        axios.get(url).then(async (res) => {                        // getting the data 
         setGames(res.data);    
        });
    }, []);

    const [selectedgame, setSelectedgame]= useState(-1);
      
  return (
    <>

    <h1>Select Game to Review </h1>

        <ul className="list-group mx-auto text-center" style={{ maxWidth: "35" }}>
            {games?.map((game, index) => (
                <li
                    className={selectedgame === index ? 'list-group-item active' : 'list-group-item'}
                    key={game.id}
                    onClick={() => { setSelectedgame(index) }}
                >
                    <h2>{game.gameName}</h2>
                    <p>{game.gameDes}</p>
                    <p>{game.gamePrice}</p>
                    <p>{game.avgRating + " Stars"}</p>
                    <p>{game.numofReviews + " Reviews"}</p>
                    <div>                  
                    <Link to="/Review"><button onClick={() => handler(game.avgRating,game.numofReviews,game.gameid,game.gameName,game.gameImage)}>Review this Game</button></Link>
                   
                    </div>                 
                   
                </li>
            ))}
        </ul>
    </>
);

}

export default List;





