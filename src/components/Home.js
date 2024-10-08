import { Link } from "react-router-dom"; // Link import 추가

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Sketchbook App</h1>
      <Link to="/sketchbook">Go to Sketchbook</Link> {/* Sketchbook으로 이동할 수 있는 링크 추가 */}
    </div>
  );
};

export default Home;
