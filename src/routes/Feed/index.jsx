import SpottedCard from '../../components/SpottedCard';
import { 
    Flex, 
    Spinner,
    Alert,
    Text,
    Stack,
    AlertIcon,
    AlertDescription,
    Button,
    Icon,
  } from '@chakra-ui/react';

import { getFeed } from '../../services/Api';

import { useEffect, useState } from 'react';

import { RxReload } from 'react-icons/rx';

export default function Feed(){
    const [posts, setPosts] = useState(null);
    async function getPosts2(){
        const { data: feed } = await getFeed();
        setPosts(feed.posts)
    }

    useEffect(() => {
        async function getPosts(){
            const { data: feed } = await getFeed();
            setPosts(feed.posts)
        }
        getPosts();
    }, [])

    const loadingSpotteds = () => {
        return(
          <Alert status='info' width='sm'>
            <AlertIcon/>
            <AlertDescription>
                Carregando spotteds...
            </AlertDescription>
          </Alert>
        )
      }

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
            <Button
                onClick={() => {setPosts(null); getPosts2()}}
            >
                <Flex gap={2} flexDirection='row'>
                    <Icon as={RxReload}/><Text>  Recarregar</Text>
                </Flex>
            </Button>
            {posts ? createPostCards(posts) : loadingSpotteds()}
        </Flex>
    )
}