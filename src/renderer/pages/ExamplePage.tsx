import React from 'react';
import { Page, PageProps, PageContext } from './Page';
import {
  ExampleComponent,
  ExampleComponentProps,
} from '../components/ExampleComponent';

const PageContent: React.FC<{ props: PageProps }> = ({ props }) => {
  const { user } = props;
  const { messageApi, intl } = React.useContext(PageContext);

  messageApi.open({
    type: 'info',
    content: 'Hello MessageApi!',
  });
  messageApi.open({
    type: 'warn',
    content: 'Hello MessageApi!',
  });
  messageApi.open({
    type: 'error',
    content: 'Hello MessageApi!',
  });

  const sourceData: ExampleComponentProps = {
    needPrint: user.name + " : " + intl.formatMessage({id: 'hello_world'}),
  };

  return <ExampleComponent props={sourceData} />;
};

export const App: React.FC<{ props: PageProps }> = ({ props }) => {
  return (
    <Page>
      <PageContent props={props} />
    </Page>
  );
};
export default App;
