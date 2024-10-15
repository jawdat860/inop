import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function SliderItem({ categories, selectedCategory, onCategorySelect }) {
  return (
    <Menu as="div" className="relative inline-block text-left px-[10px]">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
         
          <ChevronDownIcon aria-hidden="true" className=" h-5 w-5 text-gray-400" />
        
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <ul className=" justify-between  max-h-[180px] overflow-scroll">
        {categories.map((category) => (
          <MenuItem key={category.id}>
          <li
            key={category.id  }
            className={`flex-shrink-0 px-4 py-2 text-sm font-medium   cursor-pointer transition-all duration-300 
               ${selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} hover:bg-primary hover:text-white`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </li>
        
        </MenuItem>
        ))}
      </ul>
      </MenuItems>
    </Menu>
  )
}
