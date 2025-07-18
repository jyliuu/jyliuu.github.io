---
# === Required fields  ===
# Your name
name: "Jinyang Liu (刘锦阳)"
# Your profile picture
imgname:
  name: "img/main.jpg"
  alt: "Picture of me"
  type: image/jpeg
# More sources can be added (optional) using
# imgOther:
#   - name: $IMAGE_PATH
#     type: $IMAGE_TYPE
#   - name: $IMAGE_PATH
#     type: $IMAGE_TYPE
# ...
# A title (job title or "Researcher", "PhD student", etc.)
personal_title: "3+5 PhD student"
# An address (you can list multiple)
address:
  - name: University of Copenhagen
    street: Universitetsparken 5 (Department of Mathematical Sciences)
    postal_code: 2100
    locality: Copenhagen

contact: 
  - github: "https://github.com/jyliuu"
    linkedin: "https://www.linkedin.com/in/jinyang-liu"
    email: jl (at) math.ku.dk

# (which should be the image path). The other fields are optional.
publications:
  - 
    authors:
        - name: Liu, J. 
          me: true
        - name: Steensgaard, T. 
        - name: Wright, M.
        - name: Pfister, N.
        - name: Hiabu, M.
    title: "Fast Estimation of Partial Dependence Functions using Trees"
    # Will write "In ${journal}, ${date}"
    date: 2024
    journal: arXiv preprint
    image: img/fastpd.png
    # A bibtex (or any other format) citation that people can copy directly from the website.
    citation: "@misc{liu2024fastestimationpartialdependence,\n
      title={Fast Estimation of Partial Dependence Functions using Trees},\n
      author={Jinyang Liu and Tessa Steensgaard and Marvin N. Wright and Niklas Pfister and Munir Hiabu},\n
      year={2024},\n
      eprint={2410.13448},\n
      archivePrefix={arXiv},\n
      primaryClass={cs.LG},\n
      url={https://arxiv.org/abs/2410.13448},\n
}"
    pdf: https://arxiv.org/pdf/2410.13448
    # A list of link that will appear as badges at the bottom of the publication.
    links:
      -
        name: arXiv
        url: "https://arxiv.org/abs/2410.13448"
      - 
        name: Code
        url: "https://github.com/jyliuu/fastpd-reproducibility-code"
    description: We provide a novel and fast method for computing partial dependence funtions for tree-based prediction models such as XGBoost and Random Forests. The implementation has since been integrated in the R-package glex.
  
---

# About

-- Born on 14. August 2002 in Shenzhen, China

I am currently a 3+5 PhD student in statistics and machine learning at the University of Copenhagen (UCPH). My research focuses on regression, intepretability, and tree-based methods such as gradient boosting and random forests. I hold a Bachelor's degree in Mathematics from UCPH (June 2023), where I specialized in statistics and developed a strong foundation in measure and probability theory.

In addition, I am an experienced software engineer and have worked extensively with DevOps. I am proficient in Python and R, which I have used to develop microservices on Google Cloud. 

I am developing a machine learning library for regression in Rust, focusing on creating an interpretable "glass-box" model as an alternative to traditional black-box methods.

---

## Education

- University of Copenhagen, Sep 2023 - Aug 2028 (expected)  
  3+5 PhD student in statistics and machine learning  
  Advisor: [Munir Hiabu](https://mhiabu.github.io/)
- University of Copenhagen, Sep 2020 - June 2023  
  BSc in Mathematics
- H.C. Ørsted Gymnasiet i Lyngby, Aug 2017 - June 2020  
  Danish technical high school education (HTX)
