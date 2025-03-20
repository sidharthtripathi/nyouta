import React, { useEffect, useState } from "react";
import btnImg from "../assets/images/09.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import banImg1 from "../assets/images/weddingurl/1.jpg";
import banImg2 from "../assets/images/weddingurl/2.jpg";
import banImg3 from "../assets/images/weddingurl/3.jpg";
import banImg4 from "../assets/images/weddingurl/4.jpg";
import banImg5 from "../assets/images/weddingurl/5.jpg";
import banImg6 from "../assets/images/weddingurl/6.jpg";
import WeddingWebsiteLogin from "../components/WeddingWebsiteLogin";
import { getWeddingTemplates } from "../utils/Store/slices/weddingtemplateSlice";
import { getWeddingWebsitedata } from "../utils/Store/slices/weddingwebsiteSlice";
import { useSelector, useDispatch } from "react-redux";
import TemplateSection from "../components/TemplateSection";

const faqs = [
  {
    id: 1,
    question: "How do I create a website for my wedding?",
    answer:
      "From your free Nyouta account, click on Wedding Website. There, you'll be prompted to choose a template to edit your wedding website. Once you choose a template you'll be able to edit the texts, colours, layout, pages and details. You can also change the template whenever you want if you want to try different styles. When you're done, it's time to share it with your guests! But before you do, we suggest clicking on View as guest to double check that everything looks perfect.",
  },
  {
    id: 2,
    question: "Is it possible to create a wedding website for free?",
    answer:
      "Yes! With Nyouta you can easily create your wedding website in just a couple of clicks. Since we already have most of your wedding information, you'll notice most of your basic details are ready to go, so all you need to do is personalise your website and make it yours.",
  },
  {
    id: 3,
    question: "What should my Wedding Website contain?",
    answer:
      "When you create your Wedding Website, you'll notice that you have five pages: homepage, wedding blog, confirm attendance, contact us and guestbook. Your homepage should summarise your upcoming wedding plans and a personal message for your guests. Don't forget to include your favourite engagement photo! Next, you can use your blog to keep guests updated and take them along on your wedding planning journey.",
  },
  {
    id: 4,
    question: "Can my Wedding Website be private?",
    answer:
      "Yes, to ensure your privacy you have two options. Either you can include a welcome form that will pop up before anyone can see your Wedding Website. The form will collect the names and emails of your guests the first time they visit your website, letting you know who is looking at your website.",
  },
  {
    id: 5,
    question: "What's the point of a Wedding Website?",
    answer:
      "Your Wedding Website is your opportunity to easily share information as well as excitement with your guests. Tell them about what they can expect to help them get ready for your big day and give them a space to leave nice comments in your Guestbook page. All in all, your Wedding Website is a place for you to document your wedding journey and to keep guests in the loop and excited about the upcoming celebration!",
  },
];

const WeddingWebsitUrl = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { weddingTemplates } = useSelector((state) => state.weddingtemplates);

  useEffect(() => {
    if (weddingTemplates.length < 1) {
      dispatch(getWeddingTemplates());
    }
  }, []);

  useEffect(() => {
    dispatch(getWeddingWebsitedata());
  }, [dispatch]);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);

    // Here you would typically dispatch a login action
    // dispatch(loginUser(userData));

    console.log("User logged in:", userData);
  };

  // Entrance animations for main content
  const mainContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div>
      {showLogin && <WeddingWebsiteLogin onLogin={handleLogin} />}

      <motion.div
        initial="hidden"
        animate={!showLogin ? "visible" : "hidden"}
        variants={mainContentVariants}
      >
        <div className="lg:mx-24 mx-4 mt-2">
          <div className="h-80 sm:h-80 xl:h-80 2xl:h-96">
            <div className="carousel w-full">
              <div id="slide1" className="carousel-item relative w-full">
                <img src={banImg1} alt="Wedding template design 1" className="w-full h-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide6" className="btn btn-circle">
                    <ChevronLeft className="w-6 h-6" />
                  </a>
                  <a href="#slide2" className="btn btn-circle">
                    <ChevronRight className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div id="slide2" className="carousel-item relative w-full">
                <img src={banImg2} alt="Wedding template design 2" className="w-full h-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide1" className="btn btn-circle">
                    <ChevronLeft className="w-6 h-6" />
                  </a>
                  <a href="#slide3" className="btn btn-circle">
                    <ChevronRight className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div id="slide3" className="carousel-item relative w-full">
                <img src={banImg3} alt="Wedding template design 3" className="w-full h-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide2" className="btn btn-circle">
                    <ChevronLeft className="w-6 h-6" />
                  </a>
                  <a href="#slide4" className="btn btn-circle">
                    <ChevronRight className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div id="slide4" className="carousel-item relative w-full">
                <img src={banImg4} alt="Wedding template design 4" className="w-full h-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide3" className="btn btn-circle">
                    <ChevronLeft className="w-6 h-6" />
                  </a>
                  <a href="#slide5" className="btn btn-circle">
                    <ChevronRight className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div id="slide5" className="carousel-item relative w-full">
                <img src={banImg5} alt="Wedding template design 5" className="w-full h-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide4" className="btn btn-circle">
                    <ChevronLeft className="w-6 h-6" />
                  </a>
                  <a href="#slide6" className="btn btn-circle">
                    <ChevronRight className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div id="slide6" className="carousel-item relative w-full">
                <img src={banImg6} alt="Wedding template design 6" className="w-full h-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide5" className="btn btn-circle">
                    <ChevronLeft className="w-6 h-6" />
                  </a>
                  <a href="#slide1" className="btn btn-circle">
                    <ChevronRight className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <motion.div className="flex flex-col gap-6">
            <div className="mt-4">
              <h1 className="text-4xl text-secondary font-avalonN">
                Choose Your Designs Here...
              </h1>
              {user && (
                <p className="text-lg text-gray-600 mt-2">
                  Welcome, {user.name}! Select a template to start creating your
                  wedding website.
                </p>
              )}
            </div>
            <div>
              <TemplateSection weddingTemplates={weddingTemplates} />
            </div>
            <div className="relative flex items-center justify-center">
              <img className="h-8" src={btnImg} alt="Button background" />
              <button
                onClick={() => window.location.href = '/all-designs'}
                className="absolute text-lg text-white font-avalonB hover:text-gray-100"
              >
                View All Designs
              </button>
            </div>
          </motion.div>
        </div>
        <section className="relative py-16 bg-gradient-to-b lg:mt-10 from-rose-50 to-amber-50 overflow-hidden">
          {/* Interactive Steps Section */}

          {/* FAQ Section */}
          <section
            id="Faqs"
            className="py-16 px-6 bg-gradient-to-r from-purple-50 to-pink-50"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-800">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                  Wedding website questions? We're here to help.
                </p>
              </div>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border rounded-2xl bg-white shadow hover:shadow-xl transition-shadow duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                    >
                      <span className="text-lg font-medium text-gray-800">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`transition-transform duration-300 ${openId === faq.id ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    <div
                      className={`px-6 overflow-hidden transition-all duration-300 ${openId === faq.id
                        ? "max-h-40 opacity-100 py-4"
                        : "max-h-0 opacity-0"
                        }`}
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </motion.div>
    </div>
  );
};

export default WeddingWebsitUrl;
