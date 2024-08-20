import { useState } from 'react';
import Header from './components/Header.jsx';
import Guitar from './components/Guitar.jsx';
import { db } from './data/db.js';

function App() {

    const [data, setData] = useState(db);
    const [cart, setCart] = useState([]);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    function addToCart(item){
        //check if the item already exists in the cart
        const itemExists = cart.findIndex( guitar => guitar.id === item.id );

        //increment one to an existing item in the cart
        if( itemExists >= 0 ){

            //Check that there are no more items of a guitar than the allowed limit
            if(cart[itemExists].quantity >= MAX_ITEMS) return;

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
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }

            return item;
        });

        setCart(updatedCart);
    }

    function decreaseQuantity(id){
        const updatedCart = cart.map( item =>{
            if(item.id === id && item.quantity > MIN_ITEMS){
                return{
                    ...item,
                    quantity: item.quantity - 1
                }
            }

            return item;
        })

        setCart(updatedCart);
    }

    function clearCart(){
        setCart([]);
    }

    return (
        <>
            <Header 
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
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