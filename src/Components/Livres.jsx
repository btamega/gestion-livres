import { useEffect, useState } from "react"
import axios from 'axios';
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "./bootstrap.min.css";
import { addToCart } from "./commande/addToCart";


function Books() {
    
    const [books,setBooks] = useState([]);
    const [count,setCount] = useState([0]);
        useEffect(()=>{
           
            const fetchAllBooks = async () =>{
                try {
                    
                    const result = await axios.get("http://localhost:3001/api/books")
                    .then((res) => {
                        setBooks(result.data);
                     })
                } catch (error) {
                    window.alert(error);
                }
            }
            fetchAllBooks()
        },[]
        );
        function handleButtonAddCart(event) {
            event.preventDefault();
            //  Au click de ce bouton, on incrémente le compteur qui correspond à la quantité
            count++;
            setCount(count);
            addToCart(books,count);
        }
    return(
        
       
        <div className="books">
        {
            books.map((book,index)=>(
                
                <div className="container" key={book.id+index}>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">#Id</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Prix</th>
                            <th scope="col">Description</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Couverture</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">{book.id}</th>
                            <td>{book.titre}</td>
                            <td>${book.prix}</td>
                            <td>{book.description}</td>
                            <td>{book.genre}</td>
                            <td>
                                 <img src={book.cover} className="img-fluid" alt="not found"></img>
                            </td>
                            <p>
                                <button onClick={handleButtonAddCart}
                                  data-itemID={book.id}
                                  data-item-titre ={book.titre}
                                  data-item-prix ={book.prix}
                                  data-item-genre ={book.genre}
                                  data-item-description ={book.description}
                                >
                                    Add to Cart
                                </button>
                            </p >
                            </tr>
                        </tbody>
                        </table>
                </div>
            ))
        }
    </div>
        
    )
}

export default Books;