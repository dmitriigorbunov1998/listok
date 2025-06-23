'use client';

import { Content } from '@/src/components/Content';
import './index.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export default function Home() {
  return (
      <Router>
          <main>
              <Content />
          </main>
      </Router>
  );
}
