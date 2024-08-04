"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiAddCircleFill } from "@remixicon/react";
import { RiSubtractLine } from "@remixicon/react";
import { RiCloseLargeLine } from "@remixicon/react";

interface productType {
  id: number;
  title: string;
  price: number;
  category: string;
  quantity: number;
}

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<productType[]>([]);
  const [cartItem, setCartItem] = useState<productType[]>([]);

  const getData = async (url: string) => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        const { data } = res;
        return data;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    const data = await getData(`https://fakestoreapi.com/products`);
    const products = data.splice(0, 3).map((item: any) => {
      const obj: productType = {
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category,
        quantity: 1, // Default quantity value
      };
      return obj;
    });
    setProductList(products);
  };

  const handleAddToCart = (item: productType) => {
    const copyItem = [...cartItem];
    setCartItem([...copyItem, item]);
  };

  const handleQuantityChange = (item: productType, type: string) => {
    if (type === "increase") {
      const copyItem = [...cartItem];
      const updatedItem = copyItem.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      setCartItem(updatedItem);
    } else {
      if (item.quantity === 1) {
        const copyItem = [...cartItem];
        const updatedItem = copyItem.filter(
          (cartItem) => cartItem.id != item.id
        );
        setCartItem(updatedItem);
      } else {
        const copyItem = [...cartItem];
        const updatedItem = copyItem.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        });
        setCartItem(updatedItem);
      }
    }
  };

  const handleRemoveItem = (item: productType) => {
    const copyItem = [...cartItem];
    const updatedItem = copyItem.filter((cartItem) => cartItem.id != item.id);
    setCartItem(updatedItem);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="h-screen flex flex-col gap-4 items-center py-10">
      <h1 className="font-serif font-semibold text-3xl">Add Product</h1>
      <div className="grid grid-cols-3 gap-10 ">
        {loading ? (
          <span className="loading loading-bars loading-md text-center  "></span>
        ) : (
          <>
            {productList.map((item, i) => (
              <div className="card bg-base-100 w-80 shadow-xl" key={i}>
                <div className="card-body items-center gap-4">
                  <h2 className="card-title text-lg">{item.title}</h2>
                  <p className="font-semibold">{item.category}</p>
                  {/* card section */}
                  {cartItem.some((cartItem) => cartItem.id === item.id) ? (
                    <div className="flex gap-4 ">
                      {/* decrease button */}
                      <button
                        className="btn btn-primary"
                        onClick={() => handleQuantityChange(item, "decrease")}
                      >
                        <RiSubtractLine />
                      </button>

                      {/* count button */}
                      <button className="btn btn-primary font-bold text-xl ">
                        {
                          cartItem.find((cartItem) => cartItem.id === item.id)
                            ?.quantity
                        }
                      </button>
                      {/* increase button */}
                      <button
                        className="btn btn-primary"
                        onClick={() => handleQuantityChange(item, "increase")}
                      >
                        <RiAddCircleFill />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="card-actions justify-center"
                      onClick={() => handleAddToCart(item)}
                    >
                      <button className="btn btn-primary">AddToCart</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {cartItem.map((item, i) => (
        <div
          className="flex w-[76%]  items-center justify-between cursor-pointer"
          key={i}
        >
          <span className=" ">
            <RiCloseLargeLine onClick={() => handleRemoveItem(item)} />
          </span>
          <div className="font-semibold text-md w-[40%]  ">{item.title}</div>
          <div className="font-semibold text-md w-[20%]   ">
            {item.category}
          </div>
          <div className="font-bold text-xl   w-[10%] ">{item.price}</div>
          <div className="flex gap-2">
            <button className="btn btn-active btn-md">
              <RiSubtractLine
                onClick={() => handleQuantityChange(item, "decrease")}
              />
            </button>
            <button className="btn btn-active btn-md"> {item.quantity}</button>
            <button className="btn btn-active btn-md">
              <RiAddCircleFill
                onClick={() => handleQuantityChange(item, "increase")}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
