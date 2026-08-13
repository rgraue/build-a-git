export * from './config'

import { BLOCK_COLORS } from "../constants";

export const getRandomColor = () => {
    const items = BLOCK_COLORS
    return items[Math.floor(Math.random() * items.length)];
}