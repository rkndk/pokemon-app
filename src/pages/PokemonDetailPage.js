import React from 'react';
import {
    Layout,
    Card,
    List,
    Button,
    Modal,
    Input
} from 'antd';
import ReactApexChart from 'react-apexcharts'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {addPokemon} from "../redux/actions/pokemon";

const {Content, Header} = Layout;
const {Meta} = Card;
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

class PokemonDetailPage extends React.Component {
    state = {
        detail: {},
        statChart: {
            options: {
                labels: ['Speed', 'Special Defense', 'Special Attack', 'Defense', 'Attack', 'HP'],
                title: {
                    text: 'Pokemon Statistics'
                },
                yaxis: {
                    min: 0,
                    max: 100,
                    tickAmount: 4
                }
            },
            series: [{
                name: 'Data',
                data: [80, 50, 30, 40, 100, 20],
            }]
        },
    };
    nickname = '';
    successModal = null;

    handleChangeNickname = (event) => {
        this.nickname = event.target.value;
        if (this.successModal) {
            this.successModal.update({
                okButtonProps: {
                    disabled: !this.nickname,
                }
            });
        }
    };

    failedConfirm = () => {
        Modal.warning({
            title: 'Failed!',
            content: 'The pokemon run away.',
        });
    };

    successConfirm = () => {
        this.successModal = Modal.success({
            title: 'Success!',
            content: (
                <div>
                    Please enter nickname!
                    <Input onChange={this.handleChangeNickname} placeholder="Pokemon Nickname"
                           style={{marginTop: '10px'}}/>
                </div>
            ),
            okText: 'Save',
            okButtonProps: {
                disabled: true,
            },
            onOk: this.saveNewPokemon,
        });
    };

    saveNewPokemon = () => {
        console.log('save', this.nickname);
        const {name} = this.props.match.params;

        // create new pokemon
        const pokemon = {
            id: Date.now(),
            nickname: this.nickname,
            name: name,
        };

        // save state
        this.props.addPokemon(pokemon);

        // reset
        this.nickname = '';
        this.successModal = null;
    };

    catchPokemon = () => {
        // reset
        this.nickname = '';
        this.successModal = null;

        // random success probability is 50%
        const success = Math.random() >= 0.5;

        if (success) {
            this.successConfirm();
        } else {
            this.failedConfirm();
        }
    };

    render() {
        const {statChart} = this.state;
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Header><h2 style={{color: '#fff'}}>Pokemon Detail</h2></Header>
                <div style={{marginTop: '20px', textAlign: 'center'}}>
                    <Link to="/">
                        <Button type="primary" shape="round" icon="appstore" size="large">
                            Pokemon List
                        </Button>
                    </Link>
                </div>
                <Content style={{padding: '0 50px', marginTop: 40, marginBottom: 60}}>
                    <div style={{background: '#fff', padding: 24}}>
                        <div style={{textAlign: 'center'}}>
                            <h2>Pokemon Name</h2>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Card
                                    hoverable
                                    style={{width: 100}}
                                    cover={<img
                                        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'}
                                        alt="Front View"/>}
                                >
                                    <Meta description="Front View"/>
                                </Card>
                                <Card
                                    hoverable
                                    style={{width: 100}}
                                    cover={<img
                                        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'}
                                        alt="Back View"/>}
                                >
                                    <Meta description="Back View"/>
                                </Card>
                            </div>
                            <br/>
                            <p>Height: 7, Weight: 70</p>
                            <Button onClick={this.catchPokemon} type="primary" shape="round" size="large">
                                Catch
                            </Button>
                        </div>

                        <br/>

                        <List
                            size="small"
                            header={<h4>Pokemon Name Moves</h4>}
                            bordered
                            dataSource={data}
                            renderItem={item => <List.Item>{item.name}</List.Item>}
                        />

                        <br/>

                        <List
                            size="small"
                            header={<h4>Pokemon Name Types</h4>}
                            bordered
                            dataSource={data}
                            renderItem={item => <List.Item>{item.name}</List.Item>}
                        />

                        <br/>

                        <ReactApexChart options={statChart.options} series={statChart.series} type="radar"
                                        height="350"/>
                    </div>
                </Content>
            </Layout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPokemon: (pokemon) => dispatch(addPokemon(pokemon)),
    }
};

export default connect(null, mapDispatchToProps)(PokemonDetailPage);