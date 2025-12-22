import Hero from "./Hero";
import Popular from "./Popular";
import SuccessStory from "./SuccessStory";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-[#23467C] to-[#1B3C73]">
     <Hero></Hero>
     <Popular></Popular>
     <SuccessStory></SuccessStory>
    </div>
  );
};

export default Home;
