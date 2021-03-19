// index.js

/*** HEADER ***/

function Header() {
   return (
      <div className="header">
         <img id="header-image" src="./static/journal.jpg" />
         <h1>My Journal</h1>
      </div>
   );
}

/*** COMPOSER ***/

function Composer(props) {
   const [textareaValue, setTextAreaValue] = React.useState('');

   const handleTextareaChange = (event) => {
      setTextAreaValue(event.target.value);
   }
   const handleComposerSubmit = (event) => {
      props.onSubmitPost(textareaValue);
      event.preventDefault();
   }

   return (
      <div className="composer">
         <h2 id="form-heading">What's on your mind?</h2>
         <form onSubmit={handleComposerSubmit} >
            <label>
               <textarea
                  id="form-textarea"
                  value={textareaValue}
                  onChange={handleTextareaChange}
                  placeholder="Write your next post."
                  rows="10"
                  cols="62"
               />
               <br />
            </label>
            <input type="submit" value="Post" />
         </form>
      </div>
   );
}

/*** FEED ***/

function Feed(props) {
   const posts = props.posts.map((post, index) =>
      <Post key={index} date={post.date} text={post.text} />
   );
   return (
      <div>
         {posts}
      </div>
   );
}

function Post(props) {
   return (
      <div className="post">
         <h2>{props.date}</h2>
         <p>{props.text}</p>
      </div>
   );
}

/*** FOOTER ***/

function Footer() {
   return (
      <div className="footer">
         <p>Created by TXST ACM Chapter (<a href="https://twitter.com/TxStateACM">follow us on Twitter</a>)</p>
         <p>Copyright 2021</p>
      </div>
   );
}

/*** MAIN APP ***/

function App() {
   const [posts, setPosts] = React.useState(
      [
         {
            "date": "03/03/2021",
            "text": "This is my second journal entry. Here is some more text so that this journal entry takes multiple lines to render.",
         },
         {
            "date": "03/02/2021",
            "text": "This is my very first journal entry. Hello, world!",
         },
      ]
   );

   const onSubmitPost = (text) => {
      const todaysDate = new Date().toLocaleDateString();
      setPosts([{
         "date": todaysDate,
         "text": text,
      }, ...posts]);
   }

   return (
      <div>
         <Header />
         <Composer onSubmitPost={onSubmitPost} />
         <Feed posts={posts} />
         <Footer />
      </div>
   );
}

ReactDOM.render(
   <App />,
   document.getElementById('root')
);
