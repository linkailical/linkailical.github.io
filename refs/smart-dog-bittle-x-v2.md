# Smart Dog Project References: Petoi Bittle X V2

Updated: 2026-06-22

## Decision

For a smart robot dog project whose core requirement is **voice control to trigger robot expressions and actions**, choose **Petoi Bittle X V2**.

Reason:

- It is officially described as an open-source, voice-controlled robot dog.
- It already supports more than 35 predefined voice-triggered actions.
- It supports English and Chinese voice-command modes.
- It can record up to 10 customized voice commands and bind them to custom robot skills.
- It supports Petoi Coding Blocks, C++, and Python, which makes the project easier to explain and extend.
- In version one, expressions can be implemented as body-language expressions: posture, head motion, audio response, and short movement sequences.

## Main References

### Product and Setup

- [Bittle X V2 official page](https://guide.petoi.com/product/bittle-x-v2)
  - Key notes: Bittle X V2 is described as an open-source, voice-controlled robot dog.
  - It can respond to voice commands and perform actions such as sit, push-up, and backflip.
  - It supports 10 additional customized voice commands.

- [Bittle X V2 Quick Start Guide](https://guide.petoi.com/product/bittle-x-v2/quick-start-guide)
  - Use for unboxing, assembly, and boot-up.
  - Best first tutorial before adding custom voice actions.

### Voice Control

- [Voice Command Module](https://guide.petoi.com/extensible-modules/voice-command-module)
  - Key notes: controls Petoi robots through voice without wake words.
  - Supports fixed bilingual commands and customized commands.
  - Documents enabling/disabling voice mode, language switching, debugging, and custom command recording.

- [Voice Command Module: Bittle / Bittle X](https://guide.petoi.com/extensible-modules/voice-command-module/bittle-bittle-x)
  - Use for the Bittle-specific voice command list.
  - This page points to the latest official command list.

### Board and Hardware

- [BiBoard V1 Guide](https://guide.petoi.com/biboard/biboard-v1-guide)
  - Bittle X V2 uses Petoi's BiBoard family.
  - BiBoard V1 is based on ESP32.
  - Publicly documented hardware features include:
    - ESP32-U4WDH
    - 12-channel PWM servo interface
    - MPU6050 gyroscope
    - voice command module
    - Grove expansion sockets
    - Raspberry Pi port
    - speaker
    - touch pad socket
    - 7-9V input, 5V operating voltage

- [OpenCatESP32 GitHub repository](https://github.com/PetoiCamp/OpenCatEsp32-Quadruped-Robot)
  - Current-generation Petoi firmware for ESP32/BiBoard hardware.
  - The README says BiBoard is the control board for Bittle X and Nybble Q.
  - The repository is MIT licensed.
  - Important note: the README describes the platform as open source and says hardware and software are forkable.

- [OpenCat GitHub repository](https://github.com/PetoiCamp/OpenCat-Quadruped-Robot)
  - Main OpenCat framework repository for legacy NyBoard / ATmega328P hardware.
  - Useful for understanding the older Arduino-based architecture and general quadruped framework.
  - For Bittle X V2, use OpenCatESP32 instead.

## Board Openness Notes

The project can state that Bittle X V2 is built on an open-source Petoi platform and that its firmware/software stack is public.

Be precise about the board:

- Confirmed: BiBoard V1 specifications and module layout are documented publicly.
- Confirmed: OpenCatESP32 source code is public on GitHub under MIT license.
- Confirmed: Petoi describes BiBoard/OpenCatESP32 as open-source and forkable.
- Not yet confirmed from the public repository: complete downloadable PCB fabrication files such as KiCad project files, Gerbers, or full editable schematic/PCB source.

If the project requires manufacturing a custom board, ask Petoi directly or search their support/forum for BiBoard V1 schematic, PCB, Gerber, or KiCad files.

## Recommended Project Scope

Minimum demo:

1. Assemble and boot Bittle X V2.
2. Test built-in commands: sit, stand, walk, push-up, backflip.
3. Switch between English and Chinese voice command modes.
4. Record 3-5 custom voice commands.
5. Bind custom commands to visible expressions and actions such as moonwalk, listening pose, head shake, greeting, push-up, and a short show sequence.
6. Record a short demo video.

Portfolio framing:

- Title: Robotics 01: Voice Dog
- Core idea: human voice commands are converted into robot skill commands, which trigger gait, servo-control behaviors, and body-language expressions on a quadruped robot.
- Technical stack: Petoi Bittle X V2, BiBoard/ESP32, OpenCatESP32, voice command module, C++/Python/Petoi Coding Blocks.
- Extension ideas: camera recognition, obstacle avoidance, mobile-app controls, Raspberry Pi integration, ROS experiments.

## Alternatives Considered

- [Mini Pupper documentation](https://minipupperdocs.readthedocs.io/en/latest/)
  - Good for ROS, OpenCV, reinforcement learning, and generative AI experiments.
  - Less direct for the immediate requirement of voice commands triggering dog actions.

- [Stanford Pupper documentation](https://pupper.readthedocs.io/en/latest/)
  - Good for deeper quadruped control and mechanical learning.
  - More complex and less convenient for quick voice-control demos.

- [SpotMicro GitHub](https://github.com/mike4192/spotMicro)
  - Good for 3D-printed robot dog experiments.
  - Higher build complexity and older software assumptions.

## Working Recommendation

Use **Petoi Bittle X V2** for the first version. Keep the first deliverable focused on voice commands plus reliable expression/action execution. Avoid redesigning the control board in version one; treat board-level reproduction as an optional advanced extension only after the voice-control demo works.
