import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useIntl } from 'react-intl';
import { Requester } from '../Requester';

export interface PageProps {
  user: object;
}

const defaultValue: any = undefined;
export const PageContext = React.createContext(defaultValue);

export const Page: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <PageContext.Provider value={{messageApi, navigate, Requester, intl}}>
      {contextHolder}
      {children}
    </PageContext.Provider>
  );
};
