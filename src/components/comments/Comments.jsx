import React, { useState } from 'react';
import './Comments.scss';
import Pagination from '../pagination/Pagination';

export default function Comments({ comments, sortOption }) {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const sortComments = (option) => {
    switch (option) {
      case 'newest':
        return comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'highest':
        return comments.sort((a, b) => b.star - a.star);
      case 'lowest':
        return comments.sort((a, b) => a.star - b.star);
      default:
        return comments;
    }
  };

  const sortedComments = sortComments(sortOption);
  const totalPages = Math.ceil(sortedComments.length / commentsPerPage);

  // Get comments for the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = sortedComments.slice(indexOfFirstComment, indexOfLastComment);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="comments">
      {currentComments.length > 0 ? (
        currentComments.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <img
                className="comment-user-avatar"
                src={`${process.env.REACT_APP_API_BASE_URL}/images/${comment.user.profilePicture}`}
                onError={(e) => {
                  e.target.src = `/images/default-user.png`;
                }}
                alt="User Avatar"
              />
              <span className="comment-user-name">{comment.user.fullName}</span>
              <p className="stars">
            <span className="star">
            <span style={!comment.star ? { width: "0%" } : 
            comment.star >= 1 ? { width: "100%" } : {width: comment.star*100+"%"}} 
            className="star-o"></span></span>
            <span className="star">
            <span style={!comment.star || comment.star < 1 ? { width: "0%" } : 
            comment.star >= 2  ? { width: "100%" } : 
            {width: (comment.star-1)*100+"%"}}
            className="star-o"></span></span>
            <span className="star">
            <span style={!comment.star || comment.star < 2 ? { width: "0%" } : 
            comment.star >= 3 ? { width: "100%" } : {width: (comment.star-2)*100+"%"}} 
             className="star-o"></span></span>
            <span className="star">
            <span style={!comment.star || comment.star < 3 ? { width: "0%" } :
            comment.star >= 4 ? { width: "100%" } : {width: (comment.star-3)*100+"%"}} 
            className="star-o"></span></span>
            <span className="star">
            <span style={!comment.star || comment.star < 4 ? { width: "0%" } : 
            comment.star >= 5 ? { width: "100%" } : {width: (comment.star-4)*100+"%"}} 
            className="star-o"></span></span>
          </p>
            </div>
            <p className="comment-text">{comment.text}</p>
            <span className='createdAt'>{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
        ))
      ) : (
        <p className="no-comments">Henüz değerlendirilmedi.</p>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
