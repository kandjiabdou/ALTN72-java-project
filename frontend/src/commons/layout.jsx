/* eslint-disable react/prop-types */
import Header from "./components/Header";
import Footer from "./components/Footer";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
