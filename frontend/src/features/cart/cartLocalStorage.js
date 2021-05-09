
// Helper methods for storing and retrieving cart state in the browsers local storage.
// This allows us to persist the cart state between page reloads.
export const loadCart = () => {
    try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart === null) {
            return undefined;
        } else {
            return JSON.parse(storedCart);
        }
    } catch (err) {
        return undefined;
    }
};

export const saveCart = (cart) => {
    try {
        const jsonCart = JSON.stringify(cart);
        localStorage.setItem('cart', jsonCart);
    } catch (err) {

    }
};