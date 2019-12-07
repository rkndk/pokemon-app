import React from 'react';
import {Button, Card, Layout, List} from 'antd';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from 'axios';

const {Content, Header} = Layout;

class PokemonListPage extends React.Component {
    state = {
        data: [],
        count: 0
    };
    currentPage = 1;
    limit = 20;

    getData = () => {
        const offset = (this.currentPage - 1) * this.limit;
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${this.limit}`)
            .then(res => {
                const data = res.data;
                this.setState({data: data.results, count: data.count});
            });
    };

    componentDidMount() {
        this.getData();
    }

    onChangePage = page => {
        this.currentPage = page;
        this.getData();
    };

    getOwnedPokemonByName = (name) => {
        const myPokemons = this.props.myPokemons;
        const owned = myPokemons.filter(i => i.name === name);
        return owned.length;
    };

    render() {
        const {data, count} = this.state;
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
                                current: this.currentPage,
                                onChange: this.onChangePage,
                                total: count
                            }}
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <Link to={`/detail/${item.name}`}>
                                        <Card>
                                            <h3>{item.name}</h3>
                                            <p>Owned: {this.getOwnedPokemonByName(item.name)}</p>
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

const mapStateToProps = state => {
    return {
        myPokemons: state.pokemon
    };
};

export default connect(mapStateToProps)(PokemonListPage);