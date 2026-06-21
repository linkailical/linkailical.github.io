# Smart Dog Build Resources

Updated: 2026-06-22

This file is the build-focused reference index for completing a voice-controlled
robot dog project with **Petoi Bittle X V2**.

The maintained static guide lives at:

```text
public/robotics/voice-dog/
```

The older `public/smartdog/` folder is only a compatibility redirect.

## Build Path

1. Confirm project target: voice command -> robot action.
2. Use Petoi Bittle X V2 as the robot base.
3. Inspect all kit parts.
4. Assemble the robot body and route servo cables cleanly.
5. Upload or verify Bittle X V2 firmware on BiBoard V1.
6. Calibrate all joints.
7. Test built-in voice commands.
8. Record custom voice commands and map them to actions.
9. Design expression behaviors using body posture, head motion, audio response, and short motion sequences.
10. Document with photos, video, problems, and fixes.

## Official Build References

- Bittle X V2 product page: https://guide.petoi.com/product/bittle-x-v2
- Quick Start Guide: https://guide.petoi.com/product/bittle-x-v2/quick-start-guide
- Unboxing: https://guide.petoi.com/product/bittle-x-v2/quick-start-guide/unboxing
- Assembling: https://guide.petoi.com/product/bittle-x-v2/quick-start-guide/assembling
- Boot up: https://guide.petoi.com/product/bittle-x-v2/quick-start-guide/boot-up
- Joint Calibration: https://guide.petoi.com/quick-reference/joint-calibration
- Firmware Uploader: https://guide.petoi.com/desktop-app/firmware-uploader
- Skill Composer: https://guide.petoi.com/desktop-app/skill-composer
- Voice Command Module: https://guide.petoi.com/extensible-modules/voice-command-module
- Bittle / Bittle X Voice Commands: https://guide.petoi.com/extensible-modules/voice-command-module/bittle-bittle-x
- BiBoard V1 Guide: https://guide.petoi.com/biboard/biboard-v1-guide
- OpenCatESP32 GitHub: https://github.com/PetoiCamp/OpenCatEsp32-Quadruped-Robot
- Python API: https://guide.petoi.com/apis/python-api

## Minimum Demo Requirements

- Robot powers on from battery.
- Robot can stand and sit after calibration.
- At least five built-in voice commands work.
- At least three custom voice commands work.
- At least three expression behaviors work.
- One full show sequence can run twice without manual reset.

## Recommended Demo Script

1. Say a language-switch command if needed.
2. Say a basic command: stand.
3. Say a motion command: walk.
4. Say a custom command: hello.
5. Say a custom command: dance.
6. Say a stop or quiet command before picking up the robot.

## Notes for Portfolio Writing

Project title:

```text
Voice-Controlled Smart Robot Dog
```

Short description:

```text
Built a voice-controlled quadruped robot using Petoi Bittle X V2, BiBoard V1,
and OpenCatESP32. The system maps spoken commands to robot skill commands,
allowing the robot to perform built-in and custom expressive actions.
```

Technical stack:

- Petoi Bittle X V2
- BiBoard V1 / ESP32
- OpenCatESP32
- Petoi Voice Command Module
- Petoi Desktop App
- Skill Composer
- Optional Python API
