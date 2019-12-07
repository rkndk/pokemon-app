import React from 'react';
import {Button, Card, Layout, List} from 'antd';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {removePokemon} from "../redux/actions/pokemon";

const {Content, Header} = Layout;

class MyPokemonListPage extends React.Component {
    handleRemove = (id) => {
        // remove data
        this.props.removePokemon(id);
    };

    render() {
        const {myPokemons} = this.props;
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
                            dataSource={myPokemons}
                            renderItem={item => (
                                <List.Item>
                                    <Card>
                                        <h3>{item.nickname}</h3>
                                        <p>{item.name}</p>
                                        <div style={{textAlign: 'right'}}>
                                            <Button onClick={() => this.handleRemove(item.id)} type="danger"
                                                    size="small">Remove</Button>
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

const mapStateToProps = state => {
    return {
        myPokemons: state.pokemon
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removePokemon: (id) => dispatch(removePokemon(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemonListPage);