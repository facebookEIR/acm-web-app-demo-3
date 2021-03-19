// index.js

/*** HEADER ***/

function Header() {
   return (
      <div class="header">
         <img id="header-image" src="./static/journal.jpg" />
         <h1>My Journal</h1>
      </div>
   );
}

/*** COMPOSER ***/

class Composer extends React.Component {
   constructor(props) {
      super(props);
      this.state = { textareaValue: "" };

      this.handleTextareaChange = this.handleTextareaChange.bind(this);
      this.handleComposerSubmit = this.handleComposerSubmit.bind(this);
   }

   handleTextareaChange(event) {
      this.setState({ textareaValue: event.target.value });
   }

   handleComposerSubmit(event) {
      this.props.onSubmitPost(this.state.textareaValue);
      event.preventDefault();
   }

   render() {
      return (
         <div class="composer">
            <h2 id="form-heading">What's on your mind?</h2>
            <form onSubmit={this.handleComposerSubmit} >
               <label>
                  <textarea
                     id="form-textarea"
                     value={this.state.textareaValue}
                     onChange={this.handleTextareaChange}
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
      <div class="post">
         <h2>{props.date}</h2>
         <p>{props.text}</p>
      </div>
   );
}

/*** FOOTER ***/

function Footer() {
   return (
      <div class="footer">
         <p>Created by TXST ACM Chapter (<a href="https://twitter.com/TxStateACM">follow us on Twitter</a>)</p>
         <p>Copyright 2021</p>
      </div>
   );
}

/*** MAIN APP ***/

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         posts: [
            {
               "date": "03/03/2021",
               "text": "This is my second journal entry. Here is some more text so that this journal entry takes multiple lines to render.",
            },
            {
               "date": "03/02/2021",
               "text": "This is my very first journal entry. Hello, world!",
            },
         ]
      };

      this.onSubmitPost = this.onSubmitPost.bind(this);
   }

   onSubmitPost(text) {
      let newPosts = this.state.posts;
      const todaysDate = new Date().toLocaleDateString();
      newPosts.unshift({
         "date": todaysDate,
         "text": text,
      });
      this.setState({ posts: newPosts });
   }

   render() {
      return (
         <div>
            <Header />
            <Composer onSubmitPost={this.onSubmitPost} />
            <Feed posts={this.state.posts} />
            <Footer />
         </div>
      );
   }
}

ReactDOM.render(
   <App />,
   document.getElementById('root')
);
