'use client';

import dynamic from 'next/dynamic';
import { Content } from '@/components/Content/Content';
import './index.css';
import { Route, Routes } from 'react-router';

const BrowserRouter = dynamic(
    () => import('react-router-dom').then((mod) => mod.BrowserRouter),
    { ssr: false }
);

export default function Home() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Content />} />
            </Routes>
        </BrowserRouter>
    );
};