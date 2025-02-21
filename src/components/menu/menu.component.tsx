"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { FaClipboardCheck } from "react-icons/fa";
import { HiMiniPercentBadge } from "react-icons/hi2";
import { formatPrice, IconHomeFilled } from "takeat-design-system-ui-kit";
import { ICart } from "../addProducts/addProducts.types";
import { AnimationMenu, CartUpdate, CircleNotificationMenu, MenuContainer, MenuTags, NotificationIconMenu, NotificationMenuContainer, NotificationMenuInfo } from "./menu.style";

const tagMenu = [
  {
    id: 1,
    tag: "Início",
    href: "/",
    icon: <IconHomeFilled className="fill-takeat-primary-default" />,
    color: 'red'
  },
  {
    id: 2,
    tag: "Promoções",
    href: "/promocao",
    icon: <BsTicketPerforatedFill />,
    color: 'red'
  },
  {
    id: 3,
    tag: "Descontos",
    href: "/descontos",
    icon: <HiMiniPercentBadge />,
    color: 'red'
  },
  {
    id: 4,
    tag: "Pedidos",
    href: "/pedidos",
    icon: <FaClipboardCheck />,
    color: 'red'
  },
]

interface Props {
  params: string
}

export default function MenuComponent({ params }: Props) {
  const takeatBagKey = `@deliveryTakeat:${params}TakeatBag`;
  const { push } = useRouter()
  const [cart, setCart] = useState(0)
  const [qtd, setQtd] = useState(0)

  // useEffect(() => {
  //   const takeatBagKey = `@deliveryTakeat:${params}TakeatBag`;
  //   const storedBag = localStorage.getItem(takeatBagKey);
  //   const parsedBag = storedBag ? JSON.parse(storedBag)?.products || [] : [];

  //   const total = parsedBag.reduce((acc: number, item: ICart) => acc + (item.price * item.qtd), 0);
  //   const qtd = parsedBag.reduce((acc: number, item: ICart) => acc + (item.qtd), 0);

  //   setCart(total)
  //   setQtd(qtd)
  // }, [])

  // useCallback evita re-renderizações desnecessárias
  const updateStorageData = useCallback(() => {
    const storedBag = localStorage.getItem(takeatBagKey);
    const parsedBag = storedBag ? JSON.parse(storedBag)?.products || [] : [];

    const total = parsedBag.reduce((acc: number, item: ICart) => acc + (item.price * item.qtd), 0);
    const qtd = parsedBag.reduce((acc: number, item: ICart) => acc + (item.qtd), 0);
    setCart(total);
    setQtd(qtd)
  }, [takeatBagKey]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      updateStorageData();

      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === takeatBagKey) {
          updateStorageData();
        }
      };

      window.addEventListener("storage", handleStorageChange);

      const interval = setInterval(() => {
        updateStorageData();
      }, 500);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        clearInterval(interval);
      };
    }
  }, [takeatBagKey, updateStorageData]); // ✅ Correção aplicada

  return (
    <MenuContainer>
      {
        qtd > 0 && (
          <AnimationMenu>
            <NotificationMenuContainer onClick={() => push(`/${params}/cart`)}>
              <NotificationMenuInfo>
                <CartUpdate>
                  <NotificationIconMenu />
                  <CircleNotificationMenu>{qtd}</CircleNotificationMenu>
                </CartUpdate>
                <span>Fazer Pedido</span>
              </NotificationMenuInfo>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={cart}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "backInOut" }}
                >
                  {formatPrice(cart)}
                </motion.span>
              </AnimatePresence>
            </NotificationMenuContainer>
          </AnimationMenu>
        )
      }

      <MenuTags>
        <ul className="flex w-full h-full items-center justify-evenly">
          {
            tagMenu.map((item) => {
              return (
                <li key={item.id}>
                  <button className="flex flex-col items-center justify-center" onClick={() => push(`/${params}`)}>
                    <span>{item.icon}</span>
                    <span
                      className={`
                        ${params === 'foodies' && 'text-takeat-primary-default'}`}
                    >{item.tag}</span>
                  </button>
                </li>
              )
            })
          }
        </ul>
      </MenuTags>
    </MenuContainer>
  )
}
