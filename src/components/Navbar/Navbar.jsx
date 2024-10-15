
import DarkMode from "./DarkMode";

import BuyPage from "./BuyPage";
import image from  "../../assets/logo.png"
const Navbar = ({ toggleTheme, theme }) => {




  // Function to handle the opening and closing of the modal
 
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 p-[10px]">
      <div className="container  ">
        <div className="flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={image} alt="logo" className="w-[36px]" />
            </a>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div>
              <DarkMode toggleTheme={toggleTheme} theme={theme} />
            </div>
          <BuyPage />
          </div>
        </div>
      </div>

      {/* Service Modal */}

    </div>
  );
};

export default Navbar;
