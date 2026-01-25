---
title: "Washer Method for Volume of Revolution"
description: "Understanding the washer method through a donut analogy, with detailed explanations on determining inner and outer radii and integration steps"
pubDate: "Jan 15 2024"
badge: "Calculus"
tags: ["Integration", "Volume", "Washer Method", "Solid of Revolution"]
lang: "en"
---

## Original Problem

**#2.** Sketch, set up and evaluate the integral that gives the volume of the solid formed by revolving the region bounded by the graphs: $y = 2x^2$ and $y = 0$, $x = 2$ about $y = 8$.

---

## Interactive Visualization Tool

**Highly Recommended**: Open the interactive tool below to:
- Drag the slider to change the slice position
- See inner and outer radii change in real-time
- View the washer cross-section shape
- 3D preview of the solid of revolution

<a href="/js/washer-method-viz.html" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 10px 0;">Open Interactive Visualization Tool</a>

---

## I. What is the Washer Method? (Intuitive Understanding)

### Real-Life Example

**Imagine you're making a donut:**

Rotate dough around a stick to form a hollow ring. If the dough isn't uniform and the "thickness" varies at each position, how do you calculate the volume?

**Method:** Slice the donut into many thin "washers". Each washer's volume = outer circle area - inner circle area. Then add them all up!

```text
    Washer cross-section:

    +------------------+
    |    +--------+    |
    |    | hollow |    |  <- inner radius r
    |    |        |    |
    |    +--------+    |
    +------------------+
          ^
       outer radius R

    Washer area = piR^2 - pir^2 = pi(R^2 - r^2)
```

### Mathematical Formula

$$V = \pi \int_a^b [R(x)^2 - r(x)^2] \, dx$$

- $R(x)$ = outer radius (distance from axis of rotation to the **far edge**)
- $r(x)$ = inner radius (distance from axis of rotation to the **near edge**)
- $dx$ = thickness of the washer (infinitely thin)

---

## II. Analyzing the Region

### Sketching the Region

```text
    y
    ^
  8 ..................  <- axis of rotation y = 8
    |
    |              /|
  6 +            /  |
    |          /    |
  4 +        /      |
    |      /        |
  2 +    /          |      y = 2x^2
    |  /            |
  0 +-*-------------*----> x
    0       1       2

    Shaded region revolves around y = 8
```

### Identifying Boundaries

- **Left boundary:** $x = 0$
- **Right boundary:** $x = 2$
- **Bottom boundary:** $y = 0$ (x-axis)
- **Top boundary:** $y = 2x^2$ (parabola)
- **Axis of rotation:** $y = 8$ (**above** the region)

---

## III. Determining Inner and Outer Radii (Most Critical!)

### Radius Diagram

```text
    y
    ^
    |
  8 o.................o  <- axis of rotation y = 8
    |         ^       |
    |    inner radius |
    |    = 8 - 2x^2   |
    |         v       |
    |    .--------.   |  <- y = 2x^2 (point on parabola)
    |         ^       |
    |         |       |
    |    outer radius |
    |    = 8 - 0      |
    |    = 8          |
    |         v       |
  0 +-----------------> x
              x
```

### Radius Formulas

Since the axis of rotation $y = 8$ is **above** the region:

$$R(x) = 8 - 0 = 8 \quad \text{(outer radius: from axis to bottom boundary)}$$

$$r(x) = 8 - 2x^2 \quad \text{(inner radius: from axis to top boundary)}$$

> **Rule of thumb:** When rotating about an axis above, use "axis minus curve"; outer radius goes to the far edge, inner radius to the near edge.

---

## IV. Setting Up the Integral

### Applying the Washer Method Formula

$$V = \pi \int_0^2 [R^2 - r^2] \, dx = \pi \int_0^2 [8^2 - (8-2x^2)^2] \, dx$$

### Expanding and Calculating

**Step 1: Expand $(8-2x^2)^2$**

$$(8-2x^2)^2 = 64 - 32x^2 + 4x^4$$

**Step 2: Substitute and simplify**

$$R^2 - r^2 = 64 - (64 - 32x^2 + 4x^4) = 32x^2 - 4x^4$$

