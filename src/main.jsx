import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Import css files
import { AppRoot } from '@telegram-apps/telegram-ui';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { initMiniApp , mockTelegramEnv, parseInitData  } from "@telegram-apps/sdk-react";

const initializeTelegramSDK = async () => {
  try {
    // Attempt to initialize the real Telegram environment
    console.log("Initializing Telegram environment");
    const [miniApp] = initMiniApp();
    miniApp.setHeaderColor('#fcb69f');
    await miniApp.ready();
  } catch (error) {
    // In case of an error, initialize a mock environment
    console.error('Error initializing Telegram:', error);

    const initDataRaw = new URLSearchParams([
      ['user', JSON.stringify({
        id: 99281932,
        first_name: 'Andrew',
        last_name: 'Rogue',
        username: 'rogue',
        language_code: 'en',
        is_premium: true,
        allows_write_to_pm: true,
      })],
      ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
      ['auth_date', '1716922846'],
      ['start_param', 'debug'],
      ['chat_type', 'sender'],
      ['chat_instance', '8428209589180549439'],
    ]).toString();

    mockTelegramEnv({
      themeParams: {
        accentTextColor: '#6ab2f2',
        bgColor: '#17212b',
        buttonColor: '#5288c1',
        buttonTextColor: '#ffffff',
        destructiveTextColor: '#ec3942',
        headerBgColor: '#fcb69f',
        hintColor: '#708499',
        linkColor: '#6ab3f3',
        secondaryBgColor: '#232e3c',
        sectionBgColor: '#17212b',
        sectionHeaderTextColor: '#6ab3f3',
        subtitleTextColor: '#708499',
        textColor: '#f5f5f5',
      },
      initData: parseInitData(initDataRaw),
      initDataRaw,
      version: '7.2',
      platform: 'tdesktop',
    });

    console.log('Mock Telegram environment initialized');
  }
};

// Initialize SDK
initializeTelegramSDK();
ReactDOM.createRoot(document.getElementById("root")).render(
  <AppRoot>
    <App />
    </AppRoot>
);
