import React from 'react';
import {Button, Card, Input, Layout, List, Modal} from 'antd';
import ReactApexChart from 'react-apexcharts'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {cleanText} from "../utils/Word";
import {addPokemon} from "../redux/actions/pokemon";
import axios from "axios";

const {Content, Header} = Layout;
const {Meta} = Card;

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
            series: []
        },
    };
    nickname = '';
    successModal = null;

    componentDidMount() {
        const {name} = this.props.match.params;
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => {
                const data = res.data;
                this.setState({detail: data});
                this.generateStat(data.stats)
            });
    }

    generateStat = (stats = []) => {
        const keys = ['speed', 'special-defense', 'special-attack', 'defense', 'attack', 'hp'];
        const values = [];
        keys.forEach(i => {
            const item = stats.filter(j => j.stat && j.stat.name === i);
            const value = item && item.length > 0 && item[0].base_stat ? item[0].base_stat : 0;
            values.push(value);
        });
        const {statChart} = this.state;
        statChart.series.push({data: values});
        this.setState({statChart: statChart});
    };

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
        const {statChart, detail} = this.state;
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
                            <h2 style={{textTransform: 'capitalize'}}>{cleanText(detail.name)}</h2>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Card
                                    hoverable
                                    style={{width: 100}}
                                    cover={<img
                                        src={detail.sprites ? detail.sprites.front_default : ''}
                                        alt=""/>}
                                >
                                    <Meta description="Front View"/>
                                </Card>
                                <Card
                                    hoverable
                                    style={{width: 100}}
                                    cover={<img
                                        src={detail.sprites ? detail.sprites.back_default : ''}
                                        alt=""/>}
                                >
                                    <Meta description="Back View"/>
                                </Card>
                            </div>
                            <br/>
                            <p>Height: {detail.height}, Weight: {detail.weight}</p>
                            <Button onClick={this.catchPokemon} type="primary" shape="round" size="large">
                                Catch
                            </Button>
                        </div>

                        <br/>

                        <ReactApexChart options={statChart.options} series={statChart.series} type="radar"
                                        height="350"/>

                        <br/>

                        <List
                            size="small"
                            header={<h4 style={{textTransform: 'capitalize'}}>{cleanText(detail.name)} Types</h4>}
                            bordered
                            dataSource={detail.types}
                            renderItem={item =>
                                <List.Item>
                                    <p style={{textTransform: 'capitalize'}}>
                                        { item && item.type ? cleanText(item.type.name) : '' }
                                    </p>
                                </List.Item>
                            }
                        />

                        <br/>

                        <List
                            size="small"
                            header={<h4 style={{textTransform: 'capitalize'}}>{cleanText(detail.name)} Moves</h4>}
                            bordered
                            dataSource={detail.moves}
                            renderItem={item =>
                                <List.Item>
                                    <p style={{textTransform: 'capitalize'}}>
                                        { item && item.move ? cleanText(item.move.name) : '' }
                                    </p>
                                </List.Item>
                            }
                        />

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