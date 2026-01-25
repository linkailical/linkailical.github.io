---
title: "Cross-Section Method for Volume"
description: "Understanding the cross-section method through a bread-slicing analogy, with detailed volume integrals for four types of cross-sections on an elliptical region"
pubDate: "Jan 14 2026"
badge: "Calculus"
tags: ["Integration", "Volume", "Cross-Section Method"]
lang: "en"
---

## Original Problem

![Cross-Section Volume Problem](/images/notes/cross-section-problem.jpg)

---

## Interactive Visualization Tool

**Highly Recommended**: Open the interactive tool below to:
- Switch between four different cross-section types
- Drag the slider to change the slice position
- See the ellipse, cross-section shape, and 3D solid in real-time
- Automatically display calculation formulas

<a href="/js/cross-section-viz-en.html" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 10px 0;">Open Interactive Visualization Tool</a>

---

## Problem Statement

**Ex)** Given the elliptical region $4x^2 + 25y^2 = 100$, set up (but do not evaluate) the volume integral using the cross-section method for the following cross-section conditions:

- a) Equilateral triangles, perpendicular to the x-axis
- b) Semicircles, perpendicular to the x-axis
- c) Isosceles right triangles (hypotenuse as base), perpendicular to the y-axis
- d) Squares, perpendicular to the y-axis

---

## I. What is the Cross-Section Method? (Intuitive Understanding)

### Real-Life Example

**Imagine you're slicing a loaf of bread**:

Cut a long loaf of bread horizontally into many, many thin slices. You know the area of each slice. What's the total volume of the bread? It's the **sum of all slice areas**!

```text
    Bread:
    +--------------------------+
    | Slice | Slice | Slice |    <- Cut into many slices
    +--------------------------+

    Volume = Slice 1 area × thickness + Slice 2 area × thickness + ...
           = Sum of all slices
           = Integral!
```

### Mathematical Language

When the slices are **infinitely thin**, "summing up" becomes **integration**:

$$V = \int_a^b A(x) \, dx$$

- $A(x)$ = cross-sectional area at position $x$ (size of each bread slice)
- $dx$ = thickness of each slice (infinitely thin)
- $\int_a^b$ = sum everything from $a$ to $b$

**In one sentence**: The cross-section method is **slicing the solid into thin pieces, calculating each piece's area, then integrating**.

---

## II. Understanding the Ellipse

### Transforming the Ellipse Equation

The original equation looks complicated: $4x^2 + 25y^2 = 100$

**Technique**: Divide both sides by 100 to get standard form

$$\frac{x^2}{25} + \frac{y^2}{4} = 1 \quad \Rightarrow \quad \frac{x^2}{5^2} + \frac{y^2}{2^2} = 1$$

**This tells us**:
- The ellipse extends to $\pm 5$ along the x-axis (wider)
- The ellipse extends to $\pm 2$ along the y-axis (narrower)

### What Does the Ellipse Look Like?

**Shape characteristics**:
- Horizontal direction: from $x = -5$ to $x = 5$ (major axis = 10)
- Vertical direction: from $y = -2$ to $y = 2$ (minor axis = 4)
- This is a **horizontally stretched** ellipse (like a flattened circle)

**Diagram** (refer to the original problem image for the ellipse):

```text
          y
          ^
        2 +..............(0,2)..............
          |         .           .
          |      .                 .
          |    .                     .
          |  .                         .
    ------+-.---------------------------.--> x
    (-5,0)|  .                         .  (5,0)
          |    .                     .
          |      .                 .
          |         .           .
       -2 +..............(0,-2)...........
          |
```

> Tip: An ellipse is like a circle squeezed from top and bottom, or stretched horizontally.

### Most Important Formula: Chord Length

**What is chord length?** It's how wide you can cut "horizontally" or "vertically" at a point on the ellipse.

**Perpendicular to x-axis** (vertical cut):

