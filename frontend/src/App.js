import { useState } from 'react';
import { Input } from './Component/Input';
import { Recommend } from './Component/Recommend';
import { DarkMode } from './Component/DarkMode';
import { Layout, Avatar, Typography } from '@douyinfe/semi-ui';
import { IconGithubLogo } from '@douyinfe/semi-icons';
import './App.css';

function App() {
    const [recommend, setRecommend] = useState([]);
    const { Header, Footer, Content } = Layout;
    const { Title } = Typography;

    return (
        <>
            <Layout>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px 20px',
                    }}
                >
                    <Avatar
                        size="large"
                        alt="A sommelier, van Gogh style"
                        src="https://i.imgur.com/zL33jUq.png"
                    />
                    <Title
                        style={{
                            fontFamily: 'Roboto Slab, sans-serif',
                            fontWeight: 'bold',
                            fontSize: '64px',
                            margin: '0 8px',
                        }}
                    >
                        {' '}
                        Sommelier
                    </Title>
                </Header>
                <Content style={{ padding: '24px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Title
                            heading={2}
                            style={{ margin: '8px 0', fontWeight: 'bold' }}
                        >
                            Lorem 🥂
                        </Title>
                        <DarkMode />
                    </div>
                    <span>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </span>
                    <br />
                    <Input setRecommend={setRecommend} />
                </Content>
                <Recommend recommend={recommend} />
                <Footer
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '20px',
                        color: 'var(--semi-color-text-2)',
                        backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                        // force footer to be at the bottom of the page
                        position: 'fixed',
                        bottom: '0',
                        width: '100%',
                        fontFamily: 'Roboto Condensed, sans-serif',
                    }}
                >
                    <span>
                        Copyright © 2022 <span>&nbsp;</span>
                        <a href="https://github.com/celeritasML/">
                            Celaritas ML
                        </a>
                        . All Rights Reserved.{' '}
                    </span>
                    <span>
                        <a
                            href="https://github.com/CeleritasML/sommelier-app"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--semi-color-text-2)',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <IconGithubLogo style={{ marginRight: '4px' }} />
                            <span>GitHub Repo</span>
                        </a>
                    </span>
                </Footer>
            </Layout>
        </>
    );
}

export default App;
