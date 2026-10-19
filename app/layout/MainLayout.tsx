import { Outlet } from "react-router";

import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export default function MainLayout() {
  return <>
    <Navbar />
    <main id="main"><Outlet /></main>
    <Footer />
  </>;
}
