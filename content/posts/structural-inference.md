---
id: 'structural-inference'
title: 'Asking the Right Questions'
date: 'Nov 15, 2025'
summary: 'A method to ask the right questions by treating domains as systems of objects and relations.'
tags: ['Philosophy', 'Pragmatism']
---

## Asking the Right Questions

This post is written to formalize some of the assumptions that I make when I try to understand a new concept. I believe that understanding anything really comes down to asking the right questions. Good questions are usually the ones that seek reveal the limitations or constraints of an idea or concept. But to know which questions to ask is quite difficult, and needs be guided by some form of intuition, for example via Quality (Pirsig, Robert _M. Zen and the Art of Motorcycle Maintenance_, 1974). I believe it's possible to have some principles in mind that allow us to organize the domain we are interested in, to clarify how concepts fit together, and why certain statements are true. By following these principles, we can understand the limitations, dependencies and constraints that define a conceptual domain.

### Assumptions
We will consider a domain that has an organized system of knowledge. Some examples of a domain of knowledge are for example: mathematics, law, economics, biology, software.

Before we can apply our principles, we have to make the following assumptions:
1. The system has a reasonably coherent structure that can be modeled, even if only approximately, using logical or relational terms.
2. The system contains **objects**: the entities it talks about (people, institutions, variables, legal entities, functions, types, etc).
3. The system involves **propositions**: statements about objects detailing their properties or relationships.
4. Every object has at least one property: an accepted proposition connecting it to other objects.
5. Each proposition’s validity is determined by some **method of validation** (proof, test, procedure, rule, etc.).
6. We say a statement is a proposition of the system if it talks about the objects in the system and that there exists a method of validation that can, in principle, accept or reject it using set criteria along with already accepted propositions.

### Principle 1: Retrospective Justification
> Given any accepted proposition of the system, we can reconstruct a reason for its validity in terms of the system’s method of validation, basic assumptions, and prior accepted propositions.

This method is a **meta-method**, its purpose is not to derive new knowledge within the system, but instead seeks to understand *why* certain propositions are treated as valid. It is retrospective since it works backwards from something already accepted (this theorem holds; this law applies; this type checks) and reconstructs what must be in place within the system to make that acceptance sensible. Because of assumptions 5 and 6, in any rule-governed system, accepted propositions can be traced back to reasons within that system. Furthermore, the first assumption allows us to assume that the system follows some form of logical structure, which is an assurance that we will eventually be able to understand the system. 

### Principle 2: Pragmatic Meaning
> Within a system, an object has meaning if and only if it participates in some pattern of relations that relates it to other objects, as stated in system propositions.

Assumption 4 guarantee us that every object must be related to other objects, therefore, an object's meaning is given entirely by the network of accepted propositions in which it participates. The purpose of this principle is to emphasize that an object cannot have "intrinsic" meaning, its meaning will always be determined by relations to other objects. This principle is best summarized by a question: "What happens if I remove this object from the system?" Some propositions might become impossible to state, and dependent objects may lose their meaning or function. Thus, every meaningful object is embedded in a web of connections; there are no truly isolated objects in these systems. 

### Principle 3: Reduction
> Any proposition of the system can be analyzed into: (i) the objects it concerns, and (ii) the relations or properties it ascribes to them. Ideally, it should be possible to reformulate the proposition as "A relates to B with relation C".

This principle allows us to restate any proposition in terms of which objects it involves and what relations or properties it describes. Doing so helps identify whether confusion arises from the objects or the relations. The purpose of this principle is to identify tautologies within the system, which are propositions that convey no information at all. 

### The Method
To apply the method we must first identify the system that we are working in. It could for example be that we want to understand laws regarding taxation of personal real estate, then our system might be the legal system, and some objects in that system could for example be denoted by: "Government", "Tax rate", "Property", "Buyer", "Mortgage". The propositions of that system would then be the laws governing those objects. After the system has been identified, there will only be two kinds questions that we can ask. By assumption 4. we have that the system consists of objects or propositions, therefore any question will be either about understanding an object or a proposition. If we want to understand an object, then our goal is to state the relationship between the object and other objects in the system. The second principle says exactly that an object only has meaning if it can be related to other things of the system. We can for example, try to imagine a system where the object is removed, and see what the implications are. The resulting implications are the relations of the object.
If we instead want to understand a proposition, we note that by the third principle, the proposition must be relating at least two objects together. So we would start by understanding those two objects. The first principle tells us that by working backwards, following the method of validation, we can understand why a proposition is valid. 

To summarize:

1. Check that the assumptions above make sense for the system at hand.
2. Identify the objects and propositions within the system.
3. Determine whether our question concerns an object or a proposition:
    - **If asking about an object**: List propositions in which it appears and ask what would happen if it was removed from the system. What would break or become unintelligible?
    - **If asking about a proposition**: Reduce it to explicit objects and relations per Principle 3, then apply Principle 1 to trace the internal justification for its acceptance, using the system’s validation methods.

### Example: Object-Oriented Programming
Suppose the system is an object-oriented codebase. Objects include classes, interfaces, and methods; propositions include type claims, test results, and architectural rules. If we wish to understand the role and function of a class (e.g., a `User` class in a web backend), we can analyze its dependencies, and the classes that depend on it. We can for example ask "What happens if we remove this class? What will break?" Which will allow us to identify the role of the class in a web of connections. 

## Final Comments
The inspiration for this method originally came from my experience with object-oriented programming. Early on, I found reading other people's code difficult, until I realized that using `Ctrl-F` to search for all references to a class, function, or variable revealed the web of relations that actually defines its role and meaning. This insight, that an object's meaning is fully characterized by its connections, applies well beyond programming to many other domains. 

I believe that these principles have guided me to ask better questions. However applying this method can also be time-consuming since it requires tracing every relevant proposition or relation for a given object. In practice, it is best reserved for situations where an intuitive understanding breaks down and a systematic approach is needed to clarify structure and meaning. 

Finally, viewing the world as a network of objects and relations is artificial and reductive, since it presumes a subject/object duality and creates neat boxes that don't always fit the messy reality. While such structure is useful in some domains, it can diminish the richness or meaning in areas that depend on intuition and emotion.
