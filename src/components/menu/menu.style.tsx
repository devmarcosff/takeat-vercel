import styled, { css } from "styled-components";
import { IconTakeatCart } from "takeat-design-system-ui-kit";
import { bounceDrop, CartFadeUp, cartUpdate } from "../theme/ThemeProviderWrapper";

export const CartUpdate = styled.div`
  ${({ }) => css`
    position: relative;
    animation: ${bounceDrop} .5s ease-in-out;
  `}
`;

export const MenuContainer = styled.div`
  ${({ }) => css`
    position: fixed;
    width: 100%;
    height: 7rem;
    z-index: 1500 !important;
    animation: ${CartFadeUp} ease-in-out .35s;
    `}
    `;

export const MenuTags = styled.div`
  ${({ theme }) => css`
  position: fixed;
  z-index: 20;
  bottom: 0;
  width: 100%;
  height: 64px;
  color: ${theme.colors.neutral.dark};
  background-color: ${theme.colors.neutral.white};
  font-weight: 600;
  border-top: 1px solid ${theme.colors.neutral.lighter};
  animation: ${CartFadeUp} ease-in-out .15s;
  `}
`;

export const CircleNotificationMenu = styled.div`
  ${({ theme }) => css`
    position: absolute;
    bottom: -4px;
    right: -8px;
    width: 20px;
    height: 20px;
    background-color: ${theme.colors.yellow.light};
    border-radius: 50%;
    display: flex;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    animation: ${cartUpdate} .8s ease-in-out;
  `}
`;

export const AnimationMenu = styled.div`
  ${({ theme }) => css`
    animation: ${bounceDrop} .8s ease-in-out;
    height: 46px;
    width: 100%;
    z-index: 4;
    position: fixed;
    bottom: 64px;
    color: #FFF;
    font-weight: 600;
    font-size: 18px;
    background-color: ${theme.colors.primary.default};
  `}
`;

export const NotificationMenuContainer = styled.div`
  ${({ }) => css`
    animation: ${bounceDrop} .5s ease-in-out;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 100%;
    font-size: 0.875rem;
    cursor: pointer;
  `}
`;

export const NotificationMenuInfo = styled.div`
  ${({ }) => css`
    animation: ${bounceDrop} .5s ease-in-out;
    display: flex;
    gap: 1rem;
    align-items: center;
  `}
`;

export const NotificationIconMenu = styled(IconTakeatCart)`
  ${({ theme }) => css`
    animation: ${bounceDrop} .5s ease-in-out;
    font-size: 1.875rem;
    fill: ${theme.colors.neutral.white};
  `}
`;