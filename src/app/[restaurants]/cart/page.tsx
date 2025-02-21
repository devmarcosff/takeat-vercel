"use client";
import { ICart } from "@/components/addProducts/addProducts.types";
import CheckoutComponents from "@/components/continue/continue.components";
import LoadingTakeat from "@/components/theme/loading.component";
import { TakeatApp } from "@/components/theme/ThemeProviderWrapper";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { RiSubtractLine } from "react-icons/ri";
import { formatPrice, IconArrowBack, IconPencilFilled, IconRoundChat } from "takeat-design-system-ui-kit";

interface Props {
  params: Promise<{ restaurants: string }>;
}

export default function ProductPage({ params }: Props) {
  const restaurant = React.use(params).restaurants;
  const [loading, setLoading] = useState(true);
  const [bag, setBag] = useState<ICart[]>([]);
  const [lastQuantities, setLastQuantities] = useState<Record<string, number>>({});
  const { back } = useRouter()
  const burger = "/assets/burger.svg";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const takeatBagKey = `@deliveryTakeat:${restaurant}TakeatBag`;
      const checkStorage = () => {
        const storedBag = localStorage.getItem(takeatBagKey);
        const parsedBag = storedBag ? JSON.parse(storedBag)?.products || [] : [];

        setBag((prevBag) => {
          if (JSON.stringify(prevBag) !== JSON.stringify(parsedBag)) {
            return parsedBag;
          }
          return prevBag;
        });
        setLoading(false);
      };

      const interval = setInterval(checkStorage, 500);
      return () => clearInterval(interval);
    }
  }, [restaurant]);

  const updateQuantity = ({ index, newQuantity }: { index: number, newQuantity: number }) => {
    setBag((prevBag) => {
      const updatedBag = prevBag.map((item, i) => {
        if (i === index) {
          const updatedQuantity = item.qtd + newQuantity;
          setLastQuantities((prevLast) => ({ ...prevLast, [index]: item.qtd }));
          return { ...item, qtd: updatedQuantity <= 0 ? 0 : updatedQuantity };
        }
        return item;
      }).filter(item => item.qtd > 0);

      const takeatBagKey = `@deliveryTakeat:${restaurant}TakeatBag`;
      const storedCart = localStorage.getItem(takeatBagKey);
      const existingCart = storedCart ? JSON.parse(storedCart) : { products: [] };

      const updatedStorageCart = {
        ...existingCart,
        products: updatedBag,
      };

      // setTest(prevBag.reduce((acc, item) => acc + (item.price * (item.qtd || 1)), 0))

      localStorage.setItem(takeatBagKey, JSON.stringify(updatedStorageCart));

      return updatedBag;
    });
  };

  if (loading) return <LoadingTakeat />

  return (
    <div className="p-3">
      <div className="flex gap-3 items-center">
        <button onClick={() => back()}>
          <IconArrowBack style={{ fill: 'red', fontSize: 28 }} />
        </button>
        <h2 className="font-semibold text-xl text-takeat-neutral-darker">Carrinho</h2>
      </div>

      {
        bag.length > 0 ? (
          <div>
            <div className="pt-3 divide-y pb-44">
              <h2 className="text-md font-semibold py-1">Itens</h2>
              {
                (
                  bag.map((item: ICart, index: number) => {
                    const quantity = item.qtd;
                    const lastQuantity = lastQuantities[index];

                    console.log(item.complements)

                    return (
                      <TakeatApp key={index}>
                        <div className="py-3">
                          <div className="flex gap-3">
                            <div className="flex items-center flex-col gap-1 w-full max-w-28">
                              <div className="w-28">
                                <Image src={burger} width={112} height={112} alt="test" className="w-full rounded-lg shadow-md" />
                              </div>
                              <span className="text-takeat-primary-default font-semibold flex items-center justify-center gap-1 w-full"><IconPencilFilled className="fill-takeat-primary-default text-lg" /> Editar</span>
                            </div>

                            <div className="flex-initial w-full">
                              <h3 className="font-semibold text-lg">{item.name}</h3>

                              <div className="flex justify-between items-center mt-2 font-semibold">
                                <AnimatePresence mode="popLayout">
                                  <motion.span
                                    key={item.price * quantity}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: "backInOut" }}
                                  >
                                    {formatPrice(item.price * quantity)}
                                  </motion.span>
                                </AnimatePresence>


                                <div className="flex items-center gap-1">
                                  <button
                                    className={`w-7 h-7 flex items-center justify-center text-takeat-primary-default rounded-full font-bold text-lg transition-all `}
                                    onClick={() => updateQuantity({ index, newQuantity: -1 })}
                                  >
                                    {quantity === 1 ? <FaTrashAlt className="text-md" /> : <RiSubtractLine className="text-md" />}
                                  </button>

                                  <div className="relative rounded-full w-5 h-5 flex items-center justify-center overflow-hidden">
                                    <AnimatePresence mode="popLayout">
                                      <motion.span
                                        key={quantity}
                                        initial={{ y: quantity > lastQuantity ? -20 : 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: lastQuantity > quantity ? 20 : -20, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "backInOut" }}
                                        style={{ position: "absolute", fontSize: "16px", fontWeight: 600 }}
                                      >
                                        {quantity}
                                      </motion.span>
                                    </AnimatePresence>
                                  </div>

                                  <button
                                    className={`w-7 h-7 flex items-center justify-center text-white bg-takeat-primary-default rounded-full font-bold text-lg`}
                                    onClick={() => updateQuantity({ index, newQuantity: 1 })}
                                  >
                                    <FiPlus className="text-xs" />
                                  </button>
                                </div>
                              </div>

                              {
                                item.observation.length > 0 && (
                                  <div className="flex justify-between items-center my-2">
                                    <span className="flex gap-1 text-sm"><IconRoundChat className="fill-takeat-orange-default text-lg" /> {item.observation}</span>
                                  </div>
                                )
                              }

                              <div className="flex flex-wrap w-full gap-1">
                                {
                                  item.complements.map((item, index) => {
                                    return (
                                      <span key={index} className="px-2 bg-takeat-neutral-lighter rounded-full text-xs font-medium">{item.name}</span>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </TakeatApp>
                    )
                  }
                  )
                )
              }
            </div>
          </div>
        )
          : <div className="flex items-center justify-center w-full pt-8"><h2>Carrinho vazio</h2></div>
      }

      <CheckoutComponents params={restaurant} />
    </div>
  );
}