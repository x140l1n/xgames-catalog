import { Link } from 'react-router-dom';

const Error = (): JSX.Element => {
    return (
        <main className="container-fluid d-flex flex-column align-items-center justify-content-center text-center">
            <h2>Unexpected error has ocurred... :(</h2>
            <Link className="btn btn-primary m-4" to={"/"}>Go home</Link>
        </main>
    );
};

export default Error;
