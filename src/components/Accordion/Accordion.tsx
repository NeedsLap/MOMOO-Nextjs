import Image from 'next/image';
import { useState } from 'react';

import { AccordionWrapper } from '@/components/Accordion/StyledAccordion';

interface AccordionProps {
  question: string;
  answer: { path: string; name: string }[];
  selectedImages: string;
  setSelectedImages: (images: string) => void;
}

function Accordion({
  question,
  answer,
  selectedImages,
  setSelectedImages,
}: AccordionProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleQuestionClick = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const handleAnswerClick = (imagePath: string) => {
    if (selectedImages.includes(imagePath)) {
      setSelectedImages('');
    } else {
      setSelectedImages(imagePath);
    }
  };

  return (
    <AccordionWrapper>
      <div id="Accordion_wrap">
        <div className="que" onClick={handleQuestionClick}>
          <span>{question}</span>
          <div className="arrow-wrap">
            <span className={isAccordionOpen ? 'arrow-top' : 'arrow-bottom'}>
              <Image
                className="directionIcon"
                src="/icons/arrow.svg"
                width={16}
                height={16}
                alt={'Arrow Direction'}
              ></Image>
            </span>
          </div>
        </div>
        {isAccordionOpen && (
          <div className="anw" id="answer">
            {answer.map((image, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleAnswerClick(image.name)}
                className={
                  selectedImages.includes(image.name) ? 'selected' : ''
                }
                aria-label="Toggle Menu"
              >
                <Image
                  className="btnImg"
                  src={image.path.trim()}
                  width={36}
                  height={36}
                  alt={`이미지 ${index}`}
                ></Image>
              </button>
            ))}
          </div>
        )}
      </div>
    </AccordionWrapper>
  );
}

export default Accordion;
