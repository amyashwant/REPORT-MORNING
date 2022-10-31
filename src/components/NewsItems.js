import React from "react";

const NewsItems = (props) => {
  let { title, description, imageurl, newsurl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{ right: "0", display: "flex" }}
        >
          {source}
        </span>

        <img src={imageurl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              {author} on {new Date(date).toGMTString()}
            </small>
          </p>

          <a
            href={newsurl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-primary"
          >
            read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
