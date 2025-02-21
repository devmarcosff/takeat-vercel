"use client";
import MenuComponent from "@/components/menu/menu.component";
import HeaderComponent from "@/components/restaurants/header/header.components";
import HighlightsRestaurant from "@/components/restaurants/highlights/highlights.component";
import ProductsRestaurant from "@/components/restaurants/product/products.component";
import LoadingTakeat from "@/components/theme/loading.component";
import { TakeatApp, TakeatPage } from "@/components/theme/ThemeProviderWrapper";
import { api_categories_delivery, api_delivery } from "@/utils/apis";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  params: Promise<{ restaurants: string }>;
}

export default function Home({ params }: Props) {
  const restaurant = React.use(params)?.restaurants;
  const [getRestaurants, setGetRestaurants] = useState(null);
  const [getCategories, setGetCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!restaurant) return;

    const fetchRestaurant = async () => {
      try {
        const res = await api_delivery.get(`/${restaurant}`);
        setGetRestaurants(res.data);

        api_categories_delivery.get(`/${res.data.id}?gd=true`)
          .then((res) => {
            setGetCategories(res.data);

            // setTimeout(() => {
            //   setLoading(false);
            // }, 1500)
          })
          .catch(() => console.log('Restaurante não encontrado'));
      } catch (error) {
        alert('Restaurante não encontrado');
        console.log(error)
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    };
    fetchRestaurant();
  }, [restaurant, router]);

  useEffect(() => {
    if (getRestaurants && getCategories.length > 0) {
      setLoading(false);
    }
  }, [getRestaurants, getCategories]);

  if (loading) return <LoadingTakeat />

  return (
    <>
      <TakeatApp>
        <HeaderComponent restaurant={getRestaurants} categories={getCategories} />
        <div>
          <HighlightsRestaurant />
          <ProductsRestaurant params={restaurant} categories={getCategories} />
        </div>
      </TakeatApp>

      <TakeatPage>
        <MenuComponent params={restaurant} />
      </TakeatPage>
    </>
  );
}