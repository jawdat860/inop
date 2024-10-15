import { Modal, Placeholder } from "@telegram-apps/telegram-ui";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { FaPhone } from "react-icons/fa6";
import whatsapp from "../../assets/whatsapp.png";
import phone from "../../assets/phone.png";
import telegram from "../../assets/telegram.png";
import vk from "../../assets/vk.png";

function PhoneModel() {
  return (
    <Modal
      closeThreshold={1}
      header={<ModalHeader>Contact Us</ModalHeader>}
      modal
      scrollLockTimeout={0}
      trigger={
        <li className="hover:scale-110 transition-transform duration-200 cursor-pointer">
          <FaPhone className="text-2xl text-black " />
        </li>
      }
    >
      <Placeholder title="Contact">
        <div className="p-4">
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 p-3 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition duration-200">
              <img src={whatsapp} alt="WhatsApp" className="w-8 h-8" />
              <p className="text-lg font-semibold text-gray-800">+7(978)519-80-94</p>
            </li>
            <li className="flex items-center space-x-3 p-3 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition duration-200">
              <img src={phone} alt="Phone" className="w-8 h-8" />
              <p className="text-lg font-semibold text-gray-800">+7(978)519-80-94</p>
            </li>
            <li className="flex items-center space-x-3 p-3 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition duration-200">
              <img src={telegram} alt="Telegram" className="w-8 h-8" />
              <p className="text-lg font-semibold text-gray-800">+7(978)519-80-94</p>
            </li>
            <li className="flex items-center space-x-3 p-3 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition duration-200">
              <img src={vk} alt="VK" className="w-8 h-8" />
              <p className="text-lg font-semibold text-gray-800">+7(978)519-80-94</p>
            </li>
          </ul>
        </div>
      </Placeholder>
    </Modal>
  );
}

export default PhoneModel;
