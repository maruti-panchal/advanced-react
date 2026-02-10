// import AddTimer from './components/AddTimer.tsx';
// import Header from './components/Header.tsx';
// import TimersContextProvider from './components/store/timers-context.tsx';
// import Timers from './components/Timers.tsx';

import { ReactNode, useEffect, useState } from "react";
import { get } from "./utils/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";

// function App() {
//   return (
//     <>
//       <TimersContextProvider>
//         <Header />
//         <main>
//           <AddTimer />
//           <Timers />
//         </main>
//       </TimersContextProvider>
//     </>
//   );
// }

// export default App;

type RawDataBlogPost={
  id:number;
  title:string;
  body:string;
}

const App = () => {
  const [fetchedPosts, setFetchedPosts] =useState<BlogPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
         const data = await get('https://jsonplaceholder.typicode.com/posts') as RawDataBlogPost[];
      const blogPosts = data.map(rawPost=>{
        return{
          id:rawPost.id,
          title:rawPost.title,
          text:rawPost.body
        }
      });
      setFetchedPosts(blogPosts);
      } catch (error) {
        if(error instanceof Error){
          console.error("Error fetching blog posts:", error.message);
        }else{
          console.error("Unknown error fetching blog posts:", error);
        }
        setFetchError("Failed to Fetch Blog Posts");
      }
        setIsFetching(false);
    }
      fetchPosts();
  }, []);

let content:ReactNode;

if(fetchedPosts){
  content=<BlogPosts posts={fetchedPosts}/>
} 

if(isFetching){
  content=<p id="loading-fallback">Loading...</p>
}
  return <main>
    <img src={fetchingImg} alt="Data Fetching"/>
    {content}
  </main>
}

export default App
