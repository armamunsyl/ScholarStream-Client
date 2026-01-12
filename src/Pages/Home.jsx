import Hero from "./Hero";
import Popular from "./Popular";
import SuccessStory from "./SuccessStory";
import About from "./About";
import Contact from "./Contact";
import Blog from "./Blog";
import HelpSupport from "./HelpSupport";
import PrivacyTerms from "./PrivacyTerms";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-[#23467C] to-[#1B3C73] dark:from-[#0b1120] dark:to-[#0f172a]">
     <Hero></Hero>
     <Popular></Popular>
     <SuccessStory></SuccessStory>
     <About></About>
     <Contact></Contact>
     <Blog></Blog>
     <HelpSupport></HelpSupport>
     <PrivacyTerms></PrivacyTerms>
    </div>
  );
};

export default Home;
