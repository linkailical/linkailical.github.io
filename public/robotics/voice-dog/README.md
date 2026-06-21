# Robotics 01: Voice Dog

This is the first implementation under the broader **Robotics Engineering**
project family.

Goal: build a Petoi Bittle X V2 robot dog that can respond to voice commands and
perform expressive actions. In version one, "expression" means body-language
expression: posture, head motion, audio response, and short motion sequences.
Screen-based facial expressions can be added later with an OLED/LED module.

## Files

- `index.html` - interactive build dashboard and checklist.
- `data/build-plan.js` - bill of materials, build phases, commands, expression actions, risks, and references.

## What It Covers

1. Selecting Bittle X V2 as the hardware platform.
2. Checking parts and required software.
3. Assembly workflow.
4. Firmware upload and BiBoard V1 setup.
5. Joint calibration.
6. Built-in voice command testing.
7. Custom voice command recording.
8. Expression-action design.
9. Final documentation and demo-video acceptance checks.

## Run Locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages Path

When deployed with this Astro site, the page will be available at:

```text
/robotics/voice-dog/
```

## Reference Notes

The official Petoi references are collected in `data/build-plan.js` and in:

```text
../../../refs/smart-dog-bittle-x-v2.md
../../../refs/smart-dog-build-resources.md
```

The first version should use the official Bittle X V2 kit directly. Do not
redesign the control board until the basic voice-control and expression-action
demo is reliable.
