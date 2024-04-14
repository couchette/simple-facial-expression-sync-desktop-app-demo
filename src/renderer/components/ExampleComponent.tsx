import React, { useState, useEffect } from 'react';
import icon from '../../../assets/icon.svg';
import './ExampleComponent.css'

export interface ExampleComponentProps {
  needPrint: string;
}

function Subject(initSourceData: ExampleComponentProps): {
  getData: () => ExampleComponentProps;
} {
  const [data, setData] = useState<ExampleComponentProps>(initSourceData);

  useEffect(() => {
    console.log('ExampleComponent data', data);
  }, [data]);

  function getData() {
    const dataTemp = data;
    return dataTemp;
  }

  return {
    getData,
  };
}

export const ExampleComponent: React.FC<{ props: ExampleComponentProps }> = ({
  props,
}) => {
  const subject = Subject(props);
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <h2>{subject.getData().needPrint}</h2>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};
