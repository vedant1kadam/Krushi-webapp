
import { motion } from 'framer-motion';

interface TimelinePhase {
  phase: string;
  title: string;
  description: string;
}

const TimelineSection = () => {
  const phases: TimelinePhase[] = [
    {
      phase: 'Test Phase',
      title: 'Initial Setup',
      description:
        'Get your soil tested from your nearest soil testing lab .',
    },
    {
      phase: 'Crop insight Phase',
      title: 'Data Input',
      description:
        'Input the spicified values from you soil test reports.',
    },
    {
      phase: 'Ferilizer insight Phase',
      title: 'Growth  ',
      description:
        'Input the N,P and K values and the crop you want to grow to get the nessery steps .',
    },
    {
      phase: 'Implementation Phase',
      title: 'Full Deployment',
      description:
        'The Ball is in your court you can grow the recommended crops.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Implementation Steps
        </h2>
        <div className="max-w-4xl mx-auto">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex mb-8 last:mb-0"
            >
              <div className="w-32 flex-shrink-0 text-soilsmart-green font-semibold">
                {phase.phase}
              </div>
              <div className="flex-grow pl-8 border-l-2 border-soilsmart-green/20">
                <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                <p className="text-gray-600">{phase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
