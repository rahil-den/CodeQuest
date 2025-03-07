import { motion } from "framer-motion";

const features = [
  {
    title: "Write & Run Code",
    description: "Instantly execute Python code with real-time feedback.",
    icon: "💻",
  },
  {
    title: "Solve Real Challenges",
    description: "Tackle curated problems to sharpen your skills.",
    icon: "🧠",
  },
  {
    title: "Get Hints & Explanations",
    description: "Never get stuck with AI-powered hints.",
    icon: "🤖",
  },
];

export default function ScrollingFeatures() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-primary text-center mb-10">
          🚀 Why Choose <span className="text-accent">CodeQuest?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="p-6 rounded-2xl shadow-md border border-secondary flex flex-col items-center text-center bg-white"
            >
              <div className="text-5xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-primary mt-4">{feature.title}</h3>
              <p className="mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
