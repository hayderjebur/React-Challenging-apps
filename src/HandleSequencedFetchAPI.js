import React from 'react'
import ReactDOM from 'react-dom'

//https://www.youtube.com/watch?v=y55rLsSNUiM  

function useFetch(url) {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  React.useEffect(
    () => {
      if (!url) {
        return
      }
      fetch(url)
        .then(data => data.json())
        .then(data => {
          setData(data)
          setLoading(false)
        })
        .catch(err => {
          setError(err.toString())
          setLoading(false)
        })
    },
    [url],
  )

  return [loading, error, data]
}

function Post({title, author, body}) {
  return (
    <div>
      <h1>{title}</h1>
      <div>{author.name}</div>
      <article>{body}</article>
    </div>
  )
}

function App() {
  const [postLoading, postError, postData] = useFetch(
    'https://jsonplaceholder.typicode.com/posts/30',
  )
  const [userLoading, userError, userData] = useFetch(
    postData
      ? `https://jsonplaceholder.typicode.com/users/${postData.userId}`
      : null,
  )
  if (postLoading || userLoading) {
    return 'loading...'
  }
  if (postError || userError) {
    return 'error'
  }
  if (postData && userData) {
    return (
      <Post title={postData.title} author={userData} body={postData.body} />
    )
  }
  return 'hmm....'
}

ReactDOM.render(<App />, document.getElementById('root'))
