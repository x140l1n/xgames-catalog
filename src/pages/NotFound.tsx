import { Link } from 'react-router-dom';

const NotFound = (): JSX.Element => {
    document.title = "Games catalog - Not Found";

    return (
        <main className="container-fluid d-flex flex-column align-items-center justify-content-center">
            <h2>This page is not found... :(</h2>
            <Link className="btn btn-primary m-4" to={"/"}>Go home</Link>
        </main>
    );
};

export default NotFound;
