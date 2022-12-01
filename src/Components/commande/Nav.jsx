
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addToCart } from "./addToCart";

function Nav() {
    const [cart, setCart] = useState()
    useEffect(() => {
        commerce.cart.retrieve()
            .then(res => {
                setCart(res)
            })
    },[])

    return (
        <nav className={styles.nav} cart={cart} emptyCart={emptyCart}>
            <Container className={styles.navContainer}>
                <p className={styles.title}>
                    <Link href="/">
                        <a>Book Store</a>
                    </Link>
                </p>
                <p className={styles.description}>
                    <a
                        className="snipcart-checkout snipcart-summary"
                        href="#"
                        style={{ textDecoration: "none" }}
                    >
                        <FaShoppingCart />
                        <strong className="sr-only">Cart</strong>
                        <span className="snipcart-total-price">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "MAD",
                            }).format(total)}
                        </span>
                    </a>
                    <ProductContainer 
                        addToCart={addToCart} 
                    />
                </p>
            </Container>
        </nav>
    );
}
​
export default Nav;