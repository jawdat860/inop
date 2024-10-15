import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import axios from "axios";
import ServiceModal from "./ServiceModal";
import { Spinner } from "@telegram-apps/telegram-ui";
import FooterFlex from "../FooterFlex/FooterFlex";
import Example from "../Example";
import { Link, Element } from "react-scroll"; // Import from react-scroll
import { FiAlignJustify } from "react-icons/fi";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  const ulRef = useRef(null); // Ref for the category list
  const dropdownRef = useRef(null); // Ref for the dropdown
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category") || "All";

  // Fetch services data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("https://menuapp.ru/api/v1");
        setServices(data);
        const uniqueCategories = Array.from(
          new Set(data.map((service) => service.category))
        );
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update the active category when a category is selected via URL query params
  useEffect(() => {
    if (selectedCategory !== "All") {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Scroll the category button into view and update the activeCategory
  const scrollToButton = (category) => {
    const button = document.getElementById(`btn-${category}`);
    if (button && ulRef.current) {
      const ulRect = ulRef.current.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      // Calculate the scroll position to center the button in the view
      const scrollPosition =
        buttonRect.left -
        ulRect.left +
        ulRef.current.scrollLeft -
        ulRect.width / 2 +
        buttonRect.width / 2;

      ulRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      // Update the active category when scrolling
      setActiveCategory(category);
    }
  };

  // Observe category sections to update the active category on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.id;
            if (categoryId !== activeCategory) {
              setActiveCategory(categoryId);
              scrollToButton(categoryId); // Scroll the corresponding button into view
            }
          }
        });
      },
      {
        threshold: 0.7, // Trigger when 70% of the section is in view
      }
    );

    // Observe each category section
    categories.forEach((category) => {
      const categoryElement = document.getElementById(category);
      if (categoryElement) {
        observer.observe(categoryElement);
      }
    });

    return () => {
      // Clean up the observer on unmount
      categories.forEach((category) => {
        const categoryElement = document.getElementById(category);
        if (categoryElement) {
          observer.unobserve(categoryElement);
        }
      });
    };
  }, [categories, activeCategory]);

  // Handle card click to open modal
  const handleCardClick = (service) => {
    setActiveService(service);
    setIsModalOpen(true);
  };

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    acc[service.category] = acc[service.category] || [];
    acc[service.category].push(service);
    return acc;
  }, {});

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when a category is selected
  const handleCategoryClick = (category) => {
    scrollToButton(category);
    setIsDropdownOpen(false); // Close dropdown after selecting a category
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Render error message if there is an error fetching data
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Render loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100%]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="rounded-t-[40px] relative z-[11] mt-[-31px] bg-[#eee]">
      <Example />
      <div className="container relative jawdat">
        {/* Category Navigation */}
        <div className="flex z-[1000] items-center top-0 h-16 sticky inset-x-0 bg-[#eee] rounded-b-[20px] pl-3">
          <ul ref={ulRef} className="flex space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <li key={category} className="flex">
                <Link
                  id={`btn-${category}`} // Set unique id for each button
                  to={category} // Target the section id
                  spy={true} // Enables scrolling to the element
                  smooth={true} // Smooth scrolling effect
                  duration={500} // Duration of scroll in milliseconds
                  offset={-40}
                  onSetActive={() => scrollToButton(category)} // Scroll the button into view when active
                  className={`px-4 w-[max-content] py-2 block text-sm font-medium rounded-full transition-all duration-300 ${
                    activeCategory === category
                      ? "active font-bold bg-primary text-white"
                      : "text-gray-700"
                  }`} // Conditional class for active link
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
          <div className="relative" ref={dropdownRef}>
            <button
              className="mx-[6px] px-4 py-2 text-sm font-medium bg-[#ffc001] text-white rounded-full transition-all duration-300 active:bg-primary active:opacity-50 focus:outline-none"
              onClick={toggleDropdown}
            >
              <FiAlignJustify />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-[40px] right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-[1002]">
                <ul className="flex flex-col space-y-2 p-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        to={category} // Target the section id
                        spy={true} // Enables scrolling to the element
                        smooth={true} // Smooth scrolling effect
                        duration={500} // Duration of scroll in milliseconds
                        offset={-40}
                        onClick={() => handleCategoryClick(category)} // Close dropdown after selecting a category
                        className={`block py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
                          activeCategory === category
                            ? "active font-bold bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-4 p-4 pb-[100px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative">
          {Object.entries(servicesByCategory).map(([category, services]) => (
            <Element // Use Element from react-scroll
              key={category}
              name={category} // Name matches the link's to prop
              className="category-section"
              id={category} // Ensure each section has a unique ID for IntersectionObserver
            >
              <h1 className="text-lg text-center my-[20px] font-bold">
                {category}
              </h1>
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onClick={() => handleCardClick(service)}
                />
              ))}
            </Element>
          ))}
        </div>

        {/* Modal for service details */}
        <ServiceModal
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          service={activeService}
        />

        <FooterFlex />
      </div>
    </div>
  );
};

export default Services;
