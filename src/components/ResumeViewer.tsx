import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { motion } from 'framer-motion';

export const ResumeViewer = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <section id="resume">
      <div className="bg-gradient-to-r from-primary-700 to-primary-500 p-8 text-white text-center h-[250px] flex flex-col justify-center items-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My Resume
        </motion.h2>
        <motion.p
          className="py-4 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Here is a Preview of My Resume
        </motion.p>
      </div>

      <motion.div
        className="w-full lg:w-4/5 mx-auto mb-8 -mt-[80px] bg-card rounded-lg shadow-xl h-[700px] overflow-hidden"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        viewport={{ once: true }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.js">
          <div className="h-[700px]">
            <Viewer
              fileUrl="/resume-02-25.pdf"
              plugins={[defaultLayoutPluginInstance]}
            />
          </div>
        </Worker>
      </motion.div>
    </section>
  );
};
