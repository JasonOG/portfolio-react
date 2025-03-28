import React from 'react';
import { motion } from 'framer-motion';
import ProjectAccordion from 'components/ui/ProjectAccordion';
import { Project } from 'types';

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

const ProjectsPage: React.FC = () => {
  const projects: Project[] = [
    {
      id: 'creative-coding',
      title: 'Creative Coding',
      description: 'Fun and games with ones and zeros.',
      content: `
        <p>This course taught how to code through the production of interactive art. We covered concepts such as using code to draw simple shapes, responding to user input, understanding the physics required to produce simple simulations, and how to apply filters to video and images in real-time. I developed a strong understanding of the fundamentals of coding, the use of mathematics in code as well as the ability to apply them to generative art, data visualisation, and interactive animations by utilising a Javascript based language, P5.js.</p>
        <div class="container-fluid2" align="center">
          <img src="/images/cc.png" class="d-block w-100" alt="Creative Coding Project">
        </div>
        <p>I loved this course so much, I went on to complete "The Nature of Code" by Dan Shiffman. This online course took the skills I had learnt an extra step further with developing visualisations of Newtonian physics systems, Autonomous Agents and Steering Behaviours with the P5.js library. For my final project I created a simulation using Genetic Algorithms that applies the four mechanisms found in genetics and evolutionary biology (Hardy Weinberg Principle, Genetic Drift, Selection and Mutation).</p>
      `,
      image: '/images/cc.png',
      learningOutcomes: [
        'Created interactive programs by understanding the graphics pipeline and handling user events.',
        'Solved programming problems that involve simple programming constructs such as variables, sequence, selection, iteration, and arrays.',
        'Developed software which is able to transform data over the network into visualisations and sonic experiences.',
        'Analysed and designed a modular program using functions and objects.',
        'Integrated visualisations into web pages using JavaScript libraries.'
      ]
    },
    {
      id: 'robotics-iot',
      title: 'Robotics and IoT\'s',
      description: 'Introduction to Robotics.',
      content: `
        <p>This course introduced me to the underlying architecture and principles of modern robotic hardware, software, and communication that build the foundation of modern Intelligent Systems. The course provided the knowledge of how components work together to define a system, and gave me an appreciation of the capabilities and limitations of computer and robotic systems. This knowledge assisted me in the design and development of using technologies to solve problems and provided a foundation for further study in the field of robotics.</p>
        <p>I applied this knowledge to develop intelligent robots and IoT devices. I designed and simulated a robot that creates a symbiosis with beneficial bacteria and fungi based on how the human nervous system connects with the stomach. The robot was designed to connect to the internet to order food and feed itself.</p>
        <div class="container-fluid2">
          <img src="/images/rob.png" class="d-block w-100" alt="Robotics Project">
        </div>
        <p>I also produced a short 1000 word report surrounding the future of autonomous vehicles and projected when we will see Level 5 fully self driving cars on our roads.</p>
      `,
      image: '/images/rob.png',
      learningOutcomes: [
        'Gained an understanding of robotic and IoT mechanisms in general.',
        'Developed basic and moderate knowledge of the use and capabilities of microcontrollers, sensors and actuators.',
        'Applied best practice processes to robot/IoT design and development.',
        'Demonstrated critical awareness of key issues related to robot and IoT development.'
      ]
    },
    {
      id: 'emerging-tech',
      title: 'Emerging Technologies',
      description: 'Peaking into the sustainable future of our planet.',
      content: `
        <p>I became acquainted with the nature of emerging digital technologies, and investigated how we can use these technologies to not only simplify, but also improve people's lives. With an emphasis in the development of problem-solving and communication, alongside base knowledge, these capacities enabled me to become both a participant and creator of the future digital world.</p>
        <p>I spent each week designing sustainable technologies for use across mobile technologies, eLearning, eHealth, eCommerce, 3D printing, Robotics, Autonomous Vehicles, Artificial Intelligence (AI), Internet of Things (IoTs) and developed prototypes for Augmented Reality applications.</p>
        <div class="container-fluid2">
          <img src="/images/et.png" class="d-block w-100" alt="Emerging Technologies Project">
        </div>
      `,
      image: '/images/et.png',
      learningOutcomes: [
        'Displayed the ability to describe capabilities of various emerging technologies and how multimedia design helps the users use the technologies efficiently and effectively.',
        'Identified the social impact of digital interactive technologies on society at global, local and personal levels in contexts such as business, education, entertainment, industry and medicine.',
        'Critically analysed the effectiveness of an emerging technology system by assessing the appropriateness of interface, implementation and interaction.',
        'Designed innovative technology concepts for an identified need/purpose using knowledge of digital emerging technologies alongside knowledge of design and human characteristics.'
      ]
    },
    {
      id: 'systems-dev',
      title: 'Systems Development',
      description: 'Applications to help those in need.',
      content: `
        <p>In this course, I became versed in how systems thinking can be used to tackle almost any problem imaginable, in order to identify the requirements (systems analysis) and find solutions to meet them (systems design). This course provided me with software development and acquisition competencies that are the underpinnings of ICT and Computer Science. I learnt how to plan the development of an information system, how to analyse and discover requirements, and then select the optimal design solution. Working in a team, we managed the system development processes by adopting an Agile methodology, currently a widely used project management approach applied in industry for software development.</p>
        <p>We designed the front and backend application for Meals on Wheels Australia using these tools and delivered the costings, estimated revenue projections and project timeframe for a mobile / web application that helps both the business and their clients in streamlining the processes required in providing food and services to those who experience disability and / or require aged care assistance.</p>
        <div class="container-fluid2">
          <img src="/images/sysdev.png" class="d-block w-100" alt="Systems Development Project">
        </div>
      `,
      image: '/images/sysdev.png',
      learningOutcomes: [
        'Demonstrated through the use of project management tools the ability to undertake a risk analysis, cost benefit analysis, estimate a budget and propose a project schedule for an information system and software development project.',
        'Used the Agile methodology to plan typical software development / acquisition activities.',
        'Applied appropriate techniques for requirements specification and process modelling.',
        'Applied techniques to document appropriate system models and software requirements.',
        'Explained techniques for implementation, testing, deployment, maintenance and revision.'
      ]
    },
    {
      id: 'software-tech',
      title: 'Software Technologies',
      description: 'Gazing into data from the past to help us today.',
      content: `
        <p>This course introduced me to the fundamental techniques required to develop and implement software systems in industry. I was exposed to key technologies to support the software system development process and utilised software tools to process, analyse and visualise business data for communication and collaboration purpose.</p>
        <p>Linked by data analysis and presentation tasks, this course used project management, scripting techniques, version control, and software testing to create desktop applications that make it simple to display visualisations of complex data for analytical purposes and heuristic interpretations to effectively communicate outcomes.</p>
        <p>Working with another team member, we brought together the skills we had learnt and used the programming language Python to develop data visualisation software based around vehicle accidents in Victoria from 2013 to 2019.</p>
        <div class="container-fluid2">
          <img src="/images/softtech.png" class="d-block w-100" alt="Software Technologies Project">
        </div>
      `,
      image: '/images/softtech.png',
      learningOutcomes: [
        'Identified key scripting languages used for various platforms.',
        'Wrote, debugged and tested scripts that includes selection, repetition and parameter passing.',
        'Initiated, planned, executed, documented, monitored, controlled, and closed a project.',
        'Described the importance of version control and its mechanism of action.',
        'Used version control software to create, modify and test a software application and its modules.',
        'Described and applied the principal approaches to software testing.',
        'Planned, analysed, designed, implemented, executed and evaluated the testing of a software system.',
        'Created documents, spreadsheets, and presentations using data presentation software.',
        'Wrote code to access and retrieve data from SQL databases and presented the data in a simple coded graphical interface.',
        'Used a scripting language to process and present data in a variety of formats.'
      ]
    },
    {
      id: 'big-data',
      title: 'Big Data Analytics',
      description: 'Training AI to help us during the COVID19 pandemic.',
      content: `
        <p>This course introduced me to the theory of Big Data and the analytical tools used for the implementation of the process of data to decisions (D2D). I was taught various Big Data formats, NoSQL Databases, processing platforms (Hadoop) and data analytics tools (Tableau and R) to transform, visualise, model, and communicate the insights hidden in the data. I developed the knowledge and skills that lay the foundations for more in-depth data analytics that allow one to make informed decisions across various industries.</p>
        <p>This introductory course had me apply the fundamentals of Big Data and it's applications with databases using data validation techniques, along with training Artificial Intelligence (AI) models to produce findings based on current COVID19 data collected from India.</p>
        <div class="container-fluid2">
          <img src="/images/bdata.png" class="d-block w-100" alt="Big Data Analytics Project">
        </div>
      `,
      image: '/images/bdata.png',
      learningOutcomes: [
        'Applied the principles of big data analytics in the data science process.',
        'Explained the seven V\'s of Big Data and how each impacts the data science process.',
        'Applied transferable skills across big data formats including big data processing platforms.',
        'Explored data using NoSQL queries in the MongoDB database.',
        'Applied AI and Big Data Analytics algorithms to discover interpretable insights for organisations.'
      ]
    },
    {
      id: 'personal-projects',
      title: 'Personal Projects',
      description: 'Obstacle Avoidance Vehicle',
      content: `
        <div class="container-fluid2">
          <h4><strong>Obstacle Avoidance Vehicle.</strong></h4>
          <div class="container-fluid2">
            <p><strong>Description</strong></p>
            <p>Since my introduction to robotics I've been wanting to make an autonomous vehicle. There's something about perception that interests me greatly and I really want to understand it better. So I set myself the task of developing a small obstacle avoidance vehicle using an arduino microcontroller.</p>
            <p>This is what we're aiming for:</p>
            <p style="text-align: center;"><img src="/images/3d_design.jpg" class="d-block w-75" alt="3D Design"></p>
            <p>The plan is to incorporate what I've learnt so far with basic sensors and challenge myself to create the code from beginning to end. The way in which our vehicle will operate is quite simple, it will drive forward and the ultrasonic sensor will keep measuring the distance from the vehicle to an obstacle. If it detects a collision, the vehicle will stop, look to it's left and right and change it's trajectory based on which side has the greater distance.</p>
          </div>
        </div>
      `,
      image: '/images/3d_design.jpg',
      learningOutcomes: [
        'Discovered the importance of "Divide and Conquer" - reducing into smaller parts and adding incrementally.',
        'Learnt how to overcome problems encountered by using components with low quality assurance. Hobby DC motors are quite fickle it seems.',
        'Gained hands on experience with creating and troubleshooting a robotic device without assistance.',
        'The project overall inspired me to take an elective in circuit board design and move towards designing my own PCB\'s for use.',
        'Inspired me to take the next step towards creating a Braitenberg Vehicle.'
      ]
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
      <section id="projects">
        <div>
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <h1>My work.</h1>
            <h4>Select below to check out some of my projects.</h4>
            <p className="p2">Here you can find examples of the work I have created in my first year of study.</p>
          </div>

          <ProjectAccordion projects={projects} />
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectsPage;