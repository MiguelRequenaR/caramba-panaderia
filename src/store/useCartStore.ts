import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/schemas';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  total: number;
  // acciones para el carrito
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      total: 0,

      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          //en caso de que exista se aumenta la cantidad
          const updateCart = cart.map((item) => 
            item.id === product.id
              ? {...item, quantity: item.quantity + 1}
              : item
          );
          set({
            cart: updateCart,
            total: calculateTotal(updateCart),
          })
        } else {
          // si es nuevo se agrega con una cantidad de 1
          const updateCart = [...cart, {...product, quantity: 1}];
          set({
            cart: updateCart,
            total: calculateTotal(updateCart),
          })
        }
      },
      removeFromCart: (productId) => {
        const { cart } = get();
        const updateCart = cart.filter((item) => item.id !== productId);
        set({
          cart: updateCart,
          total: calculateTotal(updateCart),
        })
      },
      increaseQuantity: (productId) => {
        const { cart } = get();
        const updateCart = cart.map((item) => 
          item.id === productId
            ? {...item, quantity: item.quantity + 1}
            : item
        );
        set({
          cart: updateCart,
          total: calculateTotal(updateCart),
        })
      },
      decreaseQuantity: (productId) => {
        const { cart } = get();
        const updateCart = cart.map((item) =>{
          if (item.id === productId && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
          }
          return item;
        });
        set({
          cart: updateCart,
          total: calculateTotal(updateCart),
        })
      },
      clearCart: () => {
        set({
          cart: [],
          total: 0,
        })
      }
    }),
    {
      name: 'panaderia-storage',
    }
  )
);

// helper para calcular el total
const calculateTotal = (cart: CartItem[]) => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
