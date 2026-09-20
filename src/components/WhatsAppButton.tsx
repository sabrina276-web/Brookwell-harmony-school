import { motion } from 'framer-motion';
import { school } from '../data/school';
import './WhatsAppButton.css';

function WhatsAppButton() {
  const message = encodeURIComponent(
    `Hello Brookwell Harmony School, I'd like to enquire about admissions.`
  );

  return (
    <motion.a
      href={`https://wa.me/${school.whatsappDial}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-btn"
      aria-label="Chat with Brookwell Harmony School on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      whileHover={{ scale: 1.06 }}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.2.58 4.26 1.6 6.04L4 29l8.14-1.55a12 12 0 0 0 3.88.64c6.63 0 12.02-5.4 12.02-12.02C28.04 8.4 22.65 3 16.02 3Zm0 21.9a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-4.83.92.94-4.7-.24-.38a9.83 9.83 0 1 1 9.48 5.74Zm5.4-7.36c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.16-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43a8.7 8.7 0 0 1-1.61-2c-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.74-.71 1.99-1.4.24-.68.24-1.27.17-1.4-.07-.12-.27-.2-.56-.34Z"
        />
      </svg>
    </motion.a>
  );
}

export default WhatsAppButton;
