import SpottedCard from '../../components/SpottedCard';
import { 
    Flex, 
  } from '@chakra-ui/react';

import { getFeed } from '../../services/Api';

import { useEffect, useState } from 'react';

export default function Feed(){
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        async function getPosts(){
            const { data: feed } = await getFeed();
            setPosts(feed.posts)
        }
        getPosts();
    }, [])

    const createPostCards = (posts) => {
        console.log('called createPost')
        const loadedCards = posts.map((post) => {
            return(
                <SpottedCard 
                id={post.id}
                user_id={post.user_id}
                text={post.text}
                created_at={post.created_at}
                updated_at={post.updated_at}
                />
            )
        })

        return(
            loadedCards
        )
    }

    return(
        <Flex align="center" gap={4} margin={5} justifyContent="center" flexDirection="column">
            {posts ? createPostCards(posts) : <SpottedCard text={'posts vazio'}/>}
        </Flex>
    )
}