'use client';

import dynamic from 'next/dynamic';
import { Content } from '@/src/components/Content/Content';
import './index.css';
import { Route, Routes } from "react-router";
import { TaskPage } from "@/src/components/TaskPage/TaskPage";

const BrowserRouter = dynamic(
    () => import('react-router-dom').then((mod) => mod.BrowserRouter),
    { ssr: false }
);

export default function Home() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Content />} />
                <Route path='/tasks/DOC-0' element={<TaskPage />} />
            </Routes>
        </BrowserRouter>
    );
}