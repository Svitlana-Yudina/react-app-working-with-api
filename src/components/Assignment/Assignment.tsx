import React from 'react';
import './Assignment.scss';

export const Assignment: React.FC = () => {
  return (
    <div className="assignment">
      <div className="assignment__bg">
        <div className="assignment__content">
          <article className="assignment__description test-article">
            <h1 className="test-article__title">
              Test assignment for front-end developer
            </h1>

            <p className="test-article__description">
              What defines a good front-end developer
              is one that has skilled knowledge of HTML,
              CSS, JS with a vast understanding of User
              design thinking as they&apos;ll be building web
              interfaces with accessibility in mind. They
              should also be excited to learn, as the world
              of Front-End Development keeps evolving.
            </p>

            <a
              href="#signUpForm"
              className="button test-article__button"
            >
              Sign up
            </a>
          </article>
        </div>
      </div>
    </div>
  );
};
