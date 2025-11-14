---
id: 'structural-inference'
title: 'Method for Structural Inference'
date: 'Nov 14, 2025'
summary: 'A method to ask the right questions by treating domains as systems of objects and relations.'
tags: ['Philosophy', 'Pragmatism']
---

## The Method for Structural Inference

This note formalizes my way of understanding new concepts—a method that proceeds by asking targeted questions about the structure of a system, modeled as objects and relations. The method aims to clarify how concepts fit together, what gives them meaning, and why certain statements are treated as true. By systematically asking such questions, we are able to understand the limitations, dependencies, and internal constraints that define a conceptual domain.

### Assumptions
Assumptions made by the Method for Structural Inference:
1. The system has a reasonably coherent structure that can be modeled, even if only approximately, using logical or relational terms.
2. The system contains **objects**: the entities it talks about (people, institutions, variables, legal entities, functions, types, etc).
3. The system involves **propositions**: statements about objects detailing their properties or relationships.
4. Every object has at least one property: an accepted proposition connecting it to other objects.
5. Each proposition’s validity is determined by some **method of validation** (proof, test, procedure, rule, etc.).
6. We say a statement is a proposition of the system if it talks about the objects in the system and that there exists a method of validation that can, in principle, accept or reject it using set criteria along with already accepted propositions.

### Principle 1: Retrospective Justification
> Given any accepted proposition of the system, we can reconstruct a reason for its validity in terms of the system’s method of validation, basic assumptions, and prior accepted propositions.

This method is a **meta-method**: it does not create new truths within the system, but seeks to understand *why* certain propositions are treated as valid. It is retrospective since it works backwards from something already accepted (this theorem holds; this law applies; this type checks) and reconstructs what must be in place within the system to make that acceptance sensible. In any rule-governed system, accepted propositions can be traced back to reasons within that system, even if these are implicit or institutional rather than explicit or formal.

### Principle 2: Pragmatic Meaning
> Within a system, an object has meaning if and only if it participates in some pattern of relations, as stated in system propositions.

An object’s meaning is given entirely by the network of accepted propositions in which it participates. If we remove an object in thought, we can observe what consequences follow—relations disappear, some propositions become impossible to state, and dependent objects may lose their meaning or function. Thus, every meaningful object is embedded in a web of connections; there are no truly isolated objects in these systems.

### Principle 3: Structural Reduction
> Any proposition of the system can be analyzed into: (i) the objects it concerns, and (ii) the relations or properties it ascribes to them (ideally, but not always, as "A relates to B with relation C").

This principle allows us to restate any proposition in terms of which objects it involves and what relations or properties it describes. Doing so helps identify whether confusion arises from the objects, the relations, or the conditions attached. In some cases, statements may become truisms, conveying no information beyond what is built into the system’s definitions.

### The Method
To apply the method:

1. Check that the assumptions above make sense for the system at hand.
2. Identify the objects and propositions within the system.
3. Determine whether our question concerns an object or a proposition:
    - **If asking about an object**: List propositions in which it appears and ask what would happen if it was removed from the system. What would break or become unintelligible?
    - **If asking about a proposition**: Reduce it to explicit objects and relations per Principle 3, then apply Principle 1 to trace the internal justification for its acceptance, using the system’s validation methods.

### Example: Object-Oriented Programming
Suppose the system is an object-oriented codebase. Objects include classes, interfaces, and methods; propositions include type claims, test results, and architectural rules. If we wish to understand the role and function of a class (e.g., a `User` class in a web backend), we can analyze its dependencies, and the classes that depend on it. We can for example ask "What happens if we remove this class? What will break?" Which will allow us to identify the role of the class in a web of connections. 

## Final Comments
The inspiration for this method originally came from my experience with object-oriented programming. Early on, I found reading other people's code difficult, until I realized that using `Ctrl-F` to search for all references to a class, function, or variable revealed the web of relations that actually defines its role and meaning. This insight, that an object's meaning is fully characterized by its connections, applies well beyond programming to many other domains. 

While powerful, this method can be time-consuming, as it requires tracing every relevant proposition or relation for a given object. In practice, it is best reserved for situations where an intuitive understanding breaks down and a systematic approach is needed to clarify structure and meaning. Finally, viewing the world purely as a network of objects and relations can feel artificial or reductive, since it presumes a subject/object duality and creates neat boxes that don't always fit the messy reality. While such structure is useful in some domains, it can diminish the richness or meaning in areas that depend on emotion, intuition, or lived experience.
