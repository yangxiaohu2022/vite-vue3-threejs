import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from "@vitejs/plugin-vue-jsx"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.ts', '.jsx', '.tsx', '.mjs', '.js', '.json']
  },
  alias: {
    "@": resolve(__dirname, 'src')
  },
  plugins: [Vue(), VueJsx()]
})
