import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/investment-dashboard1.0/",
  plugins: [react()],
});
