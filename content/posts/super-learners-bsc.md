---
id: 'super-learners-bsc'
title: 'BSc Thesis: Super Learners'
date: 'August 1, 2023'
summary: 'A thesis examining super learners and their oracle properties in binary regression, supervised by Prof. Thomas Gerds and Prof. Niels Richard Hansen.'
tags: ['Super Learners', 'Machine Learning', 'Statistics']
---

On the 23rd of June 2023 I defended my BSc thesis: "Super Learners". The [thesis paper](https://github.com/jyliuu/bachelor-thesis/blob/main/bachelordraft/out/main.pdf) and code for simulations can be found on [GitHub](https://github.com/jyliuu/bachelor-thesis)

The project was supervised by Prof. Thomas Gerds at the Biostatistics department of UCPH and Prof. Niels Richard Hansen at the MATH department.

### Abstract

In this thesis we examine super learners and their applicability to binary regression. The super learner is a method for combining predictions from a specified library of learning algorithms to create a strong learner. We introduce and prove the oracle property for the discrete super learner, which is extended to the ensemble super learner. The oracle results show that given a library of learning algorithms, asymptotically, the super learner will not perform worse than the best algorithm in the library in terms of risk. We then compare the performance of the super learner with other regression algorithms including logistic regression and XGBoost on simulated data. The simulations demonstrate that the super learner achieves minimal risk as the number of observations grows. Finally, a new technique of combining learner predictions to be used by the ensemble super learner is proposed and has shown interesting results.

