import {Component} from 'react'
// import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()

    const updatedData = {
      title: data.title,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
      author: data.author,
      content: data.content,
      topic: data.topic,
    }

    this.setState({blogData: updatedData, isLoading: false})
  }

  render() {
    const {blogData, isLoading} = this.state
    const {title, imageUrl, avatarUrl, author, content} = blogData

    return (
      <div className="blog-item-details-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="blog-item-details">
            <h1 className="blog-title">{title}</h1>
            <div className="author-container">
              <img src={avatarUrl} alt={author} className="avatar" />
              <p className="author-name">{author}</p>
            </div>
            <img src={imageUrl} alt={title} className="blog-image" />
            <p className="blog-content">{content}</p>
          </div>
        )}
      </div>
    )
  }
}

export default BlogItemDetails