**Step 3: Integrate**

$$V = \pi \int_0^2 (32x^2 - 4x^4) \, dx$$

$$= \pi \left[\frac{32x^3}{3} - \frac{4x^5}{5}\right]_0^2$$

**Step 4: Substitute the limits**

$$= \pi \left[\frac{32 \times 8}{3} - \frac{4 \times 32}{5}\right] - 0$$

$$= \pi \left[\frac{256}{3} - \frac{128}{5}\right]$$

**Step 5: Find common denominator**

$$= \pi \times \frac{256 \times 5 - 128 \times 3}{15} = \pi \times \frac{1280 - 384}{15}$$

$$= \boxed{\frac{896}{15}\pi}$$

---

## V. Common Error Analysis

### Error 1: Radius Direction Reversed

| Wrong | Correct |
|:---:|:---:|
| $r = 2x^2 + 8$ | $r = 8 - 2x^2$ |

**Reason:** Inner radius is the distance from axis of rotation to the curve. The axis is above (y=8), the curve is below (y=2x²), so it's **axis minus curve**.

### Error 2: Inner and Outer Radii Swapped

| Wrong | Correct |
|:---:|:---:|
| $V = \pi\int[r^2 - R^2]dx$ | $V = \pi\int[R^2 - r^2]dx$ |

**Reason:** Volume must be positive. Outer radius > inner radius, so it's **big minus small**.

### Error 3: Wrong Integration Variable

Rotate about a **horizontal line** -> integrate with respect to **x**
Rotate about a **vertical line** -> integrate with respect to **y** (or use shell method)

---

## VI. Washer Method vs. Disk Method

| Method | When to Use | Formula |
|:---:|:---|:---:|
| **Disk Method** | Region touches the axis of rotation (solid) | $V = \pi\int R^2 dx$ |
| **Washer Method** | Region doesn't touch the axis (hollow) | $V = \pi\int (R^2-r^2) dx$ |

In this problem, the region doesn't touch y=8, so we use the **washer method**.

---

## VII. Problem-Solving Template

```text
Step 1: Draw the graph, mark the region and axis of rotation
        |
Step 2: Determine axis position (above/below/left/right)
        |
Step 3: Determine outer radius R and inner radius r
        - Outer radius = distance from axis to far boundary
        - Inner radius = distance from axis to near boundary
        |
Step 4: Determine integration limits (range of x or y)
        |
Step 5: Apply formula V = pi*integral(R^2 - r^2)dx
        |
Step 6: Expand, integrate, substitute and evaluate
```

---

## VIII. Practice Problems

**Practice 1:** Find the volume when the region bounded by $y = x^2$ and $y = 4$ is rotated about $y = -1$.

<details>
<summary>Click to see answer</summary>

- Outer radius $R = 4 - (-1) = 5$
- Inner radius $r = x^2 - (-1) = x^2 + 1$
- Integration range: $x \in [-2, 2]$

$$V = \pi \int_{-2}^{2} [25 - (x^2+1)^2] dx = \frac{384\pi}{5}$$

</details>

**Practice 2:** Find the volume when the region bounded by $y = \sqrt{x}$, $y = 0$, and $x = 4$ is rotated about $y = 2$.

<details>
<summary>Click to see answer</summary>

- Outer radius $R = 2 - 0 = 2$
- Inner radius $r = 2 - \sqrt{x}$
- Integration range: $x \in [0, 4]$

$$V = \pi \int_{0}^{4} [4 - (2-\sqrt{x})^2] dx = \frac{8\pi}{3}$$

</details>

---

## IX. Quick Reference Table

| Axis Position | Outer Radius R | Inner Radius r |
|:---:|:---:|:---:|
| y = k (above) | k - bottom boundary | k - top boundary |
| y = k (below) | top boundary - k | bottom boundary - k |
| x = k (right) | k - left boundary | k - right boundary |
| x = k (left) | right boundary - k | left boundary - k |

**Memory tips:**
- Axis outside: axis - curve
- Axis inside: curve - axis
- Always: far - near = positive value
