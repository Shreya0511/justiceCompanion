import React, { useState, useRef, useEffect } from 'react';
import "../../styles/myths.css";
import Navbar from "../../components/Navbar";

const contentData = [
  { title: 'Myth: The Indian judiciary is slow and inefficient, leading to long case pendency.', description: 'Reality: While case backlogs remain a challenge, there have been efforts to improve court efficiency through e-filing, fast-track courts, and judicial reforms' },
  { title: 'Myth: The Indian legal system is lenient and criminals easily escape punishment.', description: 'Reality: While there are concerns about conviction rates, India has strict laws and penalties for various crimes, and the enforcement machinery is constantly evolving.' }
 , { title: 'Myth: Women do not have equal rights and are disadvantaged in the legal system.', description: 'Reality: The Indian Constitution guarantees equal rights for all, and various laws protect women from discrimination and violence. While challenges remain, the legal system provides avenues for women to seek justice.' },
 { title: 'Myth: The entire Indian legal system is corrupt, and justice can be bought.', description: 'Reality: While corruption exists in some parts, various measures are being taken to improve transparency and accountability in the judiciary. Whistleblowing mechanisms and stricter disciplinary actions against corrupt officials are helping address this issue.' },
 { title: 'Myth: Dowry harassment is only applicable if there\'s physical abuse.', description: 'Fact: The Dowry Prohibition Act covers a wide range of emotional, verbal, and economic abuse related to dowry demands.' },
 { title: 'Myth: An arrest always requires a warrant.', description: 'Fact: Police can arrest you without a warrant in certain situations, like witnessing a crime in progress or having reason to believe you committed a cognizable offense (listed in the Criminal Procedure Code)' },
 {title:'Myth: An FIR (First Information Report) automatically translates to a criminal case against the accused.',description:'Fact: An FIR is merely the initial step in a criminal investigation. The police investigate the allegations, and based on the evidence, decide whether to file a chargesheet in court.'},
    {title:'Myth: Only major crimes require legal representation.',description:'Fact: Even seemingly minor legal issues can have significant consequences. Consulting a lawyer early on can help you understand your rights, navigate legal procedures, and protect your interests effectively.'},
    {title:'Myth: Sons have a greater inheritance right than daughters in ancestral property',description:'Fact: Since 2005, daughters have equal inheritance rights as sons in ancestral property under the Hindu Succession Act.    '},
    {title:'Myth: Registering a property guarantees ownership.',description:'Fact: Registration provides legal evidence of ownership, but doesn\'t necessarily guarantee it. Title disputes can still arise due to issues like unclear ownership history or fraudulent documents.'},
    {title:'Myth: You can\'t return a product once you\'ve opened it.',description:'Fact: The Consumer Protection Act provides a cooling-off period for certain goods, allowing you to return them within a specified timeframe, even if opened, under certain conditions.'},
    {title:'Myth: Sharing memes or jokes online is harmless.    ',description:'Fact: Sharing offensive or defamatory content online can have legal consequences, even if intended as humor.'},
    {title:'Myth: Only tech-savvy people can be victims of cybercrime',description:'Fact: Anyone can be targeted for cybercrime, regardless of their technical knowledge. Be cautious about online scams, phishing attempts, and data breaches.'},
    {title:'Myth: A lawyer\'s fees are too expensive, so I can\'t afford them.',description:'Fact: Many lawyers offer legal aid or pro bono services. Additionally, some legal issues can save you money in the long run by having proper legal representation from the start.    '},
    {title:'Myth: Going to court is always a lengthy and complicated process.',description:'Fact: Alternative Dispute Resolution (ADR) mechanisms like mediation and arbitration can offer faster and less expensive solutions for certain disputes.'},
    {title:'Myth: Witnesses can withdraw their statements freely.',description:'Fact: Withdrawing a statement given in court can have legal consequences like perjury    '},
    {title:'Myth: Self-defense justifies any use of force.',description:'Fact: The force used in self-defense must be reasonable and proportionate to the threat    '},
    {title:'Myth: You can\'t sue a government entity.',description:'Fact: You can challenge government actions through public interest litigation under specific circumstances.'},
    {title:'Myth: Breaching a traffic rule is a minor offense.',description:'Fact: Repeated traffic violations can have serious consequences, including license suspension or imprisonment.    '},
    {title:'Myth: Credit card debt can\'t be waived.   ',description:'Fact: Banks may offer debt settlement options under certain conditions. '},
    {title:'Myth: Filing for bankruptcy erases all your debts.',description:'Fact: Certain debts like student loans or criminal fines might not be discharged in bankruptcy. '},
    {title:'Myth: Working overtime is always mandatory.',description:'Fact: Employees have the right to refuse unreasonable overtime demands.'},
    {title:' Myth: Only a lawyer can represent you in court.', description:'Fact: In many lower court cases, you can represent yourself. However, legal expertise is crucial for navigating complex legal procedures and presenting your case effectively. Consider consulting a lawyer, even if you choose to self-represent.    '}


];

const Myths = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentLength = contentData.length;
  const cardRef = useRef(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentLength);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + contentLength) % contentLength);
  };

  
  useEffect(() => {
    const cardElement = document.querySelector('.slider-card');
    if (cardElement) {
      const titleElement = cardElement.querySelector('h3');
      const descriptionWidth = cardElement.querySelector('p');

     
      cardElement.style.width = `${descriptionWidth + 20}px`; 
      const titleHeight = titleElement.offsetHeight;
      const lineHeight = parseFloat(getComputedStyle(titleElement).lineHeight);
      const maxTitleHeight = lineHeight * 2;

      if (titleHeight > maxTitleHeight) {
     
        const estimatedTitleWidth = titleElement.scrollWidth;
        const newWidth = Math.max(estimatedTitleWidth, descriptionWidth) + 20;
        cardElement.style.width = `${newWidth}px`;
      }
    }
  }, [currentIndex]); 

  return (
    <>
       <Navbar/>
    <div className="slider-container" >
      <div className="slider-card" ref={cardRef}>
        <h3>{contentData[currentIndex].title}</h3>
        <p>{contentData[currentIndex].description}</p>
      </div>
      <div className="navigation">
        <button onClick={handlePrev} >
          Previous
        </button>
        <button onClick={handleNext} >
          Next
        </button>
      </div>
    </div>
  </>
  );
};

export default Myths;
