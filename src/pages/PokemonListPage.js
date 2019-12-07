import React from 'react';
import {
    Layout,
    List,
    Card,
    Button
} from 'antd';
import {Link} from "react-router-dom";

const {Content, Header} = Layout;
const data = [
    {
        name: 'Pokemon 1',
    },
    {
        name: 'Pokemon 2',
    },
    {
        name: 'Pokemon 3',
    },
    {
        name: 'Pokemon 4',
    },
    {
        name: 'Pokemon 5',
    },
];

class PokemonListPage extends React.Component {
    state = {
        currentPage: 3,
    };

    onChangePage = page => {
        console.log(page);
        this.setState({
            currentPage: page,
        });
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Header>
                    <h2 style={{color: '#fff'}}>Pokemon List</h2>
                </Header>
                <div style={{marginTop: '20px', textAlign: 'center'}}>
                    <Link to="/collected">
                        <Button type="primary" shape="round" icon="appstore" size="large">
                            My Pokemon
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
                            pagination={{
                                style: {textAlign: 'center'},
                                size: 'small',
                                pageSize: 20,
                                current: this.state.currentPage,
                                onChange: this.onChangePage,
                                total: 500
                            }}
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <Link to={`/detail/${item.name}`}>
                                        <Card>
                                            <h3>{item.name}</h3>
                                            <p>Owned: 0</p>
                                        </Card>
                                    </Link>
                                </List.Item>
                            )}
                        />
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default PokemonListPage;