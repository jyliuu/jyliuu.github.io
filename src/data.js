import { GraduationCap, BookOpen } from 'lucide-react';

export const personalData = {
  name: 'Jinyang Liu',
  otherName: '刘锦阳',
  title: 'PhD Student in Statistics & Machine Learning',
  institution: 'University of Copenhagen',
  email: 'jl (at) math.ku.dk',
  github: 'https://github.com/jyliuu',
  linkedin: 'https://www.linkedin.com/in/jinyang-liu/',
  imageUrl: '/img/main.jpg',
  about: `I am currently a 3+5 PhD student in Statistics and Machine Learning at the University of Copenhagen (UCPH). My research focuses on regression, interpretability, and tree-based methods such as Gradient Boosting and Random Forests. I am actively developing a machine learning library in Rust, focused on creating an interpretable “glass-box” model as an alternative to traditional black-box methods. I am also an experienced software engineer proficient in Python and R, with experience developing microservices on Google Cloud and utilizing DevOps methodologies.`,
};

export const education = [
  {
    icon: GraduationCap,
    degree: '3+5 PhD Student in Statistics and Machine Learning',
    institution: 'University of Copenhagen (UCPH)',
    dates: 'Sep 2023 – Aug 2028 (Expected)',
    details: 'Research focus on interpretable ML, high-dimensional statistics, and tree-based models. Advisor: Munir Hiabu.',
  },
  {
    icon: GraduationCap,
    degree: 'BSc in Mathematics (Statistics Specialization)',
    institution: 'University of Copenhagen (UCPH)',
    dates: 'Sep 2020 – June 2023',
    details: 'Developed a strong foundation in measure theory and probability.',
  },
];

export const research = [
  {
    icon: BookOpen,
    title: 'Fast Estimation of Partial Dependence Functions using Trees',
    authors: 'Jinyang Liu, Tessa Steensgaard, Marvin N. Wright, Niklas Pfister, Munir Hiabu',
    journal: 'Proceedings of the 42nd International Conference on Machine Learning, PMLR 267:39496-39534, 2025',
    year: '2025',
    links: [
      { type: 'PMLR', url: 'https://proceedings.mlr.press/v267/liu25bm.html' },
      { type: 'arXiv', url: 'https://arxiv.org/abs/2410.13448' },
      { type: 'Code', url: 'https://github.com/PlantedML/glex' },
    ],
    summary: `We provide a novel and fast method for computing partial dependence functions for tree-based prediction models 
      such as XGBoost and Random Forests. The implementation has since been integrated into the R-package glex.`,
  },
];

export const skills = [
  { category: 'Research Skills', items: ['Interpretable ML', 'Gradient Boosting', 'Random Forests', 'Regression Models', 'Statistical Inference'] },
  { category: 'Tools & Libraries', items: ['Python (Advanced)', 'R (Statistical Analysis)', 'Rust (Systems/ML Library)', 'SQL', 'scikit-learn', 'PyTorch/TensorFlow', 'XGBoost', 'tidyverse', 'Google Cloud Platform (GCP)', 'Microservices', 'Git/GitHub', 'CI/CD'] },
];
