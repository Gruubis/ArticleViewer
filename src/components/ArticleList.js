import Article from "./Article";
import { CardColumns } from "react-bootstrap";
import "./ArticleList.scss";
const ArticleList = (props) => {
  return (
    <CardColumns className="container">
      {props.articles1.map((article) => (
        <Article
          publishedAt={article.publishedAt}
          title={article.title}
          description={article.description}
          image={article.image}
          url={article.url}
        />
      ))}
    </CardColumns>
  );
};
export default ArticleList;
