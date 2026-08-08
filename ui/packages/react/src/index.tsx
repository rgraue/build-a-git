import React from 'react';
import { createRoot } from "react-dom/client";
import {Root} from './root'

// quick reference for typings
export * from './root'

const root = document.getElementById("root")!;

createRoot(root).render(<Root/>)