import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const canDelete = blog.user && user && blog.user.username === user.username

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className="blogDetails">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => handleLike(blog)} data-testid="like-btn">like</button>
        </div>
        <div>{blog.user ? blog.user.name : ''}</div>
        {canDelete && <button onClick={() => handleRemove(blog)}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default Blog
