import { useState } from 'react';
import { Input } from './Component/Input';
import { Recommend } from './Component/Recommend';
import { DarkMode } from './Component/DarkMode';
import { Layout } from '@douyinfe/semi-ui';
import "./App.css";

function App() {

  const [recommend, setRecommend] = useState([]);
  const { Header, Footer, Content } = Layout;

  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Input setRecommend={setRecommend} />
          <Recommend recommend={recommend} />
          <DarkMode />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  )
}

export default App;
