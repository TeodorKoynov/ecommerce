"use client";

import {createContext, useContext, useState, useEffect} from "react";
import {toast} from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        const totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
        const totalQuantities = JSON.parse(localStorage.getItem('totalQuantities'))

        setCartItems(cartItems?.length ? cartItems : []);
        setTotalPrice(totalPrice ? totalPrice : 0);
        setTotalQuantities(totalQuantities ? totalQuantities : 0);
    }, [])

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => {
            const updatedTotalPrice = prevTotalPrice + product.price * quantity;
            localStorage.setItem("totalPrice", JSON.stringify(updatedTotalPrice));
            return updatedTotalPrice;
        });

        setTotalQuantities((prevTotalQuantities) => {
            const updatedTotalQuantities = prevTotalQuantities + quantity;
            localStorage.setItem("totalQuantities", JSON.stringify(updatedTotalQuantities));
            return updatedTotalQuantities;
        });

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {...cartProduct, quantity: cartProduct.quantity + quantity}
                } else {
                    return cartProduct;
                }
            })
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            localStorage.setItem("cartItems", JSON.stringify([...cartItems, {...product}]))
            setCartItems([...cartItems, {...product}]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find(item => item._id === product._id);

        const newCartItems = cartItems.filter(item => item._id !== product._id);

        localStorage.setItem("cartItems", JSON.stringify(newCartItems))

        setTotalPrice((prevTotalPrice) => {
            const updatedTotalPrice = prevTotalPrice - foundProduct.price * foundProduct.quantity;
            localStorage.setItem("totalPrice", JSON.stringify(updatedTotalPrice));
            return updatedTotalPrice
        });
        setTotalQuantities((prevTotalQuantities) => {
            const updatedTotalQuantities = prevTotalQuantities - foundProduct.quantity
            localStorage.setItem("totalQuantities", JSON.stringify(updatedTotalQuantities));
            return updatedTotalQuantities;
        });
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = [...cartItems];
        [foundProduct] = newCartItems.splice(index, 1)

        localStorage.setItem("cartItems", JSON.stringify(newCartItems))

        if (value === 'inc') {
            newCartItems.splice(index, 0, {...foundProduct, quantity: foundProduct.quantity + 1})
            setCartItems([...newCartItems]);

            setTotalPrice((prevTotalPrice) => {
                const updatedTotalPrice = prevTotalPrice + foundProduct.price;
                localStorage.setItem("totalPrice", JSON.stringify(updatedTotalPrice));
                return updatedTotalPrice
            });
            setTotalQuantities((prevTotalQuantities) => {
                const updatedTotalQuantities = prevTotalQuantities + 1
                localStorage.setItem("totalQuantities", JSON.stringify(updatedTotalQuantities));
                return updatedTotalQuantities;
            });
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                newCartItems.splice(index, 0, {...foundProduct, quantity: foundProduct.quantity - 1})
                setCartItems([...newCartItems]);

                setTotalPrice((prevTotalPrice) => {
                    const updatedTotalPrice = prevTotalPrice - foundProduct.price;
                    localStorage.setItem("totalPrice", JSON.stringify(updatedTotalPrice));
                    return updatedTotalPrice
                });
                setTotalQuantities((prevTotalQuantities) => {
                    const updatedTotalQuantities = prevTotalQuantities - 1
                    localStorage.setItem("totalQuantities", JSON.stringify(updatedTotalQuantities));
                    return updatedTotalQuantities;
                });
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => prevQty - 1 < 1 ? 1 : prevQty - 1);
    }

    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            setCartItems,
            cartItems,
            setTotalPrice,
            totalPrice,
            setTotalQuantities,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            onRemove,
            toggleCartItemQuantity,
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);