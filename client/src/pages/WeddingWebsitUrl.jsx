import React, { useEffect, useState } from "react";
import btnImg from "../assets/images/09.png";
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import banImg1 from "../assets/images/weddingurl/1.jpg";
import banImg2 from "../assets/images/weddingurl/2.jpg";
import banImg3 from "../assets/images/weddingurl/3.jpg";
import banImg4 from "../assets/images/weddingurl/4.jpg";
import banImg5 from "../assets/images/weddingurl/5.jpg";
import banImg6 from "../assets/images/weddingurl/6.jpg";
import { getWeddingTemplates } from "../utils/Store/slices/weddingtemplateSlice";
import { getWeddingWebsitedata } from "../utils/Store/slices/weddingwebsiteSlice";
import { useSelector, useDispatch } from "react-redux";
import TemplateSection from "../components/TemplateSection";

// FAQ data
const faqs = [
  {
    id: 1,
    question: "How do I create a Wedding Website?",
    answer:
      "Creating a Wedding Website is easy! Simply sign up, choose a design template that matches your style, and customize it with your wedding details. You can add photos, stories, and all the important information your guests need to know.",
  },
  {
    id: 2,
    question: "Is my Wedding Website secure?",
    answer:
      "Yes, your Wedding Website is secure. You can choose to password-protect your site, and we use industry-standard security measures to protect your information.",
  },
  {
    id: 3,
    question: "Can I customize my Wedding Website?",
    answer:
      "Absolutely! Our Wedding Websites are fully customizable. You can change colors, fonts, add your own photos, and arrange the content exactly how you want it.",
  },
  {
    id: 4,
    question: "How do I share my Wedding Website with guests?",
    answer:
      "Once your Wedding Website is ready, you can share it via email, text message, or include the URL on your save-the-dates and invitations. If you've password-protected your site, make sure to share the password with your guests.",
  },
  {
    id: 5,
    question: "What's the point of a Wedding Website?",
    answer:
      "Your Wedding Website is your opportunity to easily share information as well as excitement with your guests. Tell them about what they can expect to help them get ready for your big day and give them a space to leave nice comments in your Guestbook page. All in all, your Wedding Website is a place for you to document your wedding journey and to keep guests in the loop and excited about the upcoming celebration!",
  },
];

const WeddingWebsitUrl = () => {
  const [openId, setOpenId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 6;
  const dispatch = useDispatch();
  const { weddingTemplates } = useSelector((state) => state.weddingtemplates);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (weddingTemplates.length < 1) {
      dispatch(getWeddingTemplates());
    }
  }, [dispatch, weddingTemplates.length]);

  useEffect(() => {
    dispatch(getWeddingWebsitedata());
  }, [dispatch]);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
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

  const handlePrevSlide = () => {
    setCurrentSlide(prev => prev === 1 ? totalSlides : prev - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => prev === totalSlides ? 1 : prev + 1);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={mainContentVariants}
    >
      <div className="lg:mx-24 mx-4 mt-2">
        <div className="relative h-80 sm:h-80 xl:h-80 2xl:h-96 overflow-hidden rounded-lg">
          <div className="carousel w-full h-full">
            {[banImg1, banImg2, banImg3, banImg4, banImg5, banImg6].map((img, index) => (
              <div
                key={index + 1}
                id={`slide${index + 1}`}
                className={`carousel-item absolute inset-0 w-full h-full transition-all duration-500 ${currentSlide === index + 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <img
                  src={img}
                  alt={`Wedding template design ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}

            {/* Navigation Buttons - Always Visible */}
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-20">
              <button
                onClick={handlePrevSlide}
                className="btn btn-circle bg-white/50 hover:bg-white/80 border-none shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={handleNextSlide}
                className="btn btn-circle bg-white/50 hover:bg-white/80 border-none shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index + 1)}
                  className={`w-2 h-2 rounded-full transition-all ${currentSlide === index + 1
                    ? 'bg-white w-4'
                    : 'bg-white/50'
                    }`}
                />
              ))}
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
            <img className="h-8" src={btnImg} alt="" />
            <a className="absolute text-lg text-white font-avalonB" href="">
              View All Designs
            </a>
          </div>
        </motion.div>

        <section className="relative py-16 bg-gradient-to-b lg:mt-10 from-rose-50 to-amber-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span className="font-medium text-gray-800">
                      {faq.question}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 transform transition-transform ${openId === faq.id ? "rotate-90" : ""
                        }`}
                    />
                  </button>
                  {openId === faq.id && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default WeddingWebsitUrl;
