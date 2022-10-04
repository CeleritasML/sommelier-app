import { useState } from 'react';
import { Input } from './Component/Input';
import { Recommend } from './Component/Recommend';
import { DarkMode } from './Component/DarkMode';
import { Layout } from '@douyinfe/semi-ui';
import { IconGithubLogo } from '@douyinfe/semi-icons';
import './App.css';

function App() {

  const [recommend, setRecommend] = useState([]);
  const { Header, Footer, Content } = Layout;

  return (
    <>
      <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
        <Header>
          <DarkMode />
        </Header>
        <Content style={{
          padding: '24px',
        }}>
          <Input setRecommend={setRecommend} />
          <Recommend recommend={recommend} />
        </Content>
        <Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: 'var(--semi-color-text-2)',
            backgroundColor: 'rgba(var(--semi-grey-0), 1)',
          }}>
          <span>Copyright © 2022 Celaritas ML. All Rights Reserved. </span>
          <span>
            <a
              href='https://github.com/CeleritasML/sommelier-app'
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                color: 'var(--semi-color-text-2)',
                display: 'flex',
                alignItems: 'center',
              }}>
              <IconGithubLogo style={{ marginRight: '4px' }} />
              <span>GitHub Repo</span>
            </a>
          </span>
        </Footer>
      </Layout>
    </>
  )
}

export default App;
