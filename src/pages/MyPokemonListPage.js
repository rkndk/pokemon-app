import React from 'react';
import {
    Layout,
    List,
    Card, Button
} from 'antd';
import {Link} from "react-router-dom";

const {Content, Header} = Layout;
const data = [
    {
        nickname: 'Pokemon 1',
        pokemon: 'Pokemon Name',
    },
    {
        nickname: 'Pokemon 2',
        pokemon: 'Pokemon Name',
    },
    {
        nickname: 'Pokemon 3',
        pokemon: 'Pokemon Name',
    },
    {
        nickname: 'Pokemon 4',
        pokemon: 'Pokemon Name',
    },
    {
        nickname: 'Pokemon 5',
        pokemon: 'Pokemon Name',
    },
];

class MyPokemonListPage extends React.Component {

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Header><h2 style={{color: '#fff'}}>My Pokemon</h2></Header>
                <div style={{marginTop: '20px', textAlign: 'center'}}>
                    <Link to="/">
                        <Button type="primary" shape="round" icon="appstore" size="large">
                            Pokemon List
                        </Button>
                    </Link>
                </div>
                <Content style={{padding: '0 50px', marginTop: 40, marginBottom: 60}}>
                    <div style={{background: '#fff', padding: 24}}>
                        <List
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 4,
                                lg: 4,
                            }}
                            itemLayout="vertical"
                            size="large"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <Card>
                                        <h3>{item.nickname}</h3>
                                        <p>{item.pokemon}</p>
                                        <div style={{textAlign: 'right'}}>
                                            <Button type="danger" size="small">Remove</Button>
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default MyPokemonListPage;