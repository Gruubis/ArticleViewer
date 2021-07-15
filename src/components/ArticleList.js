import Article from "./Article";
import { Col, Row, Container } from "react-bootstrap";

const ArticleList = (props) => {
  const chunk = (arr, chunkSize = 1, cache = []) => {
    const tmp = [...arr];
    if (chunkSize <= 0) return cache;
    while (tmp.length) cache.push(tmp.splice(0, chunkSize));
    return cache;
  };
  const articlesChunks = chunk(props.articles, 3);
  const rows = articlesChunks.map((articlesChunk, index) => {
    const ArticleCols = articlesChunk.map((article, index) => {
      return (
        <Col xs="4" key={index}>
          <Article
            key={index}
            publishedAt={article.publishedAt}
            title={article.title}
            description={article.description}
            image={article.image}
            url={article.url}
          />
        </Col>
      );
    });
    return (
      <Row style={{ paddingBottom: "40px" }} key={index}>
        {ArticleCols}
      </Row>
    );
  });
  return <Container>{rows}</Container>;
};

export default ArticleList;
