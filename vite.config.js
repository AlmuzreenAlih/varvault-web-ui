import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // hmr:false,
    host: true,
    port: Number(process.env.PORT),
    base: '/reactor/',
  },
  define: {
    'process.env.PORT': `${process.env.PORT}`,
    'process.env.KEY': `"${process.env.KEY}"`,
    'process.env.HOST_ADDRESS': `"${process.env.HOST_ADDRESS}"`,
  },
})
