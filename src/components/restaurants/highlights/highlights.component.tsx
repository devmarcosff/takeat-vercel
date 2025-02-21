import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { formatPrice } from "takeat-design-system-ui-kit";
import {
  CarouselContainer,
  CarouselViewport,
  CarouselWrapper,
  HighlightCard,
  HighlightContent,
  HighlightDescription,
  HighlightImage,
  HighlightImageContainer,
  HighlightName,
  HighlightsContainer,
  HighlightsTitle,
  NewPrice,
  OldPrice,
  PriceContainer,
} from "./highlights.style";

const highlights = [
  {
    id: 1,
    name: "Double Bacon Burger",
    description: "Pão, hambúrguer, queijo, bacon, alface, tomate, maionese e ketchup",
    image: "https://s3-alpha-sig.figma.com/img/0ddc/d5a7/67b96d4b87147d7838d2b936745eaadf?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uJWEGaAd1mvNhB~VrIxn2GFFTSwChOp4fyGCk9r7ZCcnB8YkSvxBx53t7MuoH9DPH2~RMIcpSdRXqtmm7MdO6ii2LE-sSDKnvSpoT8urHWgJgwrIxNtku1foyFF3suyGyey8p3J~agCX0VKGGnbBXlNu4Zcvzk25Q7f340Dqlgdid4UgkZK0qNHHxDLdpphNMkBMVaFY3nYogCGCKD3dgGwk7rUnLY73ct4eMs8M6bYJw5RdKLFTFcKVVp8X1FG2Si0EgaIOXtgA48K7YxFavKYDk5o1sgZFpRxR-YXJBdyweNaeruQMfcQ0JRqWKXQyr3E325X9KYIv-XujsjV5~w__",
    price: 38.0,
    newPrice: 22.99,
  },
  {
    id: 2,
    name: "Combo que mata a sua fome",
    description: "Pão, hambúrguer, queijo, bacon, alface, tomate, maionese e ketchup, batata frita e refrigerante",
    image: "https://s3-alpha-sig.figma.com/img/5c36/2831/d6efa60f93a2496d803cee740a8d2dc6?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fW5nVs7Xat4rCakEaLXHh2mO1CYXSCka3d~kfMpYdYgFAphepQvppA9qGuAqDTsZ4jYKKlwT-~qaoBTxjK-zR5kj9Rpha~3Gy6Cx~3Ai-1H8pHWsMxfvesR2aOtn7~S7wxADE16vTNHonHpxQA-bONO-~eSejGayL2aDATdla3Glk~-7hpvv4LTJWKNg5SJsgkz9rAe3U-0yEZcNyhzOaor1hv8R7VaNEd4hlB~xcSkS8ihL-Df1Ca57WsmJyf~xzunNHywXVgMrfltvghBh89G7SKBRfWXBeDq2je0SPHYxqrGedQjQH07mDkQTTz4AKOx9HYFcgZ7ft4zngkBpIw__",
    price: 70.0,
    newPrice: 54.0,
  },
  {
    id: 3,
    name: "Burger de frango",
    description: "Pão, hambúrguer de frango, queijo, alface, tomate, maionese e ketchup",
    image: "https://s3-alpha-sig.figma.com/img/0ddc/d5a7/67b96d4b87147d7838d2b936745eaadf?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uJWEGaAd1mvNhB~VrIxn2GFFTSwChOp4fyGCk9r7ZCcnB8YkSvxBx53t7MuoH9DPH2~RMIcpSdRXqtmm7MdO6ii2LE-sSDKnvSpoT8urHWgJgwrIxNtku1foyFF3suyGyey8p3J~agCX0VKGGnbBXlNu4Zcvzk25Q7f340Dqlgdid4UgkZK0qNHHxDLdpphNMkBMVaFY3nYogCGCKD3dgGwk7rUnLY73ct4eMs8M6bYJw5RdKLFTFcKVVp8X1FG2Si0EgaIOXtgA48K7YxFavKYDk5o1sgZFpRxR-YXJBdyweNaeruQMfcQ0JRqWKXQyr3E325X9KYIv-XujsjV5~w__",
    price: 144.5,
    newPrice: 98.0,
  },
];

export default function HighlightsRestaurant() {
  const OPTIONS: EmblaOptionsType = {
    align: "start",
    loop: false,
    dragFree: false,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  };
  const [emblaRef] = useEmblaCarousel(OPTIONS, [Autoplay()]);

  return (
    <HighlightsContainer>
      <HighlightsTitle>Destaques</HighlightsTitle>
      <CarouselWrapper>
        <CarouselViewport ref={emblaRef}>
          <CarouselContainer>
            {highlights.map((item) => (
              <Link href={`#${item.id}`} onClick={() => alert(item.id)} key={item.id}>
                <HighlightCard>
                  <h2></h2>
                  <HighlightImageContainer>
                    <HighlightImage src={item.image} width={150} height={150} alt={item.name} />
                  </HighlightImageContainer>
                  <HighlightContent>
                    <HighlightName>{item.name}</HighlightName>
                    <HighlightDescription>{item.description}</HighlightDescription>
                  </HighlightContent>
                  <PriceContainer>
                    <NewPrice>{formatPrice(item.newPrice)}</NewPrice>
                    <OldPrice>{formatPrice(item.price)}</OldPrice>
                  </PriceContainer>
                </HighlightCard>
              </Link>
            ))}
          </CarouselContainer>
        </CarouselViewport>
      </CarouselWrapper>
    </HighlightsContainer>
  );
}
