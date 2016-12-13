import React from 'react';
import Tab from '../../../components/Tab';
import BasicInfo from '../basicInfo';
import './app.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <Tab>
          <div name="填写基本信息">
            <BasicInfo />
          </div>
          <div name="填写平台信息">2</div>
          <div name="提交成功">3</div>
        </Tab>
      </div>
    )
  }
}

export default App;