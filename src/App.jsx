import { useState } from 'react';
import Header from './components/Header.jsx';
import Guitar from './components/Guitar.jsx';
import { db } from './data/db.js';

function App() {

    const [data, setData] = useState(db);
    const [cart, setCart] = useState([]);

    function addToCart(item){
        //check if the item already exists in the cart
        const itemExists = cart.findIndex( guitar => guitar.id === item.id );

        //Add a new item to cart
        if( itemExists >= 0 ){

            const updatedCart = [...cart];
            updatedCart[itemExists].quantity++
            setCart(updatedCart);
        } else {

            item.quantity = 1;
            setCart( prevState => [...prevState, item] );
        }
    }

    function removeFromCart( id ){
        setCart( prevState => prevState.filter( item => item.id !== id ) );
    }

    function increaseQuantity(id){
        console.log('incrementando', id);
    }

    return (
        <>
            <Header 
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitar 
                            key={guitar.id}
                            guitar={guitar}
                            setCart={setCart}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App