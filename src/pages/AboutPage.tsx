import React from 'react';
import { motion } from 'framer-motion';
import { Certificate } from 'types';

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

const AboutPage: React.FC = () => {
  const certificates: Certificate[] = [
    { 
      title: 'Fundamentals of Neuroscience', 
      url: 'https://courses.edx.org/certificates/938648f61df1464c830369917ea04d85',
      certNumber: 1 
    },
    { 
      title: 'Fundamentals of Neuroscience', 
      url: 'https://courses.edx.org/certificates/a2ccc2ed3a794722a7b6f0d7cf5dd003',
      certNumber: 2
    },
    { 
      title: 'Fundamentals of Neuroscience', 
      url: 'https://courses.edx.org/certificates/828371c0837348afb1c651f695d3ee03',
      certNumber: 3
    },
    { 
      title: 'Introduction to Psychology', 
      url: 'https://coursera.org/share/e6c0c718ce4b51868720ea2e592a0a53' 
    },
    { 
      title: 'The Nature of Code', 
      url: 'https://www.kadenze.com/certificates/verified/47ULJSV0?utm_campaign=certificate_share&utm_content=certificate%3D47ULJSV0&utm_medium=share&utm_source=kadenze' 
    },
    { 
      title: 'The Mind and Artificial Intelligence', 
      url: 'https://coursera.org/share/15e031e5e371c46bb0f383a07c049b06' 
    },
    { 
      title: 'Digitalisation in the Aerospace Industry', 
      url: 'https://www.coursera.org/account/accomplishments/certificate/EHTSNTQ5HFFW' 
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
      <section id="About Me">
        <div>
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <h1>About Me.</h1>
            <h4>Here is a bit about my story.</h4>
          </div>
          
          <div className="col-md-12" style={{ textAlign: 'left' }}>
            <p className="p2">
              It all began one day in 1995 when I arrived home from school to find
              my father sitting behind this beige box. He excitedly calls me over, loads up a game called DOOM, puts it in 'nightmare mode' 
              and announces "Good luck!" as he runs away giggling. I'm hooked - not just by the game, but the sheer magic of this amazing machine.
              We spend the following years bonding over this alien technology. Advances in hardware, software and then of course the internet 
              never ceases in it's ability to amaze me and it becomes the focus of my interests.
            </p>
          </div>
          
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <p className="p4">My first PC - Intels 486DX-100. This was the bleeding edge technology in the mid 90's!</p>
            <img src="/images/486Damian_Swierczynski.jpg" className="d-block w-50" alt="First PC" />
          </div>
          
          <div className="col-md-12" style={{ textAlign: 'left' }}>
            <p className="p2">
              After high school I complete a Cert 4 in Design Fundamentals and then enter a Bachelors in Digital Design, which opens my eyes 
              to how computation will create up a new era of how we go about our way of life. Sound production, film and television, and print 
              are my areas of focus - and during my second year of study I am offered a job working for a company that designs and prints for 
              the likes of Billabong, Rip Curl and Morrison Media. I fall in love with the print machinery and am placed in charge of overseeing 
              the digital print operations.
            </p>
            
            <p className="p2">
              After some years, I find myself working as a freelance artist, affording me the opportunity to work from home. But just working in 
              design is not captivating me - I need to be around hardware. So I broaden my knowledge in other areas: Security and Broadcasting Technologies.
            </p>
            
            <p className="p2">
              I then start to become aware of something; where my knowledge in computational technologies has grown, for many others it hasn't even started. 
              Particularly the generations before me. I see it that if I am the one to identify a problem, then it is my responsibility to find a solution 
              for it. So I begin to go back into a freelance / consultant role where I offer my expertise towards locally run businesses that are struggling 
              to compete with the giants. I not only guide them towards finding ways in using technology to stay in business but also teach them how to 
              understand it themselves and stay ahead of the curve.
            </p>
            
            <p className="p2">
              Then I read a book called "A New Kind Of Science" by Stephen Wolfram. It changes the way I see the world by introducing me to Emergence and 
              Complexity Theory. I immediatley know that I need to learn how to program. My first program is done without using a computer - by running 
              simple rules and marking graph paper. It's at this point I acknowledged that I needed to upgrade my skillset and learn to code.
            </p>
            
            <div className="col-md-12" style={{ textAlign: 'center' }}>
              <p className="p4">My first program, Wolfram's Rule 30 Cellular Automata, completed by hand.</p>
              <img src="/images/rule30.jpg" className="d-block w-50" alt="Rule 30" />
            </div>
            
            <p className="p2">
              I had also recognised around this time that there is something more happening aside from this push into the digital paradigm - that we as 
              humans have started to undergo a transition to something greater. The rise of artificial intelligence has pushed us into a new era where 
              we are asking some very interesting questions about ourselves. So I decide to embark on a new journey to better understand where we are 
              heading and return to my home a Griffith University, to study yet another emerging area - Intelligent Digital Technologies, where I get a 
              taste of engineering, computer science and IT. This is where I find myself today, with the goal to be the creative, fun and caring 
              character that this industry needs at it's core.
            </p>
            
            <p className="p2">
              Since returning I have been an active participant of workshops hosted at university. Taking part in Griffith MATE Bystander program - teaching 
              leadership and positive bystander actions that create an environment where everyone feels safe and respected, the Intercultural Communication 
              program where we developed significant tools towards being culturally astute to be able to thrive in a global work environment and Science PLUS, 
              a professional learning program designed towards the personal and professional development of skills required for success in industries related 
              to science, technology engineering and mathematics.
            </p>
          </div>
          
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <img src="/images/bottom.png" className="d-block w-50" alt="Divider" />
          </div>
          
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <h1>Extra-curricular studies.</h1>
            <h4>Taking the initiative to learn.</h4>
            <img src="/images/education.png" className="d-block w-50" alt="Education" />
          </div>
          
          <div className="col-md-12" style={{ textAlign: 'left' }}>
            <p className="p2">
              Being an autonomous learner, I have taken the initiative to further develop my skills and understandings of other industries that can hugely 
              benefit from modern emerging technologies. This has required me to display a high level of organizational and prioritization skills to be 
              successful, and resulted in a deep intrinsic fulfillment. You can view my credentials below:
            </p>
            
            <div className="col-md-12" style={{ textAlign: 'center' }}>
              <h4><strong>Completed Online Studies:</strong></h4>
              {certificates.map((cert, index) => (
                <h6 key={index}>
                  {cert.title}
                  <a 
                    className="contact-logo" 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Certificate {cert.certNumber ? cert.certNumber : ''}
                  </a>
                </h6>
              ))}
            </div>
          </div>
          
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <img src="/images/bottom.png" className="d-block w-50" alt="Divider" />
          </div>
          
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <h1>Software and Programming.</h1>
            <h4>Proficient across a wide range of technologies.</h4>
            <img src="/images/lang.png" className="d-block w-50" alt="Languages" />
          </div>
          
          <div className="col-md-12" style={{ textAlign: 'left' }}>
            <p className="p2">
              In addition to basic computer software applications such as Microsoft Word, Excel and Powerpoint and my history using design applications 
              including Adobe Photoshop, Illustrator and XD, I have developed proficiency in the programming languages shown above; HTML, CSS, Javascript, 
              P5.js, C, C++, Python, R and MongoDB.
            </p>
          </div>
          
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <img src="/images/bottom.png" className="d-block w-50" alt="Divider" />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;