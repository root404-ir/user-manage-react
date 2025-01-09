import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),
    ],
    server: {
        port: 3000, // یا هر پورتی که قبلاً استفاده می‌کردید
    },
    build: {
        outDir: 'build', // تطابق با خروجی CRA
    },
});
