import * as React from 'react';

import { Review as ReviewType } from 'App/types';
import { Review } from 'types';

interface Props {
  reviews: ReviewType[],
};

const Reviews: React.FunctionComponent<Props> = (props) => {
  const {
    reviews,
  } = props;

  const sortedReviews = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const reviewColHeight = Math.ceil(sortedReviews.length / 2);
  const reviewsByColumn = [sortedReviews.slice(0, reviewColHeight), sortedReviews.slice(reviewColHeight)]

  return (
    <div className="movie-card__reviews movie-card__row">
      {
        reviewsByColumn.map((column: ReviewType[]) => (
          <div className="movie-card__reviews-col" key={column[0].id}>
            {
              column.map((review: ReviewType) => {
                const datetime = review.date.split('T')[0];
                const date = new Date(review.date);
                const formattedDate = `${date.toLocaleString('en-us', { month: 'long', day: 'numeric' })}, ${date.getFullYear()}`;

                return (
                  <div className="review" key={review.id}>
                    <blockquote className="review__quote">
                      <p className="review__text">{review.comment}</p>
                      <footer className="review__details">
                        <cite className="review__author">{review.user.name}</cite>
                        <time className="review__date" dateTime={datetime}>{formattedDate}</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{review.rating}</div>
                  </div>
                )
              })
            }
          </div>
        ))
      }
    </div>
  );
};

export default Reviews;
