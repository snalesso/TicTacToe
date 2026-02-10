import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import { inlineThrow } from './core/utils.ts';
import './main.scss';

const root = document.getElementById('root') ?? inlineThrow(() => new Error(`Root element not found.`));
createRoot(root).render(<App />);