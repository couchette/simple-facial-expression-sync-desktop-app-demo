import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
// internationalization
import { IntlProvider } from 'react-intl';

import messagesEn from './locales/en.json';
import messagesZh from './locales/zh.json';

import { Requester } from './Requester';
import { getUserLanguage } from './utils';

const messages = {
  en: messagesEn,
  zh: messagesZh,
};

export default function App() {
  const userInfo = Requester.postUserInfo('');
  const pageProps = {
    user: userInfo,
  };
  const selectedLanguage = getUserLanguage();

  return (
    <IntlProvider
      locale={selectedLanguage}
      messages={messages[selectedLanguage]}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage props={pageProps} />} />
        </Routes>
      </Router>
    </IntlProvider>
  );
}
