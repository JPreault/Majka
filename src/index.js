import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';

import Login from './view/Homepage';
import Page404 from './view/Page404';
import './sass/main.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(<React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Login page='login'/>} />
                    <Route path='game1' element={<Login page='forgotPassword'/>} />
                    <Route path='game2' element={<Login page='mobileLogin'/>} />
                    <Route path='game3' element={<Login page='newPassword'/>} />
                    <Route path='game4' element={<Login page='newPassword'/>} />
                    <Route path='config' element={<Login page='newPassword'/>} />
                    <Route path='finish' element={<Login page='newPassword'/>} />
                    <Route path="*"element={<Page404/>} />
                </Route>
            </Routes>
        </Router>
    </QueryClientProvider>
</React.StrictMode>);

/* <ReactQueryDevtools initialIsOpen={false} /> */
