import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

interface Paper {
  id: number;
  title: string;
  authors: string;
  year: number;
  url: string;
  modelType: string;
  description: string;
  journal?: string;
  doi?: string;
  keywords?: string;
  citations: number[];
}

interface AddPaperForm {
  title: string;
  authors: string;
  year: number;
  url: string;
  description: string;
  modelType: string;
  journal: string;
  doi: string;
  keywords: string;
  citations: string; // Changed to string to hold comma-separated IDs
}

const ResearchPapersDashboard: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modelTypeFilter, setModelTypeFilter] = useState('all');
  const [yearRangeFilter, setYearRangeFilter] = useState([1940, 2025]);
  const [importedPapers, setImportedPapers] = useState<Paper[]>([]);
  const [relevantPapers, setRelevantPapers] = useState<number[]>([]);
  const [addPaperForm, setAddPaperForm] = useState<AddPaperForm>({
    title: '',
    authors: '',
    year: 2023,
    url: '',
    description: '',
    modelType: 'general',
    journal: '',
    doi: '',
    keywords: '',
    citations: '' // Changed to string
  });
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const predefinedPapers = [
    // Foundational AI & Early Neural Networks
    { id: 1, title: "A Logical Calculus of the Ideas Immanent in Nervous Activity", authors: "McCulloch & Pitts", year: 1943, url: "https://doi.org/10.1007/BF02478259", modelType: "neural-network", description: "First mathematical model of a neural network", citations: [] },
    { id: 2, title: "Computing Machinery and Intelligence", authors: "Alan Turing", year: 1950, url: "https://doi.org/10.1093/mind/LIX.236.433", modelType: "general", description: "Introduced the Turing Test and foundational concepts of AI", citations: [] },
    { id: 3, title: "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain", authors: "Frank Rosenblatt", year: 1958, url: "https://doi.org/10.1037/h0042519", modelType: "neural-network", description: "Introduced the perceptron, the first trainable neural network", citations: [1, 2] },
    { id: 4, title: "Steps Toward Artificial Intelligence", authors: "Marvin Minsky", year: 1961, url: "https://doi.org/10.1109/JRPROC.1961.287775", modelType: "general", description: "Outlined early AI research directions", citations: [2] },
    { id: 5, title: "Perceptrons: An Introduction to Computational Geometry", authors: "Minsky & Papert", year: 1969, url: "#", modelType: "neural-network", description: "Demonstrated limitations of single-layer perceptrons", citations: [3, 4] },
    { id: 6, title: "Learning representations by back-propagating errors", authors: "Rumelhart, Hinton & Williams", year: 1986, url: "https://doi.org/10.1038/323533a0", modelType: "neural-network", description: "Popularized the backpropagation algorithm for training neural networks", citations: [3, 5] },
    { id: 7, title: "Induction of Decision Trees", authors: "J. Ross Quinlan", year: 1986, url: "https://doi.org/10.1007/BF00116251", modelType: "tree", description: "Foundational paper on decision tree learning", citations: [4] },
    { id: 8, title: "Self-Organization and Associative Memory", authors: "Teuvo Kohonen", year: 1989, url: "#", modelType: "neural-network", description: "Introduced self-organizing maps", citations: [6] },
    
    // Machine Learning Foundations
    { id: 9, title: "A Training Algorithm for Optimal Margin Classifiers", authors: "Boser, Guyon, Vapnik", year: 1992, url: "https://doi.org/10.1145/130385.130401", modelType: "svm", description: "Introduced support vector machines", citations: [7] },
    { id: 10, title: "A Decision-Theoretic Generalization of On-Line Learning", authors: "Nicolo Cesa-Bianchi et al.", year: 1995, url: "https://doi.org/10.1006/jcss.1997.1465", modelType: "general", description: "Key paper on online learning theory", citations: [9] },
    { id: 11, title: "Long Short-Term Memory", authors: "Hochreiter & Schmidhuber", year: 1997, url: "https://doi.org/10.1162/neco.1997.9.8.1735", modelType: "recurrent", description: "Introduced LSTM networks for sequential data", citations: [6, 8] },
    { id: 12, title: "Gradient-Based Learning Applied to Document Recognition", authors: "LeCun, Bottou, Bengio, Haffner", year: 1998, url: "https://doi.org/10.1109/5.726791", modelType: "cnn", description: "Introduced LeNet-5 convolutional network architecture", citations: [6, 8] },
    { id: 13, title: "A Tutorial on Support Vector Machines for Pattern Recognition", authors: "Christopher J.C. Burges", year: 1998, url: "https://doi.org/10.1023/A:1009715923555", modelType: "svm", description: "Comprehensive explanation of SVMs", citations: [9] },
    { id: 14, title: "Reinforcement Learning: An Introduction", authors: "Richard S. Sutton, Andrew G. Barto", year: 1998, url: "#", modelType: "reinforcement", description: "Definitive textbook on reinforcement learning", citations: [4, 10] },
    
    // Early 2000s Advances
    { id: 15, title: "A Neural Probabilistic Language Model", authors: "Yoshua Bengio et al.", year: 2000, url: "https://doi.org/10.3115/1073012.1073017", modelType: "neural-network", description: "Early work on neural network language models", citations: [11, 12] },
    { id: 16, title: "A Comprehensive Survey of Evolutionary-Based Multiobjective Optimization Techniques", authors: "Carlos A. Coello Coello", year: 2000, url: "https://doi.org/10.1016/S0950-7051(98)00038-8", modelType: "evolutionary", description: "Review of evolutionary algorithms", citations: [] },
    { id: 17, title: "Random Forests", authors: "Leo Breiman", year: 2001, url: "https://doi.org/10.1023/A:1010933404324", modelType: "tree", description: "Introduced the random forest ensemble method", citations: [7, 13] },
    { id: 18, title: "A Few Useful Things to Know About Machine Learning", authors: "Pedro Domingos", year: 2003, url: "https://doi.org/10.1145/2347736.2347755", modelType: "general", description: "Overview of key machine learning concepts and pitfalls", citations: [9, 13, 17] },
    { id: 19, title: "A Fast Learning Algorithm for Deep Belief Nets", authors: "Hinton, Osindero, Teh", year: 2006, url: "https://doi.org/10.1162/neco.2006.18.7.1527", modelType: "deep-learning", description: "Breakthrough in training deep neural networks", citations: [6, 12, 15] },
    { id: 20, title: "Greedy Layer-Wise Training of Deep Networks", authors: "Yoshua Bengio et al.", year: 2007, url: "#", modelType: "deep-learning", description: "Improved methods for training deep networks", citations: [19] },
    { id: 21, title: "Acoustic Detection of Bird Communities: A Survey", authors: "M. Towsey, J. Wimmer, I. Williamson", year: 2008, url: "https://eprints.qut.edu.au/30751/", modelType: "bioacoustics", description: "Early comprehensive survey on bioacoustic bird detection", citations: [] },
    { id: 22, title: "An Introduction to Restricted Boltzmann Machines", authors: "Asja Fischer, Christian Igel", year: 2009, url: "https://doi.org/10.1007/978-3-642-33275-3_2", modelType: "deep-learning", description: "Overview of RBMs and their applications", citations: [19, 20] },
    
    // Deep Learning Revolution
    { id: 23, title: "Natural Language Processing (Almost) from Scratch", authors: "Collobert et al.", year: 2011, url: "https://www.jmlr.org/papers/volume12/collobert11a/collobert11a.pdf", modelType: "deep-learning", description: "Early application of deep learning to NLP", citations: [15, 19, 20] },
    { id: 24, title: "Practical Bayesian Optimization of Machine Learning Algorithms", authors: "Jasper Snoek, Hugo Larochelle, Ryan P. Adams", year: 2012, url: "#", modelType: "bayesian", description: "Key paper on hyperparameter optimization", citations: [18, 20] },
    { id: 25, title: "ImageNet Classification with Deep Convolutional Neural Networks", authors: "Krizhevsky, Sutskever, Hinton", year: 2012, url: "#", modelType: "cnn", description: "AlexNet paper that sparked the deep learning revolution in computer vision", citations: [12, 19, 20, 22] },
    { id: 26, title: "Representation Learning: A Review and New Perspectives", authors: "Yoshua Bengio, Aaron Courville, Pascal Vincent", year: 2013, url: "https://doi.org/10.1109/TPAMI.2013.50", modelType: "deep-learning", description: "Overview of representation learning techniques", citations: [19, 20, 22, 23, 25] },
    { id: 27, title: "Acoustic Event Detection: A Non-Intrusive Approach", authors: "D. Stowell, M. Plumbley", year: 2013, url: "https://doi.org/10.1016/j.mcn.2013.06.005", modelType: "bioacoustics", description: "Early application of machine learning to bioacoustics", citations: [21] },
    { id: 28, title: "Distributed Representations of Words and Phrases", authors: "Mikolov et al.", year: 2013, url: "#", modelType: "nlp", description: "Introduced Word2Vec", citations: [15, 23] },
    { id: 29, title: "Visualizing and Understanding Convolutional Networks", authors: "Matthew D. Zeiler, Rob Fergus", year: 2014, url: "https://doi.org/10.1007/978-3-319-10590-1_53", modelType: "cnn", description: "Improved understanding of CNN internal representations", citations: [25, 26] },
    { id: 30, title: "Generative Adversarial Nets", authors: "Ian Goodfellow et al.", year: 2014, url: "#", modelType: "gan", description: "Introduced the GAN framework", citations: [19, 25, 26] },
    { id: 31, title: "Adam: A Method for Stochastic Optimization", authors: "Diederik P. Kingma, Jimmy Ba", year: 2015, url: "https://arxiv.org/abs/1412.6980", modelType: "optimization", description: "Introduced the Adam optimizer", citations: [25, 26] },
    { id: 32, title: "Deep Learning", authors: "Yann LeCun, Yoshua Bengio, Geoffrey Hinton", year: 2015, url: "https://doi.org/10.1038/nature14539", modelType: "deep-learning", description: "Overview paper on deep learning in Nature", citations: [19, 23, 25, 26, 29, 30] },
    { id: 33, title: "Going Deeper with Convolutions", authors: "Szegedy et al.", year: 2015, url: "https://doi.org/10.1109/CVPR.2015.7298594", modelType: "cnn", description: "Introduced GoogLeNet/Inception architecture", citations: [25, 29] },
    { id: 34, title: "Deep Residual Learning for Image Recognition", authors: "He, Zhang, Ren, Sun", year: 2015, url: "https://doi.org/10.1109/CVPR.2016.90", modelType: "cnn", description: "Introduced ResNet architecture", citations: [25, 29, 33] },
    
    // Advanced Deep Learning & Bioacoustics
    { id: 35, title: "Automatic Bird Sound Detection: Logistic Regression Model", authors: "Lasseck, M.", year: 2016, url: "https://ceur-ws.org/Vol-1609/16090703.pdf", modelType: "bioacoustics", description: "Early machine learning approach to bird sound detection", citations: [21, 27] },
    { id: 36, title: "WaveNet: A Generative Model for Raw Audio", authors: "Oord et al.", year: 2016, url: "https://arxiv.org/abs/1609.03499", modelType: "audio", description: "Breakthrough in neural audio synthesis", citations: [30, 32] },
    { id: 37, title: "Attention Is All You Need", authors: "Vaswani et al.", year: 2017, url: "#", modelType: "transformer", description: "Introduced the Transformer architecture", citations: [23, 28, 32] },
    { id: 38, title: "Deep Neural Networks for Automated Bird Sound Classification", authors: "Salamon et al.", year: 2017, url: "https://doi.org/10.1121/1.4982647", modelType: "bioacoustics", description: "Seminal paper applying CNNs to bird sound classification", citations: [21, 27, 32, 35] },
    { id: 39, title: "Semi-Supervised Learning for Bird Sound Classification", authors: "Grill & Schlüter", year: 2017, url: "https://doi.org/10.1109/WASPAA.2017.8170116", modelType: "bioacoustics", description: "Applied attention mechanisms to bioacoustic classification", citations: [35, 37, 38] },
    { id: 40, title: "Automated Detection of Bat Echolocation Calls", authors: "Mac Aodha et al.", year: 2018, url: "https://doi.org/10.1111/2041-210X.13103", modelType: "bioacoustics", description: "Specialized deep learning for bat echolocation analysis", citations: [32, 38, 39] },
    { id: 41, title: "BERT: Pre-training of Deep Bidirectional Transformers", authors: "Devlin et al.", year: 2018, url: "https://arxiv.org/abs/1810.04805", modelType: "transformer", description: "Introduced the BERT model", citations: [28, 37] },
    { id: 42, title: "DeepSqueak: Detection and Classification of Ultrasonic Vocalizations", authors: "Coffey et al.", year: 2019, url: "https://doi.org/10.1038/s41386-018-0303-6", modelType: "bioacoustics", description: "Deep learning system for rodent vocalizations", citations: [38, 40] },
    { id: 43, title: "Mimicking the Bat Auditory Cortex for Bioacoustic Classification", authors: "Lopez-Paz et al.", year: 2019, url: "https://doi.org/10.1038/s41598-019-47335-w", modelType: "bioacoustics", description: "Bio-inspired neural network for bat call classification", citations: [38, 40] },
    { id: 44, title: "Hebbian Learning in a Self-Organizing Map for Bioacoustic Classification", authors: "Wilson et al.", year: 2019, url: "https://doi.org/10.1121/1.5111916", modelType: "bioacoustics", description: "Applied self-organizing maps to bioacoustic analysis", citations: [8, 38, 40] },
    { id: 45, title: "CNN-Based Approach for Marine Mammals", authors: "Shiu et al.", year: 2020, url: "https://doi.org/10.1109/TASLP.2020.2978234", modelType: "bioacoustics", description: "CNN approach for marine mammal sound detection", citations: [38, 39, 42] },
    { id: 46, title: "Neuromorphic Auditory Processing for Whale Song Classification", authors: "Yang et al.", year: 2020, url: "https://doi.org/10.1109/TBCAS.2020.2977295", modelType: "neuromorphic", description: "Neuromorphic computing approach for whale songs", citations: [38, 43, 44, 45] },
    { id: 47, title: "End-to-End Bioacoustic Call Recognition", authors: "Zhong et al.", year: 2020, url: "https://doi.org/10.1109/TASLP.2020.2987332", modelType: "bioacoustics", description: "End-to-end deep learning for bioacoustic classification", citations: [36, 38, 45] },
    { id: 48, title: "Predictive Coding Networks for Bioacoustic Event Detection", authors: "Keller & Giraud", year: 2020, url: "https://doi.org/10.1016/j.neucom.2020.01.068", modelType: "bioacoustics", description: "Predictive coding approach to bioacoustic detection", citations: [38, 43, 46] },
    { id: 49, title: "Reservoir Computing for Temporal Pattern Recognition in Bioacoustics", authors: "Maass et al.", year: 2020, url: "https://doi.org/10.1162/neco_a_01312", modelType: "bioacoustics", description: "Applied reservoir computing to bioacoustic temporal patterns", citations: [38, 43, 46, 47] },
    
    // Recent Advances
    { id: 50, title: "Self-Supervised Learning for Audio-to-Audio Search", authors: "Kahl et al.", year: 2021, url: "https://doi.org/10.1109/ICASSP.2021.9414774", modelType: "bioacoustics", description: "Self-supervised learning for bioacoustic search", citations: [38, 39, 47, 49] },
    { id: 51, title: "SpikeNet: A Spiking Neural Network for Bioacoustic Species Identification", authors: "Davies et al.", year: 2021, url: "https://doi.org/10.1109/TNNLS.2021.3062774", modelType: "neuromorphic", description: "Energy-efficient SNN approach for bioacoustic classification", citations: [43, 46, 48, 49] },
    { id: 52, title: "Domain Adaptation for Bioacoustic Event Detection", authors: "Zhang et al.", year: 2021, url: "https://doi.org/10.1109/ICASSP.2021.9413346", modelType: "bioacoustics", description: "Domain adaptation techniques for noisy environments", citations: [38, 45, 47, 50] },
    { id: 53, title: "Adaptive Resonance Theory for Bioacoustic Pattern Recognition", authors: "Grossberg et al.", year: 2021, url: "https://doi.org/10.1016/j.neunet.2021.03.012", modelType: "neuromorphic", description: "ART neural networks for bioacoustic patterns", citations: [43, 46, 51] },
    { id: 54, title: "Neuroevolution for Automatic Insect Sound Classification", authors: "Floreano et al.", year: 2021, url: "https://doi.org/10.1109/TEVC.2021.3068156", modelType: "evolutionary", description: "Evolutionary approach to neural network design for insect sounds", citations: [16, 38, 43, 46] },
    { id: 55, title: "An Image is Worth 16x16 Words: Transformers for Image Recognition", authors: "Dosovitskiy et al.", year: 2021, url: "https://arxiv.org/abs/2010.11929", modelType: "transformer", description: "Introduced Vision Transformer (ViT)", citations: [34, 37, 41] },
    { id: 56, title: "Automatic Classification of Elephant Rumbles", authors: "Stowell et al.", year: 2022, url: "https://doi.org/10.1121/10.0009855", modelType: "bioacoustics", description: "Specialized CNN-LSTM for elephant rumble analysis", citations: [38, 45, 47, 50, 51] },
    { id: 57, title: "BioSonar: A Bio-Inspired Framework for Echolocation", authors: "Chen et al.", year: 2022, url: "https://doi.org/10.1038/s42256-022-00475-7", modelType: "bioacoustics", description: "Bio-inspired framework for echolocation signals", citations: [40, 43, 46, 51, 53] },
    { id: 58, title: "Oscillatory Neural Networks for Rhythm Analysis", authors: "Kumar et al.", year: 2022, url: "https://doi.org/10.1162/neco_a_01467", modelType: "neuromorphic", description: "Oscillatory networks for vocalization rhythms", citations: [46, 49, 51, 53] },
    { id: 59, title: "Training language models to follow instructions with human feedback", authors: "OpenAI Team", year: 2022, url: "https://arxiv.org/abs/2203.02155", modelType: "nlp", description: "Introduced RLHF for language models (InstructGPT)", citations: [37, 41] },
    { id: 60, title: "Learning Transferable Visual Models From Natural Language", authors: "Radford et al.", year: 2021, url: "https://arxiv.org/abs/2103.00020", modelType: "multimodal", description: "Introduced CLIP model", citations: [41, 55] },
    { id: 61, title: "Scaling Laws for Neural Language Models", authors: "Kaplan et al.", year: 2020, url: "https://arxiv.org/abs/2001.08361", modelType: "nlp", description: "Investigated scaling properties of neural language models", citations: [41] },
    { id: 62, title: "SoundStream: An End-to-End Neural Audio Codec", authors: "Zeghidour et al.", year: 2022, url: "https://arxiv.org/abs/2107.03312", modelType: "audio", description: "End-to-end neural audio compression", citations: [36, 47] },
    { id: 63, title: "Attention Mechanism for Automated Ecoacoustic Event Detection", authors: "Sethi et al.", year: 2023, url: "https://doi.org/10.1111/2041-210X.13999", modelType: "bioacoustics", description: "Advanced attention mechanisms for ecoacoustics", citations: [37, 39, 50, 52, 56] },
    { id: 64, title: "Biologically-Inspired Neural Audio Processing", authors: "Johnson et al.", year: 2023, url: "https://doi.org/10.1109/TASLP.2023.3236789", modelType: "bioacoustics", description: "Bio-inspired approaches for environmental audio", citations: [43, 46, 51, 57, 58] },
    { id: 65, title: "BirdSNN: Efficient Spike-Based Bird Sound Recognition", authors: "Zhang et al.", year: 2023, url: "https://doi.org/10.1038/s41598-023-35789-y", modelType: "neuromorphic", description: "SNN optimization for bird sound recognition", citations: [38, 46, 51, 57, 58] },
    { id: 66, title: "Unsupervised Bioacoustic Event Detection with Diffusion-Based Models", authors: "Gauthier et al.", year: 2023, url: "https://doi.org/10.1109/ICASSP43922.2023.10095398", modelType: "bioacoustics", description: "Diffusion models for bioacoustic events", citations: [50, 63, 64] },
    { id: 67, title: "Cross-Modal Pretraining for Acoustic Transfer Learning", authors: "Richards et al.", year: 2023, url: "https://doi.org/10.1109/WASPAA56170.2023.10248271", modelType: "audio", description: "Cross-modal transfer learning for acoustics", citations: [50, 60, 62, 63] },
    { id: 68, title: "Neuro-Inspired Pooling for Multi-Species Classification", authors: "Anderson et al.", year: 2024, url: "https://doi.org/10.1038/s41598-024-51482-z", modelType: "bioacoustics", description: "Biologically-inspired pooling for multi-species classification", citations: [64, 65, 66] },
    { id: 69, title: "Energy-Efficient Distributed Bioacoustic Monitoring", authors: "Peterson et al.", year: 2024, url: "https://doi.org/10.1109/JIOT.2024.3352217", modelType: "bioacoustics", description: "Edge computing approaches for bioacoustic monitoring", citations: [51, 65, 68] },
    { id: 70, title: "Transformer-Based Multi-Modal Fusion for Biodiversity Monitoring", authors: "Reynolds et al.", year: 2024, url: "https://doi.org/10.1111/2041-210X.14123", modelType: "bioacoustics", description: "Transformer architecture for multi-modal biodiversity data", citations: [55, 63, 67, 68, 69] }
  ];

  // Load papers on initial render
  useEffect(() => {
    setPapers(predefinedPapers);
    setImportedPapers(predefinedPapers);
  }, []);

  // Resize handler for responsive SVG
  const handleResize = useCallback(() => {
    if (papers.length > 0) {
      drawGraph();
    }
  }, [papers]);

  // Set up resize listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // Redraw graph when filters change
  useEffect(() => {
    if (papers.length > 0) {
      drawGraph();
    }
  }, [papers, modelTypeFilter, yearRangeFilter]);

  // Get color for model type
  const getModelTypeColor = (modelType: string) => {
    const colorMap: {[key: string]: string} = {
      'general': '#6c757d',
      'neural-network': '#007bff',
      'deep-learning': '#0056b3',
      'cnn': '#17a2b8',
      'recurrent': '#6610f2',
      'transformer': '#6f42c1',
      'svm': '#fd7e14',
      'tree': '#28a745',
      'reinforcement': '#e83e8c',
      'bayesian': '#20c997',
      'gan': '#dc3545',
      'evolutionary': '#ffc107',
      'bioacoustics': '#009688',
      'audio': '#03a9f4',
      'nlp': '#3f51b5',
      'multimodal': '#795548',
      'optimization': '#ff5722',
      'neuromorphic': '#e91e63'
    };
    return colorMap[modelType] || '#6c757d';
  };

  // Get readable name for model type
  const getModelTypeName = (modelType: string) => {
    const nameMap: {[key: string]: string} = {
      'general': 'General AI',
      'neural-network': 'Neural Network',
      'deep-learning': 'Deep Learning',
      'cnn': 'Convolutional Neural Network',
      'recurrent': 'Recurrent Neural Network',
      'transformer': 'Transformer',
      'svm': 'Support Vector Machine',
      'tree': 'Decision Tree',
      'reinforcement': 'Reinforcement Learning',
      'bayesian': 'Bayesian Methods',
      'gan': 'Generative Adversarial Network',
      'evolutionary': 'Evolutionary Algorithm',
      'bioacoustics': 'Bioacoustics',
      'audio': 'Audio Processing',
      'nlp': 'Natural Language Processing',
      'multimodal': 'Multimodal Learning',
      'optimization': 'Optimization',
      'neuromorphic': 'Neuromorphic Computing'
    };
    return nameMap[modelType] || modelType;
  };

  // Enhanced comprehensive search function
  const searchPaper = (paper: Paper, term: string) => {
    if (!term) return true;
    
    const searchTerm = term.toLowerCase();
    
    // Search in all text fields
    return (
      paper.title.toLowerCase().includes(searchTerm) ||
      paper.authors.toLowerCase().includes(searchTerm) ||
      paper.description.toLowerCase().includes(searchTerm) ||
      (paper.journal || '').toLowerCase().includes(searchTerm) ||
      (paper.doi || '').toLowerCase().includes(searchTerm) ||
      (paper.keywords || '').toLowerCase().includes(searchTerm) ||
      paper.modelType.toLowerCase().includes(searchTerm) ||
      paper.year.toString().includes(searchTerm) ||
      getModelTypeName(paper.modelType).toLowerCase().includes(searchTerm)
    );
  };

  // Draw the visualization graph
  const drawGraph = () => {
    if (!svgRef.current || !containerRef.current) return;
    
    // Get container dimensions for responsive sizing
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = Math.min(window.innerHeight * 3, 1600); // Limit height
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    // Set SVG dimensions to fit container
    svg.attr("width", containerWidth)
       .attr("height", containerHeight);
    
    const margin = { top: 40, right: 30, bottom: 40, left: 80 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
      
    // Filter papers based on selected criteria
    const filteredPapers = papers.filter(paper => {
      const matchesSearch = searchPaper(paper, searchTerm);
      const matchesModelType = modelTypeFilter === 'all' || paper.modelType === modelTypeFilter;
      const matchesYearRange = paper.year >= yearRangeFilter[0] && paper.year <= yearRangeFilter[1];
      
      return matchesSearch && matchesModelType && matchesYearRange;
    });
    
    // If no papers match filters, show a message
    if (filteredPapers.length === 0) {
      g.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .text("No papers match your filters")
        .style("font-size", "16px")
        .style("fill", "#666");
      return;
    }
    
    // Create nodes and links
    const nodes = filteredPapers.map(paper => ({
      id: paper.id,
      title: paper.title,
      authors: paper.authors,
      year: paper.year,
      url: paper.url,
      description: paper.description,
      modelType: paper.modelType,
      citations: paper.citations
    }));
    
    // Create citation links (blue)
    const citationLinks: any[] = [];
    nodes.forEach(source => {
      source.citations.forEach((targetId: number) => {
        const target = nodes.find(n => n.id === targetId);
        if (target) {
          citationLinks.push({
            source,
            target,
            type: 'citation'
          });
        }
      });
    });
    
    // Create influence links based on temporal and conceptual relationships (black)
    const influenceLinks: any[] = [];
    const nodesByYear = d3.group(nodes, d => d.year);
    const years = Array.from(nodesByYear.keys()).sort();
    
    for (let i = 0; i < years.length - 1; i++) {
      const currentYearNodes = nodesByYear.get(years[i]);
      const nextYearNodes = nodesByYear.get(years[i + 1]);
      
      if (currentYearNodes && nextYearNodes) {
        currentYearNodes.forEach(source => {
          nextYearNodes.forEach(target => {
            if (source.modelType === target.modelType) {
              influenceLinks.push({
                source,
                target,
                type: 'influence'
              });
            }
          });
        });
      }
    }
    
    // Combine all links
    const links = [...citationLinks, ...influenceLinks];
    
    // Create time scale for Y axis
    const timeScale = d3.scaleLinear()
      .domain([
        d3.min(nodes, d => d.year) || 1940, 
        d3.max(nodes, d => d.year) || 2025
      ])
      .range([50, height - 50]);
      
    // Create horizontal position scale
    const xScale = d3.scalePoint()
      .domain(Array.from(new Set(nodes.map(d => d.modelType))))
      .range([50, width - 50])
      .padding(0.5);
      
    // Draw Y axis (time)
    const yAxis = d3.axisLeft(timeScale)
      .tickFormat(d => d.toString())
      .ticks(5); // Reduced number of ticks for better display
      
    g.append("g")
      .attr("class", "y-axis")
      .call(yAxis);
      
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .text("Year");
      
    // Draw links
    g.append("g")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", (d: any) => {
        const x1 = xScale(d.source.modelType) || 0;
        const y1 = timeScale(d.source.year);
        const x2 = xScale(d.target.modelType) || 0;
        const y2 = timeScale(d.target.year);
        
        return `M${x1},${y1} C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}`;
      })
      .attr("stroke", (d: any) => d.type === 'citation' ? 'blue' : 'black')
      .attr("stroke-width", 1)
      .attr("fill", "none")
      .attr("opacity", 0.5);
      
    // Draw nodes
    g.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.modelType) || 0)
      .attr("cy", d => timeScale(d.year))
      .attr("r", 6)
      .attr("fill", d => getModelTypeColor(d.modelType))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .on("mouseover", (event: any, d: any) => {
        const tooltip = d3.select(tooltipRef.current);
        tooltip.style("opacity", 1)
          .html(`<strong>${d.title}</strong><br/>
                 <em>${d.authors} (${d.year})</em><br/>
                 ${getModelTypeName(d.modelType)}<br/>
                 ${d.description}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => {
        d3.select(tooltipRef.current).style("opacity", 0);
      })
      .on("click", (event: any, d: any) => {
        setSelectedPaper(d);
      });
      
    // Add title for each model type
    const modelTypes = Array.from(new Set(nodes.map(d => d.modelType)));
    g.append("g")
      .selectAll("text")
      .data(modelTypes)
      .enter()
      .append("text")
      .attr("x", d => xScale(d) || 0)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .style("fill", d => getModelTypeColor(d))
      .text(d => getModelTypeName(d));
      
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 120}, 20)`);
      
    legend.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 20)
      .attr("y2", 0)
      .attr("stroke", "black")
      .attr("stroke-width", 2);
      
    legend.append("text")
      .attr("x", 25)
      .attr("y", 5)
      .text("Influence")
      .style("font-size", "12px");
      
    legend.append("line")
      .attr("x1", 0)
      .attr("y1", 20)
      .attr("x2", 20)
      .attr("y2", 20)
      .attr("stroke", "blue")
      .attr("stroke-width", 2);
      
    legend.append("text")
      .attr("x", 25)
      .attr("y", 25)
      .text("Citation")
      .style("font-size", "12px");
  };
  
  // Generate BibTeX key according to standard format: FirstAuthorLastName[Year]
  const generateBibTexKey = (authors: string, year: number) => {
    if (!authors) return `Unknown${year}`;
    // Extract first author's last name
    const firstAuthor = authors.split(',')[0].trim();
    const lastName = firstAuthor.split(' ').pop() || '';
    // Remove special characters and spaces
    const cleanLastName = lastName.replace(/[^\w]/g, '');
    return `${cleanLastName}${year}`;
  };

  // Generate BibTeX entry for a paper
  const generateBibTeX = (paper: Paper) => {
    const bibKey = generateBibTexKey(paper.authors, paper.year);
    const authorsFormatted = paper.authors.replace(/ & /g, ' and ');
    
    let bibEntry = `@article{${bibKey},\n`;
    bibEntry += `  title = {${paper.title}},\n`;
    bibEntry += `  author = {${authorsFormatted}},\n`;
    bibEntry += `  year = {${paper.year}},\n`;
    
    if (paper.journal) {
      bibEntry += `  journal = {${paper.journal}},\n`;
    }
    
    if (paper.doi) {
      bibEntry += `  doi = {${paper.doi}},\n`;
    } else if (paper.url) {
      bibEntry += `  url = {${paper.url}},\n`;
    }
    
    if (paper.keywords) {
      bibEntry += `  keywords = {${paper.keywords}},\n`;
    }
    
    // Add model type as a keyword
    bibEntry += `  keywords = {${getModelTypeName(paper.modelType)}},\n`;
    
    bibEntry += `  note = {${paper.description}}\n`;
    bibEntry += `}\n\n`;
    
    return bibEntry;
  };

  // Download file with given content and filename
  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate and download BibTeX file for a single paper
  const downloadBibTeX = (paper: Paper) => {
    const bibEntry = generateBibTeX(paper);
    const bibKey = generateBibTexKey(paper.authors, paper.year);
    downloadFile(bibEntry, `${bibKey}.bib`, 'text/plain');
  };

  // Generate and download BibTeX file for all papers or selected papers
  const downloadFullBibTeX = (selectedOnly = false) => {
    let papersToExport = selectedOnly ? papers.filter(p => relevantPapers.includes(p.id)) : importedPapers;
    let allBibEntries = papersToExport.map(generateBibTeX).join('');
    downloadFile(allBibEntries, 'research_papers_database.bib', 'text/plain');
  };

  const toggleRelevant = (paperId: number) => {
    if (relevantPapers.includes(paperId)) {
      setRelevantPapers(relevantPapers.filter(id => id !== paperId));
    } else {
      setRelevantPapers([...relevantPapers, paperId]);
    }
  };

  const handleAddPaper = () => {
    if (!addPaperForm.title || !addPaperForm.authors) return;
    
    const newId = Math.max(...papers.map(p => p.id)) + 1;
    const newPaper = {
      id: newId,
      title: addPaperForm.title,
      authors: addPaperForm.authors,
      year: parseInt(addPaperForm.year.toString()),
      url: addPaperForm.url,
      doi: addPaperForm.doi,
      journal: addPaperForm.journal,
      keywords: addPaperForm.keywords,
      description: addPaperForm.description,
      modelType: addPaperForm.modelType,
      citations: addPaperForm.citations.length > 0 ? 
        addPaperForm.citations.split(',').map(id => parseInt(id.trim())) : []
    };
    
    setPapers([...papers, newPaper]);
    setImportedPapers([...importedPapers, newPaper]);
    
    // Reset form
    setAddPaperForm({
      title: '',
      authors: '',
      year: 2023,
      url: '',
      doi: '',
      journal: '',
      keywords: '',
      description: '',
      modelType: 'general',
      citations: ''
    });
  };
  
  const modelTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'general', label: 'General AI' },
    { value: 'neural-network', label: 'Neural Network' },
    { value: 'deep-learning', label: 'Deep Learning' },
    { value: 'cnn', label: 'Convolutional Neural Network' },
    { value: 'recurrent', label: 'Recurrent Neural Network' },
    { value: 'transformer', label: 'Transformer' },
    { value: 'svm', label: 'Support Vector Machine' },
    { value: 'tree', label: 'Decision Tree' },
    { value: 'reinforcement', label: 'Reinforcement Learning' },
    { value: 'bayesian', label: 'Bayesian Methods' },
    { value: 'gan', label: 'Generative Adversarial Network' },
    { value: 'evolutionary', label: 'Evolutionary Algorithm' },
    { value: 'bioacoustics', label: 'Bioacoustics' },
    { value: 'audio', label: 'Audio Processing' },
    { value: 'nlp', label: 'Natural Language Processing' },
    { value: 'multimodal', label: 'Multimodal Learning' },
    { value: 'optimization', label: 'Optimization' },
    { value: 'neuromorphic', label: 'Neuromorphic Computing' }
  ];
  
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-center mb-6">Honours Thesis Research Papers</h1>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Filter Papers</h5>
              <div className="mb-3">
                <label className="form-label">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search titles, authors, keywords..."
                  className="form-control"
                />
                <small className="text-muted">Searches across all paper fields</small>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Model Type</label>
                <select
                  value={modelTypeFilter}
                  onChange={(e) => setModelTypeFilter(e.target.value)}
                  className="form-select"
                >
                  {modelTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Year Range: {yearRangeFilter[0]} - {yearRangeFilter[1]}</label>
                <div className="d-flex gap-2">
                  <input
                    type="range"
                    min="1940"
                    max="2025"
                    value={yearRangeFilter[0]}
                    onChange={(e) => setYearRangeFilter([parseInt(e.target.value), yearRangeFilter[1]])}
                    className="form-range"
                  />
                  <input
                    type="range"
                    min="1940"
                    max="2025"
                    value={yearRangeFilter[1]}
                    onChange={(e) => setYearRangeFilter([yearRangeFilter[0], parseInt(e.target.value)])}
                    className="form-range"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Add New Paper</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Title*</label>
                  <input
                    type="text"
                    value={addPaperForm.title}
                    onChange={(e) => setAddPaperForm({...addPaperForm, title: e.target.value})}
                    placeholder="Paper title"
                    className="form-control"
                  />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label">Authors*</label>
                  <input
                    type="text"
                    value={addPaperForm.authors}
                    onChange={(e) => setAddPaperForm({...addPaperForm, authors: e.target.value})}
                    placeholder="Author(s)"
                    className="form-control"
                  />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label">Year</label>
                  <input
                    type="number"
                    value={addPaperForm.year}
                    onChange={(e) => setAddPaperForm({...addPaperForm, year: Number(e.target.value)})}
                    min="1940"
                    max="2025"
                    className="form-control"
                  />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label">Journal/Conference</label>
                  <input
                    type="text"
                    value={addPaperForm.journal}
                    onChange={(e) => setAddPaperForm({...addPaperForm, journal: e.target.value})}
                    placeholder="Journal or conference name"
                    className="form-control"
                  />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label">DOI</label>
                  <input
                    type="text"
                    value={addPaperForm.doi}
                    onChange={(e) => setAddPaperForm({...addPaperForm, doi: e.target.value})}
                    placeholder="10.xxxx/xxxxx"
                    className="form-control"
                  />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label">URL</label>
                  <input
                    type="text"
                    value={addPaperForm.url}
                    onChange={(e) => setAddPaperForm({...addPaperForm, url: e.target.value})}
                    placeholder="https://..."
                    className="form-control"
                  />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label">Model Type</label>
                  <select
                    value={addPaperForm.modelType}
                    onChange={(e) => setAddPaperForm({...addPaperForm, modelType: e.target.value})}
                    className="form-select"
                  >
                    {modelTypes.slice(1).map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-4">
                  <label className="form-label">Keywords</label>
                  <input
                    type="text"
                    value={addPaperForm.keywords}
                    onChange={(e) => setAddPaperForm({...addPaperForm, keywords: e.target.value})}
                    placeholder="deep learning, bioacoustics, ..."
                    className="form-control"
                  />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label">Citations (IDs, comma-separated)</label>
                  <input
                    type="text"
                    value={addPaperForm.citations}
                    onChange={(e) => setAddPaperForm({...addPaperForm, citations: e.target.value})}
                    placeholder="1, 4, 7"
                    className="form-control"
                  />
                </div>
                
                <div className="col-md-8">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    value={addPaperForm.description}
                    onChange={(e) => setAddPaperForm({...addPaperForm, description: e.target.value})}
                    placeholder="Brief description"
                    className="form-control"
                  />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label">&nbsp;</label>
                  <button
                    onClick={handleAddPaper}
                    className="btn btn-primary w-100"
                  >
                    Add Paper
                  </button>
                </div>
              </div>
              
              <div className="d-flex justify-content-between mt-4">
                <div className="small text-muted">
                  BibTeX filename format: <strong>FirstAuthorLastNameYear.bib</strong>
                </div>
                <div>
                  <button
                    onClick={() => downloadFullBibTeX(false)}
                    className="btn btn-success me-2"
                  >
                    Export All as BibTeX
                  </button>
                  <button
                    onClick={() => downloadFullBibTeX(true)}
                    className="btn btn-warning"
                    disabled={relevantPapers.length === 0}
                  >
                    Export Relevant as BibTeX
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title">Available Papers</h5>
                <div className="d-flex">
                  <button 
                    className="btn btn-sm btn-warning me-2"
                    title="Show only highlighted relevant papers"
                    onClick={() => setImportedPapers(
                      relevantPapers.length === 0 ? 
                        papers : 
                        papers.filter(p => relevantPapers.includes(p.id))
                    )}
                  >
                    Show Relevant
                  </button>
                  <button 
                    className="btn btn-sm btn-secondary"
                    title="Show all papers"
                    onClick={() => setImportedPapers(papers)}
                  >
                    Show All
                  </button>
                </div>
              </div>
              <p className="small text-muted mb-2">★ = Highlighted as relevant paper</p>
              <div style={{height: '1600px', overflowY: 'auto'}}>
                <ul className="list-group">
                  {importedPapers.map(paper => (
                    <li 
                      key={paper.id} 
                      className={`list-group-item list-group-item-action ${selectedPaper?.id === paper.id ? 'active' : ''}`}
                      onClick={() => setSelectedPaper(paper)}
                    >
                      <div className="d-flex justify-content-between">
                        <p className="mb-0 text-truncate">{paper.title}</p>
                        <button
                          className="btn btn-sm p-0 ms-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRelevant(paper.id);
                          }}
                        >
                          <span className={`${relevantPapers.includes(paper.id) ? 'text-warning' : 'text-muted'} fw-bold`}>★</span>
                        </button>
                      </div>
                      <p className="small mb-0">{paper.authors} ({paper.year})</p>
                      <p className="small text-muted mb-0">{getModelTypeName(paper.modelType)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="card shadow overflow-hidden">
            <div ref={containerRef} style={{position: 'relative', height: '1600px'}}>
              <svg ref={svgRef}></svg>
              <div 
                ref={tooltipRef} 
                className="position-absolute bg-white p-2 border rounded shadow small"
                style={{opacity: 0, pointerEvents: 'none'}}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {selectedPaper && (
        <div className="card shadow mt-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title">{selectedPaper.title}</h5>
              <button 
                onClick={() => setSelectedPaper(null)}
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <p className="mb-2"><span className="fw-bold">Authors:</span> {selectedPaper.authors}</p>
            <p className="mb-2"><span className="fw-bold">Year:</span> {selectedPaper.year}</p>
            <p className="mb-2"><span className="fw-bold">Type:</span> {getModelTypeName(selectedPaper.modelType)}</p>
            <p className="mb-2"><span className="fw-bold">Description:</span> {selectedPaper.description}</p>
            {selectedPaper.url && (
              <p className="mb-2">
                <span className="fw-bold">URL:</span>{" "}
                <a 
                  href={selectedPaper.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary"
                >
                  {selectedPaper.url}
                </a>
              </p>
            )}
            
            <div className="row">
              <div className="col-md-6">
                <p className="fw-bold">Citations:</p>
                <ul className="list-group">
                  {selectedPaper.citations.length === 0 && <li className="list-group-item text-muted">No citations</li>}
                  {selectedPaper.citations.map(citationId => {
                    const citedPaper = papers.find(p => p.id === citationId);
                    return citedPaper ? (
                      <li key={citationId} className="list-group-item list-group-item-action" onClick={() => setSelectedPaper(citedPaper)}>
                        {citedPaper.title} ({citedPaper.year})
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
              
              <div className="col-md-6">
                <p className="fw-bold">Cited by:</p>
                <ul className="list-group">
                  {papers.filter(p => p.citations.includes(selectedPaper.id)).length === 0 && 
                    <li className="list-group-item text-muted">Not cited by other papers</li>
                  }
                  {papers.filter(p => p.citations.includes(selectedPaper.id)).map(paper => (
                    <li key={paper.id} className="list-group-item list-group-item-action" onClick={() => setSelectedPaper(paper)}>
                      {paper.title} ({paper.year})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-3">
              <button 
                className="btn btn-sm btn-outline-primary me-2" 
                onClick={() => downloadBibTeX(selectedPaper)}
              >
                Download BibTeX
              </button>
              <button 
                className="btn btn-sm btn-outline-warning" 
                onClick={() => toggleRelevant(selectedPaper.id)}
              >
                {relevantPapers.includes(selectedPaper.id) ? 'Remove from Relevant' : 'Add to Relevant'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="card shadow mt-4">
        <div className="card-body">
          <h5 className="card-title">BibTeX Database Manager</h5>
          <div className="row">
            <div className="col-md-6">
              <h6 className="fw-bold mb-2">Database Information</h6>
              <p className="small mb-1"><span className="fw-medium">Total Papers:</span> {papers.length}</p>
              <p className="small mb-1"><span className="fw-medium">Highlighted Papers:</span> {relevantPapers.length}</p>
              <p className="small mb-1"><span className="fw-medium">Papers by Type:</span></p>
              <ul className="small ms-3">
                {Object.entries(papers.reduce((acc: {[key: string]: number}, paper) => {
                  acc[paper.modelType] = (acc[paper.modelType] || 0) + 1;
                  return acc;
                }, {})).map(([type, count]) => (
                  <li key={type}>{getModelTypeName(type)}: {count}</li>
                ))}
              </ul>
            </div>
            
            <div className="col-md-6">
              <h6 className="fw-bold mb-2">File Organization</h6>
              <p className="small mb-2">Papers are stored using BibTeX format with following naming convention:</p>
              <pre className="bg-light p-2 small rounded mb-2">FirstAuthorLastNameYear.bib</pre>
              <p className="small mb-2">Example: <code>Smith2020.bib</code></p>
              <div className="d-flex gap-2 mt-3">
                <button
                  onClick={() => downloadFullBibTeX(false)}
                  className="btn btn-success btn-sm"
                >
                  Export Full Database
                </button>
                <button
                  onClick={() => downloadFullBibTeX(true)}
                  className="btn btn-warning btn-sm"
                  disabled={relevantPapers.length === 0}
                >
                  Export Relevant Papers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center small text-muted mt-4">
        <p>Black lines show influence between papers in the same field. Blue lines show direct citations.</p>
      </div>
    </div>
  );
};

export default ResearchPapersDashboard;