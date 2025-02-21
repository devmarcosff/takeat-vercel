import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { formatPrice, IconChevronRight, IconTicketFilled } from 'takeat-design-system-ui-kit';
import { ActionProducts, AddProductsContainer, AddProductsPriceInfoItem, AddProductsPriceItem, AddProductsQuantity, ButtonProductsDiscount, ProductsDiscount, ProductsDiscountContainer, ProductsDiscountText, SelectAddProducts, TextAddProductsQuantity } from '../addProducts/addProducts.style';
import { ICart } from '../addProducts/addProducts.types';

interface Props {
  params: string
}

export default function ContinueComponents({ params }: Props) {
  const takeatBagKey = `@deliveryTakeat:${params}TakeatBag`;
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const updateStorageData = () => {
    const storedBag = localStorage.getItem(takeatBagKey);
    const parsedBag = storedBag ? JSON.parse(storedBag)?.products || [] : [];

    const total = parsedBag.reduce((acc: number, item: ICart) => acc + (item.price * item.qtd), 0);
    setTotalPrice(total);
  };

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
  }, [params]);

  return (
    <AddProductsContainer flex_direction={"column"} height={180}>
      <AddProductsPriceItem>
        <AddProductsPriceInfoItem>
          <span>Total:</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={totalPrice}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "backInOut" }}
            >
              {formatPrice(totalPrice)}
            </motion.span>
          </AnimatePresence>
        </AddProductsPriceInfoItem>
      </AddProductsPriceItem>
      <ProductsDiscount>
        <ButtonProductsDiscount onClick={() => alert("Desconto inesistente!!!")}>
          <ProductsDiscountContainer>
            <IconTicketFilled className="fill-takeat-neutral-dark text-2xl" />
            <ProductsDiscountText>Adicionar desconto</ProductsDiscountText>
          </ProductsDiscountContainer>
          <IconChevronRight className="fill-takeat-neutral-dark text-lg" />
        </ButtonProductsDiscount>
      </ProductsDiscount>
      <ActionProducts>
        <SelectAddProducts style={{ height: 48 }}>
          <button onClick={() => localStorage.removeItem(takeatBagKey)}>
            <span className='text-takeat-primary-default font-semibold'>Limpar</span>
          </button>
        </SelectAddProducts>
        <AddProductsQuantity style={{ height: 48 }}>
          <TextAddProductsQuantity onClick={() => console.log('Teste')}>
            Continuar Pedido
          </TextAddProductsQuantity>
        </AddProductsQuantity>
      </ActionProducts>
    </AddProductsContainer>
  )
}
