import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd());
  console.log("Current mode:", mode);
  // Farklı ortamlara göre base belirleme
const base = ((mode === "development") || (mode ==="production")) ? "/" : `/${mode}/`;
  return {
  plugins: [react(),tailwindcss()],
   assetsInclude: ['**/*.pdf'],
  base: base,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

    },
   
  },
  //   server: {
  //   port: 81,       // 🔹 Portu 80 olarak ayarla
  //   host: true      // 🔹 Dış erişim için (localhost dışı IP'den de erişebilmek için)
  // }
  build:{
    outDir:'dist/'+mode,
    emptyOutDir:false
  }
}});
