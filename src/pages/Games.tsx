import React from 'react';
import Loading from '../components/Loading';
import Card from '../components/Card';
import NotFound from '../pages/NotFound';
import Error from '../pages/Error';
import MyPagination from '../components/MyPagination';
import { Link, withRouter } from "react-router-dom";

const max_results_page: number = 20;
const platforms: any = { "pc": 1, "playstation": 2, "xbox": 3, "nintendo": 7 };

class Games extends React.Component<any, any> {
    _isMounted: boolean = false;
    _searchTimeout: any = null;

    constructor(props: any) {
        super(props);

        const params: any = this.props.match.params;

        const state: any = localStorage.getItem("state");

        if (state === null) {
            this.state = {
                games: null,
                total_games: 0,
                loading: true,
                current_page: 1,
                id_platform: platforms[params.platform],
                platform: params.platform,
                error: false,
                searchValue: ""
            };
        } else {
            this.state = JSON.parse(state);

            //If the state saved is different platform than current platform.
            if (platforms[params.platform] !== this.state.id_platform) {
                this.state = {
                    games: null,
                    total_games: 0,
                    loading: true,
                    current_page: 1,
                    id_platform: platforms[params.platform],
                    platform: params.platform,
                    error: false,
                    searchValue: ""
                };
            }
        }

        //If exists "state" item in localStorage, remove it.
        localStorage.removeItem("state");

        document.title = `Games catalog - ${params.platform.toUpperCase()}`;

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e: React.FormEvent<HTMLInputElement>) {
        this.getData(this.state.current_page, e.currentTarget.value);
    }

    render() {
        if (this.state.id_platform !== undefined) {
            if (!this.state.error) {
                return (
                    <main className="container-fluid p-5">
                        <div className="list-games input-group my-4 mx-auto">
                            <span className="input-group-text bg-dark text-light" id="input-search"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg></span>
                            <input type="text" onInput={this.handleSearch} value={this.state.searchValue || ''} className="form-control bg-dark text-light" placeholder="Search the game" aria-label="Search the game" aria-describedby="input-search" />
                        </div>
                        <div className="list-games mx-auto row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 w-100">
                            {this.state.loading ? <Loading /> :
                                <React.Fragment>
                                    {this.state.games.map((game: any, index: number) => {
                                        return (
                                            <Link to={"/games/" + this.state.platform + "/" + game.id} onClick={() => this.saveState(this.state)} key={index} className="col d-flex align-items-stretch text-decoration-none text-light">
                                                <Card id={game.id}
                                                    url_image={game.background_image}
                                                    name={game.name}
                                                    genres={game.genres} />
                                            </Link>
                                        )
                                    })}
                                    <MyPagination
                                        total_pages={
                                            //The api is not entirely free, if the total pages is greater than 500, limit the pages to 500.
                                            Math.ceil(this.state.total_games / max_results_page) > 500 ? 500 : Math.ceil(this.state.total_games / max_results_page)
                                        }
                                        current_page={this.state.current_page}
                                        total_results={this.state.total_games}
                                        search_value={this.state.searchValue}
                                        page_clicked={(page: number, search_value: string) => {
                                            this.getData(page, search_value);
                                        }} />
                                </React.Fragment>
                            }
                        </div>
                    </main>
                )
            } else {
                return (<Error />)
            }
        } else {
            return (<NotFound />)
        }
    }

    componentDidMount() {
        this._isMounted = true;

        if (!this.state.fromDetail) {
            this.getData(this.state.current_page);
        } else {
            window.scrollTo(0, this.state.scrollY);
            this.setState({ fromDetail: undefined, scrollY: undefined });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getData(page: number, search?: string) {
        this.setState({ loading: true, searchValue: search });

        fetch(`https://api.rawg.io/api/games?key=${this.props.apiKey}&parent_platforms=${this.state.id_platform}&page=${page}&page_size=${max_results_page}${this.state.searchValue && this.state.searchValue.length !== 0 ? `&search=${this.state.searchValue}` : ``}`)
            .then((response: Response) =>{
                if (!response.ok) {
                    throw response.statusText;
                }

                return response.json();
            })
            .then((games: any) => {
                if (this._isMounted) {
                    console.log(games.count);
                    this.setState({ current_page: page, total_games: games.count, games: games.results, loading: false, error: false });
                }
            })
            .catch((error: Error) => {
                if (this._isMounted) {
                    console.error("Error ocurred: " + error.message);
                    this.setState({ error: true });
                }
            });
    }

    saveState(state: any) {
        state.fromDetail = true;
        state.scrollY = window.scrollY;

        localStorage.setItem("state", JSON.stringify(state));
    }
}

export default withRouter(Games);