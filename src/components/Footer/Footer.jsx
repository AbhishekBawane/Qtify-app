import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import styles from "./Footer.module.css"

function Footer(){

    const faqs =[
         {
      question: "Is QTify free to use?",
      answer: "Yes! It is 100% free, and we don’t charge anything."
    },
    {
      question: "Can I download and listen to songs offline?",
      answer:
        "Sorry, unfortunately we don't provide the service to download any songs."
    }
    ];

    return (
        <div className={styles.footer}><div>
            <h1 className={styles.heading}>FAQs</h1>
            {
                faqs.map((faq, index)=>(
                    <Accordion className={styles.accodiance}>
                    <AccordionSummary key= {index} className={styles.question}>
                          <Typography>{faq.question}</Typography>
                    </AccordionSummary >
                    <AccordionDetails className={styles.answer}><Typography>{faq.answer}</Typography></AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
        </div>
    )
}
export default Footer;