At position $x$, what's the height of the ellipse?

Solve for $y$ from the ellipse equation:
$$y = \pm\frac{2}{5}\sqrt{25 - x^2}$$

Distance from top to bottom (chord length):
$$\text{Chord length} = 2y = \frac{4}{5}\sqrt{25 - x^2}$$

**Perpendicular to y-axis** (horizontal cut):

At position $y$, what's the width of the ellipse?

$$x = \pm\frac{5}{2}\sqrt{4 - y^2}$$

Distance from left to right (chord length):
$$\text{Chord length} = 2x = 5\sqrt{4 - y^2}$$

---

## III. Solving Each Problem

### Problem a: Equilateral Triangle Cross-Sections (Perpendicular to x-axis)

#### Visualization

Imagine taking a knife and cutting **perpendicular to the x-axis**. Each cut produces an **equilateral triangle** cross-section.

Triangle base = chord length of the ellipse at that position

```text
    Side view:                    Cross-section (equilateral triangle):

         /\                           /\
        /  \                         /  \
       /    \                       /    \  <- All three sides equal
      /------\                     /------\
     /        \                    base = chord length
    /----------\
    --------------> x
   -5     0     5
```

#### Three-Step Solution

**Step 1: What is the base?**

Base = chord length of ellipse at $x$ = $\frac{4}{5}\sqrt{25-x^2}$

**Step 2: Equilateral triangle area formula**

Area of equilateral triangle with side $s$ = $\frac{\sqrt{3}}{4}s^2$

(Memorize this formula!)

**Step 3: Substitute to get A(x)**

$$A(x) = \frac{\sqrt{3}}{4} \times \left(\frac{4}{5}\sqrt{25-x^2}\right)^2 = \frac{4\sqrt{3}}{25}(25-x^2)$$

#### Final Answer

$$\boxed{V = \int_{-5}^{5} \frac{4\sqrt{3}}{25}(25-x^2) \, dx}$$

---

### Problem b: Semicircle Cross-Sections (Perpendicular to x-axis)

#### Visualization

Each cut produces a **semicircle**. The diameter of the semicircle = chord length of the ellipse

```text
    Side view:                    Cross-section (semicircle):

        ,---,                      ,-----,
       /     \                    /       \
      ,-------,                  |         |
     /         \                 `---------'
    ,-----------,                diameter = chord length
    ---------------> x
   -5     0     5
```

#### Three-Step Solution

**Step 1: Diameter and radius**

Diameter = chord length = $\frac{4}{5}\sqrt{25-x^2}$

Radius = diameter / 2 = $\frac{2}{5}\sqrt{25-x^2}$

**Step 2: Semicircle area formula**

Semicircle area = $\frac{1}{2}\pi r^2$

**Step 3: Substitute to get A(x)**

$$A(x) = \frac{1}{2}\pi \times \left(\frac{2}{5}\sqrt{25-x^2}\right)^2 = \frac{2\pi}{25}(25-x^2)$$

#### Final Answer

$$\boxed{V = \int_{-5}^{5} \frac{2\pi}{25}(25-x^2) \, dx}$$

---

### Problem c: Isosceles Right Triangle (Hypotenuse as Base, Perpendicular to y-axis)

#### Visualization

This time we cut **perpendicular to the y-axis**! The cross-section is an isosceles right triangle with the **hypotenuse as the base**.

```text
    Side view:                    Cross-section (isosceles right triangle):

                                      /|
        /\                           / |
       /  \                         /  | <- Two legs equal
      /----\                       /   |    with 90 degree angle
    -----------> y                /----+
     -2  0  2                     hypotenuse (base) = chord length
