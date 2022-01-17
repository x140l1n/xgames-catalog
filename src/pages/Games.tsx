import React from 'react';
import Loading from '../components/Loading';
import Cards from '../components/Cards';
import NotFound from '../pages/NotFound';
import MyPagination from '../components/MyPagination';
import { withRouter } from "react-router-dom";

const max_results_page: number = 20;
const platforms: any = { "pc": 1, "playstation": 2, "xbox": 3, "nintendo": 7 };
const key: string = "8d55cd34a151453f973a0ecaa163e9ad";

class Games extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        const params: any = this.props.match.params;

        this.state = {
            games: [],
            total_games: 0,
            loading: true,
            current_page: 1,
            id_platform: platforms[params.platform]
        };

        document.title = `Games catalog - ${params.platform.toUpperCase()}`;
    }

    render() {
        if (this.state.id_platform !== undefined) {

            return (
                <main className="container-fluid d-flex flex-column align-items-center justify-content-center">
                    {this.state.loading ? <Loading /> :
                        <React.Fragment>
                            <Cards games={this.state.games} />
                            <MyPagination
                                total_pages={
                                    //The api is not entirely free, if the total pages is greater than 500, limit the pages to 500.
                                    Math.ceil(this.state.total_games / max_results_page) > 500 ? 500 : Math.ceil(this.state.total_games / max_results_page)
                                }
                                current_page={this.state.current_page}
                                total_results={this.state.total_games}
                                number_pages_show={5}
                                page_clicked={(page: number) => {
                                    this.getData(page);
                                }} />
                        </React.Fragment>}
                </main>
            )
        } else {
            return (<NotFound />)
        }
    }

    componentDidMount() {
        this.getData(this.state.current_page);
    }

    getData(page: number) {
        this.setState({ loading: true });

        fetch(`https://api.rawg.io/api/games?key=${key}&parent_platforms=${this.state.id_platform}&page=${page}&page_size=${max_results_page}`)
            .then((response) => response.json())
            .then(games => {
                this.setState({ current_page: page, total_games: games.count, games: games.results, loading: false });
            });
    }
}

export default withRouter(Games);