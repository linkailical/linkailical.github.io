window.SMARTDOG_BUILD = {
  project: {
    title: "Robotics 01: Voice Dog",
    zhTitle: "机器人工程 01：语音小狗",
    platform: "Petoi Bittle X V2 + BiBoard V1",
    goal: "Build a robot dog that responds to spoken commands and performs reliable expressive actions.",
    zhGoal: "完成一只可以听懂语音命令，并通过姿态、声音和动作序列表达情绪的机器狗。"
  },
  bom: [
    {
      group: "Required kit",
      zhGroup: "必需套件",
      items: [
        "Petoi Bittle X V2 construction kit or pre-assembled kit",
        "BiBoard V1 ESP32 mainboard",
        "Rechargeable battery",
        "P1S servos included with the kit",
        "USB data cable",
        "Self-tapping screwdriver and screws",
        "Calibration stand or calibrator part"
      ]
    },
    {
      group: "Computer and software",
      zhGroup: "电脑与软件",
      items: [
        "macOS, Windows, or Linux computer",
        "Petoi Desktop App",
        "Arduino IDE for advanced firmware work",
        "OpenCatESP32 source code",
        "Python 3 for optional scripting"
      ]
    },
    {
      group: "Optional extensions",
      zhGroup: "可选扩展",
      items: [
        "Ultrasonic sensor for obstacle-distance behavior",
        "Petoi AI Vision module or camera module",
        "Raspberry Pi 4 or 5 for advanced perception",
        "OLED or LED display for later facial-expression experiments",
        "Extra P1S servos",
        "Small labels for marking legs and cables"
      ]
    }
  ],
  phases: [
    {
      id: "research",
      title: "1. Confirm the build target",
      zhTitle: "1. 明确项目目标",
      duration: "0.5 day",
      output: "A clear demo target, selected hardware path, and expression-action design.",
      zhOutput: "明确演示目标、硬件路线和表情动作设计。",
      steps: [
        "Use Bittle X V2 as the base robot because voice control is already supported.",
        "Keep the first version focused on voice command to expressive action execution.",
        "Do not redesign the control board in version one.",
        "Define five demo actions: sit, stand, walk, greeting, and show sequence.",
        "Define expression behaviors using posture, head motion, audio response, and short movement sequences."
      ],
      checks: [
        "Project title and scope written down",
        "Bittle X V2 selected",
        "Voice-command demo actions selected",
        "Expression behaviors selected",
        "Board redesign moved to optional extension"
      ]
    },
    {
      id: "unbox",
      title: "2. Unbox and inspect parts",
      zhTitle: "2. 开箱与零件检查",
      duration: "0.5 day",
      output: "All required parts are present and labeled.",
      zhOutput: "确认零件齐全并完成标记。",
      steps: [
        "Inspect the package for damage before opening.",
        "Verify the kit version: construction kit or pre-assembled kit.",
        "Check body, neck, head, upper legs, lower legs, servos, battery, screws, and USB cable.",
        "Label legs and servo cable positions before assembly."
      ],
      checks: [
        "Main frame checked",
        "10 servos checked",
        "BiBoard V1 checked",
        "Battery and USB cable checked",
        "Screws and tools checked"
      ]
    },
    {
      id: "assemble",
      title: "3. Assemble the robot",
      zhTitle: "3. 组装机器狗",
      duration: "1 day",
      output: "Robot body assembled with servos and battery installed.",
      zhOutput: "完成机身、舵机和电池组装。",
      steps: [
        "Follow the official assembly sequence instead of forcing parts into place.",
        "Mount servos with the correct orientation and cable direction.",
        "Route cables cleanly to avoid pulling during leg motion.",
        "Attach the neck, head, battery, and back cover.",
        "Use the stand during debugging to prevent falls."
      ],
      checks: [
        "All legs mounted",
        "Servo cables routed without tension",
        "Battery orientation checked",
        "Back cover cable not pinched",
        "Robot placed on stand for first power-on"
      ]
    },
    {
      id: "firmware",
      title: "4. Upload or verify firmware",
      zhTitle: "4. 上传或确认固件",
      duration: "0.5 day",
      output: "BiBoard V1 runs the correct Bittle X V2 firmware.",
      zhOutput: "BiBoard V1 运行正确的 Bittle X V2 固件。",
      steps: [
        "Connect BiBoard V1 to the computer using a data-capable USB cable.",
        "Open Petoi Desktop App and use Firmware Uploader.",
        "Select product Bittle X and board version BiBoard_V1_0 for Bittle X V2.",
        "Use Standard mode first; switch modes later through serial commands if needed.",
        "Confirm the firmware uploader reports success."
      ],
      checks: [
        "USB serial port detected",
        "Product selected correctly",
        "Board version set to BiBoard_V1_0",
        "Firmware upload complete",
        "Battery connected before movement tests"
      ]
    },
    {
      id: "calibrate",
      title: "5. Calibrate joints",
      zhTitle: "5. 舵机校准",
      duration: "0.5-1 day",
      output: "Robot stands straight and performs basic movements without binding.",
      zhOutput: "机器狗可以站稳，基础动作不卡滞。",
      steps: [
        "Use Petoi Desktop App Joint Calibrator or the official calibration workflow.",
        "Put the robot on the stand before moving servos.",
        "Check each leg against the official joint index.",
        "Adjust offsets gradually instead of making large jumps.",
        "Save offsets and retest stand, sit, and walk."
      ],
      checks: [
        "Joint index understood",
        "All legs symmetrical",
        "Offsets saved",
        "Stand pose stable",
        "No servo stalls during simple movement"
      ]
    },
    {
      id: "voice",
      title: "6. Test built-in voice commands",
      zhTitle: "6. 测试内置语音命令",
      duration: "0.5 day",
      output: "Robot responds to spoken commands with reliable actions.",
      zhOutput: "机器狗可以稳定响应语音命令并执行动作。",
      steps: [
        "Start in a quiet room and keep the robot close enough to hear commands.",
        "Say Play sound to enable voice response if needed.",
        "Say Be quiet to disable responses when testing is finished.",
        "Use Bing-Bing to switch to English mode or Di-Di to switch to Chinese mode.",
        "Test simple actions before high-energy actions such as backflip."
      ],
      checks: [
        "Voice module produces audio response",
        "Language mode confirmed",
        "Sit command works",
        "Walk command works",
        "One advanced action tested safely"
      ]
    },
    {
      id: "custom",
      title: "7. Add custom voice actions",
      zhTitle: "7. 添加自定义语音动作",
      duration: "1 day",
      output: "At least three custom commands trigger expressive custom skills.",
      zhOutput: "至少三条自定义语音命令可以触发表情化自定义动作。",
      steps: [
        "Use Start learning to enter custom voice command recording mode.",
        "Record short commands with fewer than six syllables.",
        "Use Stop learning to exit recording mode.",
        "Map commands to visible skills such as moonwalk, head shake, listening pose, or a show sequence.",
        "Use Skill Composer for new motions if predefined skills are not enough."
      ],
      checks: [
        "Custom command 1 recorded",
        "Custom command 2 recorded",
        "Custom command 3 recorded",
        "Each command mapped to a visible expression or action",
        "Demo sequence can run twice in a row"
      ]
    },
    {
      id: "document",
      title: "8. Document the build",
      zhTitle: "8. 完成项目记录",
      duration: "0.5 day",
      output: "A portfolio-ready robotics iteration with photos, demo video, and design notes.",
      zhOutput: "完成可放入作品集的机器人迭代记录、图片、视频和设计说明。",
      steps: [
        "Take photos of the build stages: parts, assembly, calibration, and demo.",
        "Record a 30-60 second voice-control demo video.",
        "Write a short explanation of how voice commands become robot skill commands.",
        "Explain how the robot uses body language instead of a screen for first-version expressions.",
        "List problems encountered and how they were fixed.",
        "Add sources and official documentation links."
      ],
      checks: [
        "Build photos saved",
        "Demo video recorded",
        "Technical explanation written",
        "Troubleshooting notes written",
        "Reference links included"
      ]
    }
  ],
  voiceCommands: [
    {
      command: "Play sound",
      purpose: "Enable voice response and check that the module is active.",
      zhPurpose: "开启语音响应并确认模块工作。"
    },
    {
      command: "Be quiet",
      purpose: "Disable voice reactions to prevent accidental triggers.",
      zhPurpose: "关闭语音反应，避免误触发。"
    },
    {
      command: "Bing-Bing",
      purpose: "Switch to English voice mode.",
      zhPurpose: "切换到英文语音模式。"
    },
    {
      command: "Di-Di",
      purpose: "Switch to Chinese voice mode.",
      zhPurpose: "切换到中文语音模式。"
    },
    {
      command: "Start learning",
      purpose: "Enter custom voice-command recording mode.",
      zhPurpose: "进入自定义语音命令录制模式。"
    },
    {
      command: "Stop learning",
      purpose: "Exit custom voice-command recording mode.",
      zhPurpose: "退出自定义语音命令录制模式。"
    },
    {
      command: "Clear the learning data",
      purpose: "Delete all recorded custom commands.",
      zhPurpose: "删除全部自定义命令记录。"
    }
  ],
  demoActions: [
    {
      name: "Greeting",
      trigger: "Hello",
      idea: "Wave head or lift one leg briefly, then return to stand.",
      zhIdea: "摇头或短暂抬腿，再回到站立姿态。"
    },
    {
      name: "Exercise",
      trigger: "Exercise",
      idea: "Run a push-up action.",
      zhIdea: "执行俯卧撑动作。"
    },
    {
      name: "Dance",
      trigger: "Dance",
      idea: "Run moonwalk or a short skill-composer sequence.",
      zhIdea: "执行 moonwalk 或短组合动作。"
    },
    {
      name: "Show time",
      trigger: "Show time",
      idea: "Chain sit, stand, head shake, and walk forward.",
      zhIdea: "串联坐下、站立、摇头和向前走。"
    }
  ],
  expressionActions: [
    {
      name: "Happy",
      zhName: "开心",
      trigger: "Happy",
      design: "Quick head nod, small forward step, short melody or voice response, then stable stand.",
      zhDesign: "快速点头，小步向前，短音效或语音反馈，然后回到稳定站立。"
    },
    {
      name: "Listening",
      zhName: "倾听",
      trigger: "Listen",
      design: "Lower speed, tilt head left and right, hold a still pose for two seconds.",
      zhDesign: "降低动作速度，左右歪头，并保持两秒静止姿态。"
    },
    {
      name: "Confused",
      zhName: "疑惑",
      trigger: "Confused",
      design: "Small backward step, head shake, then sit.",
      zhDesign: "小步后退，摇头，然后坐下。"
    },
    {
      name: "Excited",
      zhName: "兴奋",
      trigger: "Dance",
      design: "Moonwalk or short Skill Composer sequence with sound enabled.",
      zhDesign: "执行 moonwalk 或 Skill Composer 短动作序列，并开启声音反馈。"
    },
    {
      name: "Sleepy",
      zhName: "困了",
      trigger: "Sleep",
      design: "Sit or rest pose, quiet mode, no extra movement until the next wake command.",
      zhDesign: "坐下或趴下，切换安静状态，直到下一条唤醒命令前不做额外动作。"
    }
  ],
  risks: [
    {
      risk: "Servo stalls or overheats",
      mitigation: "Stop immediately, check joint calibration, cable tension, and battery level.",
      zhRisk: "舵机卡住或发热",
      zhMitigation: "立即停止，检查舵机校准、线缆拉扯和电池电量。"
    },
    {
      risk: "Voice command does not trigger",
      mitigation: "Check language mode, say Play sound, reduce background noise, and reset the voice module if needed.",
      zhRisk: "语音命令无反应",
      zhMitigation: "检查语言模式，说 Play sound，降低背景噪声，必要时重置语音模块。"
    },
    {
      risk: "Firmware upload fails",
      mitigation: "Use a data USB cable, select the correct serial port, and confirm board version BiBoard_V1_0.",
      zhRisk: "固件上传失败",
      zhMitigation: "使用可传输数据的 USB 线，选择正确串口，并确认板子版本为 BiBoard_V1_0。"
    },
    {
      risk: "Robot falls during testing",
      mitigation: "Use the stand for early tests and avoid high-energy tricks until basic motion is stable.",
      zhRisk: "测试时跌倒",
      zhMitigation: "早期测试使用支架，基础动作稳定前不要测试高冲击动作。"
    }
  ],
  resources: [
    {
      category: "Product",
      zhCategory: "产品",
      title: "Bittle X V2 official page",
      url: "https://guide.petoi.com/product/bittle-x-v2",
      note: "Official overview of Bittle X V2 as an open-source, voice-controlled robot dog."
    },
    {
      category: "Assembly",
      zhCategory: "组装",
      title: "Quick Start Guide",
      url: "https://guide.petoi.com/product/bittle-x-v2/quick-start-guide",
      note: "Entry point for unboxing, assembling, and boot-up."
    },
    {
      category: "Assembly",
      zhCategory: "组装",
      title: "Unboxing",
      url: "https://guide.petoi.com/product/bittle-x-v2/quick-start-guide/unboxing",
      note: "Packaging inspection and item list."
    },
    {
      category: "Assembly",
      zhCategory: "组装",
      title: "Assembling",
      url: "https://guide.petoi.com/product/bittle-x-v2/quick-start-guide/assembling",
      note: "Official construction-kit assembly sequence."
    },
    {
      category: "Assembly",
      zhCategory: "组装",
      title: "Boot up",
      url: "https://guide.petoi.com/product/bittle-x-v2/quick-start-guide/boot-up",
      note: "First power-on and startup checks."
    },
    {
      category: "Calibration",
      zhCategory: "校准",
      title: "Joint Calibration",
      url: "https://guide.petoi.com/quick-reference/joint-calibration",
      note: "Official joint calibration reference."
    },
    {
      category: "Firmware",
      zhCategory: "固件",
      title: "Firmware Uploader",
      url: "https://guide.petoi.com/desktop-app/firmware-uploader",
      note: "Desktop App firmware upload workflow."
    },
    {
      category: "Actions",
      zhCategory: "动作",
      title: "Skill Composer",
      url: "https://guide.petoi.com/desktop-app/skill-composer",
      note: "Design and export custom robot skills."
    },
    {
      category: "Voice",
      zhCategory: "语音",
      title: "Voice Command Module",
      url: "https://guide.petoi.com/extensible-modules/voice-command-module",
      note: "Voice mode, language switching, debugging, and custom commands."
    },
    {
      category: "Voice",
      zhCategory: "语音",
      title: "Bittle / Bittle X voice commands",
      url: "https://guide.petoi.com/extensible-modules/voice-command-module/bittle-bittle-x",
      note: "Bittle-specific voice-command list."
    },
    {
      category: "Hardware",
      zhCategory: "硬件",
      title: "BiBoard V1 Guide",
      url: "https://guide.petoi.com/biboard/biboard-v1-guide",
      note: "ESP32 board specs, servo sockets, voice module, Grove sockets, and Raspberry Pi port."
    },
    {
      category: "Code",
      zhCategory: "代码",
      title: "OpenCatESP32 GitHub",
      url: "https://github.com/PetoiCamp/OpenCatEsp32-Quadruped-Robot",
      note: "Current-generation ESP32/BiBoard firmware source code."
    },
    {
      category: "Programming",
      zhCategory: "编程",
      title: "Python API",
      url: "https://guide.petoi.com/apis/python-api",
      note: "Optional Python control path after the basic voice demo works."
    },
    {
      category: "Extension",
      zhCategory: "扩展",
      title: "Ultrasonic Sensor",
      url: "https://guide.petoi.com/extensible-modules/ultrasonic-sensor",
      note: "Optional obstacle-distance extension."
    },
    {
      category: "Extension",
      zhCategory: "扩展",
      title: "Petoi AI Vision Module",
      url: "https://guide.petoi.com/extensible-modules/petoi-ai-vision-module",
      note: "Optional vision extension for object or gesture recognition."
    }
  ],
  acceptance: [
    "Robot boots reliably from battery power.",
    "Joint calibration allows stable stand and sit actions.",
    "At least five built-in voice commands work.",
    "At least three custom voice commands work.",
    "At least three expression behaviors are demonstrated.",
    "One full demo sequence can be repeated twice without manual reset.",
    "Build notes include parts, setup, problems, fixes, and official references."
  ]
};
