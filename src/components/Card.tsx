import React from 'react'

interface CardProps {
    id: number,
    url_image: string,
    name: string,
    genres: []
}

export default class Card extends React.Component<CardProps> {
    render() {
        return (
            <div data-aos="fade-up" data-aos-duration="1000" className="card card-zoom bg-dark w-100">
                <img src={this.props.url_image} className="card-img-top w-100" height="150" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.name}</h5>
                    <p className="card-text">
                        {
                            this.props.genres.map((genre: any) => {
                                return (
                                    <span className="badge bg-dark text-light me-2" key={genre.id}>{genre.name}</span>
                                )
                            })
                        }
                    </p>
                </div>
            </div>
        )
    }
}
