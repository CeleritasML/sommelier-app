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
                        padding: '20px',
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
                            fontSize: '48px',
                            margin: '0 8px',
                        }}
                    >
                        {' '}
                        Sommelier
                    </Title>
                </Header>
                <Content
                    style={{
                        padding: '24px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Title
                            heading={2}
                            style={{
                                margin: '8px 0',
                                fontWeight: 'bold',
                            }}
                        >
                            Hi, 🥂
                        </Title>
                        <DarkMode />
                    </div>
                    <span>
                        <p>
                            Whenever we talk to a wine connoisseur, we will hear
                            them talk about their wine preferences based on two
                            primary factors: the region where the wine is from
                            and the grape varietal from which the wine is made.
                            It is obviously a steep learning curve for a
                            newcomer to know their personal wine preferences in
                            terms of these two primary factors because it
                            requires trial and error that most of us don’t have
                            the money, time or the liver to do. But what if we
                            have our personal digital wine steward, or a
                            sommelier as the French call it? That is what our
                            app is for.
                        </p>
                        <p>
                            Sommelier App takes advantage of natural language
                            processing and machine learning algorithms, trained
                            using a dataset of 117283 wine reviews written by
                            expert wine tasters to learn the differences in
                            described flavor notes that differentiate a dataset
                            of over 500 <code>(region, grape varietal)</code>{' '}
                            pairs.
                        </p>
                        <p>
                            <b>
                                You are welcome to type your own description of
                                wines.
                            </b>
                        </p>
                    </span>
                    <br />
                    <Input
                        setRecommend={setRecommend}
                        style={{ padding: '20px' }}
                    />
                </Content>
                <Recommend recommend={recommend} style={{ padding: '20px' }} />

                <Footer
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '20px',
                        color: 'var(--semi-color-text-2)',
                        width: '100%',
                        fontFamily: 'Roboto Condensed, sans-serif',
                    }}
                >
                    <span>Copyright © 2022</span>
                    <span>
                        Made with ❤️ by<span>&nbsp;</span>
                        <a
                            href="https://github.com/celeritasML/"
                            style={{ color: 'inherit' }}
                        >
                            Celaritas ML
                        </a>
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
