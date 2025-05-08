import React from 'react';
import './css/About.css';  // Corrected path to the About.css file

export function About() {
  const people = [
    { name: 'Srikruth', title: 'Project Lead', image: '/path/to/srikruth.jpg' },
    { name: 'Abhi', title: 'Front-End Developer', image: '/path/to/abhi.jpg' },
    { name: 'Yashwanth', title: 'Back-End Developer', image: '/path/to/yashwanth.jpg' },
    { name: 'Nikita', title: 'UI/UX Designer', image: '/path/to/nikita.jpg' },
    { name: 'Harshitha', title: 'QA Specialist', image: '/path/to/harshitha.jpg' },
    { name: 'Sanjay', title: 'Product Manager', image: '/path/to/sanjay.jpg' },  // Replaced Shreya with Sanjay
  ];

  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <p className="about-description">
        We are a team of passionate individuals working together to build Point-Based Lending, a platform
        designed to revolutionize how students and faculty members lend and borrow items on campus. Our
        diverse team brings expertise in various fields to create a seamless and user-friendly experience.
      </p>

      <div className="team-container">
        {people.map((person, index) => (
          <div key={index} className="team-member">
            <div className="team-member-image-container">
              <img src={person.image} alt={person.name} className="team-member-image" />
            </div>
            <h2 className="team-member-name">{person.name}</h2>
            <h3 className="team-member-title">{person.title}</h3>
            <p className="team-member-bio">
              {person.name} is a talented professional specializing in {person.title}. They have been an
              integral part of our team, contributing their expertise and ideas to bring our vision to life.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
