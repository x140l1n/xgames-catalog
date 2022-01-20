const Home = (): JSX.Element => {
  document.title = "Games catalog - Home";
  
  return (
    <main className="container-fluid d-flex flex-column align-items-center justify-content-center text-center">
      <h2>
        <strong className="d-block">Welcome to my first website made with <br/>React + TypeScript</strong>
        <label className="d-block mt-2 fs-5">In this web application you can check the games available on each platform (PC, PS, Xbox, Nintendo).</label>
        <label className="d-block mt-2 fs-5">The web is connected to an external API called <a href="https://rawg.io/apidocs" target="_blank">RAWG</a>.</label>
      </h2>
      <h4></h4>
    </main>
  );
}



export default Home;