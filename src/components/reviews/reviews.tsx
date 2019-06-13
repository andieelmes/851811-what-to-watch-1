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

  const columnHeight = Math.ceil(reviews.length / 2);

  const reviewsByColumn = reviews.reduce((sorted, review) => (
    review.id % columnHeight === 0
      ? sorted.push([review])
      : sorted[sorted.length - 1].push(review))
    && sorted,
  []);

  return (
    <div className="movie-card__reviews movie-card__row">
      {
        reviewsByColumn.map((column: ReviewType[]) => (
          <div className="movie-card__reviews-col" key={column[0].id}>
            {
              column.map((review: ReviewType) => (
                <div className="review" key={review.id}>
                  <blockquote className="review__quote">
                    <p className="review__text">{review.comment}</p>
                    <footer className="review__details">
                      <cite className="review__author">{review.user.name}</cite>
                      <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">{review.rating}</div>
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
};

export default Reviews;
