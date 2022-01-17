import React from 'react';
import Card from './Card';

interface CardsProps {
    games: []
}

export default class Cards extends React.Component<CardsProps> {
    constructor(props: CardsProps) {
        super(props);
    }

    render() {
        return (
            <div className="list-games row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 p-5">
                {this.props.games.map((game: any, index: number) => {
                    return (
                        <div className="col d-flex align-items-stretch" key={index}>
                            <Card id={game.id}
                                url_image={game.background_image}
                                name={game.name}
                                genres={game.genres} />
                        </div>
                    )
                })}
            </div>
        )
    }
}
