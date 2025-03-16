import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Carousel from 'components/ui/Carousel';

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const HomePage: React.FC = () => {
  const carouselItems = [
    {
      id: 1,
      image: '/images/4.png',
      title: 'Robotics and IoT\'s',
      caption: 'Check out some of my robotics projects.'
    },
    {
      id: 2,
      image: '/images/2.png',
      title: 'Programming for Visualisation and Entertainment',
      caption: 'See my projects page for more.'
    },
    {
      id: 3,
      image: '/images/3.png',
      title: 'Personal projects',
      caption: 'Braitenberg Vehicles and Obstacle Avoidance.'
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4" style={{ textAlign: 'center' }}>
            <img className="profile-pic" src="/images/profile-pic-large1.png" height="80%" alt="profile" />
          </div>
          <div className="col-lg-8" style={{ textAlign: 'center' }}>
            <h1>Jason O'Grady</h1>
            <h4>Bachelor of Intelligent Digital Technologies</h4>
            <p>
              Student of Intelligent Digital Technologies at Griffith University. Double major in Robotics and IoT's, 
              Programming for Visualisation and Entertainment.
            </p>
            <Link to="/about">
              <button type="button" className="shadow btn btn-outline-primary rounded-pill btn-lg">
                <i className="fas fa-user-tie"></i> About Me
              </button>
            </Link>
            <Link to="/projects">
              <button type="button" className="shadow btn btn-outline-primary rounded-pill btn-lg">
                <i className="fas fa-briefcase"></i> Projects
              </button>
            </Link>
            <Link to="/contact">
              <button type="button" className="shadow btn btn-outline-primary rounded-pill btn-lg">
                <i className="far fa-comment"></i> Contact Me
              </button>
            </Link>
          </div>
        </div>
        
        <p className="footer-padding" style={{ textAlign: 'center' }}>
          I'm currently studying an area that focusses on the design and development of complex adaptive technologies 
          and how to safely integrate them into our lives to solve the problems that we face across a wide range of industries 
          whilst ensuring sustainability for generations to come.
        </p>

        <Carousel items={carouselItems} />

        {/* Projects Section */}
        <section id="projects">
          <div className="row footer-padding">
            <div className="col-md-12" style={{ textAlign: 'center' }}>
              <h1>My work.</h1>
              <h4>Intelligent Digital Technologies.</h4>
              <p className="p2">
                Applying the fundamentals of ICT problem solving and high level programming skills, for applications in cutting edge fields
                such as the Internet of Things (IoTs), robotics, app and web development, big data analysis, and virtual reality (VR) and 
                augmented reality (AR) applications. Click below to see the projects I completed in my first year of study.
              </p>
              <Link to="/projects">
                <button type="button" className="shadow btn btn-primary rounded-pill btn-lg">
                  <i className="fas fa-briefcase"></i> Projects
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <div className="row footer-padding">
            <div className="col-md-12" style={{ textAlign: 'center' }}>
              <h1>My journey.</h1>
              <h4>Explore the path that made me who I am.</h4>
              <p className="p2">
                I've been at a technologist at heart my whole life and am always wanting to advance my knowledge in this field 
                and how they integrate into other industries. Let me share with you where this wonderful journey began and bring 
                you into the future I'm heading towards.
              </p>
              <Link to="/about">
                <button type="button" className="shadow btn btn-primary rounded-pill btn-lg">
                  <i className="fas fa-chalkboard-teacher"></i> About Me
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <div className="row footer-padding">
            <div className="col-md-12" style={{ textAlign: 'center' }}>
              <h1>I can help!</h1>
              <h4>It's what I love doing the most.</h4>
              <p className="p2">
                It's easy to get in touch - click contact below to send me a message directly, or if preferred you can get in touch 
                with me through my LinkedIn or Github linked in the footer of this page.
              </p>
              <Link to="/contact">
                <button type="button" className="shadow btn btn-primary rounded-pill btn-lg">
                  <i className="far fa-comment"></i> Contact Me
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default HomePage;