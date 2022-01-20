import React from 'react'
import Loading from '../components/Loading';
import NotFound from '../pages/NotFound';
import Error from '../pages/Error';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const platforms: any = { "pc": 1, "playstation": 2, "xbox": 3, "nintendo": 7 };

export default class Details extends React.Component<any, any> {
    _isMounted: boolean = false;

    constructor(props: any) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            platform: this.props.match.params.platform,
            game: null,
            loading: true,
        };
    }

    render() {
        if (!this.state.error) {
            return (
                <main className="container-fluid d-flex flex-column align-items-center justify-content-center">
                    {
                        this.state.loading ? <Loading /> :
                            this.state.game !== null ?
                                <React.Fragment>
                                    <div className="row details p-lg-5 p-sm-2">
                                        <div className="col-12 d-grid gap-2">
                                            <Link to={"/games/" + this.state.platform} className="btn btn-primary btn-go-back">Go back</Link>
                                        </div>
                                        <div className="col-lg-7 my-2">
                                            <div className="card bg-dark">
                                                <div id="carousel" className="carousel carousel-dark slide card-img-top" data-bs-ride="carousel">
                                                    <div className="carousel-indicators">
                                                        <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                                        <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                    </div>
                                                    <div className="carousel-inner">
                                                        <div className="carousel-item active">
                                                            <img src={this.state.game.background_image} className="img-fluid" alt={this.state.game.name} />
                                                        </div>
                                                        <div className="carousel-item">
                                                            <img src={this.state.game.background_image_additional} className="img-fluid" alt={this.state.game.name} />
                                                        </div>
                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>                                                <div className="card-body">
                                                    <h4 className="card-title fw-bold">{this.state.game.name}</h4>
                                                    <p className="card-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.game.description) }}></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 my-2">
                                            <div className="card bg-dark">
                                                <div className="card-header">
                                                    Genres
                                                </div>
                                                <div className="card-body">
                                                    {
                                                        this.state.game.genres.map((genre: any) => {
                                                            return (
                                                                <span className="badge bg-dark text-light me-2" key={genre.id}>{genre.name}</span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="card bg-dark my-2">
                                                <div className="card-header">
                                                    Platforms
                                                </div>
                                                <div className="card-body">
                                                    {
                                                        this.state.game.platforms.map((platform: any) => {
                                                            return (
                                                                <span className="badge bg-dark text-light me-2" key={platform.platform.id}>{platform.platform.name}</span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="card bg-dark my-2">
                                                <div className="card-header">
                                                    Tags
                                                </div>
                                                <div className="card-body">
                                                    {
                                                        this.state.game.tags.map((tag: any) => {
                                                            return (
                                                                <span className="badge bg-dark text-light me-2" key={tag.id}>{tag.name}</span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="card bg-dark my-2">
                                                <div className="card-header">
                                                    <div className="d-flex justify-content-between">
                                                        <span>Ratings</span>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" className="bi bi-star-fill me-2" viewBox="0 0 16 16">
                                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                            </svg>
                                                            {this.state.game.rating}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    {
                                                        this.state.game.ratings.map((rating: any) => {
                                                            return (
                                                                <div className="my-2" key={rating.id}>
                                                                    {rating.title.toUpperCase()}
                                                                    <div className="progress my-1">
                                                                        <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${rating.percent}%` }} aria-valuenow={rating.percent} aria-valuemin={0} aria-valuemax={100}>{rating.percent}%</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment> :
                                <NotFound />
                    }
                </main>
            )
        } else {
            return (<Error />)
        }
    }

    componentDidMount() {
        this._isMounted = true;

        if (Object.keys(platforms).indexOf(this.state.platform) !== -1) {
            fetch(`https://api.rawg.io/api/games/${this.state.id}?key=${this.props.apiKey}`)
                .then((response: Response) => response.json())
                .then((game: any) => {
                    if (this._isMounted) {
                        if (game.detail !== "Not found.") {
                            this.setState({ game: game, loading: false });
                        } else {
                            this.setState({ game: null, loading: false });
                        }
                    }
                })
                .catch((error: Error) => {
                    if (this._isMounted) {
                        console.error("Error ocurred: " + error.message);
                        this.setState({ error: true });
                    }
                });
        } else {
            this.setState({ game: null, loading: false });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
}
