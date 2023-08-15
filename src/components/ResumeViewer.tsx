import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Box, Card, Heading, Text } from '@chakra-ui/react';

export const ResumeViewer = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <>
      <Box
        bgColor="brand.500"
        p="2rem"
        color="black"
        textAlign="center"
        h="250px"
        id="resume"
      >
        <Heading>My Resume</Heading>
        <Text py="1rem">Here is a Preview of My Resume</Text>
      </Box>

      <Card
        w={{ base: '100%', lg: '80%' }}
        mx="auto"
        mb="2rem"
        mt="-100px"
        h="700px"
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.js">
          <div style={{ height: '700px' }}>
            <Viewer
              fileUrl={`resume.pdf`}
              plugins={[defaultLayoutPluginInstance]}
            />
          </div>
        </Worker>
      </Card>
    </>
  );
};
