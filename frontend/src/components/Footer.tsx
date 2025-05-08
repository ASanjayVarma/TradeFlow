import { useEffect, useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [text, setText] = useState("");
  const fullText =
    "Thanks for shopping with us at ShopEase! Your satisfaction is our priority.";

  useEffect(() => {
    let index = 0;
    let typingInterval: NodeJS.Timeout; // Define typingInterval here for cleanup

    // Function to start the typing effect
    const startTyping = () => {
      typingInterval = setInterval(() => {
        setText(fullText.slice(0, index + 1) + "\u200B"); // Add invisible character after each letter
        index++;

        if (index === fullText.length) {
          clearInterval(typingInterval); // Stop typing

          // Reset text after 2 seconds and restart typing
          setTimeout(() => {
            setText("\u200B"); // Clear the text completely but keep the invisible character
            index = 0; // Reset the index
            startTyping(); // Restart typing after clearing
          }, 2000); // Wait for 2 seconds before restarting
        }
      }, 150); // Adjust typing speed here
    };

    startTyping(); // Start typing effect when component mounts

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(typingInterval);
  }, []); // Empty dependency array to run this effect only once on mount

  return (
    <footer className="footer bg-dark text-white text-center py-5 mt-4">
      <p id="footer-text" className="footer-text">
        {text}
      </p>
      <div className="footer-subtext">
        <p className="text-muted">Thank you for visiting ShopEase</p>
        <p className="text-secondary">
          Your satisfaction is our priority. Happy shopping!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
