import BlogFallback from "components/common/blog-fallback";
import { Col, Row, Card } from "react-bootstrap";
import Link from "next/link";

const BlogCard = (props) => {
    const { blog } = props;
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
    const canonicalUrl = `https://www.truefriendmatrimony.com${router.asPath.split('?')[0]}`;

    return (
        <>
            <Head>
                <title>{blog.title} | TrueFriend Matrimony | </title>
                <meta name="description" content={blog.metaDescription || blog.description.slice(0, 155)} />
                <meta name="keywords" content="Christian Matrimony, Christian Matrimony India, Trusted Christian Matrimony, Christian Matchmaking, Christian Matrimony Blog ,Christian Brides and Grooms, Faith-Based Matrimony, Christian Life Partner, Church Wedding Support, Christian Matrimonial Services, Bible-Based Matrimony, Christian Matrimony Platform, Christian Soulmate Search,Matrimony Success Stories" />
                <link rel="canonical" href={canonicalUrl} />
                {/* Optional Open Graph Tags */}
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.metaDescription || blog.description.slice(0, 155)} />
                <meta property="og:image" content={`https://www.truefriendmatrimony.com${blog.imagePath}`} />
                <meta property="og:url" content={canonicalUrl} />
            </Head>

            <Card className="mt-5">
                <BlogFallback
                    src={imageDomain + blog?.blog?.imagePath + blog?.blog?.images?.medium}
                    alt={blog?.title || "Blog Image"}
                />
                <Card.Body className="matchesProfile">
                    <Card.Title className="d-flex justify-content-between">
                        <p>{blog.title}</p>
                    </Card.Title>
                    <div className="text-nowrap" style={{ overflow: 'hidden' }}>
                        <div className="d-flex">
                            <p dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 35) }} />
                            <Link href={`/blogs/${blog.uri}`}>   Read more...</Link>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
};

export default BlogCard;