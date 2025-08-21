import { useState } from "react";

export default function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.content.length > 250;
  const displayedContent = expanded
    ? review.content
    : review.content.slice(0, 250);

  return (
    <li className="bg-gray-800 p-4 rounded-lg shadow-md">
      <p className="text-sm text-gray-400 mb-2">
        By {review.author}{" "}
        {review.author_details?.rating && (
          <span>⭐ {review.author_details.rating}</span>
        )}
      </p>
      <p className="text-gray-200">
        {displayedContent}
        {isLong && (
          <span
            onClick={() => setExpanded(!expanded)}
            className="text-blue-400 cursor-pointer ml-2"
          >
            {expanded ? "Read less" : "... Read more"}
          </span>
        )}
      </p>
    </li>
  );
}
