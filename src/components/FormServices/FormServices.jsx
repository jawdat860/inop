import { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import WebApp from "@twa-dev/sdk"; // Assuming this package works in JavaScript

function FormServices() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [initData, setInitData] = useState(null); // Initial state is null

  useEffect(() => {
    const data = WebApp.initDataUnsafe;
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      console.error("❌ Open this app in Telegram");
      return;
    }
    console.log("✅ Telegram WebApp Available", data);
    setInitData(data); // Store as an object
    WebApp.expand();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with the following data:", {
      phoneNumber,
      // Add other form fields as necessary
    });
    setPhoneNumber(""); // Reset phone number for now
  };

  return (
    <div className=" max-w-lg mx-auto bg-white font-sans rounded-lg ">

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="text-gray-700 text-sm block mb-1">name</label>
          <input
            type="text"
            placeholder="Enter your address"
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
            defaultValue={initData?.user?.username || ""} // Access username safely
          />
        </div>
        <div>
          <label className="text-gray-700 text-sm block mb-1">Address 1</label>
          <input
            type="text"
            placeholder="Enter your address"
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>
        
       
      
        <div>
          <label className="text-gray-700 text-sm block mb-1">Phone</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
            value={phoneNumber} // Controlled input
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default FormServices;
