---
title: "SAT Math — Hard Topics Deep Dive"
description: "Deeper methods for the trickiest Digital SAT Math: function transformations, nonlinear systems, exponential models, and data subtleties, with worked problems."
pubDate: "Jun 22 2026"
badge: "SAT"
tags: ["SAT", "Math", "Advanced", "Functions"]
lang: "en"
---

The hardest SAT Math questions usually test a few recurring ideas. Master these patterns and the second (harder) module becomes manageable.

---

## 1. Function transformations

For a graph $y = f(x)$:
- $f(x) + k$ shifts **up** $k$; $f(x) - k$ shifts **down**.
- $f(x - h)$ shifts **right** $h$; $f(x + h)$ shifts **left** (opposite of the sign!).
- $-f(x)$ reflects over the $x$-axis; $f(-x)$ over the $y$-axis.
- $a\,f(x)$ stretches vertically by $a$.

**Worked.** The graph of $y = f(x)$ has a minimum at $(2, -1)$. Where is the minimum of $y = f(x - 3) + 4$?

> **Solution.** Right 3, up 4 → $(2+3,\,-1+4) = (5, 3).$

## 2. Quadratics: the three forms (and what each tells you)

- Standard $ax^2+bx+c$ → $y$-intercept is $c$.
- Factored $a(x-r_1)(x-r_2)$ → **roots/x-intercepts** $r_1, r_2$.
- Vertex $a(x-h)^2+k$ → **vertex** $(h,k)$; axis $x=h$.

**Worked.** A parabola has $x$-intercepts at $x = -1$ and $x = 5$. What is the $x$-coordinate of its vertex?

> **Solution.** Vertex is midway between roots: $x = \dfrac{-1+5}{2} = 2.$

## 3. Nonlinear systems (line meets parabola)

Set expressions equal, move to one side, solve the quadratic. The **discriminant** tells how many intersections (2 / 1 / 0).

**Worked.** For what value of $c$ is the line $y = c$ **tangent** to $y = x^2 - 4x + 7$ (exactly one solution)?

> **Solution.** $x^2 - 4x + 7 = c \Rightarrow x^2 - 4x + (7-c) = 0$. Tangent ⇒ discriminant $0$: $(-4)^2 - 4(7-c)=0 \Rightarrow 16 - 28 + 4c = 0 \Rightarrow c = 3.$ (This is the vertex's $y$-value.)

## 4. Exponential models

$y = a\,b^{t}$: $a$ = initial value, $b$ = growth factor per period. Growth $b = 1+r$, decay $b = 1-r$.

**Worked.** A \$2{,}000 investment grows 3% per year. Which expression gives its value after $t$ years, and what is it after 2 years?

> **Solution.** $2000(1.03)^t$. After 2 years: $2000(1.03)^2 = 2000(1.0609) = \$2{,}121.80.$

## 5. Data analysis subtleties

- **Mean vs median:** a few large outliers raise the **mean** more than the median. A right-skewed set has mean > median.
- **Standard deviation** compares **spread**, not center. Two sets with the same mean can differ in SD.
- **Adding a constant** to every value shifts mean/median but **not** the SD or range.
- **Margin of error** shrinks with a larger random sample.

**Worked.** Set A: $10, 10, 10, 10$. Set B: $4, 8, 12, 16$. Both have mean 10. Which has the larger standard deviation?

> **Solution.** **Set B** — its values are spread out; Set A has zero spread (SD $=0$).

## 6. Percent and rate traps

- "% of" vs "% more/less": a 20% increase then a 20% decrease does **not** return to the start ($1.2 \times 0.8 = 0.96$).

**Worked.** A price rises 20%, then falls 20%. Net change from the original?

> **Solution.** $1.2 \times 0.8 = 0.96 \Rightarrow$ a **4% decrease** overall.

---

## Progressive practice

**P1.** If the graph of $y = f(x)$ passes through $(1, 5)$, what point must $y = f(x) - 2$ pass through?

**P2.** A parabola has vertex $(3, -4)$ and passes through $(5, 0)$. Find $a$ in $y = a(x-3)^2 - 4$.

**P3.** For what $k$ does $y = x^2 + 2x + k$ have exactly one real root?

**P4.** A bacteria count doubles every 3 hours, starting at 200. Write the count after $t$ hours.

> **Answers.**
> P1. $(1, 3)$.
> P2. $0 = a(2)^2 - 4 \Rightarrow 4a = 4 \Rightarrow a = 1.$
> P3. discriminant $4 - 4k = 0 \Rightarrow k = 1.$
> P4. $200\cdot 2^{\,t/3}.$

> Foundations: **SAT Math — Knowledge Points**. More drills: **SAT Math — Problem Set**.
