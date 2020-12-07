import Link from "next/link";
import styles from '../../styles/Home.module.scss'

const {CONTENT_API_KEY, BLOG_URL} = process.env;

async function getPost(slug: string) {
    const data = await fetch(
        `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}`
        ).then((res) => res.json());
    
    const posts = data.posts;
    return posts[0];
}

export const getStaticProps = async ({ params }) => {
    const post = await getPost(params.slug)
    return {
        props: { post }
    }
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: true
    }
}

type Post = {
    title: string,
    slug: string,
    html: string
}

const Post: React.FC<{post: Post}> = props => {
    console.log(props);

    const { post } = props;
    
    return (
        <div className={styles.container}>
            <Link href="/">
                <a>Home</a>
            </Link>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{__html: post.html}}></div>
        </div>
    )
};

export default Post;