import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';

import Page from './view/Page';
import Page404 from './view/Page404';
import './sass/main.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(<React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Router basename='majka'>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Page page="homepage"/>} />
                    <Route path='game1' element={<Page page="game1"/>} />
                    <Route path='game2' element={<Page page="game2"/>} />
                    <Route path='game3' element={<Page page="game3"/>} />
                    <Route path='color' element={<Page page="color"/>} />
                    <Route path='finish' element={<Page page="homepage"/>} />
                </Route>
                <Route path="*"element={<Page404/>} />
            </Routes>
        </Router>
    </QueryClientProvider>
</React.StrictMode>);
