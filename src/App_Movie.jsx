import { useState, useEffect } from "react";
import Movie from "./components/Movie";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    // localhost:8080 은 나중에 ALB 생성 후 DNS 로 변경 예정
    const response = await fetch(
      "http://sample-elb-1134798538.ap-northeast-2.elb.amazonaws.com:8080"
    );
    const json = await response.json();
    setMovies(json.movies);
    setIsLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      <h1>Movie App !</h1>
      {isLoading ? (
        "로딩중...."
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              coverImage={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
            />
          ))}
        </div>
      )}
    </>
  );
}
export default App;
