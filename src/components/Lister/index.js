import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post'
import CreatePost from './CreatePost';

const Lister = () => {

	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);

	useEffect(() => {
		getPosts().then(data => {
			setLoading(false);
			setPosts(data);
		});
	}, []);

	const onDeletePost = (id) => {
        setPosts((posts) => posts.filter(p => p.id !== id));
	}

	const onCreatePost = post => {
        setPosts((posts) => [...posts, post]);
	}

    return (
        loading ?
        <>Loading... </> :
        <div className="postList">
            {
                allPosts.length ?
                allPosts.map((post, index) =>
                    <Post
                        key={index}
                        {...post}
                        onDelete={ () => onDeletePost(post.id) }
                    />
                )
                : <>No posts available...</>
            }
            <CreatePost onCreate={ onCreatePost } />
        </div>
    )
};

export default Lister;