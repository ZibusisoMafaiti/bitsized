const wildRobotCourse = {
    id: "wild-robot",
    title: "The Wild Robot Series",
    lessons: {
        "lesson-1": {
            title: "Lesson 1: Introduction",
            slides: [
                {
                    type: "lesson",
                    title: "Welcome to the Wild",
                    bodyText: "Watch this clip from 'The Wild Robot'. ROZZUM unit 7134 (Roz) wakes up on a remote island. Designed to assist humans, she struggles to interact with the local wildlife, who view her as a monster. She tries to offer 'conflict resolution' and 'assistance,' but quickly learns that her standard programming might not work here.",
                    mediaSource: "https://www.youtube.com/embed/eGI0vy_sMvw?si=eUUpMWKVepaBtn8a", 
                },
                {
                    type: "quiz",
                    title: "Concept Check: Biological vs. Mechanical",
                    bodyText: "Let's see if you can spot the difference between Roz and the animals.",
                    mediaSource: "", 
                    quizDetails: {
                        question: "In the movie clip, Roz introduces herself as 'ROZZUM unit 7134'. Unlike the fox or the opossum, Roz is a machine. Which of these is NOT found inside a robot like Roz?",
                        options: [
                            "A Computer Processor",
                            "Sensors",
                            "Blood and Bones",
                            "Battery"
                        ],
                        correctAnswerIndex: 2
                    }
                },
                {
                    type: "quiz",
                    title: "Concept Check: Sensors",
                    bodyText: "How does Roz perceive the angry animals?",
                    mediaSource: "",
                    quizDetails: {
                        question: "Roz says, 'Aggression detected' when the animals get angry. Which robotic part acts like her eyes and ears to gather this information from the world?",
                        options: [
                            "Actuators",
                            "Sensors",
                            "Chassis",
                            "Transmitter"
                        ],
                        correctAnswerIndex: 1
                    }
                },
                {
                    type: "quiz",
                    title: "Concept Check: Intelligence",
                    bodyText: "Roz isn't just a toy; she can learn.",
                    mediaSource: "",
                    quizDetails: {
                        question: "Roz wasn't pre-loaded with the animal language, but she says she will 'sort out this language barrier.' This ability to learn new things is called:",
                        options: [
                            "Remote Control",
                            "Artificial Intelligence (AI)",
                            "Rusting",
                            "Teleportation"
                        ],
                        correctAnswerIndex: 1
                    }
                },
                {
                    type: "quiz",
                    title: "Concept Check: Programming",
                    bodyText: "Why does Roz want to help the gosling?",
                    mediaSource: "",
                    quizDetails: {
                        question: "The opossum tells Roz her new job is to be a mother. Roz accepts this by saying 'Task Acquired.' In robotics, what tells a robot what tasks it must do?",
                        options: [
                            "The Programming (Code)",
                            "The Paint Job",
                            "The Wheels",
                            "The Speaker"
                        ],
                        correctAnswerIndex: 0
                    }
                },
                {
                    type: "quiz",
                    title: "Concept Check: Adaptation",
                    bodyText: "Survival requires change.",
                    mediaSource: "",
                    quizDetails: {
                        question: "Fill in the blank: A standard machine just repeats the same motion forever. But Roz is special because she can ______ to her new environment.",
                        options: [
                            "Rust",
                            "Adapt",
                            "Freeze",
                            "Explode"
                        ],
                        correctAnswerIndex: 1
                    }
                },
                {
                    type: "lesson",
                    title: "Summary: Robot vs. Machine",
                    bodyText: "So, is Roz just a big toaster? No! A standard machine (like a toaster or remote control car) only does exactly what a human tells it to do, or repeats one simple task blindly. Roz is a ROBOT because she has three special traits: 1. SENSING (she sees and hears the animals), 2. PLANNING (she uses her computer brain to decide how to help them), and 3. ACTING (she moves and speaks on her own). This loop called 'Sense-Plan-Act' allows her to be AUTONOMOUS—meaning she can make her own choices without a human holding a controller.",
                    mediaSource: ""
                },
                {
                    type: "lesson",
                    title: "Meet Your Robot: The mBot2",
                    bodyText: "Just like Roz, the mBot2 is a real robot because it follows the Sense-Plan-Act loop! Let's look at its special parts that make this possible.",
                    mediaSource: ""
                },
                {
                    type: "lesson",
                    title: "mBot2 Sensors: Eyes & Ears",
                    bodyText: "SENSING: The mBot2 has an Ultrasonic Sensor to measure distance (preventing crashes) and a Quad RGB Sensor to detect colors and lines. These are like its eyes and ears.",
                    mediaSource: "/images/sensors_image.jpg" // Updated path to standard public folder
                },
                {
                    type: "lesson",
                    title: "mBot2 CyberPi: The Brain",
                    bodyText: "PLANNING: The CyberPi is the main computer board. It processes the data gathered by the sensors and runs your code to decide what the robot should do next.",
                    mediaSource: "/images/cyberpi_image.jpg" // Updated path to standard public folder
                },
                {
                    type: "lesson",
                    title: "mBot2 Actuators: Muscles & Voice",
                    bodyText: "ACTING: Once a plan is made, the mBot2 uses Encoder Motors to drive precisely and a Speaker and Screen on the CyberPi to communicate with you. It doesn't just drive blindly; it thinks about where it's going!",
                    mediaSource: "/images/actuators_image.jpg" // Updated path to standard public folder
                }
            ]
        },
        "lesson-2": {
            title: "Lesson 2: Movement Basics",
            slides: [
                {
                    title: "Coming Soon",
                    type: "lesson",
                    bodyText: "This lesson is under construction. Check back soon to learn how to move your mBot!",
                    mediaSource: ""
                }
            ]
        }
    }
};

// Export the object so other files can use it
export default wildRobotCourse;