```

#### Quick Facts: Isosceles Right Triangle

If hypotenuse = $h$, then:
- Each leg = $\frac{h}{\sqrt{2}}$
- Area = $\frac{h^2}{4}$ (remember this!)

#### Three-Step Solution

**Step 1: What is the hypotenuse?**

Perpendicular to y-axis, hypotenuse = chord length of ellipse at $y$ = $5\sqrt{4-y^2}$

**Step 2: Area formula**

Isosceles right triangle with hypotenuse $h$ has area = $\frac{h^2}{4}$

**Step 3: Substitute to get A(y)**

$$A(y) = \frac{1}{4} \times \left(5\sqrt{4-y^2}\right)^2 = \frac{25}{4}(4-y^2)$$

#### Final Answer

Note: This time the integration variable is $y$, ranging from $-2$ to $2$

$$\boxed{V = \int_{-2}^{2} \frac{25}{4}(4-y^2) \, dy}$$

---

### Problem d: Square Cross-Sections (Perpendicular to y-axis)

#### Visualization

The simplest one! The cross-section is a square with side length = chord length of the ellipse

```text
    Side view:                    Cross-section (square):

       +----+                   +--------+
       |    |                   |        |
       |    |                   |        | <- All four sides equal
       |    |                   |        |
       +----+                   +--------+
    -----------> y               side = chord length
     -2  0  2
```

#### Three-Step Solution

**Step 1: What is the side length?**

Side length = chord length of ellipse at $y$ = $5\sqrt{4-y^2}$

**Step 2: Square area**

Area = side² = $s^2$

**Step 3: Substitute to get A(y)**

$$A(y) = \left(5\sqrt{4-y^2}\right)^2 = 25(4-y^2)$$

#### Final Answer

$$\boxed{V = \int_{-2}^{2} 25(4-y^2) \, dy}$$

---

## IV. Summary: Problem-Solving Strategy

### Universal Three-Step Method

```text
Step 1: Find the "side" of the cross-section
        |
        side = chord length of ellipse
        |
Step 2: Calculate A using area formula
        |
        substitute chord length expression
        |
Step 3: Write the integral
        |
        determine integration variable and limits
```

### Essential Formula Cards

| Shape | Given | Area Formula |
| :---: | :---: | :---: |
| Square | side $s$ | $s^2$ |
| Circle | radius $r$ | $\pi r^2$ |
| Semicircle | radius $r$ | $\frac{\pi r^2}{2}$ |
| Equilateral triangle | side $s$ | $\frac{\sqrt{3}}{4}s^2$ |
| Isosceles right triangle | leg $a$ | $\frac{a^2}{2}$ |
| Isosceles right triangle | hypotenuse $h$ | $\frac{h^2}{4}$ |

### Answer Summary for This Problem

| Part | Cross-Section | Integration Direction | Volume Integral |
| :---: | :---: | :---: | :---: |
| a | Equilateral triangle | x-axis | $\int_{-5}^{5} \frac{4\sqrt{3}}{25}(25-x^2)dx$ |
| b | Semicircle | x-axis | $\int_{-5}^{5} \frac{2\pi}{25}(25-x^2)dx$ |
| c | Isosceles right | y-axis | $\int_{-2}^{2} \frac{25}{4}(4-y^2)dy$ |
| d | Square | y-axis | $\int_{-2}^{2} 25(4-y^2)dy$ |

---

## V. Frequently Asked Questions

**Q1: How do I determine whether to integrate with respect to x or y?**

> Look at what the problem says "perpendicular to which axis". Perpendicular to x-axis means integrate with respect to x; perpendicular to y-axis means integrate with respect to y.

**Q2: How do I determine the limits of integration?**

> Look at the range of the ellipse in that direction. x-direction is -5 to 5, y-direction is -2 to 2.

**Q3: Why simplify the ellipse equation first?**

> After simplification, you can directly see the "length" and "width" of the ellipse, making it easier to determine integration limits and calculate chord lengths.

**Q4: What if I can't remember the cross-section area formulas?**

> There are only a few commonly used ones; you'll remember them after doing a few problems. If you can bring a formula sheet to the exam, you don't need to memorize them.
