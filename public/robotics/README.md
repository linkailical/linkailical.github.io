# Robotics Engineering

This folder is the public project family for robotics-related work.

Each implementation should live in its own subfolder so the design and build
history can keep evolving without mixing unrelated robot projects.

## Current Implementations

- `voice-dog/` - Robotics 01: Voice Dog
  - Petoi Bittle X V2
  - Voice commands
  - Expressive actions using posture, head motion, audio response, and short motion sequences

## Suggested Structure

```text
public/robotics/
  index.html
  README.md
  voice-dog/
    index.html
    README.md
    data/
      build-plan.js
```

Future projects can follow the same pattern:

```text
public/robotics/vision-obstacle/
public/robotics/robot-arm/
public/robotics/ros-navigation/
```

## Design Rule

Every robot implementation should include:

1. Goal and demo scope.
2. Bill of materials.
3. Build steps.
4. Firmware/software setup.
5. Testing checklist.
6. Troubleshooting notes.
7. References.
8. Version notes for future updates.
